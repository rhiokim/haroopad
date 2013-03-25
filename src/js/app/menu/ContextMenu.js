define([
		'keyboard'
	], function(HotKey) {

		var gui = require('nw.gui');
		var menu = new gui.Menu();

		// Add some items
		menu.append(new gui.MenuItem({ label: 'Save' }));
		menu.append(new gui.MenuItem({ label: 'Item B' }));
		menu.append(new gui.MenuItem({ type: 'separator' }));
		menu.append(new gui.MenuItem({ label: 'Item C' }));
		menu.append(new gui.MenuItem({ type: 'separator' }));
		menu.append(new gui.MenuItem({ label: 'Preferences' }));

		$(document.body).bind('contextmenu', function(ev) { 
			ev.preventDefault();

			menu.popup(ev.pageX, ev.pageY);
			return false;
		});
});