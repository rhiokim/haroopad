window.MenuBarFind = function() {
  var gui = require('nw.gui'),
    win = gui.Window.get();
  var shortcut;

  var Find = new gui.Menu();

  function menuItem(options) {
    Find.append(new gui.MenuItem(options));
  }

  function sepItem() {
    Find.append(new gui.MenuItem({
      type: 'separator'
    }));
  }

  shortcut = __kbd('start_search');
  menuItem({
    label: i18n.t('find.find'),
    click: function() {
      window.parent.ee.emit('menu.find.start');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('find_next');
  menuItem({
    label: i18n.t('find.find-next'),
    click: function() {
      window.parent.ee.emit('menu.find.next');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('find_previous');
  menuItem({
    label: i18n.t('find.find-previous'),
    click: function() {
      window.parent.ee.emit('menu.find.previous');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  sepItem();

  shortcut = __kbd('replace');
  menuItem({
    label: i18n.t('find.replace'),
    click: function() {
      window.parent.ee.emit('menu.find.replace');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('replace_all');
  menuItem({
    label: i18n.t('find.replace-all'),
    click: function() {
      window.parent.ee.emit('menu.find.replace.all');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });

  return new gui.MenuItem({
    label: i18n.t('find.name'),
    submenu: Find
  });
};