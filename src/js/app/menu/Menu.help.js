define(function() {

	var gui = require('nw.gui');
	var Help = new gui.Menu();

	Help.append(
	    new gui.MenuItem({
	        label: 'Haroopad Help'
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Markdown Syntax Help'
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: 'Release Notes'
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Acknowledgements'
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: 'Haroopad Website'
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Send Feedback'
	    })
	);

	return new gui.MenuItem({ label: 'Help', submenu: Help });
});