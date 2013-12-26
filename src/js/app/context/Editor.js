define([
		'context/search/Search'
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
			label: i18n.t('edit.cut'),
			click: function() {
				window.ee.emit('context.cut');
			} 
		});
		mCopy = menuItem({
			label: i18n.t('edit.copy'),
			click: function() {
				window.ee.emit('context.copy');
			} 
		});
		mPaste = menuItem({
			label: i18n.t('edit.paste'),
			click: function() {
				window.ee.emit('context.paste');
			} 
		});
		mDelete = menuItem({ 
			label: i18n.t('edit.delete'),
			click: function() {
				window.ee.emit('context.delete');
			}
		});
		mSelectAll = menuItem({ 
			label: i18n.t('edit.select-all'),
			click: function() {
				window.ee.emit('context.selectall');
			}
		});
		
		Context.append(mCut);
		Context.append(mCopy);
		Context.append(mPaste);
		Context.append(mDelete);
		Context.append(mSelectAll);
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
			label: i18n.t('file.preferences'),
			click: function() {
		  	window.ee.emit('context.preferences');
			}
		});
		Context.append(mPreferences);

		return Context;
});