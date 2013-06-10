define([
		'window/Window.opt'
	],
	function(options) {
	var gui = require('nw.gui'),
			win = gui.Window.get();
	var shell = gui.Shell;

	var helpWin;

	function closeHandler() {
    // helpWin.hide();

    // if (helpWin != null)
    //   helpWin.close(true);

    // helpWin.close(true);
	}

	win.on('help', function() {
		// if(helpWin) {
		// 	//TODO: focus
		// 	return;
		// }

		// options.set({
		// 	x: win.x + 20,
		// 	y: win.y + 20
		// });
		
		// helpWin = gui.Window.open('pad.html?file=About.md', {
  //   				width: win.width,
  //   				height: win.height,
		// 			  toolbar: true,
		// 			  show: false
		// 			});

		// helpWin.on('close', closeHandler);
		// helpWin.on('closed', function() {
	 //    helpWin = null;
	 //  });
	 //  
		shell.openExternal('http://pad.haroopress.com/page.html');
	});
	
	win.on('help.markdown', function() {
		shell.openExternal('http://pad.haroopress.com/page.html#syntax');
	});

	win.on('help.release', function() {
		shell.openExternal('http://pad.haroopress.com/page.html#release-notes');
	});

	win.on('help.acknowledgements', function() {
		shell.openExternal('http://pad.haroopress.com/page.html#acknowledgements');
		// gui.Window.open('pad.html', {
		// 	width: 350,
		// 	height: 500,
		// 	toolbar: false,
		// 	show: false
		// });
	});

	win.on('help.site', function() {
		shell.openExternal('http://pad.haroopress.com/');
	});

	win.on('help.feedback', function() {
		shell.openExternal('https://github.com/rhiokim/haroopad/issues');
	});
});