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

	  Opt.bind('change', function() {
	  	console.log(arguments)
	  });

	  HotKey('defmod-o', OpenDialog.show.bind(OpenDialog));

	  //open dialog fire change event
	  OpenDialog.on('file.open', function(file) {
	  	var x = win.x,
	  		y = win.y;

		gui.Window.open('pad.html?file='+ file +'&x='+ x +'&y='+ y, {
			width: win.width,
			height: win.height,
			  toolbar: false,
			  show: true
			});
	  });	

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