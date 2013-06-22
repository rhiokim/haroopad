define([
		'window/WindowManager'
	],
	function(WindowMgr) {
		var gui = require('nw.gui'),
				win = gui.Window.get();

		var i = 0;

    win.on('dragdrop', function(e) {
      for (var i = 0; i < e.dataTransfer.files.length; ++i) {

  			WindowMgr.open(e.dataTransfer.files[i].path);
        // openFileHandler(e.dataTransfer.files[i].path, i);
      }
      return false;
    });
	}
);