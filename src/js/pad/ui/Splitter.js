define([
		'window/Window.opt',
		'keyboard'
	], 
	function(options, HotKey) {
		var gui = require('nw.gui'),
			win = gui.Window.get();
		var $editor = $('#editor');
		var $viewer = $('#haroo iframe');

		var width, viewerWidth = options.get('viewerWidth');
		var gap = 5;
		var mode;

		width = 100 - viewerWidth;

		if(!options.get('mode')) {
			setModeEditor();
		} else {
			setModeDual();
		}

		function toggle() {
      mode = options.get('mode') ? 0 : 1;

    	!mode ? 
      	setModeEditor() :
      	setModeDual() ;

      options.set('mode', mode);
		}

		function setModeEditor() {
			width = 100;
			$editor.css({ width: width +'%' });
			$viewer.css({ width: '0%' });

      options.set('mode', 0);
		}

		function setModeDual() {
			width = 100 - viewerWidth;
			$editor.css({ width: width +'%' });
			$viewer.css({ width: viewerWidth +'%' });
			options.set('viewerWidth', viewerWidth);

      options.set('mode', 1);
		}

		function resetMode() {
			width = viewerWidth = 50;
			setModeDual();
			
      options.set('mode', 1);
		}

		function setPlus5Width() {
			if(width > 80) {
				return;
			}

			viewerWidth = viewerWidth - gap;
			setModeDual();
		}

		function setMinus5Width() {
			if(width < 20) {
				return;
			}

			viewerWidth = viewerWidth + gap;
			setModeDual();
		}

		HotKey('ctrl-]', setModeEditor);
		HotKey('ctrl-[', setModeDual);
		HotKey('ctrl-\\', resetMode);

		HotKey('ctrl-alt-]', setPlus5Width);
		HotKey('ctrl-alt-[', setMinus5Width);

		// win.on('view.mode.editor', setModeEditor);
		// win.on('view.mode.dual', setModeDual);
		win.on('view.reset.mode', resetMode);
		win.on('view.plus5.width', setPlus5Width);
		win.on('view.minus5.width', setMinus5Width);

		win.on('view.mode.toggle', toggle);
});