define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var presentWin;
	var themes = {
		'impress-default': './views/impress/index.html'
	}

	function open(view) {
		presentWin = gui.Window.open(view, {
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
			presentWin.window.parent = window;
		});
	}

	function close() {
		if (presentWin) presentWin.close(true);
	}

	window.ee.on('change.markdown', function(md) {
		if (presentWin) {
			presentWin.emit('update', md);
		}
	});

	return {
		show: function(theme) {
			var view = themes[theme] || themes['impress-default'];

			close();
			open(view);
		}
	}
});