define([
		'keyboard'
	],
	function(HotKey) {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var $editor = $('#main > article > #editor');
		var $viewer = $('#main > article > #haroo');

		var width, viewerWidth = 50; //options.get('viewerWidth');
		var gap = 5;
		var mode = 0;

		width = 100 - viewerWidth;

		if (mode == 1) {
			setModeEditor();
		} else if (mode == -1) {
			setModeViewer();
		} else {
			setModeDual();
		}

		function toggle() {
			mode = mode ? 0 : 1;

			!mode ?
				setModeEditor() :
				setModeDual();

			// options.set('mode', mode);
		}

		function setModeEditor() {
			width = 100;
			// $editor.css({
			// 	width: width + '%'
			// });
			// $viewer.css({
			// 	width: '0%'
			// });
			$editor.css('-webkit-flex', '1 0 '+ width +'%');
			$viewer.css('-webkit-flex', '1 0 0.01%');

			// options.set('mode', 0);
			mode = 0;
		}

		function setModeViewer() {
			// width = 100;
			// $editor.css({
			// 	width: '0%'
			// });
			// $viewer.css({
			// 	width: '100%'
			// });
			$editor.css('-webkit-flex', '1 0 0.01%');
			$viewer.css('-webkit-flex', '1 0 100%');

			// options.set('mode', 0);
			mode = -1;
		}

		function setModeDual() {
			width = 100 - viewerWidth;
			// $editor.css({
			// 	width: width + '%'
			// });
			// $viewer.css({
			// 	width: viewerWidth + '%'
			// });
			$editor.css('-webkit-flex', '1 0 '+ width +'%');
			$viewer.css('-webkit-flex', '1 0 '+ viewerWidth +'%');
			// options.set('viewerWidth', viewerWidth);

			// options.set('mode', 1);
			mode = 1;
		}

		function resetMode() {
			width = viewerWidth = 50;
			setModeDual();

			// options.set('mode', 1);
			// mode = 1;
		}

		function setPlus5Width() {
			if (width > 80) {
				return;
			}

			viewerWidth = viewerWidth - gap;
			setModeDual();
		}

		function setMinus5Width() {
			if (width < 20) {
				return;
			}

			viewerWidth = viewerWidth + gap;
			setModeDual();
		}

		HotKey('shift-ctrl-]', setModeEditor);
		HotKey('shift-ctrl-[', setModeDual);
		HotKey('ctrl-\\', resetMode);

		HotKey('ctrl-alt-]', setPlus5Width);
		HotKey('ctrl-alt-[', setMinus5Width);

		window.ee.on('view.reset.mode', resetMode);
		window.ee.on('view.plus5.width', setPlus5Width);
		window.ee.on('view.minus5.width', setMinus5Width);

		// window.ee.on('view.mode.toggle', toggle);
	});