define([
		'store',
		'ui/dialog/Dialogs'
], function(store, Dialogs) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

	var orgTitle = 'Untitled';
	var edited = false,
		delayClose = false;

	var config = store.get('Window') || {};

	function close() {
		win.hide();

		config.x = win.x;
		config.y = win.y;
		config.width = win.width;
		config.height = win.height;
		config.zoom = win.zoom;
		store.set('Window', config);

		win.close(true);
	}

	win.on('close', function() {
		if (edited) {
			Dialogs.save.show();
		} else {
			close();
		}
	});

	Dialogs.save.bind('save', function() {
		delayClose = true;
	});

	Dialogs.save.bind('dont-save', function() {
		close();
	});

	win.on('file.close', win.close);

	win.on('file.opened', function(opt) {
		win.title = orgTitle = opt.basename;
  });

  win.on('file.saved', function(opt) {
		win.title = orgTitle = opt.basename;
		delayClose = true;
		edited = false;	
  });

	win.on('change.markdown', function(markdown, html, editor) {
		win.title = orgTitle + ' (edited)';
		edited = true;
	});

  window.addEventListener('keydown', function(e) {

    var evt = document.createEvent("Events");
      evt.initEvent("keydown", true, true);

      evt.view = e.view;
      evt.altKey = e.altKey;
      evt.ctrlKey = e.ctrlKey;
      evt.shiftKey = e.shiftKey;
      evt.metaKey = e.metaKey;
      evt.keyCode = e.keyCode;
      evt.charCode = e.charCode;

      window.parent.dispatchEvent(evt);

  }, false);

	$(window).mousedown(function(e, ev) { 
		var x, y;
		e.preventDefault();

		e = (ev) ? ev : e;

		if (e.which === 3) {
			x = (ev) ? $('#editor').width() + e.clientX : e.clientX;
			y = e.clientY;
		
			if(ev) {
				window.parent.win.emit('popup.context.viewer', x, y);
				// Viewer.popup(x, y);
			} else {
				window.parent.win.emit('popup.context.editor', x, y);
				// Editor.popup(x, y);
			}
			return false;
    }
	});

  window.ondragover = function(e) { 
    e.preventDefault(); 
    window.parent.win.emit('dragover', e);
    return false;
  };

  window.ondrop = function(e) {
    e.preventDefault(); 
    window.parent.win.emit('dragdrop', e);
    return false;
  };

 //  win.moveTo(url('#x'), url('#y'));
	// win.resizeTo(config.width, config.height);

});