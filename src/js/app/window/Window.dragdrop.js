define([
		'window/Window.opt'
	],
	function(options) {
		var gui = require('nw.gui'),
				win = gui.Window.get();

		var i = 0, x, y;

		function openFileHandler(file) {
			i++;

			x = win.x + 20 * i;
			y = win.y + 20 * i;

			options.set({
				x: x,
				y: y
			});

			gui.Window.open('pad.html?file='+ file, {
	    				width: win.width,
	    				height: win.height,
						  toolbar: true,
						  show: false
						});
		}

    window.ondragover = function(e) { 
      e.preventDefault(); 
      win.emit('dragover', e);
      return false;
    };

    window.ondrop = function(e) {
      e.preventDefault(); 
      win.emit('dragdrop', e);
      return false;
    };

    win.on('dragdrop', function(e) {
      for (var i = 0; i < e.dataTransfer.files.length; ++i) {
        // openFileHandler(e.dataTransfer.files[i].path, i);
      }
      return false;
    });
	}
);