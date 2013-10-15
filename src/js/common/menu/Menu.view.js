window.MenuBarView = function () {
	var gui = require('nw.gui');
	var View = new gui.Menu();

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
	        label: 'Mode',
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
	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Line Number',
		      click: function() {
		        window.parent.ee.emit('menu.show.toggle.linenum');
		      }
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Vim Mode',
		      click: function() {
		        window.parent.ee.emit('menu.view.toggle.vim');
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
	        label: 'Live Viewer width +5%',
		      click: function() {
		        window.parent.ee.emit('menu.view.plus5.width');
		      }
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Live Viewer width -5%',
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

	View.append(
		new gui.MenuItem({
		  label: 'Enter Full screen',
		  click: function() {
			window.parent.ee.emit('menu.view.fullscreen');
		  }
		})
	);

	return new gui.MenuItem({ label: 'View', submenu: View });
};