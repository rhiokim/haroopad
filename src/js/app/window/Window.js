define([
		'window/Window.opt',
		'keyboard',
	    'utils/Error',
		'menu/MenuBar',
		'menu/Context/Context',
		'window/Splitter',
		'window/Window.help',
		'dialog/Dialogs',
		'file/File',
	    'preferences/Preferences',
	    'editor/Editor',
	    'viewer/Viewer',
		'window/Window.file',
		'window/Window.dragdrop',
		'window/Window.exports'
	], 
	function(options, HotKey, Err, MenuBar, Context, Splitter, Help, Dialogs, File, Preferences, Editor, Viewer) {
		var gui = require('nw.gui');
		var win = gui.Window.get(),
				subWin;

		var orgTitle = 'Untitled';
		var edited = false,
				delayClose = false;

		var config = options.toJSON();

		function newHandler() {
			options.set({
				x: win.x + 20,
				y: win.y + 20
			});
			
    	subWin = gui.Window.open('pad.html', {
    				width: win.width,
    				height: win.height,
					  toolbar: false,
					  show: false
					});
		}

		function close() {
			options.save();
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
		File.bind('file.opened', function(markdown, dirname, basename) {
			win.title = orgTitle = basename;
			Viewer.init({
				dirname: dirname
			});

			Editor.setValue(markdown);
		});

		File.bind('file.not.exist', function() {
			Err.throw('error', 'File is not exist');
		});

		File.bind('saved', function(dirname, basename) {
			win.title = orgTitle = basename;
			edited = false;
			
			Viewer.init({
				dirname: dirname
			});

			//window closing save
			if(delayClose) {
				close();
			}
		});

		HotKey('defmod-n', newHandler);

		HotKey('defmod-shift-ctrl-d', function() {
			win.showDevTools();
		});

		win.on('file.new', newHandler);
		win.on('file.close', win.close);

	    // Listen to `open` event
	    win.on('open.file', function(path) {
			File.open(path);
	    });

		win.resizeTo(config.width, config.height);
		win.moveTo(config.x, config.y);

		return {
			edited: function() {
				win.title = orgTitle + ' •';
				edited = true;
			},

			open: function(fileEntry) {
				File.open(fileEntry);
			}
		}
});