define([
		'keyboard'
	], function(HotKey) {

		var gui = require('nw.gui'),
      	win = gui.Window.get();
		var Context = new gui.Menu();

		Context.append(
	    new gui.MenuItem({
	      label: 'Cut'
	    })
		);
		Context.append(
	    new gui.MenuItem({
	      label: 'Copy'
	    })
		);
		Context.append(
	    new gui.MenuItem({
	      label: 'Paste'
	    })
		);
		Context.append(
	    new gui.MenuItem({
	      type: 'separator'
	    })
		);

		Context.append(
	    new gui.MenuItem({
	      label: 'Copy HTML',
	      click: function() {
	      	win.emit('copy.html');
	      }
	    })
		);
		Context.append(
	    new gui.MenuItem({
	      label: 'Search with Google',
	      enabled: false
	    })
		);
		Context.append(
	    new gui.MenuItem({
	      type: 'separator'
	    })
		);

		Context.append(
	    new gui.MenuItem({
	      label: 'Preferences',
	      click: function() {
	      	win.emit('context.preferences');
	      }
	    })
		);

		//TODO: https://github.com/rhiokim/haroopad/issues/15
		$(window).mousedown(function(e, ev) { 
			var x, y;
			e.preventDefault();

			e = (ev) ? ev : e;
			x = (ev) ? $('#editor').width() + e.pageX : e.pageX;

			if (e.which === 3) {
				Context.popup(x, e.pageY);
				return false;
	    }

		});

		return Context;
});