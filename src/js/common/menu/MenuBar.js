window.MenuBar = function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var menu = MenuBar._systemMenu;
	var platform = process.platform;

	function create() {
		menu = new gui.Menu({
		    type:   'menubar'
		});
		
	  menu.createMacBuiltin(global.Manifest.name, {
	    // hideWindow: true
	  });

		// if (platform != 'darwin') {
		// 	menu.append( MenuBarFile() );
		// 	menu.append( MenuBarEdit() );
		// }

		win.menu = MenuBar._systemMenu = menu;

		win.menu.insert( MenuBarFile(), 1 );
		win.menu.insert( MenuBarFind(), 3 );
		win.menu.insert( MenuBarInsert(), 4 );
		win.menu.insert( MenuBarView(), 5 );
		// menu.append( MenuBarTools() );
		// menu.append( MenuBarShare() );
		
		win.menu.append( MenuBarHelp() );
	}

	create();
};