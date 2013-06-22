define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var prefWin;

	function init() {
		prefWin = gui.Window.open('preferences.html', {
	        toolbar: false,
	        show: false,
	        width: 500,
	        height: 280,
	        resizable: false,
	        position: 'center',
	        fullscreen: false,
	        'always-on-top': true
	      });

		prefWin.on('close', function() {
			prefWin.hide();
		});

		prefWin.on('loaded', function() {
			prefWin.window.haveParent(window);
	    // newWin.focus();
	    // newWin.window.focus();
		});
	}

	return {
		show: function() {
			if (!prefWin) {
				init();
			}
			
			prefWin.show();
		},

		hide: function() {
			prefWin.hide();
		}
	}
});