define([
	'module'
	], 
	function(module) {
		var viewer = $('#haroo iframe')[0].contentWindow;
		
		module.exports = {
			update: function(contents) {
				viewer.update(contents);
			},

			scroll: function(top, per) {
				viewer.scrollTop(top * 100 / per);
			}
		};
	});