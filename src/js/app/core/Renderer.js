define([
		'core/Plugins'
	], 
	function(Plugins) {

		var marked = require('marked');
		var renderer = new marked.Renderer();

		renderer.plugin = function(name, args) {
			var plugin = Plugins[name.toLowerCase()];

			if (!plugin) {
  				return '<p>['+ name +':'+ args +']</p>';
			}
			
			return plugin(name, args);
		}

		return renderer;
});