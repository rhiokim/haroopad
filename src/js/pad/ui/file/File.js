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

			window.ee.on('menu.file.save.as', function() {
				var extname = nw.file.get('extname');
				var basename = nw.file.get('basename');
				var fileName = basename.replace(extname, ' copy'+ extname);
				
				SaveDialog.show(nw.file.get('dirname'), fileName);
			});
		}

		/* new file save */
		SaveDialog.on('file.save', function(fileEntry) {
			nw.file.save(fileEntry);
			// nw.emit('file.save', file);
		});
	});