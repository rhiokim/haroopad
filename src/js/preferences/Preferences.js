define([
		// 'vendors/text!tpl/preferences.html',
		// 'keyboard',
		'General',
		'Editor',
		'Viewer',
		'Code',
		'Helper',
		'About'
	], function(/*html, HotKey,*/ General, Editor, Viewer, Code, Helper, About) {

		// $('#dialogs').append(html);
		$('.switch').bootstrapSwitch();

		// function showPreferences(e) {
		// 	$('._preferences').modal('show');
		// }

		var tabGeneral = new General();
		var tabEditor = new Editor();
		var tabViewer = new Viewer();
		var tabCode = new Code();
		var tabHelper = new Helper();
		var tabAbout = new About();

		var gui = require('nw.gui'),
      	win = gui.Window.get();

    win.on('context.preferences', function() {
    	alert('context.prefe')
    });
    win.on('preferences.show', function() {
    	alert('prefe.show')
    });

});