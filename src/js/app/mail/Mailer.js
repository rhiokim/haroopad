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

	function send(cb) {

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

		global._gaq.push('haroopad.file', 'email', '');
	}

	window.ee.on('cancel.send.email', function() {
	    window.clearTimeout(tid);
		transport && transport.close();
	});

	return {
		setCredential: function(mailInfo) {
			createTransport(mailInfo.from, mailInfo.password);
		},

		send: function(mailInfo, fileInfo, next) {
			// mailInfo.title, fileInfo.markdown, fileInfo.emailHTML, mailInfo.to, mailInfo.mode, fileInfo.attachments
			var subject = mailInfo.title;
			var to = mailInfo.to;
			var mode = mailInfo.mode;
			var html = fileInfo.emailHTML;
			var text = fileInfo.markdown;

			if (to.indexOf('@tumblr.com') > -1) {
				if (mode == 'md') {
					subject = '!m '+ subject;
				}
				
				global._gaq.push('haroopad.file', 'tumblr', '');
			} else {
				html += _glo.getEmailAdvertisementHTML();
				text += _glo.getEmailAdvertisementMD();
			}

			if (mode == 'html') {
				delete mailOptions.text;
				mailOptions.html = html || '';
			} else {
				delete mailOptions.html;
				mailOptions.text = text || '';
			}

			mailOptions.from = mailInfo.from;
			mailOptions.to = to;
			mailOptions.subject = subject;
			mailOptions.attachments = fileInfo.attachments;

			send(next);
		}
	}

});