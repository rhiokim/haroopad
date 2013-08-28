define([
		'window/WindowManager'
	], function(WindowMgr) {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var prefWin;

	function init() {
		prefWin = gui.Window.open('preferences.html', {
	        toolbar: false,
	        show: true,
	        width: 510,
	        height: 300,
	        resizable: false,
	        position: 'center',
	        fullscreen: false
	      });
		prefWin.parent = window;

		prefWin.on('close', function() {
			prefWin.hide();
			WindowMgr.actived.focus();
		});

		prefWin.on('loaded', function() {
			prefWin.focus();
			prefWin.window.focus();
		});

		// prefWin.on('loaded', function() {
		// });
	}

	return {
		show: function() {
			if (prefWin) {
				prefWin.show();
				prefWin.focus();
			} else { 
				init();
			}
		},

		hide: function() {
			prefWin.hide();
		}
	}
});