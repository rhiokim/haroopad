define(function() {
	var gui = require('nw.gui'),
			win = gui.Window.get();
	var shell = gui.Shell;

	win.on('help', function() {});
	win.on('help.markdown', function() {});
	win.on('help.release', function() {});
	win.on('help.acknowledgements', function() {});
	win.on('help.site', function() {});
	win.on('help.feedback', function() {});
});