define([
		'core/Plugins'
	], 
	function(Plugins) {

		var marked = require('marked');
		var renderer = new marked.Renderer();
		var loading = '<span class="bubblingG">'
	                + '    <span id="bubblingG_1">'
	                + '    </span>'
	                + '    <span id="bubblingG_2">'
	                + '    </span>'
	                + '    <span id="bubblingG_3">'
	                + '    </span>'
	                + '</span>';

		renderer.plugin = function(name, args) {
			var plugin = Plugins[name.toLowerCase()];

			if (!plugin) {
  				return '<p>['+ name +':'+ args +']</p>';
			}
			
			return plugin(name, args);
		}

		renderer.oembed = function(caption, href, props) {
			props = !props || '';
			return '<p href="'+ href +'" data-origin="'+ href +'#'+ props +'" data-props="'+ props +'" class="oembed">'+ loading +'</p>';
		}

		return renderer;
});