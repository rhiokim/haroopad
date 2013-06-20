defind([
		'store'
	], function(store) {

	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var email, smtpTransport, tid;

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: "
	    ", // sender address
	    to: "", // list of receivers
	    subject: "", // Subject line
	    text: ""/*, // plaintext body
	    html: "<b>Hello world ✔</b>" // html body*/
	}

	function createTransport(email, password, service) {
		// create reusable transport method (opens pool of SMTP connections)
		mtpTransport = nodemailer.createTransport("SMTP",{
		    service: service || "Gmail",
		    auth: {
		        user: email,
		        pass: password
		    }
		});
	}

	function send(title, markdown) {

			title = '!m '+ title;

			mailOptions.from = email;
			mailOptions.to = store.get('tumblr');
			mailOptions.subject = title;
			mailOptions.text = markdown;

			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		    }

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

		send: function(title, markdown) {
			send(title, markdown);
		}
	}

});