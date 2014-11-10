window.MenuBarViewMode = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  var shortcut;

  shortcut = __kbd('perspective_edit_view');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.mode-e-v'),
      click: function() {
        window.parent.ee.emit('menu.view.mode', 'default');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('perspective_view_edit');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.mode-v-e'),
      click: function() {
        window.parent.ee.emit('menu.view.mode', 'reverse');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('perspective_only_edit');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.mode-editor'),
      click: function() {
        window.parent.ee.emit('menu.view.mode', 'editor');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('perspective_only_view');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.mode-viewer'),
      click: function() {
        window.parent.ee.emit('menu.view.mode', 'viewer');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );

  return submenu;
};