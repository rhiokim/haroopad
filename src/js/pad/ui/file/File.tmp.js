define([
		'ui/file/File.opt',
		'ui/file/File.tmp.opt'
	], function(Opt, TmpOpt) {

		var fs = require('fs'),
				path = require('path'),
				base62 = require('base62');

		var gui = require('nw.gui'),
				win = gui.Window.get();

		var _uid, _file, writeTimeout;
		var appTmpDataPath = gui.App.dataPath[0];

		function unique() {
			return base62.encode(parseInt(Math.random() * 100000000000000000));
		}

		win.on('closed', function() {
			window.clearTimeout(writeTimeout);
			_file = Opt.get('tmp');

			if (_file && fs.existsSync(_file)) {
				fs.unlinkSync(_file);

				TmpOpt.unset(_uid);
			}
		});

		return {
			create: function() {
				_uid = unique();
				_file = path.join(appTmpDataPath, '.tmp', _uid +'.md');

				Opt.set({ tmp: _file });
			},

			update: function() {
				window.clearTimeout(writeTimeout);

				writeTimeout = window.setTimeout(function() {
					TmpOpt.set(_uid, _file);
					fs.writeFileSync(_file, Opt.get('markdown'), 'utf8');
				}, 5000);
			},

			sync: function(file, uid) {
				_uid = uid;
				_file = file;
				Opt.set({ tmp: _file });
			}
		}
});