window.MenuBarInsertHeader = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  
  submenu.append(
    new gui.MenuItem({
        label: 'H1   #',
        click: function() {
          window.parent.ee.emit('menu.insert.h1');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'H2   ##',
        click: function() {
          window.parent.ee.emit('menu.insert.h2');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'H3   ###',
        click: function() {
          window.parent.ee.emit('menu.insert.h3');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'H4   ####',
        click: function() {
          window.parent.ee.emit('menu.insert.h4');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'H5   #####',
        click: function() {
          window.parent.ee.emit('menu.insert.h5');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'H6   ######',
        click: function() {
          window.parent.ee.emit('menu.insert.h6');
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