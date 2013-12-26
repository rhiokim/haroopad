window.MenuBarViewFont = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.font-size-editor')+ ' + 1px',
        click: function() {
          window.parent.ee.emit('menu.view.editor.font.size', 1);
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.font-size-editor')+ ' - 1px',
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
        label: i18n.t('view.font-size-viewer')+ ' + 1px',
        click: function() {
          window.parent.ee.emit('menu.view.viewer.font.size', 1);
        }
    })
  );
  submenu.append(
    new gui.MenuItem({
        label: i18n.t('view.font-size-viewer')+ ' - 1px',
        click: function() {
          window.parent.ee.emit('menu.view.viewer.font.size', -1);
        }
    })
  );

  return submenu;
};