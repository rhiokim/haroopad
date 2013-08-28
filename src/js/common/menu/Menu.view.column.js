window.MenuBarViewColumn = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'Single',
        click: function() {
          window.parent.ee.emit('menu.view.column.one');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Column: 2',
        click: function() {
          window.parent.ee.emit('menu.view.column.two');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Column: 3',
        click: function() {
          window.parent.ee.emit('menu.view.column.three');
        }
    })
  );

  return submenu;
};