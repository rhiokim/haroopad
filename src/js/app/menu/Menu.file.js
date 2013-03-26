define([
	],
	function() {

	var gui = require('nw.gui');
	var File = new gui.Menu();

	File.append(
    new gui.MenuItem({
        label: 'New'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Open'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Open Recent'
    })
	);
	File.append(
    new gui.MenuItem({
        type: 'separator'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Close'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Save'
    })
	);
	File.append(
    new gui.MenuItem({
        type: 'separator'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Post'
    })
	);
	File.append(
    new gui.MenuItem({
        label: 'Export'
    })
	);
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

	return new gui.MenuItem({ label: 'File', submenu: File });
});