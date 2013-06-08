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

	  function _open(file) {
	  	var markdown = fs.readFileSync(file, 'utf8');
	  	win.emit('file.opened', markdown);
	  }

	  function _openWindow(file) {
	  	var x = win.x + 20,
	  		y = win.y + 20;

		gui.Window.open('pad.html?file='+ file +'&x='+ x +'&y='+ y, {
			width: win.width,
			height: win.height,
			  toolbar: false,
			  show: true
			});
	  }

	  Opt.bind('change', function() {
	  	console.log(arguments)
	  });

	  HotKey('defmod-o', OpenDialog.show.bind(OpenDialog));

	  win.on('file.open', OpenDialog.show.bind(OpenDialog));
	  win.on('file.recents', _openWindow);

	  //open dialog fire change event
	  OpenDialog.on('file.open', _openWindow);	

	  return {
	  	open: function(file) {
		  	Opt.set({
		  	  'fileEntry': file,
		  	  'extname': path.extname(file),
		  	  'basename': path.basename(file),
		  	  'updated_at': new Date
		  	});

		  	_open(file);
	  	}
	  }
});