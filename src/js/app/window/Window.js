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

  var fs = require('fs'),
      path = require('path');
  
  var pathDocs = getDocsPath();

  window.ee.on('tmp.file.open', function(file) {
    WindowMgr.open(file);
  });

  window.ee.on('menu.file.new', function() {
    WindowMgr.open();
  });

  window.ee.on('menu.file.open', function() {
    WindowMgr.actived.window.ee.emit('menu.file.open');
  });

  window.ee.on('menu.file.recents', function(file) {
    var fileObj = File.open(file);
    Recents.add(file);
    WindowMgr.open(fileObj);
  });

  window.ee.on('menu.file.recents.clear', function() {
    Recents.clearAll();
  });

  window.ee.on('menu.file.save', function() {
    WindowMgr.actived.window.ee.emit('menu.file.save');
  });

  window.ee.on('menu.file.save.as', function() {
    WindowMgr.actived.window.ee.emit('menu.file.save.as');
  });

  window.ee.on('menu.file.close', function() {
    WindowMgr.actived.window.ee.emit('file.close');
  });

  window.ee.on('menu.file.exports.clipboard', function() {
    WindowMgr.actived.window.ee.emit('menu.file.exports.clipboard');
  });
  window.ee.on('menu.file.exports.html', function() {
    WindowMgr.actived.window.ee.emit('file.exports.html');
  });

  window.ee.on('menu.print.html', function() {
    WindowMgr.actived.window.ee.emit('print.html');
  });

  window.ee.on('menu.preferences.show', function() {
    Preferences.show();
  });


  /**
   * edit
   */
  window.ee.on('menu.edit.undo', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.undo');
  });
  window.ee.on('menu.edit.redo', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.redo');
  });
  window.ee.on('menu.edit.cut', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.cut');
  });
  window.ee.on('menu.edit.copy', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.copy');
  });
  window.ee.on('menu.edit.paste', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.paste');
  });
  window.ee.on('menu.edit.delete', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.delete');
  });
  window.ee.on('menu.edit.selectall', function() {
    WindowMgr.actived.window.ee.emit('menu.edit.selectall');
  });


  /**
   * tools menu event
   */
  window.ee.on('tools.presentation', function(theme) {
    Presentation.show(theme);
  });


  // window.ee.on('menu.view.mode.toggle', function() {
  //   WindowMgr.actived.window.ee.emit('view.mode.toggle');
  // });

  window.ee.on('menu.view.mode', function(layout) {
    WindowMgr.actived.window.ee.emit('menu.view.mode', layout);
  });

  window.ee.on('menu.show.toggle.linenum', function() {
    WindowMgr.actived.window.ee.emit('show.toggle.linenum');
  });

  window.ee.on('menu.view.plus5.width', function() {
    WindowMgr.actived.window.ee.emit('view.plus5.width');
  });

  window.ee.on('menu.view.minus5.width', function() {
    WindowMgr.actived.window.ee.emit('view.minus5.width');
  });

  window.ee.on('menu.view.doc.outline', function() {
    WindowMgr.actived.window.ee.emit('menu.view.doc.outline');
  });

  window.ee.on('menu.view.fullscreen', function() {
    WindowMgr.actived.window.ee.emit('view.fullscreen');
  });
  

  /**
   * insert menu
   */
  window.ee.on('menu.insert.h1', function() {
    WindowMgr.actived.window.ee.emit('action.h1');
  });
  window.ee.on('menu.insert.h2', function() {
    WindowMgr.actived.window.ee.emit('action.h2');
  });
  window.ee.on('menu.insert.h3', function() {
    WindowMgr.actived.window.ee.emit('action.h3');
  });
  window.ee.on('menu.insert.h4', function() {
    WindowMgr.actived.window.ee.emit('action.h4');
  });
  window.ee.on('menu.insert.h5', function() {
    WindowMgr.actived.window.ee.emit('action.h5');
  });
  window.ee.on('menu.insert.h6', function() {
    WindowMgr.actived.window.ee.emit('action.h6');
  });
  window.ee.on('menu.insert.strong', function() {
    WindowMgr.actived.window.ee.emit('action.strong');
  });
  window.ee.on('menu.insert.emphasize', function() {
    WindowMgr.actived.window.ee.emit('action.emphasize');
  });
  window.ee.on('menu.insert.inlinecode', function() {
    WindowMgr.actived.window.ee.emit('action.inlinecode');
  });
  window.ee.on('menu.insert.image', function() {
    WindowMgr.actived.window.ee.emit('action.image');
  });
  window.ee.on('menu.insert.link', function() {
    WindowMgr.actived.window.ee.emit('action.link');
  });
  window.ee.on('menu.insert.blockquote', function() {
    WindowMgr.actived.window.ee.emit('action.blockquote');
  });
  window.ee.on('menu.insert.orderlist', function() {
    WindowMgr.actived.window.ee.emit('action.orderlist');
  });
  window.ee.on('menu.insert.unorderlist', function() {
    WindowMgr.actived.window.ee.emit('action.unorderlist');
  });
  window.ee.on('menu.insert.page.break', function() {
    WindowMgr.actived.window.ee.emit('insert.page.break');
  });
  window.ee.on('menu.insert.section.break', function() {
    WindowMgr.actived.window.ee.emit('insert.section.break');
  });
  window.ee.on('menu.insert.fencedcode', function() {
    WindowMgr.actived.window.ee.emit('action.fencedcode');
  });
  window.ee.on('menu.insert.strikethrough', function() {
    WindowMgr.actived.window.ee.emit('action.strikethrough');
  });
  window.ee.on('menu.insert.table', function() {
    WindowMgr.actived.window.ee.emit('action.table');
  });
  window.ee.on('menu.insert.comment', function() {
    WindowMgr.actived.window.ee.emit('action.comment');
  });
  window.ee.on('menu.insert.toc', function() {
    WindowMgr.actived.window.ee.emit('insert.toc');
  });
  window.ee.on('menu.insert.date', function(format) {
    WindowMgr.actived.window.ee.emit('insert.date', format);
  });
  window.ee.on('menu.insert.filename', function() {
    WindowMgr.actived.window.ee.emit('insert.filename');
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
    var file = File.open(pathDocs +'/about.md');
        file.set('readOnly', true);
    WindowMgr.open(file);
  });
  window.ee.on('menu.help.syntax', function() {
    var file = File.open(pathDocs +'/syntax.md');
        file.set('readOnly', true);
    WindowMgr.open(file);
  });
  window.ee.on('menu.help.acknowledgements', function() {
    var file = File.open(pathDocs +'/../acknowledgements.md');
        file.set('readOnly', true);
    WindowMgr.open(file);
  });
  window.ee.on('menu.help.shortcut', function() {
    var file = File.open(pathDocs +'/shortcut.md');
        file.set('readOnly', true);
    WindowMgr.open(file);
  });


  //fire by child window
  // window.ee.on('file.open', function(file) {
  //   WindowMgr.open(file);
  //   Recents.add(file);
  // });
  //fire by child window
  // window.ee.on('file.save', function(file, markdown, cb) {
  //   File.save(file, markdown, cb);
  //   Recents.add(file);
  // });

  // window.ee.on('file.reload', function(file, cb) {
  //   File.reload(file, cb);
  // });

  window.ee.on('exit', function() {
    gui.App.quit();
  });

  /**
   * context function
   */
  window.ee.on('context.cut', function(e) {
    WindowMgr.actived.window.ee.emit('context.cut', e);
  });
  window.ee.on('context.copy', function(e) {
    WindowMgr.actived.window.ee.emit('context.copy');
  });
  window.ee.on('context.paste', function(e) {
    WindowMgr.actived.window.ee.emit('context.paste');
  });
  window.ee.on('context.delete', function(e) {
    WindowMgr.actived.window.ee.emit('context.delete');
  });
  window.ee.on('context.selectall', function(e) {
    WindowMgr.actived.window.ee.emit('context.selectall');
  });
  window.ee.on('context.preferences', function(e) {
    Preferences.show();
  });
  window.ee.on('context.copy.html', function(e) {
    WindowMgr.actived.window.ee.emit('action.copy.html');
  });


  /* process event */
  process.on('update.haroopad', function(currVersion, newVersion) {
    WindowMgr.actived.window.ee.emit('update.haroopad', currVersion, newVersion);
  });
  process.on('up.to.date.haroopad', function(currVersion) {
    WindowMgr.actived.window.ee.emit('up.to.date.haroopad', currVersion);
  });

  HotKey('defmod-n', function() {
    WindowMgr.open();
  });

  // HotKey('defmod-o', function() {
  //   window.ee.emit('menu.file.open');
  // });

  // HotKey('defmod-s', function() {
  //   WindowMgr.actived.window.ee.emit('file.save');
  // });

  // HotKey('defmod-shift-s', function() {
  //   WindowMgr.actived.window.ee.emit('file.save.as');
  // });

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