define([
      'menu/Menu.file.recents',
      'menu/Menu.file.exports',
      'menu/Menu.file.posts',
      'menu/Menu.file.activities'
	],
	function(Recents, Exports, Posts, Activities) {

	var gui = require('nw.gui'),
        win = gui.Window.get();
	var File = new gui.Menu();

    function menuItem(options) {
        return new gui.MenuItem(options);
    }

    function sepItem() {
        return new gui.MenuItem({
      type: 'separator'
    });
    }

	File.append(menuItem({
            label: 'New',
            click: function() {
                win.emit('file.new');
            }
        })
	);
	File.append(menuItem({
            label: 'Open',
            click: function() {
                win.emit('file.open');
            }
        })
	);
	File.append(menuItem({
            label: 'Open Recent',
            submenu: Recents
        })
	);
	File.append(sepItem());
    File.append(menuItem({
            label: 'Save',
            click: function() {
                win.emit('file.save');
            }
        })
    );
    File.append(menuItem({
            label: 'Save As',
            click: function() {
                win.emit('file.save.as');
            }
        })
    );

    File.append(menuItem({
            label: 'Close',
            click: function() {
                win.emit('file.close');
            }
        })
    );
	File.append(menuItem({
            type: 'separator'
        })
	);

	File.append(menuItem({
            label: 'Post',
            enabled: false,
            submenu: Posts
        })
	);
    File.append(menuItem({
            label: 'Export',
            // enabled: false,
            submenu: Exports
        })
    );
	File.append(menuItem({
            label: 'Activity stream',
            enabled: false,
            submenu: Activities
        })
	);

    /*
	File.append(
        new gui.MenuItem({
            type: 'separator'
        })
	);
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
});