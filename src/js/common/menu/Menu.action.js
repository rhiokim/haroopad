MenuBarAction = function () {	
  var gui = require('nw.gui');
  var Action = new gui.Menu();

	Action.append(
    new gui.MenuItem({
      label: 'Copy HTML',
      click: function() {
        window.parent.ee.emit('menu.action.copy.html');
      }
    })
	);
	Action.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);
	/*
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
	);*/


  Action.append(
    new gui.MenuItem({
      label: 'John Gruber Markdown',
      enabled: false
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Strong                 **',
      click: function() {
        window.parent.ee.emit('menu.action.strong');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Emphasize           *',
      click: function() {
        window.parent.ee.emit('menu.action.emphasize');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Inline Code          `',
      click: function() {
        window.parent.ee.emit('menu.action.inlinecode');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Image                 ![]()',
      click: function() {
        window.parent.ee.emit('menu.action.image');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Link                    []()',
      click: function() {
        window.parent.ee.emit('menu.action.link');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Blockquote          >',
      click: function() {
        window.parent.ee.emit('menu.action.blockquote');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Ordered List        1.',
      click: function() {
        window.parent.ee.emit('menu.action.orderlist');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Un Ordered List   -',
      click: function() {
        window.parent.ee.emit('menu.action.unorderlist');
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
      label: 'Github Flavored Markdown',
      enabled: false
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Fenced Code       ```',
      click: function() {
        window.parent.ee.emit('menu.action.fencedcode');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Strikethrough      ~~',
      click: function() {
        window.parent.ee.emit('menu.action.strikethrough');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: 'Table',
      click: function() {
        window.parent.ee.emit('menu.action.table');
      }
    })
  );
	// Action.append(
 //    new gui.MenuItem({
 //      label: 'Table Row',
 //      click: function() {
 //        window.parent.ee.emit('menu.action.table.row');
 //      }
 //    })
 //  );
	// Action.append(
 //    new gui.MenuItem({
 //      label: 'Table Cell',
 //      click: function() {
 //        window.parent.ee.emit('menu.action.table.cell');
 //      }
 //    })
 //  );
  Action.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  Action.append(
    new gui.MenuItem({
      label: 'Comment',
      click: function() {
        window.parent.ee.emit('menu.action.comment');
      }
    })
  );

	return new gui.MenuItem({ label: 'Action', submenu: Action });
};
