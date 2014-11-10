define([
    'window/Window.opt'
  ], function(options) {

    var zoomLevel = options.get('zoomLevel') || 0;

    global.setImmediate(function() {
      nw.zoomLevel = zoomLevel;
    });

    function round(n) {
      return Math.round(n * 10) / 10;
    }

    // keymage('defmod-shift-.', function() {
    //   if (zoomLevel > 1) {
    //     return;
    //   }

    //   zoomLevel += .2;
    //   zoomLevel = round(zoomLevel);
      
    //   options.set({
    //     zoomLevel: zoomLevel
    //   });
    //   nw.zoomLevel = zoomLevel;
    // });

    // keymage('defmod-shift-,', function() {
    //   if (zoomLevel < -1) {
    //     return;
    //   }

    //   zoomLevel -= .2;
    //   zoomLevel = round(zoomLevel);

    //   options.set({
    //     zoomLevel: zoomLevel
    //   });
    //   nw.zoomLevel = zoomLevel;
    // });
});