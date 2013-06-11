define([
		'exports'
	],
	function(exports) {

	var gui = require('nw.gui');
			win = gui.Window.get();

	var windows = {},
			count = 0;

	function _add(newWin) {
		newWin.created_at = new Date().getTime();
		windows[newWin.created_at] = newWin;

		count++;

		newWin.on('closed', function() {
			for(var prop in windows) {
				if (prop == newWin.created_at) {
					windows[prop] = null;
					delete windows[prop];
					count--;

					if (!count) {
						win.emit('close.all');
					}
					return;
				}
			}

		});

		newWin.on('loaded', function() {
			newWin.window.haveParent(window);
		});
	}

	exports.open = function(file) {
    var newWin,
    	file = file ? '&file='+ file : ''
    	x = win.x + 20,
      y = win.y + 20;

		newWin = gui.Window.open('pad.html#x=' + x + '&y=' + y + file, {
        width: win.width,
        height: win.height,
        toolbar: true
      });

		_add(newWin);

		return newWin;
	}

});