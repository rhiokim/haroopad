define([
		'exports'
	],
	function(exports) {

	var gui = require('nw.gui');

	var windows = {},
			openning = false,
			realCount = 0,
			shadowCount = 0,
			gapX = 0, gapY = 0;

	var config = store.get('Window') || {};
	var top = config.y, left = config.x;

	function _updateStore() {
		config = store.get('Window') || {};
	}

	function _add(newWin) {
		newWin.created_at = new Date().getTime();
		exports.actived = windows[newWin.created_at] = newWin;

		// console.log()
		realCount++;

		newWin.on('closed', function() {
			for(var prop in windows) {
				if (prop == newWin.created_at) {
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

			// newWin.window.haveParent(window);
			newWin.window.parent = window;

      if (config.height + top > window.screen.height) {
      	top = 0;
      }

      if (config.width + left > window.screen.width) {
      	left = 0;
      }

    	left = left + 20;
      top = top + 20;
  
  		newWin.moveTo(left, top);
			newWin.resizeTo(config.width, config.height);

			shadowCount++;
		});
	}

	process.on('actived', function(child) {
		exports.actived = child;

    openning = false;
	})

	exports.open = function(file) {
    var newWin,
    	file = file ? '&file='+ file : '';

    if (openning) {
    	return;
    }

    openning = true;

		newWin = gui.Window.open('pad.html#'+ file, {
		    "min_width": 500,
		    "min_height": 400,
		    "max_width": 1920,
		    "max_height": 1080,
        "toolbar": false,
        "show": false,
        "readonly": true
      });

		_add(newWin);

		return newWin;
	}

});