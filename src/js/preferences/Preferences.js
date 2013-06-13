define([
		'General',
		'Editor',
		'Viewer',
		'Code',
		'Helper',
		'About'
	], function(General, Editor, Viewer, Code, Helper, About) {

		$('.switch').bootstrapSwitch();

		var gui = require('nw.gui'),
      	win = gui.Window.get();

    win.on('context.preferences', function() {
    	alert('context.prefe')
    });
    win.on('preferences.show', function() {
    	alert('prefe.show')
    });

});