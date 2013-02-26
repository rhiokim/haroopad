define([
		'window/Window.opt',
		'window/Splitter',
		'dialog/Dialogs',
		'file/File',
    'preferences/Preferences'
	], 
	function(option, Splitter, Dialogs, File, Preferences) {
		var gui = require('nw.gui');
		var win = gui.Window.get();
		var orgTitle = win.title = 'Untitled';
		var edited = false,
				delayClose = false;
		var config = option.toJSON();

		function close() {
			option.save();
			win.hide();
			win.close(true);
		}

		win.on('closed', function() {
			win = null;
		});

		win.on('close', function() {
			if(edited) {
				Dialogs.save.show();
			} else {
				close();
			}
		});

		Dialogs.save.bind('save', function() {
			File.externalSave();
			delayClose = true;
			// close();
		});

		Dialogs.save.bind('dont-save', function() {
			close();
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
			edited = false;

			//window closing save
			if(delayClose) {
				close();
			}
		});

		win.show();

		return {
			edited: function() {
				win.title = orgTitle + ' •';
				edited = true;
			},

			setTitle: function(title) {
				win.title = orgTitle = title;
			}
		}
});