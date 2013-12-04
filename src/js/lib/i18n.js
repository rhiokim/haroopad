/**
 * i18n data preloader
 */
;(function() {

	var fs = require('fs');
	var path = require('path');

	var lng, url, locales = global.locales = {};

	function load(ns) {
		var res, file;
		file = ns +'.json';

		res = fs.readFileSync(path.join(url, file), 'utf8');
		res = JSON.parse(res);

		locales[ns] = res;
	}

	function init(options) {
		var ns;
		lng = options.lng || 'en';

		url = options.path || 'locales';
		url = path.join(url, lng);

		ns = options.ns || [];
		ns.forEach(load);
	}

	init({
	  lng: 'ko',
	  path: getExecPath() +'/Libraries/.locales/',
	  ns: [ 'menu', 'pad', 'preference' ]
	});

}());