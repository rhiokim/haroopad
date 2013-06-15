define([
		'ui/file/File.opt',
		'ui/file/Open',
		'ui/file/Save',
		'editor/Editor'
],

function(Opt, OpenDialog, SaveDialog, Editor) {
	var fs = require('fs'),
		path = require('path');

	var gui = require('nw.gui');
	win = gui.Window.get();

	function _update(file) {
		Opt.set({
			'fileEntry': file,
			'extname': path.extname(file) || '.md',
			'dirname': path.dirname(file),
			'basename': path.basename(file),
			'updated_at': new Date
		});
	}

	function _open(file) {
		var markdown;
		
		markdown = fs.readFileSync(file, 'utf8');
		
		_update(file);

		Opt.set({ markdown: markdown });

		win.emit('file.opened', Opt.toJSON(), markdown);
	}

	function _save(file) {
		var markdown = Editor.getValue();

		if (!path.extname(file)) {
			file += '.md';
		}

		_update(file);

		Opt.set({ markdown: markdown });

		fs.writeFileSync(file, markdown, 'utf8');

		win.emit('file.saved', Opt.toJSON());
	}


	Opt.bind('change', function() {
		// console.log(arguments)
	});

	win.on('file.open', OpenDialog.show.bind(OpenDialog));

	//open dialog fire change event
	OpenDialog.on('file.open', function(file) {
		window.parent.win.emit('file.open', file);
	});

	win.on('file.save', function() {
		var file = Opt.get('fileEntry');
		if (!file) {
			SaveDialog.show();
		} else {
			_save(file);
		}
	});

	win.on('file.save.as', SaveDialog.show.bind(SaveDialog));

	SaveDialog.on('file.save', _save);

	return {
		open: function(file) {
			_open(file);
		},

		save: function(file) {

		}
	}
});