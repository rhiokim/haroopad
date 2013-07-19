function getPlatformName() {
	var names = {
		'win32': 'windows',
		'darwin': 'mac',
		'linux': 'linux'
	};

	return names[process.platform];
}

function updateGoogleAnalytics() {
	var iframe = document.getElementById('__google');

	if (!iframe) {
		iframe = document.createElement('iframe');
		iframe.id = '__google';
	}

	iframe.src = 'http://pad.haroopress.com/assets/google_active_user.html';

	document.body.appendChild(iframe);
}