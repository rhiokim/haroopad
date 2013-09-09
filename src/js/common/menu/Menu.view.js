window.MenuBarView = function () {
	var gui = require('nw.gui');
	var View = new gui.Menu();

	View.append(
	    new gui.MenuItem({
	        label: i18n.t('view.toggle-live-view'),
		      click: function() {
		      	window.parent.ee.emit('menu.view.mode.toggle');
		      }
	    })
	);
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
	View.append(
	    new gui.MenuItem({
	        label: i18n.t('view.toggle-line-number'),
		      click: function() {
		        window.parent.ee.emit('menu.show.toggle.linenum');
		      }
	    })
	);
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
	View.append(
	    new gui.MenuItem({
	        label: i18n.t('view.live-view-width-plus-5'),
		      click: function() {
		        window.parent.ee.emit('menu.view.plus5.width');
		      }
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: i18n.t('view.live-view-width-minus-5'),
		      click: function() {
		        window.parent.ee.emit('menu.view.minus5.width');
		      }
	    })
	);
	View.append(
	    new gui.MenuItem({
          type: 'separator'
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: i18n.t('view.column'),
      		submenu: MenuBarViewColumn()	
	    })
	);
	View.append(
		new gui.MenuItem({
			type: 'separator'
		})
	);

	View.append(
		new gui.MenuItem({
		  label: i18n.t('view.enter-full-screen'),
		  click: function() {
			window.parent.ee.emit('menu.view.fullscreen');
		  }
		})
	);

	return new gui.MenuItem({ label: i18n.t('view.name'), submenu: View });
};