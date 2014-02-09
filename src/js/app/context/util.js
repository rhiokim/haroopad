define([ 'module' ], function( module ) {

  var gui = window.gui;

  module.exports = {
    menuItem: function(options) {
      return new gui.MenuItem(options);
    },

    sepItem: function() {
      return new gui.MenuItem({
        type: 'separator'
      });
    }
  }
});