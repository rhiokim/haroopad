window.MenuBarView = function() {
	var gui = require('nw.gui');
	var View = new gui.Menu();
	var shortcut;

	// View.append(
	//     new gui.MenuItem({
	//         label: 'Toggle Live Preview',
	// 	      click: function() {
	// 	      	window.parent.ee.emit('menu.view.mode.toggle');
	// 	      }
	//     })
	// );
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.mode'),
			submenu: MenuBarViewMode()
		})
	);
	// View.append(
	//     new gui.MenuItem({
	//         label: 'Column Layout',
	//            submenu: MenuBarViewColumn()
	//     })
	// );
	// View.append(
	//     new gui.MenuItem({
	//         label: 'Reset Mode',
	// 	      click: function() {
	// 	        win.emit('view.reset.mode');
	// 	      }
	//     })
	// );
	View.append(
		new gui.MenuItem({
			type: 'separator'
		})
	);
	shortcut = __kbd('toggle_line_number');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.toggle-line-number'),
			click: function() {
				window.parent.ee.emit('menu.show.toggle.linenum');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);
	shortcut = __kbd('show_markdown_help');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.toggle-markdown-help'),
			click: function() {
				window.parent.ee.emit('menu.show.toggle.markdown.help');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);
	shortcut = __kbd('toggle_vim_key_binding');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.vim-mode'),
			click: function() {
				window.parent.ee.emit('menu.view.toggle.vim');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);
	// disable on v0.10
	// View.append(
	//     new gui.MenuItem({
	//         label: i18n.t('view.toggle-toc'),
	// 	      click: function() {
	// 	        window.parent.ee.emit('menu.view.toggle.toc');
	// 	      }
	//     })
	// );
	// View.append(
	//     new gui.MenuItem({
	//         label: 'Toggle Word Count',
	// 	      click: function() {
	// 	        win.emit('show.toggle.wordcount');
	// 	      }
	//     })
	// );
	View.append(
		new gui.MenuItem({
			type: 'separator'
		})
	);
	shortcut = __kbd('perspective_move_left');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.live-view-width-plus-5'),
			click: function() {
				window.parent.ee.emit('menu.view.plus5.width');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);
	shortcut = __kbd('perspective_move_right');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.live-view-width-minus-5'),
			click: function() {
				window.parent.ee.emit('menu.view.minus5.width');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);
	View.append(
		new gui.MenuItem({
			type: 'separator'
		})
	);
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.font-size'),
			submenu: MenuBarViewFont()
		})
	);
	View.append(
		new gui.MenuItem({
			type: 'separator'
		})
	);

	// View.append(
	//     new gui.MenuItem({
	//         label: 'Zoom',
	//            submenu: MenuBarViewZoom()
	//     })
	// );
	// View.append(
	// 	new gui.MenuItem({
	// 		type: 'separator'
	// 	})
	// );

	shortcut = __kbd('enter_presentation');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.enter-presentation'),
			click: function() {
				window.parent.ee.emit('menu.view.presentation');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);

	shortcut = __kbd('enter_fullscreen');
	View.append(
		new gui.MenuItem({
			label: i18n.t('view.enter-full-screen'),
			click: function() {
				window.parent.ee.emit('menu.view.fullscreen');
			},
			key: shortcut.key,
			modifiers: shortcut.modifiers
		})
	);

	return new gui.MenuItem({
		label: i18n.t('view.name'),
		submenu: View
	});
};