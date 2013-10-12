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
            label: 'Undo',
            click: function() {
                window.parent.ee.emit('menu.edit.undo');
            }
        });
	menuItem({
            label: 'Redo',
            click: function() {
                window.parent.ee.emit('menu.edit.redo');
            }
        });
  sepItem();

  menuItem({
            label: 'Cut',
            click: function() {
                window.parent.ee.emit('menu.edit.cut');
            }
        });

  menuItem({
            label: 'Copy',
            click: function() {
                window.parent.ee.emit('menu.edit.copy');
            }
        });

  menuItem({
            label: 'Paste',
            click: function() {
                window.parent.ee.emit('menu.edit.paste');
            }
        });

  menuItem({
            label: 'Delete',
            click: function() {
                window.parent.ee.emit('menu.edit.delete');
            }
        });

  menuItem({
            label: 'Select All',
            click: function() {
                window.parent.ee.emit('menu.edit.selectall');
            }
        });
	
	return new gui.MenuItem({ label: 'Edit', submenu: Edit });
};