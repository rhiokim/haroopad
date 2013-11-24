window.MenuBarHelp = function () {
	var gui = require('nw.gui');
	var shell = gui.Shell;
	
	var Help = new gui.Menu();

	function open(url) {
		shell.openExternal(url);
	}

	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.haroopad-help'),
		      click: function() {
		      	window.parent.ee.emit('menu.help.about')
		    //   	(process.platform === 'win32') ?
		    //   	window.parent.ee.emit('menu.help.about') :
						// open('http://pad.haroopress.com/page.html');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.markdown-syntax-help'),
		      click: function() {
		      	window.parent.ee.emit('menu.help.syntax')
		      	// (process.platform === 'win32') ?
		      	// window.parent.ee.emit('menu.help.syntax') :
		       //  open('http://pad.haroopress.com/page.html?f=syntax');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.haroopad-shortcut-help'),
		      click: function() {
		      	window.parent.ee.emit('menu.help.shortcut')
		      	// (process.platform === 'darwin') ?
		      	// window.parent.ee.emit('menu.help.shortcut') :
		       //  open('http://pad.haroopress.com/page.html?f=show-shortcuts');
		      }
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.release-notes'),
		      click: function() {
		        open('http://pad.haroopress.com/page.html?f=release-notes');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.acknowledgements'),
		      click: function() {
		      	window.parent.ee.emit('menu.help.acknowledgements')
		      	// (process.platform === 'darwin') ?
		      	// window.parent.ee.emit('menu.help.acknowledgements') :
		       //  open('http://pad.haroopress.com/page.html?f=acknowledgements');
		      }
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);

	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.haroopad-website'),
		      click: function() {
					open('http://pad.haroopress.com/');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.user-echo'),
		      click: function() {
					open('http://haroopad.userecho.com/');
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.twitter'),
		      click: function() {
					open('https://twitter.com/haroopad');
		      }
	    })
	);
	Help.append(
		new gui.MenuItem({
      type: 'separator'
  	})
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.check-for-update'),
		      click: function() {
		      	window.parent.ee.emit('check.version', true);
		      }
	    })
	);
	Help.append(
	    new gui.MenuItem({
	        label: i18n.t('help.boost-up-donate'),
		      click: function() {
					open('http://pad.haroopress.com/page.html?f=grow-up-donate');
		      }
	    })
	);

	return new gui.MenuItem({ label: i18n.t('help.name'), submenu: Help });
};