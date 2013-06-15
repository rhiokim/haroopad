define([
    'store',
		'keyboard',
    'window/Window.opt',
    'window/WindowManager',
    'window/Window.help',
    'window/Window.preferences',
    'window/Window.dragdrop',
    'file/Recents'
], function(store, HotKey, Options, WindowMgr, Help, Preferences, DragDrop, Recents) {
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

  win.on('menu.preferences.show', function() {
    Preferences.show();
  });




  win.on('menu.view.mode.toggle', function() {
    WindowMgr.actived.emit('view.mode.toggle');
  });

  win.on('menu.show.toggle.linenum', function() {
    WindowMgr.actived.emit('show.toggle.linenum');
  });

  win.on('menu.view.plus5.width', function() {
    WindowMgr.actived.emit('view.plus5.width');
  });

  win.on('menu.view.minus5.width', function() {
    WindowMgr.actived.emit('view.minus5.width');
  });
  

  win.on('menu.action.copy.html', function() {
    WindowMgr.actived.emit('action.copy.html');
  });
  

  win.on('file.open', function(file) {
  	WindowMgr.open(file);
    Recents.add(file);
  });

  win.on('menu.file.recents', function(file) {
  	WindowMgr.open(file);
  });

  win.on('exit', function() {
    gui.App.quit();
  });

  /**
   * context function
   */
  win.on('context.cut', function(e) {
    WindowMgr.actived.emit('context.cut', e);
  });
  win.on('context.copy', function(e) {
    WindowMgr.actived.emit('context.copy');
  });
  win.on('context.paste', function(e) {
    WindowMgr.actived.emit('context.paste');
  });
  win.on('context.select.all', function(e) {
    WindowMgr.actived.emit('context.select.all');
  });
  win.on('context.preferences', function(e) {
    Preferences.show();
  });
  win.on('context.copy.html', function(e) {
    WindowMgr.actived.emit('context.copy.html');
  });

  HotKey('defmod-n', function() {
    WindowMgr.open();
  });

  HotKey('defmod-o', function() {
    WindowMgr.actived.emit('file.open');
  });

  HotKey('defmod-s', function() {
    WindowMgr.actived.emit('file.save');
  });

  HotKey('defmod-shift-s', function() {
    WindowMgr.actived.emit('file.save.as');
  });

  HotKey('defmod-q', function() {
    gui.App.quit();
  });

  /**
   * function shortcut
   * @return {[type]} [description]
   */

  HotKey('defmod-shift-l', function() {
    WindowMgr.actived.emit('show.toggle.linenum');
  });

  HotKey('defmod-shift-v', function() {
    WindowMgr.actived.emit('toggle.vim.keybind');
  });

  HotKey('defmod-,', function() {
    Preferences.show();
  });

});