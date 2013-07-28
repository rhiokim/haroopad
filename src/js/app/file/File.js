define([
		'file/File.model'
	],

	function(FileModel) {
		var fs = require('fs-extra'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		function getTempFiles() {
			var tmp = store.get('Temporary') || {};

			tmp = tmp.file || [];
			return tmp;
		}

		function checkTemporary() {
			var tmp = getTempFiles(),
				tmpFile,
				appTmpDataPath = path.join(gui.App.dataPath[0], '.tmp');

			if (!fs.existsSync(appTmpDataPath)) {
			  fs.mkdirSync(appTmpDataPath);
			}

			_.forEach(tmp, function(uid, idx) {
				tmpFile = path.join(appTmpDataPath, uid);
				if (fs.existsSync(tmpFile)) {
					var file = new FileModel({ fileEntry: tmpFile });
						// file.loadTmp(tmpFile);
					window.ee.emit('tmp.file.open', file);
				} else {
					tmp.splice(idx,1);
				}
			});

			store.set('Temporary', { files: tmp });
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