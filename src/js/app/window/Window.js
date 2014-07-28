define([
    'window/Window.opt',
    'window/WindowManager',
    'window/Window.preferences',
    // 'window/Window.presentation',
    'window/Window.dragdrop',
    'file/File',
    'file/Recents'
], function(Options, WindowMgr, /*Help,*/ Preferences, /*Presentation,*/ DragDrop, File, Recents) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

  var fs = require('fs'),
      path = require('path');
  
  var pathDocs = getDocsPath();

  window.ee.on('tmp.file.open', function(file) {
    WindowMgr.open(file);
  });
  
  window.ee.on('drop.file.open', function(file) {
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

    global._gaq.push('haroopad.file', 'open', 'recents item');
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

  window.ee.on('menu.file.exports.clipboard.plain', function() {
    WindowMgr.actived.window.ee.emit('menu.file.exports.clipboard.plain');
  });

  window.ee.on('menu.file.exports.clipboard.styled', function() {
    WindowMgr.actived.window.ee.emit('menu.file.exports.clipboard.styled');
  });

  // window.ee.on('menu.file.exports.clipboard.haroopad', function() {
  //   WindowMgr.actived.window.ee.emit('menu.file.exports.clipboard.haroopad');
  // });

  window.ee.on('menu.file.exports.html', function() {
    WindowMgr.actived.window.ee.emit('file.exports.html');
  });

  window.ee.on('menu.file.send.email', function() {
    WindowMgr.actived.window.ee.emit('menu.file.send.email');
  });
  
  window.ee.on('menu.print.editor', function() {
    WindowMgr.actived.window.ee.emit('print.editor');
  });

  window.ee.on('menu.print.viewer', function() {
    WindowMgr.actived.window.ee.emit('print.viewer');
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

  window.ee.on('menu.view.toggle.vim', function() {
    WindowMgr.actived.window.ee.emit('menu.view.toggle.vim');
  });

  window.ee.on('menu.view.toggle.toc', function() {
    WindowMgr.actived.window.ee.emit('menu.view.toggle.toc');
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

  window.ee.on('menu.view.editor.font.size', function(value) {
    WindowMgr.actived.window.ee.emit('menu.view.editor.font.size', value);
  });
  window.ee.on('menu.view.viewer.font.size', function(value) {
    WindowMgr.actived.window.ee.emit('menu.view.viewer.font.size', value);
  });

  window.ee.on('menu.view.fullscreen', function() {
    WindowMgr.actived.window.ee.emit('view.fullscreen');
  });
  

  /**
   * insert menu
   */
  window.ee.on('menu.insert.markdown', function(tag) {
    WindowMgr.actived.window.ee.emit('menu.insert.markdown', tag);
  });
  // window.ee.on('menu.insert.page.break', function() {
  //   WindowMgr.actived.window.ee.emit('insert.page.break');
  // });
  // window.ee.on('menu.insert.section.break', function() {
  //   WindowMgr.actived.window.ee.emit('insert.section.break');
  // });
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
  
  window.ee.on('menu.help.doc', function(doc) {
    var file;

    switch(doc) {
      case 'about':
        file = pathDocs +'/about.md';
      break;
      case 'shortcut':
        file = pathDocs +'/shortcut.md';
      break;
      case 'acknowledgements':
        file = pathDocs +'/../acknowledgements.md';
      break;
    } 

    file = File.open(file);
    file.set('readOnly', true);

    WindowMgr.open(file);
  });
  window.ee.on('menu.help.syntax', function() {
    WindowMgr.actived.window.ee.emit('menu.help.syntax');
  });

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
  window.ee.on('context.copy', function(e) {
    WindowMgr.actived.window.ee.emit('context.copy');
  });
  window.ee.on('context.copy.html', function(e) {
    WindowMgr.actived.window.ee.emit('menu.file.exports.clipboard.plain');
  });

  /* context event */
  window.ee.on('context.editor.theme', function(theme) {
    WindowMgr.actived.window.ee.emit('editor.theme', theme);
  });
  window.ee.on('context.editor.theme.user', function(theme) {
    WindowMgr.actived.window.ee.emit('editor.theme.user', theme);
  });
  window.ee.on('context.viewer.theme', function(theme) {
    WindowMgr.actived.window.ee.emit('viewer.theme', theme);
  });
  window.ee.on('context.viewer.theme.code', function(theme) {
    WindowMgr.actived.window.ee.emit('viewer.theme.code', theme);
  });
  window.ee.on('context.viewer.theme.user', function(theme) {
    WindowMgr.actived.window.ee.emit('viewer.theme.user', theme);
  });
  window.ee.on('context.viewer.export', function(format) {
    WindowMgr.actived.window.ee.emit('file.exports.html');
  });
  window.ee.on('context.viewer.publish', function(service) {
    WindowMgr.actived.window.ee.emit('menu.file.send.email');
  });


  /* process event */
  window.ee.on('update.haroopad', function(currVersion, newVersion) {
    WindowMgr.actived.window.ee.emit('update.haroopad', currVersion, newVersion);
  });
  window.ee.on('up.to.date.haroopad', function(currVersion) {
    WindowMgr.actived.window.ee.emit('up.to.date.haroopad', currVersion);
  });
  window.ee.on('up.to.date.news', function(contents) {
    WindowMgr.actived.window.ee.emit('up.to.date.news', contents);
  });

  keymage(__key('new-window'), function() {
    WindowMgr.open();
  });

  keymage(__key('exit'), function() {
    gui.App.quit();
  });

  keymage(__key('show-preference'), function() {
    Preferences.show();
  });

});