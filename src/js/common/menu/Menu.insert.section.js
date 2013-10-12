window.MenuBarInsertSection = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  
  submenu.append(
    new gui.MenuItem({
        label: 'Text Page',
        click: function() {
          window.parent.ee.emit('menu.insert.section.text');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: 'Blank Page',
        click: function() {
          window.parent.ee.emit('menu.insert.section.blank');
        }
    })
  );

  return submenu;
};