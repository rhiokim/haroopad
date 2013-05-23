define([],
	function() {

	var gui = require('nw.gui'),
      win = gui.Window.get();
	var Help = new gui.Menu();

	Help.append(
	    new gui.MenuItem({
	        label: 'Haroopad Help',
		      click: function() {
		        win.emit('help');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Markdown Syntax Help',
		      click: function() {
		        win.emit('help.markdown');
		      }
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: 'Release Notes',
		      click: function() {
		        win.emit('help.release');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Acknowledgements',
		      click: function() {
		        win.emit('help.acknowledgements');
		      }
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: 'Haroopad Website',
		      click: function() {
		        win.emit('help.site');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: 'Bug Report',
		      click: function() {
		        win.emit('help.feedback');
		      }
	    })
	);

	return new gui.MenuItem({ label: 'Help', submenu: Help });
});