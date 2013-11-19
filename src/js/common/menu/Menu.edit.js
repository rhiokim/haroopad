window.MenuBarEdit = function () {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var Edit = new gui.Menu();	

	function menuItem(options) {
    Edit.append( new gui.MenuItem(options) );
  }

  function sepItem() {
    Edit.append( new gui.MenuItem({
      type: 'separator'
    }));
  }

	menuItem({
            label: i18n.t('edit.undo'),
            click: function() {
                window.parent.ee.emit('menu.edit.undo');
            }
        });
	menuItem({
            label: i18n.t('edit.redo'),
            click: function() {
                window.parent.ee.emit('menu.edit.redo');
            }
        });
  sepItem();

  menuItem({
            label: i18n.t('edit.cut'),
            click: function() {
                window.parent.ee.emit('menu.edit.cut');
            }
        });

  menuItem({
            label: i18n.t('edit.copy'),
            click: function() {
                window.parent.ee.emit('menu.edit.copy');
            }
        });

  menuItem({
            label: i18n.t('edit.paste'),
            click: function() {
                window.parent.ee.emit('menu.edit.paste');
            }
        });

  menuItem({
            label: i18n.t('edit.delete'),
            click: function() {
                window.parent.ee.emit('menu.edit.delete');
            }
        });

  menuItem({
            label: i18n.t('edit.select-all'),
            click: function() {
                window.parent.ee.emit('menu.edit.selectall');
            }
        });
	
	return new gui.MenuItem({ label: i18n.t('edit.name'), submenu: Edit });
};