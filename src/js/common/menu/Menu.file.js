window.MenuBarFile = function () {
	var gui = require('nw.gui'),
			win = gui.Window.get();

	var File = new gui.Menu();	

	function menuItem(options) {
    File.append( new gui.MenuItem(options) );
  }

  function sepItem() {
    File.append( new gui.MenuItem({
      type: 'separator'
    }));
  }

	menuItem({
            label: i18n.t('file.new'),
            click: function() {
                window.parent.ee.emit('menu.file.new');
            }
        });
	menuItem({
            label: i18n.t('file.open'),
            click: function() {
                window.parent.ee.emit('menu.file.open');
            }
        });
	menuItem({
            label: i18n.t('file.open-recent'),
            submenu: MenuBarFileRecents()
        });
	sepItem();
	
  menuItem({
          label: i18n.t('file.save'),
          click: function() {
              window.parent.ee.emit('menu.file.save');
          }
      });
  menuItem({
          label: i18n.t('file.save-as'),
          click: function() {
              window.parent.ee.emit('menu.file.save.as');
          }
      });

  menuItem({
          label: i18n.t('file.close'),
          click: function() {
              window.parent.ee.emit('menu.file.close');
          }
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
  
  menuItem({
            label: i18n.t('file.print'),
            click: function() {
                window.parent.ee.emit('menu.print.viewer');
            }
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
  menuItem({
          label: i18n.t('file.preferences'),
          click: function() {
              window.parent.ee.emit('menu.preferences.show');
          }
      });
  sepItem();
  menuItem({
          label: i18n.t('file.quit'),
          click: function() {
            // gui.App.closeAllWindows();
            window.parent.ee.emit('closeAll');
          }
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

	return new gui.MenuItem({ label: i18n.t('file.name'), submenu: File });
};
