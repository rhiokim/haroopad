define([
		'keyboard',
    'window/Window.opt',
    'window/WindowManager',
    'window/Window.preferences',
    'window/Window.presentation',
    'window/Window.dragdrop',
    'file/File',
    'file/Recents'
], function(HotKey, Options, WindowMgr, /*Help,*/ Preferences, Presentation, DragDrop, File, Recents) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

  var fs = require('fs'),
      path = require('path');
  
  var locale = window.navigator.language;
  var pathDocs = path.join(process.cwd(), 'docs', locale);

  if (!fs.existsSync(pathDocs)) {
    pathDocs = path.join(process.cwd(), 'docs', 'en-US');
  }

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

  window.ee.on('menu.file.posts.tumblr', function() {
    WindowMgr.actived.window.ee.emit('file.posts.tumblr');
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

  window.ee.on('menu.view.fullscreen', function() {
    WindowMgr.actived.window.ee.emit('view.fullscreen');
  });
  

  /**
   * action menu
   */
  window.ee.on('menu.action.copy.html', function() {
    WindowMgr.actived.window.ee.emit('action.copy.html');
  });
  window.ee.on('menu.action.h1', function() {
    WindowMgr.actived.window.ee.emit('action.h1');
  });
  window.ee.on('menu.action.h2', function() {
    WindowMgr.actived.window.ee.emit('action.h2');
  });
  window.ee.on('menu.action.h3', function() {
    WindowMgr.actived.window.ee.emit('action.h3');
  });
  window.ee.on('menu.action.h4', function() {
    WindowMgr.actived.window.ee.emit('action.h4');
  });
  window.ee.on('menu.action.h5', function() {
    WindowMgr.actived.window.ee.emit('action.h5');
  });
  window.ee.on('menu.action.h6', function() {
    WindowMgr.actived.window.ee.emit('action.h6');
  });
  window.ee.on('menu.action.strong', function() {
    WindowMgr.actived.window.ee.emit('action.strong');
  });
  window.ee.on('menu.action.emphasize', function() {
    WindowMgr.actived.window.ee.emit('action.emphasize');
  });
  window.ee.on('menu.action.inlinecode', function() {
    WindowMgr.actived.window.ee.emit('action.inlinecode');
  });
  window.ee.on('menu.action.image', function() {
    WindowMgr.actived.window.ee.emit('action.image');
  });
  window.ee.on('menu.action.link', function() {
    WindowMgr.actived.window.ee.emit('action.link');
  });
  window.ee.on('menu.action.blockquote', function() {
    WindowMgr.actived.window.ee.emit('action.blockquote');
  });
  window.ee.on('menu.action.orderlist', function() {
    WindowMgr.actived.window.ee.emit('action.orderlist');
  });
  window.ee.on('menu.action.unorderlist', function() {
    WindowMgr.actived.window.ee.emit('action.unorderlist');
  });
  window.ee.on('menu.action.fencedcode', function() {
    WindowMgr.actived.window.ee.emit('action.fencedcode');
  });
  window.ee.on('menu.action.strikethrough', function() {
    WindowMgr.actived.window.ee.emit('action.strikethrough');
  });
  window.ee.on('menu.action.table', function() {
    WindowMgr.actived.window.ee.emit('action.table');
  });
  window.ee.on('menu.action.comment', function() {
    WindowMgr.actived.window.ee.emit('action.comment');
  });

  /**
   * find menu
   */
  window.ee.on('menu.find.start', function() {
    WindowMgr.actived.window.ee.emit('find.start');
  });
  window.ee.on('menu.find.next', function() {
    WindowMgr.actived.window.ee.emit('find.next');
  });
  window.ee.on('menu.find.previous', function() {
    WindowMgr.actived.window.ee.emit('find.previous');
  });
  window.ee.on('menu.find.replace', function() {
    WindowMgr.actived.window.ee.emit('find.replace');
  });
  window.ee.on('menu.find.replace.all', function() {
    WindowMgr.actived.window.ee.emit('find.replace.all');
  });

  /**
   * help menu
   */
  
  window.ee.on('menu.help.about', function() {
    WindowMgr.open(pathDocs +'/about.md', { readOnly: true, position: 'center' });
  });
  window.ee.on('menu.help.syntax', function() {
    WindowMgr.open(pathDocs +'/syntax.md', { readOnly: true, position: 'center' });
  });
  window.ee.on('menu.help.acknowledgements', function() {
    WindowMgr.open(pathDocs +'/acknowledgements.md', { readOnly: true, position: 'center' });
  });
  window.ee.on('menu.help.shortcut', function() {
    WindowMgr.open(pathDocs +'/shortcut.md', { readOnly: true, position: 'center' });
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

  window.ee.on('file.reload', function(file, cb) {
    File.reload(file, cb);
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

  //window, linux specify doc path error
  // HotKey('shift-ctrl-space', function() {
  //   window.ee.emit('menu.help.shortcut');
  // });

  File.loadTemporary();
});