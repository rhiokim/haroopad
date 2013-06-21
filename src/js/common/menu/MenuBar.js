function MenuBar() {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var menu = MenuBar._systemMenu;

	function create() {
		menu = new gui.Menu({
		    type:   'menubar'
		});

		menu.append( MenuBar.file() );
		menu.append( MenuBar.view() );
		menu.append( MenuBar.action() );
		menu.append( MenuBar.help() );

		win.menu = MenuBar._systemMenu = menu;
	}

	create();
}