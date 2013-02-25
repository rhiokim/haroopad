define([
		'window/Window.opt',
		'file/File'
	], 
	function(option, File) {
		var gui = require('nw.gui');
		var win = gui.Window.get();
		var orgTitle = win.title = 'Untitled';

		var config = option.toJSON();

		win.on('closed', function() {
			win = null;
		});

		win.on('close', function() {
			this.hide();
			option.save();
			this.close(true);
		});

		win.resizeTo(config.width, config.height);
		win.moveTo(config.x, config.y);

		/**
		 * event bind for File
		 */
		File.bind('opened', function(dirname, basename) {
			win.title = orgTitle = basename;
		});

		File.bind('saved', function(dirname, basename) {
			win.title = orgTitle = basename;
		});

		win.show();

		return {
			edited: function() {
				win.title = orgTitle + ' •';
			},

			setTitle: function(title) {
				win.title = orgTitle = title;
			}
		}
});