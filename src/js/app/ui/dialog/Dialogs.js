define([
		'ui/dialog/Save',
		'ui/dialog/Shortcuts'
	], 
	function(Save, Shortcuts) {

		return {
			save: new Save,
			shortcuts: new Shortcuts
		}
});