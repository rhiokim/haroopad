define([
		'exports'
], function(exports) {

	var gui = require('nw.gui');

	var windows = {},
		openning = false,
		realCount = 0,
		shadowCount = 0,
		gapX = 0,
		gapY = 0;

	var config = store.get('Window') || {};
	var top = config.y,
		left = config.x;

	function merge(obj) {
		var i = 1,
			target, key;

		for (; i < arguments.length; i++) {
			target = arguments[i];
			for (key in target) {
				if (Object.prototype.hasOwnProperty.call(target, key)) {
					obj[key] = target[key];
				}
			}
		}

		return obj;
	}

	function _updateStore() {
		config = store.get('Window') || {};
	}

	function getWindowByFile(file) {
		for (var prop in windows) {
			if (windows[prop]._params.file == file) {
				return windows[prop];
			}
		}

		return;
	}

	function _add(newWin) {
		exports.actived = windows[newWin._params.created_at] = newWin;

		// console.log()
		realCount++;

		newWin.on('closed', function() {
			for (var prop in windows) {
				if (prop == newWin._params.created_at) {
					windows[prop] = null;
					delete windows[prop];
					realCount--;

					if (!realCount) {
						window.ee.emit('exit');
					}
					return;
				}
			}
		});

		//window instance delivery to child window
		newWin.once('loaded', function() {
			_updateStore();

			newWin.resizeTo(config.width, config.height);

			shadowCount++;

			//윈도우 오픈 시 position 파라미터가 존재하면 위치 지정은 패스한다.
			if (newWin._params.position) {
				return;
			}

			if (config.height + top > window.screen.height) {
				top = 0;
			}

			if (config.width + left > window.screen.width) {
				left = 0;
			}

			left = left + 20;
			top = top + 20;

			newWin.moveTo(left, top);
			newWin.focus();
		});
	}

	process.on('actived', function(child) {
		exports.actived = child;

		openning = false;
	});

	exports.open = function(file, options) {
		var existWin, newWin;

		options = typeof file === 'object' ? file : options || {};
		file = typeof file === 'string' ? file : undefined;

		//이미 열려 있는 파일 일 경우
		if (file && (existWin = getWindowByFile(file))) {
			existWin.focus();
			return;
		}

		if (openning && !file) {
			return;
		}

		openning = true;

		newWin = gui.Window.open('pad.html', merge({
			"min_width": 500,
			"min_height": 250,
			"toolbar": false,
			"show": false
		}, options));
		newWin.parent = window;

		newWin._params = merge(options, {
			file: file,
			created_at: new Date().getTime()
		});

		_add(newWin);

		return newWin;
	}

});