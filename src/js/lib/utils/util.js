var path = require('path');

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

function getDocsPath() {
	var lang = global.LOCALES._lang == 'ko' ? 'ko' : 'en';
	return path.join(global.PATHS.docs, lang);
}

function loadJs(url, cb) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = cb;

   head.appendChild(script);
}

function loadCss(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  
  head.appendChild(link);
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