define([
	'exports',
	'file/File',
	'file/Recents'
], function(exports, File, Recents) {

	var gui = global.gui;//require('nw.gui');
	var win = gui.Window.get();
	var closeAll = false;

	var windows = {},
		openning = false,
		realCount = 0;

	var config = store.get('Window') || {};
	var generalOpt = store.get('General');
	var top = config.y,
		left = config.x;

	//fixed for cmd-q app quit issue
	gui.App.manifest.window.width = config.width;
	gui.App.manifest.window.height = config.height;
	gui.App.manifest.window.frame = true;
	// gui.App.manifest.window.show = true;

	win.x = 0;
	win.y = 0;
	
	if (process.platform === 'darwin') {
		win.show();

		//CMD+Q app terminate in the hidden window.
	  var shortcut = new gui.Shortcut({
	    key : "Ctrl+Q",
	    active : function() {
	      window.ee.emit('closeAll');
	    }
	  });

	  window.ee.on('focus', function() {
		  gui.App.registerGlobalHotKey(shortcut);
		});

	  window.ee.on('blur', function() {
		  gui.App.unregisterGlobalHotKey(shortcut);
		});
	}

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

	function getLength() {
		return realCount;
	}

	function closeAll() {
		// gui.App.closeAllWindows();
		for (var prop in windows) {
			windows[prop].emit('close');
		}
	}

	function _add(newWin) {
		exports.actived = windows[newWin.created_at] = newWin;

		realCount++;

		newWin.on('closed', function() {

			for (var prop in windows) {
				if (prop == this.created_at) {
					windows[prop] = null;
					delete windows[prop];
					realCount--;

					// if (!realCount/* && getPlatformName() != 'mac'*/) {
					// 	config = store.get('Window');
					// 	window.ee.emit('exit');
					// }
					if (!realCount) {
						if (process.platform !== 'darwin' || closeAll) {
							window.ee.emit('exit');
						} else if (closeAll) {
							window.ee.emit('exit');
						}
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

			top = top < 20 ? 40 : top;
			left = left < 20 ? 40 : left;

			if (config.height + top > window.screen.height) {
				top = 40;
			}

			if (config.width + left > window.screen.width) {
				left = 40;
			}

			if (realCount > 1) {
				left = left + 20;
				top = top + 20;
			}

			this.moveTo(left, top);
		});
	}

	function open(file, args) {
		var fileEntry, newWin, existWin;

		if (openning && !file) {
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

		//if already exist empty window
		if (file && exports.actived && exports.actived.file && !exports.actived.file.get('fileEntry')) {
			if (exports.actived.file.get('created_at').getTime() == exports.actived.file.get('updated_at').getTime()) {
				exports.actived.file.set(file.toJSON());
				exports.actived.file.doc.set(file.doc.toJSON());
				// exports.actived.file._tmpFile = file._tmpFile;
				exports.actived.emit('file.opened', file);
				file.close();
				return;
			}
		}

		newWin = gui.Window.open('pad.html', gui.App.manifest.window);
		newWin.parent = window;
		newWin.file = file || File.open();
		newWin.created_at = new Date().getTime();
		newWin._args = args || {};

		_add(newWin);

		return newWin;
	}

	window.ee.on('actived', function(child) {
		exports.actived = window.activedWindow = child;

		child.show(); //#346

		openning = false;
	});

	window.ee.on('closeAll', function() {
		gui.App.closeAllWindows();
	});

	gui.App.on('reopen', function() {
		if (realCount < 1) {
			// alert('reopen');			
			open();
		}
	});

	//When quit app using Command+Q short, prevent close major window first.
	win.on('close', function() {
		closeAll = true;

		if (!realCount) {
			window.ee.emit('exit');
		}
	});

	exports.open = open;

	exports.length = getLength;

});