define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var presentWin;

	function open() {
		presentWin = gui.Window.open('./views/shower/themes/bright/index.html', {
	        toolbar: true,
	        show: true,
	        width: 800,
	        height: 500,
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
			presentWin.window.parent = window;
		});
	}

	window.ee.on('change.markdown', function(md) {
		if (presentWin) {
			presentWin.emit('update', md);
		}
	});

	return {
		show: function() {
			open();
		}
	}
});