define([
	],
	function() {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var $pad = $('#main');
		var $editor = $('#main > #editor');
		var $viewer = $('#main > #viewer');

		var _offset = 50,
			_layout = 'layout0';

		var View = Backbone.View.extend({
			el: '#main',

			events: {},

			moveRight: function() {
				if (_offset > 70) {
					return;
				}

				_offset += 5;

				if (_layout == 'layout0') {
					$editor.css('flex', '1 1 '+ _offset +'%');
					$viewer.css('flex', '1 1 '+ (100-_offset) +'%');
				} else if (_layout == 'layout1') {
					$editor.css('flex', '1 1 '+ (100-_offset) +'%');
					$viewer.css('flex', '1 1 '+ _offset +'%');
				}

				nw.editor.refresh();
			},

			moveLeft: function() {
				if (_offset < 30) {
					return;
				}
				
				_offset -= 5;

				if (_layout == 'layout0') {
					$editor.css('flex', '1 1 '+ _offset +'%');
					$viewer.css('flex', '1 1 '+ (100-_offset) +'%');
				} else if (_layout == 'layout1') {
					$editor.css('flex', '1 1 '+ (100-_offset) +'%');
					$viewer.css('flex', '1 1 '+ _offset +'%');
				}

				nw.editor.refresh();
			}
		});

		var view = new View;
		setLayout(store.get('__layout_mode') || _layout);

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

			store.set('__layout_mode', layout);

			nw.editor && nw.editor.refresh();

  		global._gaq.push('haroopad.view', 'mode', layout);
		}

		function right5() {
			if (_offset > 70) {
				return;
			}

			_offset += 5;

			if (_layout == 'layout0') {/*
				$editor.css('-webkit-flex', '1 0 '+ _offset +'%');
				$viewer.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');*/
				$editor.css({
					width: _offset +'%',
					right: 100-_offset +'%'
				});
				$viewer.css({
					width: 100-_offset +'%',
					left: _offset +'%'
				})
			} else if (_layout == 'layout1') {/*
				$editor.css('-webkit-flex', '1 0 '+ (100-_offset) +'%');
				$viewer.css('-webkit-flex', '1 0 '+ _offset +'%');*/
				$viewer.css('right', (100-_offset) +'%');
				$viewer.width((100-_offset) +'%');
				$editor.width(_offset +'%');
			}

			nw.editor.refresh();
		}

		function left5() {
			if (_offset < 30) {
				return;
			}
			
			_offset -= 5;

			if (_layout == 'layout0') {
				$editor.css({
					width: _offset +'%',
					right: 100-_offset +'%'
				});
				$viewer.css({
					width: 100-_offset +'%',
					left: _offset +'%'
				})
			} else if (_layout == 'layout1') {
				$viewer.width(_offset +'%');
				$editor.width((100-_offset) +'%');
			}

			nw.editor.refresh();
		}

		// keymage(__kbd('perspective-edit-view'), function() {
		// 	window.ee.emit('view.reset.mode');
		// });
		// keymage(__kbd('perspective-set-default'), function() {
		// 	window.ee.emit('view.reset.mode');
		// });
		// keymage(__kbd('perspective-view-edit'), function() {
		// 	setLayout('reverse');
		// });
		// keymage(__kbd('perspective-only-edit'), function() {
		// 	setLayout('editor');
		// });
		// keymage(__kbd('perspective-only-view'), function() {
		// 	setLayout('viewer');
		// });

		keymage('shift-ctrl-alt-]', function() {
			if (_layout == 'layout0') {
				setLayout('editor');	
			} else if (_layout == 'layout3') {
				window.ee.emit('view.reset.mode');
			}
		});
		keymage('shift-ctrl-alt-[', function() {
			if (_layout == 'layout2') {
				window.ee.emit('view.reset.mode');
			} else if (_layout == 'layout0') {
				setLayout('viewer');
			}
		});

		window.ee.on('view.reset.mode', function() {
			setLayout('default');
		});/*
		window.ee.on('view.plus5.width', right5);
		window.ee.on('view.minus5.width', left5);*/

		window.ee.on('view.plus5.width', function() {
			view.moveLeft();
		});
		window.ee.on('view.minus5.width', function() {
			view.moveRight();
		});
		window.ee.on('menu.view.mode', setLayout);
	});