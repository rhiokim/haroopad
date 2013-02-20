define([
	'module'
	], 
	function(module) {
		var viewer = $('#haroo iframe').contents().find('body');
		
		module.exports = {
			update: function(contents) {
				viewer.html(contents);
			}
		};
	});