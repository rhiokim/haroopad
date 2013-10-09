window.MenuBarViewMode = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'Editor  : Viewer',
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'default');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Viewer : Editor',
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'reverse');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Editor',
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'editor');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Viewer',
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'viewer');
        }
    })
  );

  return submenu;
};