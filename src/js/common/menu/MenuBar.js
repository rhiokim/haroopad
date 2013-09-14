window.MenuBar = function() {
	var gui = require('nw.gui'),
		win = gui.Window.get();

	var menu = MenuBar._systemMenu;
	var platform = process.platform;

	function create() {
		menu = new gui.Menu({
		    type:   'menubar'
		});
		
		// if (platform != 'darwin') {
			menu.append( MenuBarFile() );
		// }
		menu.append( MenuBarEdit() );
		menu.append( MenuBarInsert() );
		menu.append( MenuBarFind() );
		menu.append( MenuBarView() );
		// menu.append( MenuBarTools() );
		
		if (platform != 'darwin') {
			menu.append( MenuBarHelp() );
		}

		win.menu = MenuBar._systemMenu = menu;

		if (platform == 'darwin') {
			// win.menu.insert( MenuBarFile(), 1 );
			win.menu.append( MenuBarHelp() );
		}
	}

	create();
};