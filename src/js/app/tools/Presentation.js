define([], function() {
  
  var PT;
  var View = Backbone.View.extend({
    win: null,

    initialize: function() {},

    start: function() {
      this.win = global.gui.Window.open( 'box/presentation/index.html', {
          title: 'Haroopad Presentation',
          toolbar: false,
          show: false,
          width: 800,
          height: 450,
          // icon: "logo.png",
          // resizable: false,
          position: 'center',
          frame: false,
          fullscreen: true
        });

      this.win.on('loaded', function() {
        this.win.removeAllListeners('loaded');
        this.win.window.update(window.ee, window.activedWindow.file.doc.toJSON());
        this.show();
      }.bind(this));

      this.win.on('close', function() {
        this.win.hide();
        this.win.close(true);
        this.win = null;
      }.bind(this));

      this.win.on('leave-fullscreen', function() {
        this.win && this.win.close();
      }.bind(this));

      this.win.on('enter-fullscreen', function() {
      }.bind(this));

      window.ee.on('exit.presentation', function() {
        this.win.close();
      }.bind(this));
    },

    show: function() {
      // this.win.maximize();
      this.win.show();
      // this.win.enterFullscreen();
      this.win.focus();
    }
  });

  PT = new View;

  window.ee.on('menu.view.presentation', function() {
    PT.start();
    // PT.update(window.doc.toJSON());
    // PT.show();
  });

});