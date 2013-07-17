define([
		// 'core/Plugins'
	], 
	function(/*Plugins*/) {

		var marked = require('marked');
		var renderer = new marked.Renderer();

		/* ver 0.5.0
		renderer.plugin = function(name, args) {
			var plugin = Plugins[name.toLowerCase()];

			if (!plugin) {
  				return '<p>['+ name +':'+ args +']</p>';
			}
			
			return plugin(args);
		}
		*/

		return renderer;
});