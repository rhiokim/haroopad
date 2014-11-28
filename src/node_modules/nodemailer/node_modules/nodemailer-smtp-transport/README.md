# SMTP transport module for Nodemailer

Applies for Nodemailer v1.x and not for v0.x where transports are built-in.

## Setup

Install with npm

    npm install nodemailer-smtp-transport

Require to your script

```javascript
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
```

## Usage

Create a Nodemailer transport object

```javascript
var transporter = nodemailer.createTransport(smtpTransport(options))
```

or (by using smtpTransport as default)

```javascript
var transporter = nodemailer.createTransport(options)
```

Where

  * **options** defines connection data
    * **options.port** is the port to connect to (defaults to 25 or 465)
    * **options.host** is the hostname or IP address to connect to (defaults to 'localhost')
    * **options.secure** defines if the connection should use SSL (if `true`) or not (if `false`)
    * **options.auth** defines authentication data (see [authentication](#authentication) section below)
    * **options.ignoreTLS** turns off STARTTLS support if true
    * **options.name** optional hostname of the client, used for identifying to the server
    * **options.localAddress** is the local interface to bind to for network connections
    * **options.connectionTimeout** how many milliseconds to wait for the connection to establish
    * **options.greetingTimeout** how many milliseconds to wait for the greeting after connection is established
    * **options.socketTimeout** how many milliseconds of inactivity to allow
    * **options.debug** if true, the connection emits all traffic between client and server as 'log' events
    * **options.authMethod** defines preferred authentication method, eg. 'PLAIN'
    * **options.tls** defines additional options to be passed to the socket constructor, eg. *{rejectUnauthorized: true}*

**Example**

```javascript
var transport = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'username',
        pass: 'password'
    }
}));
```

## Authentication

If authentication data is not present, the connection is considered authenticated from the start.

Set authentcation data with `options.auth`

Where

  * **auth** is the authentication object
    * **auth.user** is the username
    * **auth.pass** is the password for the user
    * **auth.xoauth2** is the OAuth2 access token (preferred if both `pass` and `xoauth2` values are set) or an [XOAuth2](https://github.com/andris9/xoauth2) token generator object.

If a [XOAuth2](https://github.com/andris9/xoauth2) token generator is used as the value for `auth.xoauth2` then you do not need to set the value for `auth.user`. XOAuth2 generator generates required `accessToken` itself if it is missing or expired. In this case if the authentication fails, a new token is requested and the authentication is retried once. If it still fails, an error is returned.

Install xoauth2 module to use XOauth2 token generators (not included by default)

    npm install xoauth2 --save

**XOAuth2 Example**

```javascript
var generator = require('xoauth2').createXOAuth2Generator({
    user: '{username}',
    clientId: '{Client ID}',
    clientSecret: '{Client Secret}',
    refreshToken: '{refresh-token}',
    accessToken: '{cached access token}' // optional
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transport = nodemailer.createTransport(smtpPool({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));
```

## Using well-known services

If you do not want to specify the hostname, port and security settings for a well known service, you can use it by its name (case insensitive)

```javascript
smtpTransport({
    service: 'gmail',
    auth: ..
});
```

See the list of all supported services [here](https://github.com/andris9/nodemailer-wellknown#supported-services).

## License

**MIT**
