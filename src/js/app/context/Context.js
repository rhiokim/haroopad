define([
		'context/Editor',
		'context/Viewer'
	],
	function(Editor, Viewer) {

		var gui = require('nw.gui'),
				win = gui.Window.get();

		window.ee.on('popup.context.viewer', function(x, y) {
			Viewer.popup(x, y);
		});

		window.ee.on('popup.context.editor', function(x, y) {
			Editor.popup(x, y);
		});

	});