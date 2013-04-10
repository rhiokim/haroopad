define(function() {
	var gui = require('nw.gui'),
			win = gui.Window.get();
	var shell = gui.Shell;

	var helpWin;

	function closeHandler() {
    helpWin.hide();

    if (helpWin != null)
      helpWin.close(true);

    helpWin.close(true);
	}

	win.on('help', function() {
		helpWin = gui.Window.open('pad.html', {
						x: win.x + 20,
						y: win.y + 20,
    				width: win.width,
    				height: win.height,
					  toolbar: false,
					  show: false
					});

		helpWin.on('close', closeHandler);
		helpWin.on('closed', function() {
	    helpWin = null;
	  });
	});
	
	win.on('help.markdown', function() {
		
	});

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