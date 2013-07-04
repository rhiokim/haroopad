define([
	], function() {

	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var email, smtpTransport, tid;

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
		smtpTransport = nodemailer.createTransport("SMTP",{
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
			}

			mailOptions.from = email;
			mailOptions.to = to;
			mailOptions.subject = title;
			mailOptions.attachments = attach;
			
			if (mode == 'html') {
				mailOptions.html = html;
			} else {
				mailOptions.text = text;
			}

			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response){
				cb(error, response);

		    window.clearTimeout(tid);
		    tid = window.setTimeout(function() {
		    	smtpTransport.close(); // shut down the connection pool, no more messages
		    }, 1000*60*10);
			});
	}

	return {
		setCredential: function(email, password, service) {
			createTransport(email, password, service);
		},

		send: send
	}

});