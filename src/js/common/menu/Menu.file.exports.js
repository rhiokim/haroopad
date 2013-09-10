window.MenuBarFileExports = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: i18n.t('file.copy-html'),
      click: function() {
        window.parent.ee.emit('menu.action.copy.html');
      }
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