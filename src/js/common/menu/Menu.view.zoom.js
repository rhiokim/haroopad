window.MenuBarViewZoom = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'Zoom In',
        click: function() {
          window.parent.ee.emit('menu.view.zoomin');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Zoom Out',
        click: function() {
          window.parent.ee.emit('menu.view.zoomout');
        }
    })
  );

  return submenu;
};