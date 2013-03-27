define(function() {

	var gui = require('nw.gui');
	var View = new gui.Menu();

	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Live Preview'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Line Number'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Word Count'
	    })
	);
	View.append(
	    new gui.MenuItem({
          type: 'separator'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Live Viewer width +5%'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Live Viewer width -5%'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Reset width'
	    })
	);

	return new gui.MenuItem({ label: 'View', submenu: View });
});