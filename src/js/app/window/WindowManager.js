define([
	'exports',
	'file/File',
	'file/Recents'
], function(exports, File, Recents) {

	var gui = require('nw.gui');

	var windows = {},
		openning = false,
		realCount = 0;

	var config = store.get('Window') || {};
	var generalOpt = store.get('General');
	var top = config.y,
		left = config.x;

	function _updateStore() {
		config = store.get('Window') || {};
	}

	function getWindowByFile(name) {
		for (var prop in windows) {
			if (windows[prop].file.get('fileEntry') == name) {
				return windows[prop];
			}
		}

		return;
	}

	function closeAll() {
		for (var prop in windows) {
			windows[prop].close();
		}
	}

	function _add(newWin) {
		exports.actived = windows[newWin.created_at] = newWin;

		realCount++;

		newWin.on('closed', function() {
			this.file.close();
			
			for (var prop in windows) {
				if (prop == this.created_at) {
					windows[prop] = null;
					delete windows[prop];
					realCount--;

					if (!realCount/* && getPlatformName() != 'mac'*/) {
						config = store.get('Window');
						window.ee.emit('exit');
					}
					return;
				}
			}
		});

		/* open file */
		newWin.on('file.open', function(fileEntry) {
			var file = File.open(fileEntry);

			open(file);
			Recents.add(fileEntry);
		});

		newWin.on('file.saved', function(file) {
			Recents.add(file.fileEntry);
		});

		//window instance delivery to child window
		newWin.once('loaded', function() {
			_updateStore();

			/* initial exec */
			if (!top && !left) {
				this.setPosition('center');
				top = this.x;
				left = this.y;

				return;
			}

			top = top < 20 ? 20 : top;
			left = left < 20 ? 20 : left;

			if (config.height + top > window.screen.height) {
				top = 20;
			}

			if (config.width + left > window.screen.width) {
				left = 20;
			}

			if (realCount > 1) {
				left = left + 20;
				top = top + 20;
			}

			this.moveTo(left, top);
		});
	}

	function open(file) {
		var fileEntry, newWin, existWin;

		if (openning) {
			return;
		}

		openning = true;

		file = (typeof file === 'string') ? File.open(file) : file;
		fileEntry = file && file.get('fileEntry');

		//이미 열려 있는 파일 일 경우
		existWin = getWindowByFile(fileEntry);

		if (fileEntry && existWin) {
			existWin.focus();
			return;
		}

		//비어있는 윈도우만 있는 경우
		if (file && exports.actived && exports.actived.file && !exports.actived.file.get('fileEntry')) {
			if (exports.actived.file.get('created_at').getTime() == exports.actived.file.get('updated_at').getTime()) {
				exports.actived.file.set(file.toJSON());
				exports.actived.file.doc.set(file.doc.toJSON());
				exports.actived.file._tmpFile = file._tmpFile;
				exports.actived.emit('file.opened', file);
				return;
			}
		}

		newWin = gui.Window.open('pad.html', gui.App.manifest.window);
		newWin.parent = window;
		newWin.file = file || File.open();
		newWin.created_at = new Date().getTime();
		
		_add(newWin);

		return newWin;
	}

	process.on('actived', function(child) {
		exports.actived = child;

		openning = false;
	});

	window.ee.on('closeAll', closeAll);

	exports.open = open;

});