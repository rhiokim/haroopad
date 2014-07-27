define([
		'file/File.model',
		'file/File.tmp.opt'
	],

	function(FileModel, TmpOpt) {
		var fs = require('fs-extra'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		var tmp = TmpOpt.get('files') || [];
		var files = [];
		var appTmpDataPath = global.PATHS.tmp;

		function checkTemporary() {
			var tmpFile;

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
				var generalConf = store.get('General') || {
					enableLastFileRestore: true
				};

				if (tmp.length == 0 || !generalConf.enableLastFileRestore) {
					window.ee.emit('menu.file.new');
					return;
				}
				
				checkTemporary();
			}
		};

		//disabled last file restore 
		window.ee.on('clear.lastfiles', function() {
			fs.removeSync(appTmpDataPath);
			TmpOpt.clearAll();
		});

		return fileApp;
});