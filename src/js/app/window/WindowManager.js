define([
		'exports',
		'store'
	],
	function(exports, store) {

	var gui = require('nw.gui');
			win = gui.Window.get();

	var windows = {},
			realCount = 0,
			shadowCount = 0,
			gapX = 0, gapY = 0;

	var config;

	function _updateStore() {
		config = store.get('Window') || {};
	}

	function _add(newWin) {
		newWin.created_at = new Date().getTime();
		exports.actived = windows[newWin.created_at] = newWin;

		realCount++;

		newWin.on('closed', function() {
			for(var prop in windows) {
				if (prop == newWin.created_at) {
					windows[prop] = null;
					delete windows[prop];
					realCount--;

					if (!realCount) {
						win.emit('exit');
					}
					return;
				}
			}

		});

		//window instance delivery to child window
		newWin.on('loaded', function() {
			_updateStore();

			newWin.window.haveParent(window);

    	var x = config.x + gapX + 20 * shadowCount,
      		y = config.y + gapY + 20 * shadowCount;

      if (config.height + y > window.screen.height) {
      	shadowCount = 0;
      	// config.x = 0;
      	gapX += 20;
      	config.y = 0;
      }

      if (config.width + x > window.screen.width) {
      	shadowCount = 1;
      	// config.y = 0;
      	gapY += 20;
      	config.x = 0;
      }
  
  		newWin.moveTo(x, y);
			newWin.resizeTo(config.width, config.height);

			shadowCount++;
	    // newWin.show();
	    // newWin.focus();
	    // newWin.window.focus();
		});
	}

	win.on('actived', function(child) {
		child.show();
		exports.actived = child;
	})

	exports.open = function(file) {
    var newWin,
    	file = file ? '&file='+ file : '';

		newWin = gui.Window.open('pad.html#'+ file, {
		    "min_width": 300,
		    "min_height": 200,
		    "max_width": 1920,
		    "max_height": 1080,
        "toolbar": false,
        "show": false
      });

		_add(newWin);

		return newWin;
	}

});