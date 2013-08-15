var path = require('path');
var languageTable = [
	'en-US',
	'ko-KR'
];

function asVersion(str) {
	var v = str.split(".");
	return {major: parseInt(v[0]), minor: parseInt(v[1]), patch: parseInt(v[2])};
}
  
function compareVersions(nstr, ostr) {
	var nv = asVersion(nstr);
	var ov = asVersion(ostr);

	// 0.2.3 0.3.4
	if( nv.major > ov.major ) return true;
	if( nv.major == ov.major && nv.minor > ov.minor) return true;
	if( nv.major == ov.major && nv.minor == ov.minor && nv.patch > ov.patch) return true;

	return false;
}

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

function updateGoogleAnalytics(name) {
	var iframe = document.getElementById('__google');

	if (!iframe) {
		iframe = document.createElement('iframe');
		iframe.id = '__google';
	}

	iframe.src = 'http://pad.haroopress.com/assets/google_'+ name +'.html';

	document.body.appendChild(iframe);
}