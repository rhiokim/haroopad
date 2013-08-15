
// function updateGoogleAnalytics(cate, action, label) {
// 	var iframe = document.getElementById('__google');

// 	if (!iframe) {
// 		iframe = document.createElement('iframe');
// 		iframe.id = '__google';
// 	}

// 	// iframe.src = 'http://pad.haroopress.com/assets/google_active_user.html';
// 	iframe.src = 'http://pad.haroopress.com/__google_analytics.html';

// 	document.body.appendChild(iframe);
// }

var _gaq = {
	init: function() {
		var iframe, wrapper,
				html = '<iframe src="about:blank" id="__google" nwdisable nwfaketop></iframe>';
		
		wrapper = document.createElement('p');
		wrapper.innerHTML = html;
		
		iframe = wrapper.firstElementChild;
		iframe.src = 'http://pad.haroopress.com/__google_analytics.html';

		document.body.appendChild(iframe);
	},

	push: function(cate, action, label) {

	}
};