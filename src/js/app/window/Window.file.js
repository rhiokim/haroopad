define([
		'file/File'
	],
	function(File) {
		var gui = require('nw.gui'),
				win = gui.Window.get();

		win.on('file.save.as', function() {
			File.externalSave(true);
		});
	});