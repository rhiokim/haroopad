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
	
		renderer.math = function(text, display) {
			if (display) {
				return '<p data-type="math/tex" data-mode="'+ display
					+ '" data-origin="'
					+ text
					+ '" class="mathjax">$$'
					+ text
					+ '$$</p>';
			} else {
				return '<span data-type="math/tex" class="mathjax">$'
					+ text
					+ '$</span>';
			}
		}

		return renderer;
});