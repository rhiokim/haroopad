define([
		'file/File.tmp'
	],
	function(Temporary) {
		var fs = require('fs'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		function checkTemporary() {
			var tmpFiles = store.get('Temporary'),
			appTmpDataPath = path.join(gui.App.dataPath[0], '.tmp');

			if (!fs.existsSync(appTmpDataPath)) {
			  fs.mkdirSync(appTmpDataPath);
			}

			for(var uid in tmpFiles) {
				fs.exists(tmpFiles[uid], function(exist) {
					if(exist) {
						window.ee.emit('tmp.file.open', tmpFiles[uid], uid);
					} else {
						delete tmpFiles[uid];
					}
				});
			}
		}
		// tmpFiles = readDir.readSync( appTmpDataPath, [ '*.md' ], readDir.ABSOLUTE_PATHS ) || [];
		// tmpFiles.forEach(function(file, idx) {
		// 	window.ee.emit('tmp.file.open', file);
		// });

		return {
			save: function(file, markdown, cb) {
				fs.writeFile(file, markdown, 'utf8', cb);
			},
			
			open: function(file, cb) {
				fs.readFile(file, 'utf8', cb);
			},

			loadTemporary: function() {
				checkTemporary();
			}
		}
});