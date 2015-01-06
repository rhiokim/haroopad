window.MenuBarInsertHeader = function() {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();
  var shortcut;

  shortcut = __kbd('insert_md_header1');
  submenu.append(
    new gui.MenuItem({
      label: 'H1   #',
      tooltip: '#',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h1');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_header2');
  submenu.append(
    new gui.MenuItem({
      label: 'H2   ##',
      tooltip: '##',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h2');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_header3');
  submenu.append(
    new gui.MenuItem({
      label: 'H3   ###',
      tooltip: '###',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h3');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_header4');
  submenu.append(
    new gui.MenuItem({
      label: 'H4   ####',
      tooltip: '####',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h4');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_header5');
  submenu.append(
    new gui.MenuItem({
      label: 'H5   #####',
      tooltip: '#####',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h5');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  shortcut = __kbd('insert_md_header6');
  submenu.append(
    new gui.MenuItem({
      label: 'H6   ######',
      tooltip: '######',
      click: function() {
        window.parent.ee.emit('menu.insert.markdown', 'h6');
      },
      key: shortcut.key,
      modifiers: shortcut.modifiers
    })
  );
  // submenu.append(
  //   new gui.MenuItem({
  //       label: 'PDF'
  //   })
  // );

  return submenu;
};