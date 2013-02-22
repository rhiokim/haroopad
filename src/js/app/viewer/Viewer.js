define([
	'module'
	], 
	function(module) {
		var viewer = $('#haroo iframe')[0].contentWindow;
		
		module.exports = {
			update: function(contents) {
				viewer.update(contents);
			}
		};
	});