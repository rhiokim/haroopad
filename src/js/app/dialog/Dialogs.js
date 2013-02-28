define([
		'dialog/Save',
		'dialog/Shortcuts'
	], 
	function(Save, Shortcuts) {

		return {
			save: new Save,
			shortcuts: new Shortcuts
		}
});