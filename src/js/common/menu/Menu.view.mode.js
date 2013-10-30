window.MenuBarViewMode = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.mode-e-v'),
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'default');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.mode-v-e'),
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'reverse');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.mode-editor'),
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'editor');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.mode-viewer'),
        click: function() {
          window.parent.ee.emit('menu.view.mode', 'viewer');
        }
    })
  );

  return submenu;
};