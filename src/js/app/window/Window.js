define([
		'window/Window.opt',
		'keyboard',
		'window/Splitter',
		'dialog/Dialogs',
		'file/File',
    'preferences/Preferences'
	], 
	function(option, HotKey, Splitter, Dialogs, File, Preferences) {
		var gui = require('nw.gui');
		var win = gui.Window.get(),
				subWin;
		var orgTitle = win.title = 'Untitled';
		var edited = false,
				delayClose = false;
		var config = option.toJSON();

		function newHandler() {
			option.set({
				x: win.x+20,
				y: win.y+20
			});
    	var subWin = gui.Window.open('pad.html', {
    				width: win.width,
    				height: win.height,
					  toolbar: false,
					  show: false
					});
		}

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
			delayClose = true;
			File.externalSave();
		});

		Dialogs.save.bind('dont-save', function() {
			close();
		});

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

		HotKey('defmod-n', newHandler);

		HotKey('defmod-shift-ctrl-d', function() {
			win.showDevTools();
		});

		win.resizeTo(config.width, config.height);
		win.moveTo(config.x, config.y);

		return {
			edited: function() {
				win.title = orgTitle + ' •';
				edited = true;
			},

			setTitle: function(title) {
				win.title = orgTitle = title;
			},

			show: function() {
				win.show();
			}
		}
});