define(function() {

  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('insert.bold'),
        click: function() {
          window.parent.ee.emit('menu.insert.markdown', 'h1');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('insert.italic'),
        click: function() {
          window.parent.ee.emit('menu.insert.markdown', 'h1');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('insert.underline'),
        click: function() {
          window.parent.ee.emit('menu.insert.markdown', 'h1');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('insert.highlight'),
        click: function() {
          window.parent.ee.emit('menu.insert.markdown', 'h1');
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('insert.strikethrough'),
        click: function() {
          window.parent.ee.emit('menu.insert.markdown', 'h1');
        }
    })
  );

  return submenu;
});