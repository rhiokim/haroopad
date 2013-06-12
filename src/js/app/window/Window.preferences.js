define([], function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var prefWin;

	prefWin = gui.Window.open('preferences.html', {
        toolbar: true,
        show: false,
        position: 'center',
        width: 700,
        height: 400,
        resizable: false,
        'always-on-top': true
      });

	prefWin.on('close', function() {
		prefWin.hide();
	});

	prefWin.on('loaded', function() {
	});

	return {
		show: function() {
			prefWin.show();
		},

		hide: function() {
			prefWin.hide();
		}
	}
});