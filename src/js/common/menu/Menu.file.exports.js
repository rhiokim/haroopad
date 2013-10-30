window.MenuBarFileExports = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
      label: 'Clipboard',
      enabled: false
    })
  );
  submenu.append(
    new gui.MenuItem({
      label: 'Plain HTML',
      click: function() {
        window.parent.ee.emit('menu.file.exports.clipboard.plain');
      }
    })
  );
  submenu.append(
    new gui.MenuItem({
      label: 'Styled HTML',
      click: function() {
        window.parent.ee.emit('menu.file.exports.clipboard.styled');
      }
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
      label: 'File',
      enabled: false
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('file.export-to-html'),
        click: function() {
          window.parent.ee.emit('menu.file.exports.html');
        }
    })
  );
  // submenu.append(
  //   new gui.MenuItem({
  //       label: 'PDF'
  //   })
  // );

  return submenu;
};