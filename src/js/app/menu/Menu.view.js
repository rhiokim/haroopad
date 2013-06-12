define([
	],function() {

	var gui = require('nw.gui'),
      	win = gui.Window.get();
	var View = new gui.Menu();

	View.append(
	    new gui.MenuItem({
	        label: 'Toggle Live Preview',
		      click: function() {
		      	win.emit('menu.view.mode.toggle');
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
	        label: 'Toggle Line Number',
		      click: function() {
		        win.emit('menu.show.toggle.linenum');
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
		        win.emit('menu.view.plus5.width');
		      }
	    })
	);
	View.append(
	    new gui.MenuItem({
	        label: 'Live Viewer width -5%',
		      click: function() {
		        win.emit('menu.view.minus5.width');
		      }
	    })
	);

	return new gui.MenuItem({ label: 'View', submenu: View });
});