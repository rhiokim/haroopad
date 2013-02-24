define([
		'window/Window.opt'
	], 
	function(option) {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var config = option.toJSON();

		win.on('closed', function() {
			win = null;
		});

		win.on('close', function() {
			this.hide();
			option.save();
			this.close(true);
		});

		win.resizeTo(config.width, config.height);
		win.moveTo(config.x, config.y);
		
		win.show();

});