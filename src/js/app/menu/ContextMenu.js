define([
		'keyboard'
	], function(HotKey) {

		var gui = require('nw.gui');
		var menu = new gui.Menu();

		// Add some items
		menu.append(new gui.MenuItem({ label: 'Cut' }));
		menu.append(new gui.MenuItem({ label: 'Copy' }));
		menu.append(new gui.MenuItem({ label: 'Paste' }));
		menu.append(new gui.MenuItem({ type: 'separator' }));
		menu.append(new gui.MenuItem({ label: 'Search with Google' }));
		menu.append(new gui.MenuItem({ type: 'separator' }));
		menu.append(new gui.MenuItem({ label: 'Preferences' }));

		$(window).mousedown(function(e, ev) { 
			var x, y;
			e.preventDefault();

			e = (ev) ? ev : e;
			x = (ev) ? $('#editor').width() + e.pageX : e.pageX;

			if (e.which === 3) {
				menu.popup(x, e.pageY);
				return false;
	    }

		});
});