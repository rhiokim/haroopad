define([
	], function() {

	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var email, transport, tid;

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: "", // sender address
	    to: "", // list of receivers
	    subject: "", // Subject line
	    text: ""/*, // plaintext body
	    html: "<b>Hello world ✔</b>" // html body*/
	}

	function createTransport(email, password, service) {
		// create reusable transport method (opens pool of SMTP connections)
		transport = nodemailer.createTransport("SMTP", {
		    service: service || "Gmail",
		    auth: {
		        user: email,
		        pass: password
		    }
		});
	}

	function send(title, text, html, to, mode, attach, cb) {

		if (to.indexOf('@tumblr.com') > -1) {
			title = '!m '+ title;
		} else {
			var adStr = _glo.getEmailAdvertisementHTML();
			html += adStr;
			text += adStr;
			// text += _glo.getEmailAdvertisementMD();
		}

		mailOptions.from = email;
		mailOptions.to = to;
		mailOptions.subject = title;
		mailOptions.attachments = attach;
		
		if (mode == 'html') {
			mailOptions.html = html || '';
		} else {
			delete mailOptions.html;
			mailOptions.text = text || '';
		}

		// send mail with defined transport object
		transport.sendMail(mailOptions, function(error, response) {
			cb(error, response);

			if (error) {
				transport.close();
				return;
			}

		    window.clearTimeout(tid);
		    tid = window.setTimeout(function() {
		    	transport.close(); // shut down the connection pool, no more messages
		    }, 1000 * 60 * 10);
		});
	}

	window.ee.on('cancle.send.email', function() {
		transport.close();
	});

	return {
		setCredential: function(email, password, service) {
			createTransport(email, password, service);
		},

		send: send
	}

});