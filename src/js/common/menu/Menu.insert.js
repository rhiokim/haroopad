MenuBarInsert = function () {	
  var gui = require('nw.gui');
  var Insert = new gui.Menu();

	// Insert.append(
 //    new gui.MenuItem({
 //      label: 'Sections',
 //      submenu: MenuBarInsertSection()
 //    })
	// );
 //  Insert.append(
 //    new gui.MenuItem({
 //      label: 'Table Of Content',
 //      // icon: 'img/menu/unorder.png',
 //      click: function() {
 //        window.parent.ee.emit('menu.insert.toc');
 //      }
 //    })
 //  );
 //  Insert.append(
 //    new gui.MenuItem({
 //      type: 'separator'
 //    })
 //  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.date-time'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.date');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.filename'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.filename');
      }
    })
  );
	Insert.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);
	/*
	Insert.append(
    new gui.MenuItem({
      label: 'Insert',
      click: function() {
        win.emit('action.insert');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Select',
      click: function() {
        win.emit('action.select');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Convert',
      click: function() {
        win.emit('action.convert');
      }
    })
  );
	Insert.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);*/


  Insert.append(
    new gui.MenuItem({
      label: 'John Gruber Markdown',
      enabled: false
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.header'),
      // icon: 'img/menu/header.png',
      submenu: MenuBarInsertHeader()
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.bold'),
      // icon: 'img/menu/bold.png',
      click: function() {
        window.parent.ee.emit('menu.insert.strong');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.italic'),
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.insert.emphasize');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.inline-code'),
      click: function() {
        window.parent.ee.emit('menu.insert.inlinecode');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.image'),
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.insert.image');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.link'),
      click: function() {
        window.parent.ee.emit('menu.insert.link');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.blockquote'),
      click: function() {
        window.parent.ee.emit('menu.insert.blockquote');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.ordered-list'),
      click: function() {
        window.parent.ee.emit('menu.insert.orderlist');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.unordered-list'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.unorderlist');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.page-break'),
      click: function() {
        window.parent.ee.emit('menu.insert.page.break');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.section-break'),
      click: function() {
        window.parent.ee.emit('menu.insert.section.break');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  
  Insert.append(
    new gui.MenuItem({
      label: 'Github Flavored Markdown',
      enabled: false
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.fenced-code'),
      click: function() {
        window.parent.ee.emit('menu.insert.fencedcode');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.strikethrough'),
      click: function() {
        window.parent.ee.emit('menu.insert.strikethrough');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.table'),
      click: function() {
        window.parent.ee.emit('menu.insert.table');
      }
    })
  );
	// Insert.append(
 //    new gui.MenuItem({
 //      label: 'Table Row',
 //      click: function() {
 //        window.parent.ee.emit('menu.insert.table.row');
 //      }
 //    })
 //  );
	// Insert.append(
 //    new gui.MenuItem({
 //      label: 'Table Cell',
 //      click: function() {
 //        window.parent.ee.emit('menu.insert.table.cell');
 //      }
 //    })
 //  );
  Insert.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.comment'),
      click: function() {
        window.parent.ee.emit('menu.insert.comment');
      }
    })
  );

	return new gui.MenuItem({ label: i18n.t('insert.name'), submenu: Insert });
};
