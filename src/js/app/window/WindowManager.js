define([
		'exports'
	],
	function(exports) {

	var gui = require('nw.gui');
			win = gui.Window.get();

	var windows = {},
			count = 0;

	exports.actived;

	function _add(newWin) {
		newWin.created_at = new Date().getTime();
		exports.actived = windows[newWin.created_at] = newWin;

		count++;

		newWin.on('closed', function() {
			for(var prop in windows) {
				if (prop == newWin.created_at) {
					windows[prop] = null;
					delete windows[prop];
					count--;

					if (!count) {
						win.emit('exit');
					}
					return;
				}
			}

		});

		//window instance delivery to child window
		newWin.on('loaded', function() {
			newWin.window.haveParent(window);
	    newWin.show();
	    newWin.focus();
	    newWin.window.focus();
		});
	}

	win.on('actived', function(child) {
		exports.actived = child;
	})

	exports.open = function(file) {
    var newWin,
    	file = file ? '&file='+ file : ''
    	x = win.x + 20 * count,
      y = win.y + 20 * count;

		newWin = gui.Window.open('pad.html#x=' + x + '&y=' + y + file, {
        width: win.width,
        height: win.height,
        toolbar: false,
        show: false
      });

		_add(newWin);

		return newWin;
	}

});