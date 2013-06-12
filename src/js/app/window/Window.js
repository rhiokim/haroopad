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

  win.on('menu.file.save', function() {
  	WindowMgr.actived.emit('file.save');
  });

  win.on('menu.file.save.as', function() {
  	WindowMgr.actived.emit('file.save.as');
  });

  win.on('menu.file.close', function() {
    WindowMgr.actived.emit('file.close');
  });

  win.on('menu.file.exports.html', function() {
  	WindowMgr.actived.emit('file.exports.html');
  });

  win.on('file.open', function(file) {
  	WindowMgr.open(file);
  });

  win.on('menu.file.recents', function(file) {
  	WindowMgr.open(file);
  });

  win.on('exit', function() {
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