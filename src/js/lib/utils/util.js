var path = require('path');
var languageTable = [
	'en',
	'ko',
	'es'
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
			return path.join(process.execPath, '../');//process.cwd();
		break;
		case 'mac':
			return path.join(process.execPath, '../../../../../');
		break;
		case 'linux':
			return path.join(process.execPath, '../');
		break;
	}
}

function getLang() {
	var locale = window.navigator.language.split('-')[0];
	locale = languageTable.indexOf(locale) < 0 ? 'en': locale ;

	return locale;
}

function getDocsPath() {
	return path.join(getExecPath(), 'Libraries/.docs', getLang());
}

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

function merge(obj) {
	var i = 1,
		target, key;

	for (; i < arguments.length; i++) {
		target = arguments[i];
		for (key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
				obj[key] = target[key];
			}
		}
	}

	return obj;
}

function merge(obj) {
	var i = 1,
		target, key;

	for (; i < arguments.length; i++) {
		target = arguments[i];
		for (key in target) {
			if (Object.prototype.hasOwnProperty.call(target, key)) {
				obj[key] = target[key];
			}
		}
	}

	return obj;
}
