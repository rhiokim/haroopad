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
      label: 'Date & Time',
      submenu: MenuBarInsertDate()
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Filename',
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
      label: 'Header',
      // icon: 'img/menu/header.png',
      submenu: MenuBarInsertHeader()
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Strong ................ **',
      // icon: 'img/menu/bold.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'strong');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Emphasize .......... *',
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'i');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Inline Code ......... `',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'code');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Image ................. ![]()',
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'image');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Link .................... []()',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'a');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Blockquote ......... >',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'blockquote');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Ordered List ....... 1.',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'ol');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Un Ordered List .. -',
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
      label: 'Page Break .......... * * *',
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.page.break');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Section Break ...... - - -',
      // icon: 'img/menu/unorder.png',
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
      label: 'Fenced Code ....... ```',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'precode');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Strikethrough ...... ~~',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'del');
      }
    })
  );
	Insert.append(
    new gui.MenuItem({
      label: 'Table',
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
      label: 'Highlight .................... ==',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'highlight');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Underline .................... _',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'u');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Embed .................... @[]()',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'embed');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Math (Block) ........ $$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-block');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Math (Inline) ........ $$$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-inline');
      }
    })
  );
  Insert.append(
    new gui.MenuItem({
      label: 'Comment ............ <!-- -->',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'comment');
      }
    })
  );

	return new gui.MenuItem({ label: 'Insert', submenu: Insert });
};
