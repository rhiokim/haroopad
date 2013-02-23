define([
		'require',
		'text!tpl/preferences.html',
		'keyboard',
		'preferences/General',
		'preferences/Editor',
		'preferences/Viewer'
	], function(require, html, HotKey, General, Editor, Viewer) {

		$('#dialogs').append(html);
		$('.switch').bootstrapSwitch();

		HotKey('super-,', function(e) {
			$('._preferences').modal('show');
		});

		var tabGeneral = new General();
		var tabEditor = new Editor();
});