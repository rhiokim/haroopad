/**
 * i18n data preloader
 */
;(function() {

	var fs = require('fs-extra');
	var path = require('path');

	var locales = global._locales = {};

	var baseDir = path.join(getExecPath(), 'Libraries', '.locales');
	var locale = window.navigator.language.toLowerCase();
	var langDir = path.join(baseDir, locale);

	if (!fs.existsSync(langDir)) {
		locale = locale.split('-')[0];
		langDir = path.join(baseDir, locale);

		if (!fs.existsSync(langDir)) {
			langDir = path.join(baseDir, 'en');
		}
	}

	[ 'menu', 'pad', 'preference' ].forEach(function(ns) {
		locales[ns] = fs.readJSONSync(path.join(langDir, ns +'.json'));
	});

}());