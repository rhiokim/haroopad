MenuBarAction = function () {	
  var gui = require('nw.gui');
  var Action = new gui.Menu();

	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.copy-html'),
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
      label: i18n.t('insert.header'),
      // icon: 'img/menu/header.png',
      submenu: MenuBarActionHeader()
    })
  );
	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.bold'),
      // icon: 'img/menu/bold.png',
      click: function() {
        window.parent.ee.emit('menu.action.strong');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.italic'),
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.action.emphasize');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.inline-code'),
      click: function() {
        window.parent.ee.emit('menu.action.inlinecode');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.image'),
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.action.image');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.link'),
      click: function() {
        window.parent.ee.emit('menu.action.link');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.blockquote'),
      click: function() {
        window.parent.ee.emit('menu.action.blockquote');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.ordered-list'),
      click: function() {
        window.parent.ee.emit('menu.action.orderlist');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.unordered-list'),
      // icon: 'img/menu/unorder.png',
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
      label: i18n.t('insert.section-break'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.action.horizontal');
      }
    })
  );
  Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.page-break'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.action.horizontal2');
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
      label: i18n.t('insert.fenced-code'),
      click: function() {
        window.parent.ee.emit('menu.action.fencedcode');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.strikethrough'),
      click: function() {
        window.parent.ee.emit('menu.action.strikethrough');
      }
    })
  );
	Action.append(
    new gui.MenuItem({
      label: i18n.t('insert.table'),
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
      label: i18n.t('insert.comment'),
      click: function() {
        window.parent.ee.emit('menu.action.comment');
      }
    })
  );

	return new gui.MenuItem({ label: i18n.t('insert.name'), submenu: Action });
};
