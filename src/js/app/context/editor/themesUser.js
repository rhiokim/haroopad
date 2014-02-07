define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    function removeAll() {
      var len = Menu.items.length;
      for (var i = 0; i < len; i++) {
        Menu.removeAt(0);
      }
    }

    function gen(themes) {
      themes.forEach(function(theme) {
        add(util.menuItem({
          label: theme,
          click: function() {
            window.parent.ee.emit('context.editor.theme.user', this.label);
          }
        }));
      });
    }

    gen(global.THEMES.user.editor);

    window.ee.on('preferences.editor.userTheme', function(theme) {
      removeAll();
      gen(global.THEMES.user.editor);
    });
    return Menu;
});