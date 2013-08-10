define([
		'ui/file/Open',
		'ui/file/Save'
],

function(OpenDialog, SaveDialog) {
	var fs = require('fs'),
		path = require('path');

	function getWorkingDir() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	/* file open */
	window.ee.on('menu.file.open', OpenDialog.show.bind(OpenDialog));

	/* open dialog fire change event */
	OpenDialog.on('file.open', function(file) {
		nw.emit('file.open', file);
	});

	/* exist file save */
	if (!nw.file.get('readOnly')) {
		window.ee.on('menu.file.save', function() {
			var fileEntry = nw.file.get('fileEntry');
			if (!fileEntry) {
				SaveDialog.show(getWorkingDir());
			} else {
				nw.file.save(fileEntry);
			}
		});

		window.ee.on('menu.file.save.as', SaveDialog.show.bind(SaveDialog));
	}

	/* new file save */
	SaveDialog.on('file.save', function(fileEntry) {
		nw.file.save(fileEntry);
		// nw.emit('file.save', file);
	});


	// function _update(file) {
	// 	Opt.set({
	// 		'fileEntry': file,
	// 		'extname': path.extname(file) || '.md',
	// 		'dirname': path.dirname(file),
	// 		'basename': path.basename(file),
	// 		'updated_at': new Date
	// 	});
	// }

  // function checkChange() {
  //   var path = model.get('fileEntry');
  //   var mtime;

  //   if (path) {
  //     fs.stat(path, function(err, stats) {
  //       mtime = model.get('mtime');

  //       if(!mtime) {
  //         model.set(stats);
  //         return;
  //       }

  //       if (mtime.getTime() != stats.mtime.getTime()) {
  //         model.set(stats);
  //         window.ee.emit('file.update', model.get('fileEntry'));
  //       }
  //     });
  //   }
  // }

	// function _open(file) {
	// 	var markdown;
		
	// 	markdown = fs.readFileSync(file, 'utf8');

	// 	Opt.set({ markdown: markdown });

	// 	window.ee.emit('file.opened', Opt.toJSON(), markdown);
	// }

	// function _save(file) {
	// 	if (!path.extname(file)) {
	// 		file += '.md';
	// 	}

	// 	_update(file);

	// 	window.parent.ee.emit('file.save', Opt.get('fileEntry'), Opt.get('markdown'), function(err) { 
	// 		Opt.set(fs.statSync(Opt.get('fileEntry')));
	// 		window.ee.emit('file.saved', Opt.toJSON());
	// 	});
	// }

	/***************************
	 * node-webkit window event
	 ***************************/
	// win.on('file.open', OpenDialog.show.bind(OpenDialog));
	
	// window.ee.on('change.before.markdown', function(markdown) {
		// nw.file.set('markdown', markdown);
		// Temporary.update();
	// });

  	// nw.on('focus', checkChange);

	// return {
		// open: function(file) {
		// 	_update(file);
		// 	_open(file);
		// },

		// openTmp: function(file, uid) {
		// 	//지정된 파일이 있는 경우
		// 	if (file.indexOf(uid) < 0) {
		// 		_update(file);
		// 	}
				
		// 	_open(file);

		// 	Temporary.sync(file, uid);	
		// },

		// startAutoSave: function() {
		// 	Temporary.create();
		// }
	// }
});