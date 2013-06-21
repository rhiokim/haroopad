MenuBar.action = function () {	
  var gui = require('nw.gui');
  var Action = new gui.Menu();

	Action.append(
    new gui.MenuItem({
      label: 'Copy HTML',
      click: function() {
        window.parent.ee.emit('menu.action.copy.html');
      }
    })
	);/*
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);
	
	Action.append(
    new gui.MenuItem({
      label: 'Insert',
      click: function() {
        win.emit('action.insert');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Select',
      click: function() {
        win.emit('action.select');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Convert',
      click: function() {
        win.emit('action.convert');
      }
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Strong',
      click: function() {
        win.emit('action.strong');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Emphasize',
      click: function() {
        win.emit('action.emphasize');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Inline Code',
      click: function() {
        win.emit('action.inline.code');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Fenced Code',
      click: function() {
        win.emit('action.fenced.code');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Strikethrough',
      click: function() {
        win.emit('action.strikethrough');
      }
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Image',
      click: function() {
        win.emit('action.image');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Link',
      click: function() {
        win.emit('action.link');
      }
    })
  );
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Action.append(
    new gui.MenuItem({
      label: 'Table',
      click: function() {
        win.emit('action.table');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Table Row',
      click: function() {
        win.emit('action.table.row');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Table Cell',
      click: function() {
        win.emit('action.table.cell');
      }
    })
  );*/

	return new gui.MenuItem({ label: 'Action', submenu: Action });
}
