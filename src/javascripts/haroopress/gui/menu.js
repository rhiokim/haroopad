var gui = require('nw.gui'),
		win = gui.Window.get(),
		menu = win.menu;

		menu = new gui.Menu({ type: 'menubar' });

		menu.append(new gui.MenuItem({ label: 'Item A'}));