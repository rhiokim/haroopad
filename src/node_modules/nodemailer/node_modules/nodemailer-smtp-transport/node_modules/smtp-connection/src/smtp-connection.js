'use strict';

var packageInfo = require('../package.json');
var EventEmitter = require('events').EventEmitter;
var utillib = require('util');
var net = require('net');
var tls = require('tls');
var os = require('os');
var crypto = require('crypto');
var DataStream = require('./data-stream');

module.exports = SMTPConnection;

/**
 * Generates a SMTP connection object
 *
 * Optional options object takes the following possible properties:
 *
 *  * **port** - is the port to connect to (defaults to 25 or 465)
 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
 *  * **secure** - use SSL
 *  * **name** - the name of the client server
 *  * **auth** - authentication object {user:'...', pass:'...'}
 *  * **ignoreTLS** - ignore server support for STARTTLS
 *  * **requireTLS** - forces the client to use STARTTLS
 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 10000)
 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish
 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 1 hour)
 *  * **debug** - if true, emits 'log' events with all traffic between client and server
 *  * **tls** - options for createCredentials
 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
 *
 * @constructor
 * @namespace SMTP Client module
 * @param {Object} [options] Option properties
 */
function SMTPConnection(options) {
    EventEmitter.call(this);

    this.stage = 'init';

    this.options = options || {};

    this.options.port = this.options.port || (this.options.secure ? 465 : 25);
    this.options.host = this.options.host || 'localhost';
    this.options.secure = !!this.options.secure;

    this.options.name = this.options.name || this._getHostname();

    /**
     * Expose version nr, just for the reference
     * @type {String}
     */
    this.version = packageInfo.version;

    /**
     * If true, then the user is authenticated
     * @type {Boolean}
     */
    this.authenticated = false;

    /**
     * If set to true, this instance is no longer active
     * @private
     */
    this.destroyed = false;

    /**
     * Defines if the current connection is secure or not. If not,
     * STARTTLS can be used if available
     * @private
     */
    this._secureMode = false;

    /**
     * Ignore incoming data on TLS negotiation
     * @private
     */
    this._ignoreData = false;

    /**
     * Store incomplete messages coming from the server
     * @private
     */
    this._remainder = '';

    /**
     * Unprocessed responses from the server
     * @type {Array}
     */
    this._responseQueue = [];

    /**
     * The socket connecting to the server
     * @publick
     */
    this._socket = false;

    /**
     * Lists supported auth mechanisms
     * @private
     */
    this._supportedAuth = [];

    /**
     * Function to run if a data chunk comes from the server
     * @private
     */
    this._currentAction = false;

    /**
     * Timeout variable for waiting the greeting
     * @private
     */
    this._greetingTimeout = false;

    /**
     * Timeout variable for waiting the connection to start
     * @private
     */
    this._connectionTimeout = false;

    /**
     * If the socket is deemed already closed
     * @private
     */
    this._destroyed = false;

    if (this.options.secure) {
        this._secureMode = true;
    }
}
utillib.inherits(SMTPConnection, EventEmitter);

/**
 * Creates a connection to a SMTP server and sets up connection
 * listener
 */
SMTPConnection.prototype.connect = function(connectCallback) {
    if (typeof connectCallback === 'function') {
        this.once('connect', connectCallback);
    }

    var opts = {
        port: this.options.port,
        host: this.options.host
    };

    if (this.options.localAddress) {
        opts.localAddress = this.options.localAddress;
    }

    if (this.options.socket) {
        this._socket = this.options.socket;
        this._socket.connect(this.options.port, this.options.host, this._onConnect.bind(this));
    } else if (this.options.secure) {
        if (this.options.tls) {
            Object.keys(this.options.tls).forEach((function(key) {
                opts[key] = this.options.tls[key];
            }).bind(this));
        }
        this._socket = tls.connect(this.options.port, this.options.host, opts, this._onConnect.bind(this));
    } else {
        this._socket = net.connect(opts, this._onConnect.bind(this));
    }

    this._connectionTimeout = setTimeout((function() {
        this._onError('Connection timeout', 'ETIMEDOUT');
    }).bind(this), this.options.connectionTimeout || 60 * 1000);

    this._socket.on('error', this._onError.bind(this));
};

/**
 * Sends QUIT
 */
SMTPConnection.prototype.quit = function() {
    this._sendCommand('QUIT');
    this._currentAction = this.close;
};

/**
 * Closes the connection to the server
 */
SMTPConnection.prototype.close = function() {
    clearTimeout(this._connectionTimeout);
    clearTimeout(this._greetingTimeout);

    if (this.options.debug) {
        this.emit('log', {
            type: 'socket',
            message: 'Closing connection to the server'
        });
    }

    var closeMethod = 'end';

    if (this.stage === 'init') {
        // Close the socket immediately when connection timed out
        closeMethod = 'destroy';
    }

    var socket = this._socket && this._socket.socket || this._socket;

    if (socket && !socket.destroyed) {
        try {
            this._socket[closeMethod]();
        } catch (E) {}
    }

    this._destroy();
};

/**
 * Authenticate user
 */
SMTPConnection.prototype.login = function(authData, callback) {
    this._auth = authData || {};

    var authMethod;
    if (this._auth.xoauth2 && this._supportedAuth.indexOf('XOAUTH2') >= 0) {
        authMethod = 'XOAUTH2';
    } else if (this.options.authMethod) {
        authMethod = this.options.authMethod.toUpperCase().trim();
    } else {
        // use first supported
        authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
    }

    switch (authMethod) {
        case 'XOAUTH2':
            this._handleXOauth2Token(false, callback);
            return;
        case 'LOGIN':
            this._currentAction = function(str) {
                this._actionAUTH_LOGIN_USER(str, callback);
            }.bind(this);
            this._sendCommand('AUTH LOGIN');
            return;
        case 'PLAIN':
            this._currentAction = function(str) {
                this._actionAUTHComplete(str, callback);
            }.bind(this);
            this._sendCommand('AUTH PLAIN ' + new Buffer(
                //this._auth.user+'\u0000'+
                '\u0000' + // skip authorization identity as it causes problems with some servers
                this._auth.user + '\u0000' +
                this._auth.pass, 'utf-8').toString('base64'));
            return;
        case 'CRAM-MD5':
            this._currentAction = function(str) {
                this._actionAUTH_CRAM_MD5(str, callback);
            }.bind(this);
            this._sendCommand('AUTH CRAM-MD5');
            return;
    }

    return callback(this._formatError('Unknown authentication method "' + authMethod + '"', 'EAUTH'));
};

/**
 * Sends a message
 *
 * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
 * @param {Object} message String, Buffer or a Stream
 * @param {Function} callback Callback to return once sending is completed
 */
SMTPConnection.prototype.send = function(envelope, message, callback) {
    if (!message) {
        return callback(this._formatError('Empty message', 'EMESSAGE'));
    }

    this._setEnvelope(envelope, function(err, info) {
        if (err) {
            return callback(err);
        }
        var stream = this._createSendStream(function(err, str) {
            if (err) {
                return callback(err);
            }
            info.response = str;
            return callback(null, info);
        });
        if (typeof message.pipe === 'function') {
            message.pipe(stream);
        } else {
            stream.write(message);
            stream.end();
        }

    }.bind(this));
};

/**
 * Connection listener that is run when the connection to
 * the server is opened
 *
 * @event
 */
SMTPConnection.prototype._onConnect = function() {
    clearTimeout(this._connectionTimeout);

    if (this._destroyed) {
        // Connection was established after we already had canceled it
        this.close();
        return;
    }

    this.stage = 'connected';

    this._socket.on('data', this._onData.bind(this));
    this._socket.once('close', this._onClose.bind(this));
    this._socket.once('end', this._onEnd.bind(this));

    this._socket.setTimeout(this.options.socketTimeout || (10 * 60 * 1000)); // 10 min.
    this._socket.on('timeout', this._onTimeout.bind(this));

    this._greetingTimeout = setTimeout((function() {
        // if still waiting for greeting, give up
        if (this._socket && !this._destroyed && this._currentAction === this._actionGreeting) {
            this._onError('Greeting never received', 'ETIMEDOUT');
        }
    }).bind(this), this.options.greetingTimeout || 10000);

    this._currentAction = this._actionGreeting;
};

/**
 * 'data' listener for data coming from the server
 *
 * @event
 * @param {Buffer} chunk Data chunk coming from the server
 */
SMTPConnection.prototype._onData = function(chunk) {
    if (this._ignoreData || this._destroyed || !chunk || !chunk.length) {
        return;
    }

    var data = (chunk || '').toString('binary');
    var lines = (this._remainder + data).split(/\r?\n/);
    var lastline;

    this._remainder = lines.pop();

    for (var i = 0, len = lines.length; i < len; i++) {
        if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+\-/.test(lastline.split('\n').pop())) {
                this._responseQueue[this._responseQueue.length - 1] += '\n' + lines[i];
                continue;
            }
        }
        this._responseQueue.push(lines[i]);
    }

    this._processResponse();
};

/**
 * 'error' listener for the socket
 *
 * @event
 * @param {Error} err Error object
 * @param {String} type Error name
 */
SMTPConnection.prototype._onError = function(err, type, data) {
    clearTimeout(this._connectionTimeout);
    clearTimeout(this._greetingTimeout);

    if (this._destroyed) {
        // just ignore, already closed
        // this might happen when a socket is canceled because of reached timeout
        // but the socket timeout error itself receives only after
        return;
    }

    this.emit('error', this._formatError(err, type, data));
    this.close();
};

SMTPConnection.prototype._formatError = function(message, type, response) {
    var err;

    if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
        err = message;
    } else {
        err = new Error(message);
    }

    if (type && type !== 'Error') {
        err.code = type;
    }

    if (response) {
        err.response = response;
    }

    var responseCode = typeof response === 'string' && Number((response.match(/^\d+/) || [])[0]) || false;
    if (responseCode) {
        err.responseCode = responseCode;
    }

    return err;
};

/**
 * 'close' listener for the socket
 *
 * @event
 */
SMTPConnection.prototype._onClose = function() {
    if ([this._actionGreeting, this.close].indexOf(this._currentAction) < 0 && !this._destroyed) {
        return this._onError(new Error('Connection closed unexpectedly'));
    }

    this._destroy();
};

/**
 * 'end' listener for the socket
 *
 * @event
 */
SMTPConnection.prototype._onEnd = function() {
    this._destroy();
};

/**
 * 'timeout' listener for the socket
 *
 * @event
 */
SMTPConnection.prototype._onTimeout = function() {
    return this._onError(new Error('Timeout'), 'ETIMEOUT');
};

/**
 * Destroys the client, emits 'end'
 */
SMTPConnection.prototype._destroy = function() {
    if (this._destroyed) {
        return;
    }
    this._destroyed = true;
    this.emit('end');
};

/**
 * Upgrades the connection to TLS
 *
 * @param {Function} callback Callback function to run when the connection
 *        has been secured
 */
SMTPConnection.prototype._upgradeConnection = function(callback) {
    this._ignoreData = true;
    this._socket.removeAllListeners('data');
    this._socket.removeAllListeners('error');

    var opts = {
        socket: this._socket,
        host: this.options.host
    };

    Object.keys(this.options.tls || {}).forEach((function(key) {
        opts[key] = this.options.tls[key];
    }).bind(this));

    this._socket = tls.connect(opts, function() {
        this._ignoreData = false;
        this._secureMode = true;
        this._socket.on('data', this._onData.bind(this));

        return callback(null, true);
    }.bind(this));
    this._socket.on('error', this._onError.bind(this));
};

/**
 * Processes queued responses from the server
 *
 * @param {Boolean} force If true, ignores _processing flag
 */
SMTPConnection.prototype._processResponse = function() {
    if (!this._responseQueue.length) {
        return false;
    }

    var str = (this._responseQueue.shift() || '').toString();

    if (/^\d+\-/.test(str.split('\n').pop())) {
        // keep waiting for the final part of multiline response
        return;
    }

    if (this.options.debug) {
        this.emit('log', {
            type: 'server',
            message: str.trim()
        });
    }

    var action = this._currentAction;
    this._currentAction = null;

    if (typeof action === 'function') {
        action.call(this, str);
        setImmediate(this._processResponse.bind(this, true));
    } else {
        return this._onError(new Error('Unexpected Response'), 'EPROTOCOL', str);
    }
};

/**
 * Send a command to the server, append \r\n
 *
 * @param {String} str String to be sent to the server
 */
SMTPConnection.prototype._sendCommand = function(str) {
    if (this._destroyed) {
        // Connection already closed, can't send any more data
        return;
    }

    if (this._socket.destroyed) {
        return this.close();
    }

    if (this.options.debug) {
        this.emit('log', {
            type: 'client',
            message: (str || '').toString().trim()
        });
    }

    this._socket.write(new Buffer(str + '\r\n', 'utf-8'));
};

/**
 * Initiates a new message by submitting envelope data, starting with
 * MAIL FROM: command
 *
 * @param {Object} envelope Envelope object in the form of
 *        {from:'...', to:['...']}
 *        or
 *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
 */
SMTPConnection.prototype._setEnvelope = function(envelope, callback) {
    this._envelope = envelope || {};
    this._envelope.from = this._envelope.from && this._envelope.from.address || this._envelope.from || '';

    this._envelope.to = [].concat(this._envelope.to || []).map(function(to) {
        return to && to.address || to;
    });

    if (!this._envelope.to.length) {
        return callback(this._formatError('No recipients defined', 'EENVELOPE'));
    }

    // clone the recipients array for latter manipulation
    this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
    this._envelope.rejected = [];
    this._envelope.accepted = [];

    this._currentAction = function(str) {
        this._actionMAIL(str, callback);
    }.bind(this);
    this._sendCommand('MAIL FROM:<' + (this._envelope.from) + '>');
};

SMTPConnection.prototype._createSendStream = function(callback) {
    var dataStream = new DataStream();

    this._currentAction = function(str) {
        this._actionStream(str, callback);
    }.bind(this);

    dataStream.pipe(this._socket, {
        end: false
    });

    if (this.options.debug) {
        dataStream.on('data', function(chunk) {
            this.emit('log', {
                type: 'stream',
                message: chunk.toString('binary').trim()
            });
        }.bind(this));
    }

    return dataStream;
};

/** ACTIONS **/

/**
 * Will be run after the connection is created and the server sends
 * a greeting. If the incoming message starts with 220 initiate
 * SMTP session by sending EHLO command
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionGreeting = function(str) {
    clearTimeout(this._greetingTimeout);

    if (str.substr(0, 3) !== '220') {
        this._onError(new Error('Invalid greeting from server:\n' + str), 'EPROTOCOL', str);
        return;
    }

    this._currentAction = this._actionEHLO;
    this._sendCommand('EHLO ' + this.options.name);
};

/**
 * Handles server response for EHLO command. If it yielded in
 * error, try HELO instead, otherwise initiate TLS negotiation
 * if STARTTLS is supported by the server or move into the
 * authentication phase.
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionEHLO = function(str) {
    if (str.substr(0, 3) === '421') {
        this._onError(new Error('Server terminates connection:\n' + str), 'ECONNECTION', str);
        return;
    }

    if (str.charAt(0) !== '2') {
        if (this.options.requireTLS) {
            this._onError(new Error('EHLO failed but HELO does not support required STARTTLS:\n' + str), 'ECONNECTION', str);
            return;
        }

        // Try HELO instead
        this._currentAction = this._actionHELO;
        this._sendCommand('HELO ' + this.options.name);
        return;
    }

    // Detect if the server supports STARTTLS
    if (!this._secureMode && !this.options.ignoreTLS && (/[ \-]STARTTLS\r?$/mi.test(str) || this.options.requireTLS)) {
        this._sendCommand('STARTTLS');
        this._currentAction = this._actionSTARTTLS;
        return;
    }

    // Detect if the server supports PLAIN auth
    if (str.match(/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i)) {
        this._supportedAuth.push('PLAIN');
    }

    // Detect if the server supports LOGIN auth
    if (str.match(/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i)) {
        this._supportedAuth.push('LOGIN');
    }

    // Detect if the server supports CRAM-MD5 auth
    if (str.match(/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i)) {
        this._supportedAuth.push('CRAM-MD5');
    }

    // Detect if the server supports XOAUTH2 auth
    if (str.match(/AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i)) {
        this._supportedAuth.push('XOAUTH2');
    }

    this.emit('connect');
};

/**
 * Handles server response for HELO command. If it yielded in
 * error, emit 'error', otherwise move into the authentication phase.
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionHELO = function(str) {
    if (str.charAt(0) !== '2') {
        this._onError(new Error('Invalid response for EHLO/HELO:\n' + str), 'EPROTOCOL', str);
        return;
    }

    this.emit('connect');
};

/**
 * Handles server response for STARTTLS command. If there's an error
 * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
 * succeedes restart the EHLO
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionSTARTTLS = function(str) {
    if (str.charAt(0) !== '2') {
        // Try HELO instead
        this._currentAction = this._actionHELO;
        this._sendCommand('HELO ' + this.options.name);
        return;
    }

    this._upgradeConnection((function(err, secured) {
        if (err) {
            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS');
            return;
        }

        if (this.options.debug) {
            this.emit('log', {
                type: 'socket',
                message: 'Connection upgraded'
            });
        }

        if (secured) {
            // restart session
            this._currentAction = this._actionEHLO;
            this._sendCommand('EHLO ' + this.options.name);
        } else {
            this.emit('connect');
        }
    }).bind(this));
};

/**
 * Handle the response for AUTH LOGIN command. We are expecting
 * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
 * response needs to be base64 encoded username.
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionAUTH_LOGIN_USER = function(str, callback) {
    if (str !== '334 VXNlcm5hbWU6') {
        callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', 'EAUTH', str));
        return;
    }

    this._currentAction = function(str) {
        this._actionAUTH_LOGIN_PASS(str, callback);
    }.bind(this);

    this._sendCommand(new Buffer(this._auth.user + '', 'utf-8').toString('base64'));
};

/**
 * Handle the response for AUTH CRAM-MD5 command. We are expecting
 * '334 <challenge string>'. Data to be sent as response needs to be
 * base64 decoded challenge string, MD5 hashed using the password as
 * a HMAC key, prefixed by the username and a space, and finally all
 * base64 encoded again.
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionAUTH_CRAM_MD5 = function(str, callback) {
    var challengeMatch = str.match(/^334\s+(.+)$/);
    var challengeString = '';

    if (!challengeMatch) {
        return callback(this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str));
    } else {
        challengeString = challengeMatch[1];
    }

    // Decode from base64
    var base64decoded = new Buffer(challengeString, 'base64').toString('ascii'),
        hmac_md5 = crypto.createHmac('md5', this._auth.pass);

    hmac_md5.update(base64decoded);

    var hex_hmac = hmac_md5.digest('hex'),
        prepended = this._auth.user + ' ' + hex_hmac;

    this._currentAction = function(str) {
        this._actionAUTH_CRAM_MD5_PASS(str, callback);
    }.bind(this);


    this._sendCommand(new Buffer(prepended).toString('base64'));
};

/**
 * Handles the response to CRAM-MD5 authentication, if there's no error,
 * the user can be considered logged in. Emit 'idle' and start
 * waiting for a message to send
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionAUTH_CRAM_MD5_PASS = function(str, callback) {
    if (!str.match(/^235\s+/)) {
        return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str));
    }

    this.authenticated = true;
    callback(null, true);
};

/**
 * Handle the response for AUTH LOGIN command. We are expecting
 * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
 * response needs to be base64 encoded password.
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionAUTH_LOGIN_PASS = function(str, callback) {
    if (str !== '334 UGFzc3dvcmQ6') {
        return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', 'EAUTH', str));
    }

    this._currentAction = function(str) {
        this._actionAUTHComplete(str, callback);
    }.bind(this);

    this._sendCommand(new Buffer(this._auth.pass + '', 'utf-8').toString('base64'));
};

/**
 * Handles the response for authentication, if there's no error,
 * the user can be considered logged in. Emit 'idle' and start
 * waiting for a message to send
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionAUTHComplete = function(str, isRetry, callback) {
    if (!callback && typeof isRetry === 'function') {
        callback = isRetry;
        isRetry = undefined;
    }

    if (str.substr(0, 3) === '334') {
        this._currentAction = function(str) {
            if (isRetry || !this._auth.xoauth2 || typeof this._auth.xoauth2 !== 'object') {
                this._actionAUTHComplete(str, true, callback);
            } else {
                setTimeout(this._handleXOauth2Token.bind(this, true, callback), Math.random() * 4000 + 1000);
            }
        }.bind(this);
        this._sendCommand(new Buffer(0));
        return;
    }

    if (str.charAt(0) !== '2') {
        return callback(this._formatError('Invalid login', 'EAUTH', str));
    }

    this.authenticated = true;
    callback(null, true);
};

/**
 * Handle response for a MAIL FROM: command
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionMAIL = function(str, callback) {
    if (Number(str.charAt(0)) !== 2) {
        return callback(this._formatError('Mail command failed', 'EENVELOPE', str));
    }

    if (!this._envelope.rcptQueue.length) {
        return callback(this._formatError('Can\'t send mail - no recipients defined', 'EENVELOPE'));
    } else {
        this._envelope.curRecipient = this._envelope.rcptQueue.shift();
        this._currentAction = function(str) {
            this._actionRCPT(str, callback);
        }.bind(this);
        this._sendCommand('RCPT TO:<' + this._envelope.curRecipient + '>');
    }
};

/**
 * Handle response for a RCPT TO: command
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionRCPT = function(str, callback) {
    if (Number(str.charAt(0)) !== 2) {
        // this is a soft error
        this._envelope.rejected.push(this._envelope.curRecipient);
    } else {
        this._envelope.accepted.push(this._envelope.curRecipient);
    }

    if (!this._envelope.rcptQueue.length) {
        if (this._envelope.rejected.length < this._envelope.to.length) {
            this._currentAction = function(str) {
                this._actionDATA(str, callback);
            }.bind(this);
            this._sendCommand('DATA');
        } else {
            return callback(this._formatError('Can\'t send mail - all recipients were rejected', 'EENVELOPE', str));
        }
    } else {
        this._envelope.curRecipient = this._envelope.rcptQueue.shift();
        this._currentAction = function(str) {
            this._actionRCPT(str, callback);
        }.bind(this);
        this._sendCommand('RCPT TO:<' + this._envelope.curRecipient + '>');
    }
};

/**
 * Handle response for a DATA command
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionDATA = function(str, callback) {
    // response should be 354 but according to this issue https://github.com/eleith/emailjs/issues/24
    // some servers might use 250 instead, so lets check for 2 or 3 as the first digit
    if ([2, 3].indexOf(Number(str.charAt(0))) < 0) {
        return callback(this._formatError('Data command failed', 'EENVELOPE', str));
    }

    callback(null, {
        accepted: this._envelope.accepted,
        rejected: this._envelope.rejected
    });
};

/**
 * Handle response for a DATA stream
 *
 * @param {String} str Message from the server
 */
SMTPConnection.prototype._actionStream = function(str, callback) {
    if (Number(str.charAt(0)) !== 2) {
        // Message failed
        return callback(this._formatError('Message failed', 'EMESSAGE', str));
    } else {
        // Message sent succesfully
        callback(null, str);
    }
};

SMTPConnection.prototype._handleXOauth2Token = function(isRetry, callback) {
    this._currentAction = function(str) {
        this._actionAUTHComplete(str, isRetry, callback);
    }.bind(this);

    if (this._auth.xoauth2 && typeof this._auth.xoauth2 === 'object') {
        this._auth.xoauth2[isRetry ? 'generateToken' : 'getToken'](function(err, token) {
            if (err) {
                return callback(this._formatError(err, 'EAUTH'));
            }
            this._sendCommand('AUTH XOAUTH2 ' + token);
        }.bind(this));
    } else {
        this._sendCommand('AUTH XOAUTH2 ' + this._buildXOAuth2Token(this._auth.user, this._auth.xoauth2));
    }
};

/**
 * Builds a login token for XOAUTH2 authentication command
 *
 * @param {String} user E-mail address of the user
 * @param {String} token Valid access token for the user
 * @return {String} Base64 formatted login token
 */
SMTPConnection.prototype._buildXOAuth2Token = function(user, token) {
    var authData = [
        'user=' + (user || ''),
        'auth=Bearer ' + token,
        '',
        ''
    ];
    return new Buffer(authData.join('\x01')).toString('base64');
};

SMTPConnection.prototype._getHostname = function() {
    // defaul hostname is machine hostname or [IP]
    var defaultHostname = os.hostname() || '';

    // ignore if not FQDN
    if (defaultHostname.indexOf('.') < 0) {
        defaultHostname = '[127.0.0.1]';
    }

    // IP should be enclosed in []
    if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        defaultHostname = '[' + defaultHostname + ']';
    }

    return defaultHostname;
};