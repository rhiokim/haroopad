define([
	],

	function() {
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
				if (fs.existsSync(tmpFiles[uid])) {
					window.ee.emit('tmp.file.open', tmpFiles[uid], uid);
				} else {
					delete tmpFiles[uid];
				}
			}

			store.set('Temporary', tmpFiles);
		}

		return {
			save: function(file, markdown, cb) {
				fs.writeFile(file, markdown, 'utf8', cb);
			},
			
			open: function(file, cb) {
				fs.readFile(file, 'utf8', cb);
			},

			reload: function(file, cb) {
				fs.readFile(file, 'utf8', cb);
			},

			loadTemporary: function() {
				checkTemporary();
			}
		}
});