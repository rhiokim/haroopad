define([
		'keyboard'
	], 
	function(HotKey) {
		var gui = require('nw.gui'),
				win = gui.Window.get();
		var $editor = $('#editor');
		var $viewer = $('#haroo iframe');

		var left = 50;
		var right = 50;
		var gap = 5;

		function setModeEditor() {
			$editor.show().css({ width: '100%' });
			$viewer.hide();
		}

		function setModeView() {
			$editor.hide();
			$viewer.show().css({ width: '100%' });
		}

		function resetMode() {
			$editor.show().css({ width: '50%' });
			$viewer.show().css({ width: '50%' });
		}

		function setPlus5Width() {
			if(right <= 20) {
				return;
			}
			left = left + gap;
			right = right - gap;
			$editor.show().css({ width: left+'%' });
			$viewer.show().css({ width: right+'%' });
		}

		function setMinus5Width() {
			if(left <= 20) {
				return;
			}
			left = left - gap;
			right = right + gap;
			$editor.show().css({ width: left+'%' });
			$viewer.show().css({ width: right+'%' });
		}

		HotKey('defmod-]', setModeEditor);
		HotKey('defmod-[', setModeView);
		HotKey('defmod-\\', setModeReset);

		HotKey('defmod-alt-]', setPlus5Width);
		HotKey('defmod-alt-[', setMinus5Width);

		win.on('view.mode.editor', setModeEditor);
		win.on('view.mode.preview', setModeView);
		win.on('view.reset.mode', resetMode);
		win.on('view.plus5.width', setPlus5Width);
		win.on('view.minus5.width', setMinus5Width);
});