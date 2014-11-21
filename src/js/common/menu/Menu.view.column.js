window.MenuBarViewColumn = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.column-single'),
      click: function() {
        window.parent.ee.emit('menu.view.column.change', 'single');
      }
    })
  );
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.column-two'),
      click: function() {
        window.parent.ee.emit('menu.view.column.change', 'two');
      }
    })
  );
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.column-three'),
      click: function() {
        window.parent.ee.emit('menu.view.column.change', 'three');
      }
    })
  );

  return submenu;
};