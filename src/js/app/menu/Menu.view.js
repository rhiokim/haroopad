define(function() {

	var gui = require('nw.gui');
	var View = new gui.Menu();

	View.append(
	    new gui.MenuItem({
	        label: 'Test Menu Item'
	    })
	);

	return new gui.MenuItem({ label: 'View', submenu: View });
});