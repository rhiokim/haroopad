define([
		'ui/file/File.opt'
	], function(Opt) {

		var fs = require('fs'),
				path = require('path'),
				base62 = require('base62');

		var gui = require('nw.gui'),
				win = gui.Window.get();

		var writeTimeout;
		var appDataPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.haroopad';

		function tmpFile() {
			return '.'+ base62.encode(parseInt(Math.random() * 100000000000000000)) +'.md';
		}

		win.on('closed', function() {
			window.clearTimeout(writeTimeout);

			console.log('delete: '+ Opt.get('tmp'));

			if (Opt.get('fileEntry')) {
				fs.unlinkSync(Opt.get('tmp'));
			}
		});

		return {
			create: function() {
				var file = path.join(appDataPath, tmpFile());

				Opt.set({ tmp: file });
			},

			update: function() {
				window.clearTimeout(writeTimeout);

				writeTimeout = window.setTimeout(function() {
					fs.writeFileSync(Opt.get('tmp'), Opt.get('markdown'), 'utf8');
				}, 5000);
			}
		}
});