MenuBarTools = function () {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var Tools = new gui.Menu();	

	function menuItem(options) {
    Tools.append( new gui.MenuItem(options) );
  }

  function sepItem() {
    Tools.append( new gui.MenuItem({
      type: 'separator'
    }));
  }

  menuItem({
            label: 'Send to...',
            submenu: MenuBarToolsSend()
        });
  menuItem({
            label: 'Post to...',
            submenu: MenuBarToolsPost()
        });
  sepItem();
  
	menuItem({
            label: 'Presentation',
            submenu: MenuBarToolsPresentation()
        });

	return new gui.MenuItem({ label: 'Tools', submenu: Tools });
}