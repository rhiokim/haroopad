define([], function() {
  
  var PT;
  var View = Backbone.View.extend({
    win: null,

    initialize: function() {},

    start: function() {
      // this.win = global.gui.Window.open( 'box/presentation/dist/index.html', {
      this.win = global.gui.Window.open( 'file://'+ global.PATHS.boxes +'/presentation/index.html', {
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
        this.win.window.update(window.ee, window.activedWindow.file.doc.toJSON(), window.activedWindow.file.toJSON());
        this.show();
      }.bind(this));

      this.win.on('close', function() {
        this.hide();
        this.close(true);
      });

      this.win.on('closed', function() {
        PT.win = null;
      });

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
    if (PT.win) {
      PT.win.focus();
      return;
    }

    PT.start();
    // PT.update(window.doc.toJSON());
    // PT.show();
  });

});