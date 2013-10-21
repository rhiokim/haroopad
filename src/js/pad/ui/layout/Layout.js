define([
		'keyboard'
	],
	function(HotKey) {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var $pad = $('#main > article');
		var $editor = $('#main > article > #editor');
		var $viewer = $('#main > article > #haroo');

		var _offset = 50,
			_layout = 'layout0';

		function setLayout(layout) {
			if (layout == _layout) {
				return;
			}

			switch(layout) {
				case 'reverse':
					layout = 'layout1';
					_offset = 100 - _offset;
				break;
				case 'editor':
					layout = 'layout2';
				break;
				case 'viewer':
					layout = 'layout3';
				break;
				default:
					layout = 'layout0';
					// _offset = 100 - _offset;
				break;
			}

			$pad.removeClass(_layout);
			$pad.addClass(layout);

			_layout = layout;

    	global._gaq.push('haroopad.view', 'mode', layout);
		}

		function right5() {
			if (_offset > 70) {
				return;
			}

			_offset += 5;

			if (_layout == 'layout0') {
				$editor.css('-webkit-flex', '1 0 '+ _offset +'%');
				$viewer.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');
			} else if (_layout == 'layout1') {
				$editor.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');
				$viewer.css('-webkit-flex', '1 0 '+ _offset +'%');
			}
		}

		function left5() {
			if (_offset < 30) {
				return;
			}
			
			_offset -= 5;

			if (_layout == 'layout0') {
				$editor.css('-webkit-flex', '1 0 '+ _offset +'%');
				$viewer.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');
			} else if (_layout == 'layout1') {
				$editor.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');
				$viewer.css('-webkit-flex', '1 0 '+ _offset +'%');
			}
		}

		HotKey('defmod-alt-1', function() {
			window.ee.emit('view.reset.mode');
		});
		HotKey('ctrl-\\', function() {
			window.ee.emit('view.reset.mode');
		});
		HotKey('defmod-alt-2', function() {
			setLayout('reverse');
		});
		HotKey('defmod-alt-3', function() {
			setLayout('editor');
		});
		HotKey('defmod-alt-4', function() {
			setLayout('viewer');
		});

		HotKey('shift-ctrl-]', function() {
			if (_layout == 'layout0') {
				setLayout('editor');	
			} else if (_layout == 'layout3') {
				window.ee.emit('view.reset.mode');
			}
		});
		HotKey('shift-ctrl-[', function() {
			if (_layout == 'layout2') {
				window.ee.emit('view.reset.mode');
			} else if (_layout == 'layout0') {
				setLayout('viewer');
			}
		});

		HotKey('ctrl-alt-]', right5);
		HotKey('ctrl-alt-[', left5);

		window.ee.on('view.reset.mode', function() {
			setLayout('default');
		});
		window.ee.on('view.plus5.width', right5);
		window.ee.on('view.minus5.width', left5);

		window.ee.on('menu.view.mode', setLayout);
	});