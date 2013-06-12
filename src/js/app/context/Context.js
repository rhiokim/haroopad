define([
		'context/Editor',
		'context/Viewer'
	],
	function(Editor, Viewer) {

		var gui = require('nw.gui'),
				win = gui.Window.get();

		win.on('popup.context.viewer', function(x, y) {
			Viewer.popup(x, y);
		});

		win.on('popup.context.editor', function(x, y) {
			Editor.popup(x, y);
		});

	});