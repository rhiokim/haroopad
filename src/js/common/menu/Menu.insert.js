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
      submenu: MenuBarInsertDate()
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
        window.parent.ee.emit('menu.insert.markdown', 'strong');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.italic'),
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'i');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.inline-code'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'code');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.image'),
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'image');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.link'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'a');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.blockquote'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'blockquote');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.ordered-list'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'ol');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.unordered-list'),
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'li');
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
        window.parent.ee.emit('menu.insert.markdown', 'precode');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.strikethrough'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'del');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.table'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'table');
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
      label: i18n.t('insert.embed'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'embed');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.comment'),
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'comment');
      }
    })
  );

	return new gui.MenuItem({ label: i18n.t('insert.name'), submenu: Insert });
};
