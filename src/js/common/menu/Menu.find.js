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
            label: i18n.t('find.find'),
            click: function() {
                window.parent.ee.emit('menu.find.start');
            }
        });
	menuItem({
            label: i18n.t('find.find-next'),
            click: function() {
                window.parent.ee.emit('menu.find.next');
            }
        });
	menuItem({
            label: i18n.t('find.find-previous'),
            click: function() {
                window.parent.ee.emit('menu.find.previous');
            }
        });
	sepItem();
	
  menuItem({
          label: i18n.t('find.replace'),
          click: function() {
              window.parent.ee.emit('menu.find.replace');
          }
      });
  menuItem({
          label: i18n.t('find.replace-all'),
          click: function() {
              window.parent.ee.emit('menu.find.replace.all');
          }
      });

	return new gui.MenuItem({ label: i18n.t('find.name'), submenu: Find });
};