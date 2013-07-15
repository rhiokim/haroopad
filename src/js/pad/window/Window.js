define([
		'store',
		'keyboard',
		'ui/dialog/Dialogs',
		'ui/exports/Exports',
		'ui/splitter/Splitter'
], function(store, HotKey, Dialogs, Exports, Splitter) {
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

	window.ee.on('file.close', function() {
		win.close();
	});

	window.ee.on('file.opened', function(opt) {
		win.title = orgTitle = opt.basename || orgTitle;

		if (win._params.readOnly) {
			win.title += ' (read only)';
		}
  });

  window.ee.on('file.saved', function(opt) {
		win.title = orgTitle = opt.basename;
		delayClose = true;
		edited = false;	
  });

	window.ee.on('change.before.markdown', function(markdown, html, editor) {
		win.title = orgTitle + ' (edited)';
		edited = true;
	});


	HotKey('defmod-shift-alt-d', function() {
		win.showDevTools();
	});

	HotKey('defmod-enter', function() {
		window.ee.emit('view.fullscreen');
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

		x = win.x - window.parent.screenX + e.clientX;
		y = win.y - window.parent.screenY + e.clientY;

		switch(process.platform) {
			case 'linux':
				y += 26;
			break;
			default:
			break;
		}

		x = (ev) ? x + $('#editor').width() : x;

		if (ev) {
			window.parent.ee.emit('popup.context.viewer', x, y);
		} else {
			window.parent.ee.emit('popup.context.editor', x, y);
		}
		
	  return false;
	});

  window.ondragover = function(e) { 
    e.preventDefault(); 
    window.parent.ee.emit('dragover', e);
    return false;
  };

  window.ondrop = function(e) {
    e.preventDefault(); 
    window.parent.ee.emit('dragdrop', e);
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

  window.ee.on('view.fullscreen', function() {
  	var isFull = win.isFullscreen;

  	if (isFull) {
  		win.leaveFullscreen();
  	} else {
  		/* codemirror redraw delay bug */
  		document.querySelector('.CodeMirror-gutters').style.height = '2000px';
  		win.enterFullscreen();
  	}
  });
 //  win.moveTo(url('#x'), url('#y'));
	// win.resizeTo(config.width, config.height);

});