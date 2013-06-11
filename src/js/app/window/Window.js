define([
		'window/Window.opt',
		'keyboard',
		'menu/Context/Context',
		'window/Window.help'
], function(options, HotKey, Context, Help) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

	var config = options.toJSON();

	HotKey('defmod-n', newHandler);

	HotKey('defmod-shift-ctrl-d', function() {
		win.showDevTools();
	});

	win.on('file.new', newHandler);
	// win.on('file.close', win.close);

	win.on('change.markdown', function(markdown, html, editor) {
		win.title = orgTitle + ' (edited)';
		edited = true;
	});

	win.resizeTo(config.width, config.height);
	win.moveTo(config.x, config.y);
});