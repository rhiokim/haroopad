window.MenuBarToolsPresentation = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: 'impress',
        click: function() {
          window.parent.ee.emit('tools.presentation', 'impress-default');
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
        label: 'shower bright',
        click: function() {
          window.parent.ee.emit('tools.presentation', 'shower-bright');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'shower ribbon',
        click: function() {
          window.parent.ee.emit('tools.presentation', 'shower-ribbon');
        }
    })
  );

  return submenu;
};