window.MenuBarEdit = function() {
  var gui = require('nw.gui'),
    win = gui.Window.get();
  var shortcut;

  var Edit = new gui.Menu();

  function menuItem(options) {
    Edit.append(new gui.MenuItem(options));
  }

  function sepItem() {
    Edit.append(new gui.MenuItem({
      type: 'separator'
    }));
  }

  shortcut = __kbd('undo');
  menuItem({
    label: i18n.t('edit.undo'),
    click: function() {
      window.parent.ee.emit('menu.edit.undo');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('redo');
  menuItem({
    label: i18n.t('edit.redo'),
    click: function() {
      window.parent.ee.emit('menu.edit.redo');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  sepItem();

  menuItem({
    label: i18n.t('edit.cut'),
    click: function() {
      window.parent.ee.emit('menu.edit.cut');
    }
  });

  shortcut = __kbd('copy');
  menuItem({
    label: i18n.t('edit.copy'),
    click: function() {
      window.parent.ee.emit('menu.edit.copy');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });

  shortcut = __kbd('paste');
  menuItem({
    label: i18n.t('edit.paste'),
    click: function() {
      window.parent.ee.emit('menu.edit.paste');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });

  menuItem({
    label: i18n.t('edit.delete'),
    click: function() {
      window.parent.ee.emit('menu.edit.delete');
    }
  });

  shortcut = __kbd('select_all');
  menuItem({
    label: i18n.t('edit.select-all'),
    click: function() {
      window.parent.ee.emit('menu.edit.selectall');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });

  return new gui.MenuItem({
    label: i18n.t('edit.name'),
    submenu: Edit
  });
};