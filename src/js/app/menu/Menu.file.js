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

	File.append(
        new gui.MenuItem({
            label: 'New',
            click: function() {
                win.emit('file.new');
            }
        })
	);
	File.append(
        new gui.MenuItem({
            label: 'Open',
            click: function() {
                win.emit('file.open');
            }
        })
	);
	File.append(
        new gui.MenuItem({
            label: 'Open Recent',
            submenu: Recents
        })
	);
	File.append(
        new gui.MenuItem({
            type: 'separator'
        })
	);

	File.append(
        new gui.MenuItem({
            label: 'Close',
            click: function() {
                win.emit('file.close');
            }
        })
	);
	File.append(
        new gui.MenuItem({
            label: 'Save',
            click: function() {
                win.emit('file.save');
            }
        })
	);
	File.append(
        new gui.MenuItem({
            type: 'separator'
        })
	);

	File.append(
        new gui.MenuItem({
            label: 'Post',
            submenu: Posts
        })
	);
    File.append(
        new gui.MenuItem({
            label: 'Export',
            submenu: Exports
        })
    );
	File.append(
        new gui.MenuItem({
            label: 'Activity stream',
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