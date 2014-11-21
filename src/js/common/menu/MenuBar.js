window.MenuBar = function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var menu = MenuBar._systemMenu;
	var platform = process.platform;

	function create() {
		menu = new gui.Menu({
		    type:   'menubar'
		});
		
		if (process.platform == 'darwin') {
		  menu.createMacBuiltin(global.Manifest.name, {
		    // hideWindow: true
		  });
	  }

		if (process.platform !== 'win32') {
			menu.insert( MenuBarFile(), 1 );
			menu.insert( MenuBarFind(), 3 );
			menu.insert( MenuBarInsert(), 4 );
			menu.insert( MenuBarView(), 5 );
		} else {
			menu.append(MenuBarFile())
			menu.append(MenuBarFind())
			menu.append(MenuBarInsert())
			menu.append(MenuBarView())
		}
		
		menu.append( MenuBarHelp() );
		
		win.menu = MenuBar._systemMenu = menu;
	}

	create();
};