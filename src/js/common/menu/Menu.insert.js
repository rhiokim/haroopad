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
      // submenu: MenuBarInsertDate()
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
      tooltip: '#',
      // icon: 'img/menu/header.png',
      submenu: MenuBarInsertHeader()
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.bold'),
      tooltip: '**text**, __text__',
      // icon: 'img/menu/bold.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'strong');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.italic'),
      tooltip: '*text*, _text_',
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'i');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.inline-code'),
      tooltip: '`code`',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'code');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.image'),
      tooltip: '![alt text](image path)',
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'image');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.link'),
      tooltip: '[link text](url)',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'a');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.blockquote'),
      tooltip: '> text',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'blockquote');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.ordered-list'),
      tooltip: '1. list1\n2. list2\n3. list3',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'ol');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.unordered-list'),
      tooltip: '- list1\n- list2\n- list3',
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
      tooltip: '* * *',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'hr-page');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.section-break'),
      tooltip: '- - -',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'hr-section');
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
      tooltip: '```\ncode block\n```',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'precode');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.strikethrough'),
      tooltip: '~~text~~',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'del');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.table'),
      tooltip: '|         |         |\n|-----|-----|\n|         |         |',
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
      label: 'Haroopad Flavored Markdown',
      enabled: false
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.highlight'),
      tooltip: '==text==',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'highlight');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.underline'),
      tooltip: '++text++',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'u');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.toc'),
      tooltip: '[TOC]',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'toc');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.embed'),
      tooltip: '@[alt text](url)',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'embed');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.math-block'),
      tooltip: '$$\nexpression\n$$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-block');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.math-inline'),
      tooltip: '$$$expression$$$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-inline');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.comment'),
      tooltip: '<!--text-->',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'comment');
      }
    })
  );

	return new gui.MenuItem({ label: i18n.t('insert.name'), submenu: Insert });
};
