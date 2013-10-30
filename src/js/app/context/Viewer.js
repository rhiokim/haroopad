define([], 
	function() {

		var gui = require('nw.gui'),
      	win = gui.Window.get();
		var Context = new gui.Menu();

		var mCopy, mCopyHTML, mCopyStyledHTML, mPreferences;

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
				window.ee.emit('context.copy');
			} 
		});
		
		// Context.append(mCopy);

		mCopyHTML = menuItem({ 
			label: 'Copy Plain HTML', 
			click: function() {
		  	window.ee.emit('context.copy.html');
			} 
		});

		mCopyStyledHTML = menuItem({
      label: 'Copy Styled HTML',
      click: function() {
        window.parent.ee.emit('menu.file.exports.clipboard.styled');
      }
    });
		Context.append(mCopyHTML);
		Context.append(mCopyStyledHTML);
		Context.append(sepItem());

		mPreferences = menuItem({
			label: 'Preferences',
			click: function() {
		  	window.ee.emit('context.preferences');
			}
		});
		Context.append(mPreferences);

		//TODO: https://github.com/rhiokim/haroopad/issues/15

		return Context;
});