window.MenuBarFileExports = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  var shortcut;

  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.copy-to-clipboard'),
      enabled: false
    })
  );
  shortcut = __kbd('html_copy_to_clip');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.plain-html'),
      click: function() {
        window.parent.ee.emit('menu.file.exports.clipboard.plain');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('shtml_copy_to_clip');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.styled-html'),
      click: function() {
        window.parent.ee.emit('menu.file.exports.clipboard.styled');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  // submenu.append(
  //   new gui.MenuItem({
  //     label: 'Haroopad Style HTML',
  //     click: function() {
  //       window.parent.ee.emit('menu.file.exports.clipboard.haroopad');
  //     }
  //   })
  // );
  submenu.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.export-to-file'),
      enabled: false
    })
  );
  shortcut = __kbd('export_html');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.export-to-html'),
      click: function() {
        window.parent.ee.emit('menu.file.exports.html');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );

  return submenu;
};