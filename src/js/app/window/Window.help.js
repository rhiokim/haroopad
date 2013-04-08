define(function() {
	var gui = require('nw.gui'),
			win = gui.Window.get();
	var shell = gui.Shell;

	win.on('help', function() {});
	
	win.on('help.markdown', function() {});

	win.on('help.release', function() {
		shell.openExternal('http://pad.haroopress.com/release');
	});

	win.on('help.acknowledgements', function() {
  		gui.Window.open('pad.html', {
			width: 350,
			height: 500,
			toolbar: false,
			show: false
		});
	});

	win.on('help.site', function() {
		shell.openExternal('http://pad.haroopress.com/');
	});

	win.on('help.feedback', function() {
		shell.openExternal('http://pad.haroopress.com/feedback');
	});
});