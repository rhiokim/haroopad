define([
		'keyboard',
		'ui/dialog/Save',
		'ui/dialog/Reload',
		'ui/dialog/Upgrade'/*,
		'ui/dialog/Shortcuts'*/
	], 
	function(HotKey, Save, Reload, Upgrade/*, Shortcuts*/) {
		var dialogs;

		// HotKey('shift-ctrl-space', function() {
		// 	dialogs.shortcuts.show();
		// });

		return dialogs = {
			save: new Save,
			reload: new Reload,
			upgrade: new Upgrade/*,
			shortcuts: new Shortcuts*/
		}
});