window.MenuBarViewFont = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'Editor Font Size + 1px',
        click: function() {
          window.parent.ee.emit('menu.view.editor.font.size', 1);
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Editor Font Size - 1px',
        click: function() {
          window.parent.ee.emit('menu.view.editor.font.size', -1);
        }
    })
  );
  submenu.append(
      new gui.MenuItem({
          type: 'separator'
      })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Viewer Font Size + 1px',
        click: function() {
          window.parent.ee.emit('menu.view.viewer.font.size', 1);
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Viewer Font Size - 1px',
        click: function() {
          window.parent.ee.emit('menu.view.viewer.font.size', -1);
        }
    })
  );

  return submenu;
};