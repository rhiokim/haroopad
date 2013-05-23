define([
		'menu/Context/search/Search'
	], 
	function(Search) {

		var gui = require('nw.gui'),
      	win = gui.Window.get();
		var Context = new gui.Menu();

		var mCut, mCopy, mPaste, mSelectAll,
				mCopyHTML, mSearch, mPreferences;

		function menuItem(options) {
			return new gui.MenuItem(options);
		}

		function sepItem() {
			return new gui.MenuItem({
	      type: 'separator'
	    });
		}

		mCut = menuItem({ 
			label: 'Cut',
			click: function() {
				win.emit('context.cut');
			} 
		});
		mCopy = menuItem({ 
			label: 'Copy',
			click: function() {
				win.emit('context.copy');
			} 
		});
		mPaste = menuItem({ 
			label: 'Paste',
			click: function() {
				win.emit('context.paste');
			} 
		});
		mSelectAll = menuItem({ 
			label: 'Select All',
			click: function() {
				win.emit('context.select.all');
			}
		});
		
		Context.append(mCut);
		Context.append(mCopy);
		Context.append(mPaste);
		// Context.append(mSelectAll);

		Context.append(sepItem());

		mSearch = menuItem({ 
			label: 'Search with ...',
      enabled: false,
			submenu: Search
		});

		// Context.append(mSearch);
		// Context.append(sepItem());

		mEditorTheme = menuItem({ 
			label: 'Editor Themes', 
			click: function() {
			} 
		});
		mViewTheme = menuItem({ 
			label: 'Viewer Themes', 
			click: function() {
			} 
		});

		mPreferences = menuItem({
			label: 'Preferences',
			click: function() {
		  	win.emit('context.preferences');
			}
		});
		Context.append(mPreferences);

		return Context;
});