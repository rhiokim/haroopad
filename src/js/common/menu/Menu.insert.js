MenuBarInsert = function() {
  var gui = require('nw.gui');
  var Insert = new gui.Menu();
  var shortcut;

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
  shortcut = __kbd('insert_date_time');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.date-time'),
      // submenu: MenuBarInsertDate()
      click: function() {
        window.parent.ee.emit('menu.insert.date');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_date_time');
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
      label: 'Gruber\'s Markdown',
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
  shortcut = __kbd('insert_md_bold');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.bold'),
      tooltip: '**text**, __text__',
      // icon: 'img/menu/bold.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'strong');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_italic');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.italic'),
      tooltip: '*text*, _text_',
      // icon: 'img/menu/italic.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'i');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_inline_code');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.inline-code'),
      tooltip: '`code`',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'code');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_image');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.image'),
      tooltip: '![alt text](image path)',
      // icon: 'img/menu/image.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'image');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_link');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.link'),
      tooltip: '[link text](url)',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'a');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_blockquote');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.blockquote'),
      tooltip: '> text',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'blockquote');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_ordered_list');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.ordered-list'),
      tooltip: '1. list1\n2. list2\n3. list3',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'ol');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_unordered_list');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.unordered-list'),
      tooltip: '- list1\n- list2\n- list3',
      // icon: 'img/menu/unorder.png',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'li');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  Insert.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );
  shortcut = __kbd('insert_md_page_break');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.page-break'),
      tooltip: '* * *',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'hr-page');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_section_break');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.section-break'),
      tooltip: '- - -',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'hr-section');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_sentence_break');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.sentence-break'),
      tooltip: '_ _ _',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'hr-sentence');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
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
  shortcut = __kbd('insert_md_fenced_code');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.fenced-code'),
      tooltip: '```\ncode block\n```',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'precode');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_strike');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.strikethrough'),
      tooltip: '~~text~~',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'del');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
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
      label: 'MultiMarkdown',
      enabled: false
    })
  );
  shortcut = __kbd('insert_md_underline');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.underline'),
      tooltip: '++text++',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'u');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );

  Insert.append(
    new gui.MenuItem({
      type: 'separator'
    })
  );

  Insert.append(
    new gui.MenuItem({
      label: 'PHP Extras Markdown',
      enabled: false
    })
  );
  shortcut = __kbd('insert_md_footnotes');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.footnotes'),
      tooltip: '[^id]',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'fn');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_footnotes_ref');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.footnotes-ref'),
      tooltip: '[^id]: text',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'fn-ref');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
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
  shortcut = __kbd('insert_md_highlight');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.highlight'),
      tooltip: '==text==',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'highlight');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_toc');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.toc'),
      tooltip: '[TOC]',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'toc');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_embed');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.embed'),
      tooltip: '@[alt text](url)',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'embed');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_math_block');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.math-block'),
      tooltip: '$$\nexpression\n$$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-block');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_math_inline');
  Insert.append(
    new gui.MenuItem({
      label: i18n.t('insert.math-inline'),
      tooltip: '$$$expression$$$',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'math-inline');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
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

  return new gui.MenuItem({
    label: i18n.t('insert.name'),
    submenu: Insert
  });
};