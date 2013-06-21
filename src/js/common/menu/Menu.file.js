MenuBar.file = function () {
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
            label: 'New',
            click: function() {
                // process.emit('menu.file.new');
                window.ee.emit('menu.file.new');
            }
        });
	menuItem({
            label: 'Open',
            click: function() {
                window.ee.emit('menu.file.open');
            }
        });
	menuItem({
            label: 'Open Recent',
            submenu: MenuBar.file.Recents()
        });
	sepItem();
	
  menuItem({
          label: 'Save',
          click: function() {
              window.ee.emit('menu.file.save');
          }
      });
  menuItem({
          label: 'Save As',
          click: function() {
              window.ee.emit('menu.file.save.as');
          }
      });

  menuItem({
          label: 'Close',
          click: function() {
              window.ee.emit('menu.file.close');
          }
      });
  sepItem();

	menuItem({
            label: 'Post',
            enabled: false,
            submenu: MenuBar.file.Posts()
        });
  menuItem({
          label: 'Export',
          // enabled: false,
          submenu: MenuBar.file.Exports()
      });
	menuItem({
            label: 'Activity stream',
            enabled: false,
            submenu: MenuBar.file.Activities()
        });
  sepItem();
  
  menuItem({
            label: 'Print...',
            click: function() {
                win.emit('menu.print.html');
            }
        });
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
          label: 'Preferences',
          click: function() {
              window.ee.emit('menu.preferences.show');
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

	return new gui.MenuItem({ label: 'File', submenu: File });
}