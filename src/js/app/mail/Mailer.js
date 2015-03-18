define([
	], function() {

	var nodemailer = require("nodemailer");

	var _glo = {
		getEmailAdvertisementHTML: function() {
			return ''
				// + '<hr>'
				+ '<p style="display: block; width: 99.6%; line-height:1.6em; /*text-align: center; */padding: 5px 0; font-size:1em; border: 1px solid #e5e5e5;/* background-color:rgb(253,246,227);*/ border-radius: 3px;">'
				+ '	<span>'
				+ '   <img src="http://pad.haroopress.com/assets/images/logo-small.png" align="absmiddle" width="40" height="40" style="float:left; margin:0 10px;"/>'
				+ '   Sent from My <strong><a href="http://pad.haroopress.com/" target="_blank">Haroopad</a></strong> <br/>'
				+ '   The Next Document processor based on Markdown '
	 			+ '	- <a href="http://pad.haroopress.com/user.html#download" target="_blank">Download</a>'
				+ ' </span>'
				+ '</p>';
		},

		getEmailAdvertisementMD: function() {
			return ''
				+ '\n* * * * * * * *  \n'
				+ '\t> Sent from My **[Haroopad](http://pad.haroopress.com)**  \n'
				+ '\t> The Next Document processor based on Markdown  \n'
				+ '\t> [Download Haroopad](http://pad.haroopress.com/user.html#download)  \n';
		}
	}

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
		transport = nodemailer.createTransport({
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