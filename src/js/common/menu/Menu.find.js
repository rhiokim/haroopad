window.MenuBarFind = function () {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var Find = new gui.Menu();	

	function menuItem(options) {
    Find.append( new gui.MenuItem(options) );
  }

  function sepItem() {
    Find.append( new gui.MenuItem({
      type: 'separator'
    }));
  }

	menuItem({
            label: 'Find...',
            click: function() {
                window.parent.ee.emit('menu.find.start');
            }
        });
	menuItem({
            label: 'Find Next',
            click: function() {
                window.parent.ee.emit('menu.find.next');
            }
        });
	menuItem({
            label: 'Find Previous',
            click: function() {
                window.parent.ee.emit('menu.find.previous');
            }
        });
	sepItem();
	
  menuItem({
          label: 'Replace...',
          click: function() {
              window.parent.ee.emit('menu.find.replace');
          }
      });
  menuItem({
          label: 'Replace All',
          click: function() {
              window.parent.ee.emit('menu.find.replace.all');
          }
      });

	return new gui.MenuItem({ label: 'Find', submenu: Find });
};