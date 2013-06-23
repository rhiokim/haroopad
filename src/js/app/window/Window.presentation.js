define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var presentWin;

	function open(file) {
		presentWin = gui.Window.open('./views/impress/index.html#file='+ file, {
	        toolbar: false,
	        show: true,
	        width: 800,
	        height: 600,
	        position: 'center'
	      });

		presentWin.on('close', function() {
			presentWin.close(true);
		});

		presentWin.on('closed', function() {
			presentWin = null;
		});

		presentWin.on('loaded', function() {
			// prefWin.window.haveParent(window);
		});
	}

	return {
		show: function(file) {
			open(file);
		}
	}
});