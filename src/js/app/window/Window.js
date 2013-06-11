define([
		'keyboard',
    'window/WindowManager',
		'menu/Context/Context',
		'window/Window.help'
], function(HotKey, WindowMgr, Context, Help) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;


  win.on('menu.file.new', function() {
    WindowMgr.open();
  });

  win.on('menu.file.open', function() {
  	WindowMgr.actived.emit('file.open');
  });

  win.on('file.open', function(file) {
  	WindowMgr.open(file);
  });

  win.on('menu.file.recent', function(file) {
  	WindowMgr.open(file);
  });

  win.on('menu.file.exit', function() {
    gui.App.quit();
  });

  HotKey('defmod-n', function() {
    WindowMgr.open();
  });

  HotKey('defmod-q', function() {
  });

	HotKey('defmod-shift-ctrl-d', function() {
		win.showDevTools();
	});

	// win.on('file.new', newHandler);
	// win.on('file.close', win.close);

});