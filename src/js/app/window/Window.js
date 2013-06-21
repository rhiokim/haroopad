define([
    'store',
		'keyboard',
    'window/Window.opt',
    'window/WindowManager',
    'window/Window.preferences',
    'window/Window.dragdrop',
    'file/File',
    'file/Recents'
], function(store, HotKey, Options, WindowMgr, /*Help,*/ Preferences, DragDrop, File, Recents) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

  process.on('menu.file.new', function() {
    WindowMgr.open();
  });

  process.on('menu.file.open', function() {
    WindowMgr.actived.emit('file.open');
  });

  process.on('menu.file.recents', function(file) {
    WindowMgr.open(file);
  });

  process.on('menu.file.recents.clear', function() {
    Recents.clearAll();
  });

  process.on('menu.file.save', function() {
  	WindowMgr.actived.emit('file.save');
  });

  process.on('menu.file.save.as', function() {
  	WindowMgr.actived.emit('file.save.as');
  });

  process.on('menu.file.close', function() {
    WindowMgr.actived.emit('file.close');
  });

  process.on('menu.file.exports.html', function() {
    WindowMgr.actived.emit('file.exports.html');
  });

  process.on('menu.print.html', function() {
    WindowMgr.actived.emit('print.html');
  });

  process.on('menu.preferences.show', function() {
    Preferences.show();
  });




  process.on('menu.view.mode.toggle', function() {
    WindowMgr.actived.emit('view.mode.toggle');
  });

  process.on('menu.show.toggle.linenum', function() {
    WindowMgr.actived.emit('show.toggle.linenum');
  });

  process.on('menu.view.plus5.width', function() {
    WindowMgr.actived.emit('view.plus5.width');
  });

  process.on('menu.view.minus5.width', function() {
    WindowMgr.actived.emit('view.minus5.width');
  });
  

  process.on('menu.action.copy.html', function() {
    WindowMgr.actived.emit('action.copy.html');
  });
  

  //fire by child window
  process.on('file.open', function(file) {
    WindowMgr.open(file);
    Recents.add(file);
  });
  //fire by child window
  process.on('file.save', function(file, markdown, cb) {
    File.save(file, markdown, cb);
    Recents.add(file);
  });

  process.on('exit', function() {
    gui.App.quit();
  });

  /**
   * context function
   */
  process.on('context.cut', function(e) {
    WindowMgr.actived.emit('context.cut', e);
  });
  process.on('context.copy', function(e) {
    WindowMgr.actived.emit('context.copy');
  });
  process.on('context.paste', function(e) {
    WindowMgr.actived.emit('context.paste');
  });
  process.on('context.select.all', function(e) {
    WindowMgr.actived.emit('context.select.all');
  });
  process.on('context.preferences', function(e) {
    Preferences.show();
  });
  process.on('context.copy.html', function(e) {
    WindowMgr.actived.emit('action.copy.html');
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