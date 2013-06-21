define([
		'window/WindowManager'
	],
	function(WindowMgr) {
		var gui = require('nw.gui'),
				win = gui.Window.get();

		var i = 0;

    win.on('dragdrop', function(e) {
      for (i; i < e.dataTransfer.files.length; ++i) {
  			WindowMgr.open(e.dataTransfer.files[i].path);
      }
      return false;
    });
	}
);