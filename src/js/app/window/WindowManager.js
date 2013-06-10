define([
		'exports'
	],
	function(exports) {

	var gui = require('nw.gui');
			win = gui.Window.get();

	var windows = {};

	exports.open = function(file) {
    var newWin,
    	file = file ? '&file='+ file : ''
    	x = win.x + 20,
      y = win.y + 20;

		newWin = gui.Window.open('pad.html#x=' + x + '&y=' + y + file, {
        width: win.width,
        height: win.height,
        toolbar: true,
        show: true,
      });

		newWin.created_at = new Date().getTime();
		windows[newWin.created_at] = newWin;

		return newWin;
	}

});