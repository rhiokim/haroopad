define([
		'file/File.model',
		'file/File.tmp.opt'
	],

	function(FileModel, TmpOpt) {
		var fs = require('fs-extra'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		function checkTemporary() {
			var tmp = TmpOpt.get('files'),
				tmpFile,
				appTmpDataPath = path.join(gui.App.dataPath, '.tmp');

			if (!fs.existsSync(appTmpDataPath)) {
			  fs.mkdirSync(appTmpDataPath);
			}

			_.forEach(tmp, function(uid, idx) {
				tmpFile = path.join(appTmpDataPath, uid);
				if (fs.existsSync(tmpFile)) {
					var file = new FileModel({ fileEntry: tmpFile, tmp: true });
					window.ee.emit('tmp.file.open', file);
				} else {
					TmpOpt.remove(uid);
				}
			});
		}

		var fileApp = {
			open: function(fileEntry) {
				var file = new FileModel({ fileEntry: fileEntry });

				return file;
			},

			loadTemporary: function() {
				checkTemporary();
			}
		}

		return fileApp;
});