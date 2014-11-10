window.MenuBarFileSend = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  var shortcut;

  shortcut = __kbd('send_email');
  submenu.append(
    new gui.MenuItem({
      label: i18n.t('file.sending-email'),
      click: function() {
        window.parent.ee.emit('menu.file.send.email');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );

  return submenu;
};