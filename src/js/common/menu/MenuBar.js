function MenuBar() {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var menu = MenuBar._systemMenu;

	if (!menu || process.platform != 'darwin') {
		menu = new gui.Menu({
		    type:   'menubar'
		});

		menu.append( MenuBar.file() );
		menu.append( MenuBar.view() );
		menu.append( MenuBar.action() );
		menu.append( MenuBar.help() );

		win.menu = MenuBar._systemMenu = menu;
	}
}