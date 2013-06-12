define([
		'ui/dialog/Dialogs'
], function(Dialogs) {
	var gui = require('nw.gui');
	var win = gui.Window.get(),
		subWin;

	var orgTitle = 'Untitled';
	var edited = false,
		delayClose = false;


	function close() {
		win.hide();
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
});