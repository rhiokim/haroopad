define([
	  'keyboard',
	  'ui/file/File.opt',
	  'ui/file/Open',
	  'ui/file/Save'
	], 

	function(HotKey, Opt, OpenDialog, SaveDialog) {
	  var fs = require('fs'),
	  	  path = require('path');

	  var gui = require('nw.gui');
	  	  win = gui.Window.get();

	  function open(file) {
	  	var markdown = fs.readFileSync(file, 'utf8');
	  	win.emit('file.is.opened', markdown);
	  }

	  HotKey('defmod-o', OpenDialog.show.bind(OpenDialog));

	  //open dialog fire change event
	  OpenDialog.on('file.open', function(file) {
	  	Opt.set({
	  	  'fileEntry': file,
	  	  'extname': path.extname(file),
	  	  'basename': path.basename(file)
	  	});

	  	open(file);
	  });	
});