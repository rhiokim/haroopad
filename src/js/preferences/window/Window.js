define([
  'window/Window.opt'
], function(options) {

  var gui = require('nw.gui');
  var win = gui.Window.get();
  var zoomLevel = options.get('zoomLevel') || 0;

  global.setImmediate(function() {
    nw.zoomLevel = zoomLevel;
  });

  function round(n) {
    return Math.round(n * 10) / 10;
  }

  win.on('close', function() {
    alert('');
  });
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