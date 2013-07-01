define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var prefWin;

	function init() {
		prefWin = gui.Window.open('preferences.html', {
	        toolbar: true,
	        show: true,
	        width: 510,
	        height: 300,
	        resizable: false,
	        position: 'center',
	        fullscreen: false
	      });

		prefWin.on('close', function() {
			prefWin.hide();
		});

		prefWin.on('loaded', function() {
			// prefWin.window.haveParent(window);
			prefWin.window.parent = window;
		});
	}

	return {
		show: function() {
			if (prefWin) {
				prefWin.show();
			} else { 
				init();
			}
		},

		hide: function() {
			prefWin.hide();
		}
	}
});