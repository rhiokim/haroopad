define([
		'dialog/Save',
		'dialog/Save.replace',
		'dialog/Shortcuts'
	], 
	function(Save, SaveReplace, Shortcuts) {

		return {
			save: new Save,
			saveReplace: new SaveReplace,
			shortcuts: new Shortcuts
		}
});