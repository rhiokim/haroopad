define([], 
	function() {

		var gui = require('nw.gui'),
      	win = gui.Window.get();
		var Context = new gui.Menu();

		var mCopy, mCopyHTML, mPreferences;

		function menuItem(options) {
			return new gui.MenuItem(options);
		}

		function sepItem() {
			return new gui.MenuItem({
	      type: 'separator'
	    });
		}

		mCopy = menuItem({ 
			label: 'Copy',
			click: function() {
				win.emit('context.copy');
			} 
		});
		
		// Context.append(mCopy);

		mCopyHTML = menuItem({ 
			label: 'Copy HTML', 
			click: function() {
		  	win.emit('copy.html');
			} 
		});
		Context.append(mCopyHTML);
		Context.append(sepItem());

		mPreferences = menuItem({
			label: 'Preferences',
			click: function() {
		  	win.emit('context.preferences');
			}
		});
		Context.append(mPreferences);

		//TODO: https://github.com/rhiokim/haroopad/issues/15

		return Context;
});