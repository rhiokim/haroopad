define([
		'file/File.model',
		'file/File.tmp.opt'
	],

	function(FileModel, TmpOpt) {
		var fs = require('fs-extra'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		var files = [];

		function checkTemporary() {
			var tmp = TmpOpt.get('files') || [],
				tmpFile,
				appTmpDataPath = path.join(gui.App.dataPath, '.tmp');

			if (!fs.existsSync(appTmpDataPath)) {
			  fs.mkdirSync(appTmpDataPath);
			}

			tmp.forEach(function(uid, idx) {
				tmpFile = path.join(appTmpDataPath, uid);
				if (fs.existsSync(tmpFile)) {
					var file = new FileModel({ fileEntry: tmpFile, tmp: true });
					files.push(file);
					window.ee.emit('tmp.file.open', file);
				} else {
					TmpOpt.remove(uid);
				}
			});
		}

		var fileApp = {
			open: function(fileEntry) {
				var file = new FileModel({ fileEntry: fileEntry });
				files.push(file);
				return file;
			},

			loadTemporary: function() {
				checkTemporary();
			}
		}

		//disabled last file restore 
		window.ee.on('clear.lastfiles', function() {
			files.forEach(function(file) {
				file.close();
			});
		});

		return fileApp;
});