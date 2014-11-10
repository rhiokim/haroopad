window.MenuBarFile = function() {
  var gui = require('nw.gui'),
    win = gui.Window.get();
  var shortcut;

  var File = new gui.Menu();

  function menuItem(options) {
    File.append(new gui.MenuItem(options));
  }

  function sepItem() {
    File.append(new gui.MenuItem({
      type: 'separator'
    }));
  }

  shortcut = __kbd('new_window');
  menuItem({
    label: i18n.t('file.new'),
    click: function() {
      window.parent.ee.emit('menu.file.new');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('open');
  menuItem({
    label: i18n.t('file.open'),
    click: function() {
      window.parent.ee.emit('menu.file.open');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  menuItem({
    label: i18n.t('file.open-recent'),
    submenu: MenuBarFileRecents()
  });
  sepItem();

  shortcut = __kbd('save');
  menuItem({
    label: i18n.t('file.save'),
    click: function() {
      window.parent.ee.emit('menu.file.save');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  shortcut = __kbd('save_as');
  menuItem({
    label: i18n.t('file.save-as'),
    click: function() {
      window.parent.ee.emit('menu.file.save.as');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });

  shortcut = __kbd('close');
  menuItem({
    label: i18n.t('file.close'),
    click: function() {
      window.parent.ee.emit('menu.file.close');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  sepItem();

  menuItem({
    label: i18n.t('file.sending'),
    submenu: MenuBarFileSend()
  });

  menuItem({
    label: i18n.t('file.exports'),
    // enabled: false,
    submenu: MenuBarFileExports()
  });

  // menuItem({
  //           label: 'Print Markdown',
  //           click: function() {
  //               window.parent.ee.emit('menu.print.editor');
  //           }
  //       });

  shortcut = __kbd('print');
  menuItem({
    label: i18n.t('file.print'),
    click: function() {
      window.parent.ee.emit('menu.print.viewer');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  // menuItem({
  //            label: 'Activity stream',
  //            enabled: false,
  //            submenu: MenuBarFileActivities()
  //        });
  // File.append(
  //     new gui.MenuItem({
  //         label: 'Print Markdown',
  //         click: function() {
  //             win.emit('menu.print.markdown');
  //         }
  //     })
  // );

  sepItem();
  shortcut = __kbd('show_preference');
  menuItem({
    label: i18n.t('file.preferences'),
    click: function() {
      window.parent.ee.emit('menu.preferences.show');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  sepItem();
  shortcut = __kbd('exit');
  menuItem({
    label: i18n.t('file.quit'),
    click: function() {
      // gui.App.closeAllWindows();
      window.parent.ee.emit('closeAll');
    },
    key: shortcut.key,
    modifiers: shortcut.modifiers
  });
  /*
	File.append(
        new gui.MenuItem({
            label: 'Page Setup'
        })
	);
	File.append(
        new gui.MenuItem({
            label: 'Print Source'
        })
	);
	File.append(
        new gui.MenuItem({
            label: 'Print Result'
        })
	);
     */

  return new gui.MenuItem({
    label: i18n.t('file.name'),
    submenu: File
  });
};