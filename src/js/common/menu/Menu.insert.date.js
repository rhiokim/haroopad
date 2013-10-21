window.MenuBarInsertDate = function () {
  var gui = require('nw.gui');
  var submenu = new gui.Menu();

  var moment = require('moment');
      // moment.lang('ko');
  
  var i, formats = ['L', 'l', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll'];

  for(i = 0; i < formats.length; i++) {
    submenu.append(
      new gui.MenuItem({
          label: moment().format(formats[i]),
          tooltip: formats[i],
          click: function() {
            window.parent.ee.emit('menu.insert.date', this.tooltip);
          }
      })
    );
  }

  function update() {
    var item;

    // Iterate menu's items
    for (var i = 0; i < submenu.items.length; ++i) {
      item = submenu.items[i];
      item.label = moment().format(item.tooltip);
    }
  }

  function timedUpdate() {
      update();
      setTimeout(timedUpdate, 1000);
  }

  timedUpdate();

  return submenu;
};