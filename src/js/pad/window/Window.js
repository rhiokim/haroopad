define([
		'store',
		'keyboard',
		'ui/dialog/Dialogs',
		'ui/splitter/Splitter'
], function(store, HotKey, Dialogs) {
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
			return;
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

	win.on('change.before.markdown', function(markdown, html, editor) {
		win.title = orgTitle + ' (edited)';
		edited = true;
	});



	HotKey('defmod-shift-alt-d', function() {
		win.showDevTools();
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

	$(document.body).bind('contextmenu', function(e, ev) {
		var x, y;
		e.preventDefault();
		
		e = (ev) ? ev : e;

		x = win.x - window.parent.win.x + e.clientX;
		y = win.y - window.parent.win.y + e.clientY;

		x = (ev) ? x + $('#editor').width() : x;

		if (ev) {
			window.parent.win.emit('popup.context.viewer', x, y);
		} else {
			window.parent.win.emit('popup.context.editor', x, y);
		}
		
	  return false;
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

  var resizeTimeout;
  window.onresize = function(e) {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function() {
	  	config.width = win.width;
	  	config.height = win.height;
	  	config.x = win.x;
	  	config.y = win.y;

	  	store.set('Window', config);
    }, 250); 

  }

 //  win.moveTo(url('#x'), url('#y'));
	// win.resizeTo(config.width, config.height);

});