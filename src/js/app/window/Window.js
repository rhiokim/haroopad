define([
		'window/Window.opt',
		'keyboard',
		'utils/Error',
		'menu/Context/Context',
		'window/Splitter',
		'window/Window.help',
		'ui/dialog/Dialogs',
		'preferences/Preferences',
		'window/Window.dragdrop',
		'window/Window.exports'
], function(options, HotKey, Err, Context, Splitter, Help, Dialogs, Preferences) {
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
		if (edited) {
			Dialogs.save.show();
		} else {
			close();
		}
	});

	Dialogs.save.bind('save', function() {
		delayClose = true;
		// File.externalSave();
	});

	Dialogs.save.bind('dont-save', function() {
		close();
	});

	HotKey('defmod-n', newHandler);

	HotKey('defmod-shift-ctrl-d', function() {
		win.showDevTools();
	});

	win.on('file.new', newHandler);
	win.on('file.close', win.close);

	win.on('file.opend', function(opt) {
		win.title = orgTitle = opt.basename;
  });

  win.on('file.saved', function(opt) {
		win.title = orgTitle = opt.basename;
		delayClose = true;
		edited = false;	
  });

	win.on('change.markdown', function(markdown, html, editor) {
		win.title = orgTitle + ' (edited)';
		edited = true;
	});

	win.resizeTo(config.width, config.height);
	win.moveTo(config.x, config.y);
});