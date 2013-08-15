window.MenuBarFileSend = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'Email',
        click: function() {
          window.parent.ee.emit('menu.file.send.email');
        }
    })
  );

  return submenu;
};