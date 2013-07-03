define([
		'keyboard',
		'ui/dialog/Save',
		'ui/dialog/Shortcuts'
	], 
	function(HotKey, Save, Shortcuts) {
		var dialogs;

		// HotKey('shift-ctrl-space', function() {
		// 	dialogs.shortcuts.show();
		// });

		return dialogs = {
			save: new Save,
			shortcuts: new Shortcuts
		}
});