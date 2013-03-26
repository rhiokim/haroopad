define(function() {

	var gui = require('nw.gui');
	var Help = new gui.Menu();

	Help.append(
	    new gui.MenuItem({
	        label: 'Test Menu Item'
	    })
	);

	return new gui.MenuItem({ label: 'Help', submenu: Help });
});