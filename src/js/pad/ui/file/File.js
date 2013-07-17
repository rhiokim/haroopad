define([
		'ui/file/File.opt',
		'ui/file/File.tmp',
		'ui/file/Open',
		'ui/file/Save'
],

function(Opt, Temporary, OpenDialog, SaveDialog) {
	var fs = require('fs'),
		path = require('path');

	var gui = require('nw.gui'),
			win = gui.Window.get();

	function getWorkingDir() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	function _update(file) {
		Opt.set({
			'fileEntry': file,
			'extname': path.extname(file) || '.md',
			'dirname': path.dirname(file),
			'basename': path.basename(file),
			'updated_at': new Date
		});
	}

  function checkChange() {
    var path = model.get('fileEntry');
    var mtime;

    if (path) {
      fs.stat(path, function(err, stats) {
        mtime = model.get('mtime');

        if(!mtime) {
          model.set(stats);
          return;
        }

        if (mtime.getTime() != stats.mtime.getTime()) {
          model.set(stats);
          window.ee.emit('file.update', model.get('fileEntry'));
        }
      });
    }
  }

	function _open(file) {
		var markdown;
		
		markdown = fs.readFileSync(file, 'utf8');

		Opt.set({ markdown: markdown });

		window.ee.emit('file.opened', Opt.toJSON(), markdown);
	}

	function _save(file) {
		if (!path.extname(file)) {
			file += '.md';
		}

		_update(file);

		window.parent.ee.emit('file.save', Opt.get('fileEntry'), Opt.get('markdown'), function(err) { 
			window.ee.emit('file.saved', Opt.toJSON());
		});
	}

	Opt.bind('change', function() {
		// console.log(arguments)
	});

	//open dialog fire change event
	OpenDialog.on('file.open', function(file) {
		window.parent.ee.emit('file.open', file);
	});

	SaveDialog.on('file.save', _save);

	/***************************
	 * node-webkit window event
	 ***************************/
	// win.on('file.open', OpenDialog.show.bind(OpenDialog));
	window.ee.on('file.open', OpenDialog.show.bind(OpenDialog));
	
	if (!win._params.readOnly) {
		window.ee.on('file.save', function() {
			var file = Opt.get('fileEntry');
			if (!file) {
				SaveDialog.show(getWorkingDir());
			} else {
				_save(file);
			}
		});

		window.ee.on('file.save.as', SaveDialog.show.bind(SaveDialog));
	}

	window.ee.on('change.before.markdown', function(markdown) {
		Opt.set('markdown', markdown);
		Temporary.update();
	});

  win.on('focus', checkChange);

	return {
		open: function(file) {
			_update(file);
			_open(file);
		},

		openTmp: function(file, uid) {
			//지정된 파일이 있는 경우
			if (file.indexOf(uid) < 0) {
				_update(file);
			}
				
			_open(file);

			Temporary.sync(file, uid);	
		},

		startAutoSave: function() {
			Temporary.create();
		}
	}
});