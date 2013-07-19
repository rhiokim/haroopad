define([
		'keyboard',
		'ui/dialog/Save',
		'ui/dialog/Reload'/*,
		'ui/dialog/Shortcuts'*/
	], 
	function(HotKey, Save, Reload/*, Shortcuts*/) {
		var dialogs;

		// HotKey('shift-ctrl-space', function() {
		// 	dialogs.shortcuts.show();
		// });

		return dialogs = {
			save: new Save,
			reload: new Reload/*,
			shortcuts: new Shortcuts*/
		}
});