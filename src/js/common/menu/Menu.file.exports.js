window.MenuBarFileExports = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'HTML',
        click: function() {
          window.parent.ee.emit('menu.file.exports.html');
        }
    })
  );

  return submenu;
};
