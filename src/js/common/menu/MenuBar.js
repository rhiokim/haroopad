function MenuBar() {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var menu = MenuBar._systemMenu;

	function create() {
		menu = new gui.Menu({
		    type:   'menubar'
		});

		menu.append( MenuBarFile() );
		menu.append( MenuBarView() );
		menu.append( MenuBarAction() );
		menu.append( MenuBarHelp() );

		win.menu = MenuBar._systemMenu = menu;
	}

	create();
}