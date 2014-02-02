window.MenuBarShare = function () {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var Share = new gui.Menu();	

	function menuItem(options) {
    Share.append( new gui.MenuItem(options) );
  }

  function sepItem() {
    Share.append( new gui.MenuItem({
      type: 'separator'
    }));
  }

  menuItem({
    label: 'Share via Mail',
    enabled: false
  });
  sepItem();
  
  menuItem({
    label: 'Send To',
    enabled: false
  });
  sepItem();
  
  menuItem({
    label: 'Export',
    enabled: false
  });

	return new gui.MenuItem({ label: 'Share', submenu: Share });
};