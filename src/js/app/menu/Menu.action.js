define(function() {

	var gui = require('nw.gui');
	var Action = new gui.Menu();

	Action.append(
	    new gui.MenuItem({
	        label: 'Test Menu Item'
	    })
	);

	return new gui.MenuItem({ label: 'Action', submenu: Action });
});