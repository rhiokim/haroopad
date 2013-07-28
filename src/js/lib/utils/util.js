var path = require('path');
var languageTable = [
	'en-US',
	'ko-KR'
];

function getWorkingDir() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getPlatformName() {
	var names = {
		'win32': 'windows',
		'darwin': 'mac',
		'linux': 'linux'
	};

	return names[process.platform];
}

function getExecPath() {
	switch(getPlatformName()) {
		case 'windows':
			return process.cwd();//path.dirname(process.execPath);
		break;
		case 'mac':
			return process.cwd();
		break;
		case 'linux':
			return process.cwd();//path.dirname(process.execPath);
		break;
	}
}

function getDocsPath() {
	var locale = window.navigator.language;
	locale = languageTable.indexOf(locale) < 0 ? 'en-US': locale ;

	return path.join(getExecPath(), 'docs', locale);
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