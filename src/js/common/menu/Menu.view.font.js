window.MenuBarViewFont = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  var shortcut;

  shortcut = __kbd('editor_font_size_up');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.font-size-editor') + ' + 1px',
      click: function() {
        window.parent.ee.emit('menu.view.editor.font.size', 1);
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('editor_font_size_down');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.font-size-editor') + ' - 1px',
      click: function() {
        window.parent.ee.emit('menu.view.editor.font.size', -1);
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  submenu.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  shortcut = __kbd('viewer_font_size_up');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.font-size-viewer') + ' + 1px',
      click: function() {
        window.parent.ee.emit('menu.view.viewer.font.size', 1);
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('viewer_font_size_down');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('view.font-size-viewer') + ' - 1px',
      click: function() {
        window.parent.ee.emit('menu.view.viewer.font.size', -1);
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );

  return submenu;
};