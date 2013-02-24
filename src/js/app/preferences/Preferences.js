define([
		'require',
		'text!tpl/preferences.html',
		'keyboard',
		'preferences/General',
		'preferences/Editor',
		'preferences/Viewer',
		'preferences/Helper'
	], function(require, html, HotKey, General, Editor, Viewer, Helper) {

		$('#dialogs').append(html);
		$('.switch').bootstrapSwitch();

		HotKey('super-,', function(e) {
			$('._preferences').modal('show');
		});

		var tabGeneral = new General();
		var tabEditor = new Editor();
		var tabViewer = new Viewer();
		var tabHelper = new Helper();
});