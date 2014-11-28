'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var chai = require('chai');
var expect = chai.expect;
var directTransport = require('../src/direct-transport');
var simplesmtp = require('simplesmtp');
chai.Assertion.includeStack = true;

var PORT_NUMBER = 8712;

function MockBuilder(envelope, message) {
    this.envelope = envelope;
    this.message = message;
    this._headers = [];
}

MockBuilder.prototype.getEnvelope = function() {
    return this.envelope;
};

MockBuilder.prototype.createReadStream = function() {
    return this.message;
};

MockBuilder.prototype.getHeader = function() {
    return 'teretere';
};

describe('SMTP Transport Tests', function() {
    this.timeout(100 * 1000);

    var server;
    var retryCount = 0;

    beforeEach(function(done) {
        server = new simplesmtp.createServer({
            ignoreTLS: true,
            disableDNSValidation: true,
            enableAuthentication: true,
            debug: false,
            authMethods: ['PLAIN', 'XOAUTH2']
        });

        server.on('validateSender', function(connection, email, callback) {
            callback(/invalid@/.test(email) && new Error('Invalid sender'));
        });

        server.on('validateRecipient', function(connection, email, callback) {
            callback(/invalid@/.test(email) && new Error('Invalid recipient'));
        });

        server.on('dataReady', function(connection, callback) {
            var err = new Error('rejected');
            if (/retry@/.test(connection.from) && retryCount++ < 3) {
                err.SMTPResponse = '451 4.7.1 Please try again later';
                callback(err);
            } else {
                callback(null, 'OK');
            }
        });

        server.listen(PORT_NUMBER, done);
    });

    afterEach(function(done) {
        server.end(done);
    });

    it('Should expose version number', function() {
        var client = directTransport();
        expect(client.name).to.exist;
        expect(client.version).to.exist;
    });

    it('Should send mail', function(done) {
        var client = directTransport({
            port: PORT_NUMBER,
            debug: false
        });

        client.on('log', console.log);

        var chunks = [],
            message = new Array(1024).join('teretere, vana kere\n');

        server.on('data', function(connection, chunk) {
            chunks.push(chunk);
        });

        server.on('dataReady', function(connection, callback) {
            var body = Buffer.concat(chunks);
            expect(body.toString()).to.equal(message.trim().replace(/\n/g, '\r\n'));
            callback(null, true);
        });

        client.send({
            data: {},
            message: new MockBuilder({
                from: 'test@[127.0.0.1]',
                to: 'test@[127.0.0.1]'
            }, message)
        }, function(err, info) {
            expect(err).to.not.exist;
            expect(info.accepted).to.deep.equal(['test@[127.0.0.1]']);
            done();
        });
    });

    it('Should retry mail', function(done) {
        var client = directTransport({
            port: PORT_NUMBER,
            debug: false,
            retryDelay: 1000
        });

        client.on('log', console.log);

        client.send({
            data: {},
            message: new MockBuilder({
                from: 'retry@[127.0.0.1]',
                to: ['test@[127.0.0.1]', 'test2@[127.0.0.1]']
            }, 'test')
        }, function(err, info) {
            expect(err).to.not.exist;
            expect(info.pending.length).to.equal(1);
            done();
        });
    });

    it('Should reject mail', function(done) {
        var client = directTransport({
            port: PORT_NUMBER,
            debug: false,
            retryDelay: 1000
        });

        client.on('log', console.log);

        client.send({
            data: {},
            message: new MockBuilder({
                from: 'invalid@[127.0.0.1]',
                to: ['test@[127.0.0.1]', 'test2@[127.0.0.1]']
            }, 'test')
        }, function(err) {
            expect(err).to.exist;
            expect(err.errors[0].recipients).to.deep.equal(['test@[127.0.0.1]', 'test2@[127.0.0.1]']);
            done();
        });
    });
});