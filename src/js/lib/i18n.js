/**
 * i18n data preloader
 */
;(function() {
	var fs = require('fs');
	var path = require('path');

	var G = global;
	var locales = G.LOCALES = {};

	var config = localStorage.getItem('General');
	config = JSON.parse(config) || { displayLanguage: window.navigator.language.toLowerCase() };

	var baseDir = G.PATHS.locales;
	var locale = config.displayLanguage;
	var prefix = locale.split('-')[0];

	function load( locale ) {
		var json, file = path.join(baseDir, locale);
		G.LOCALES._lang = locale;

		[ 'menu', 'pad', 'preference' ].forEach(function( ns ) {
			json = fs.readFileSync(path.join(file, ns +'.json'));
			locales[ns] = JSON.parse(json);
		});
	}

	/* supported locale */
	if (G.LANGS.hasOwnProperty(locale)) {
		load(locale);
	} else {
		if (G.LANGS.hasOwnProperty(prefix)) {
			load(prefix);
		} else {
			load('en');
		}
	}

}());