define([
		'keyboard',
    'window/Window.opt',
    'window/WindowManager',
    'window/Window.preferences',
    'window/Window.dragdrop',
    'file/File',
    'file/Recents'
], function(HotKey, Options, WindowMgr, /*Help,*/ Preferences, DragDrop, File, Recents) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

  window.ee.on('tmp.file.open', function(file, uid) {
    WindowMgr.open(file, { uid: uid, tmp: true });
  });

  window.ee.on('menu.file.new', function() {
    WindowMgr.open();
  });

  window.ee.on('menu.file.open', function() {
    WindowMgr.actived.window.ee.emit('file.open');
    // WindowMgr.actived.emit('file.open');
  });

  window.ee.on('menu.file.recents', function(file) {
    WindowMgr.open(file);
  });

  window.ee.on('menu.file.recents.clear', function() {
    Recents.clearAll();
  });

  window.ee.on('menu.file.save', function() {
  	// WindowMgr.actived.emit('file.save');
    WindowMgr.actived.window.ee.emit('file.save');
  });

  window.ee.on('menu.file.save.as', function() {
  	// WindowMgr.actived.emit('file.save.as');
    WindowMgr.actived.window.ee.emit('file.save.as');
  });

  window.ee.on('menu.file.close', function() {
    // WindowMgr.actived.emit('file.close');
    WindowMgr.actived.window.ee.emit('file.close');
  });

  window.ee.on('menu.file.exports.html', function() {
    // WindowMgr.actived.emit('file.exports.html');
    WindowMgr.actived.window.ee.emit('file.exports.html');
  });

  window.ee.on('menu.print.html', function() {
    // WindowMgr.actived.emit('print.html');
    WindowMgr.actived.window.ee.emit('print.html');
  });

  window.ee.on('menu.preferences.show', function() {
    Preferences.show();
  });


  /**
   * tools menu event
   */
  window.ee.on('tools.presentation', function(theme) {
    Presentation.show(theme);
  });


  window.ee.on('menu.view.mode.toggle', function() {
    // WindowMgr.actived.emit('view.mode.toggle');
    WindowMgr.actived.window.ee.emit('view.mode.toggle');
  });

  window.ee.on('menu.show.toggle.linenum', function() {
    // WindowMgr.actived.emit('show.toggle.linenum');
    WindowMgr.actived.window.ee.emit('show.toggle.linenum');
  });

  window.ee.on('menu.view.plus5.width', function() {
    // WindowMgr.actived.emit('view.plus5.width');
    WindowMgr.actived.window.ee.emit('view.plus5.width');
  });

  window.ee.on('menu.view.minus5.width', function() {
    // WindowMgr.actived.emit('view.minus5.width');
    WindowMgr.actived.window.ee.emit('view.minus5.width');
  });
  

  window.ee.on('menu.action.copy.html', function() {
    // WindowMgr.actived.emit('action.copy.html');
    WindowMgr.actived.window.ee.emit('action.copy.html');
  });
  

  //fire by child window
  window.ee.on('file.open', function(file) {
    WindowMgr.open(file);
    Recents.add(file);
  });
  //fire by child window
  window.ee.on('file.save', function(file, markdown, cb) {
    File.save(file, markdown, cb);
    Recents.add(file);
  });

  window.ee.on('exit', function() {
    gui.App.quit();
  });

  /**
   * context function
   */
  window.ee.on('context.cut', function(e) {
    // WindowMgr.actived.emit('context.cut', e);
    WindowMgr.actived.window.ee.emit('context.cut', e);
  });
  window.ee.on('context.copy', function(e) {
    // WindowMgr.actived.emit('context.copy');
    WindowMgr.actived.window.ee.emit('context.copy');
  });
  window.ee.on('context.paste', function(e) {
    // WindowMgr.actived.emit('context.paste');
    WindowMgr.actived.window.ee.emit('context.paste');
  });
  window.ee.on('context.select.all', function(e) {
    // WindowMgr.actived.emit('context.select.all');
    WindowMgr.actived.window.ee.emit('context.select.all');
  });
  window.ee.on('context.preferences', function(e) {
    Preferences.show();
  });
  window.ee.on('context.copy.html', function(e) {
    // WindowMgr.actived.emit('action.copy.html');
    WindowMgr.actived.window.ee.emit('action.copy.html');
  });

  HotKey('defmod-n', function() {
    WindowMgr.open();
  });

  HotKey('defmod-o', function() {
    WindowMgr.actived.window.ee.emit('file.open');
  });

  HotKey('defmod-s', function() {
    WindowMgr.actived.window.ee.emit('file.save');
  });

  HotKey('defmod-shift-s', function() {
    WindowMgr.actived.window.ee.emit('file.save.as');
  });

  HotKey('defmod-q', function() {
    gui.App.quit();
  });

  /**
   * function shortcut
   * @return {[type]} [description]
   */

  HotKey('defmod-shift-l', function() {
    WindowMgr.actived.window.ee.emit('show.toggle.linenum');
  });

  HotKey('defmod-alt-v', function() {
    WindowMgr.actived.window.ee.emit('toggle.vim.keybind');
  });

  HotKey('defmod-,', function() {
    Preferences.show();
  });

  File.loadTemporary();
});