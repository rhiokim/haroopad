define([
		// 'core/Plugins'
	], 
	function(/*Plugins*/) {

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

		// renderer.plugin = function(name, args) {
		// 	var plugin = Plugins[name.toLowerCase()];

		// 	if (!plugin) {
  // 				return '<p>['+ name +':'+ args +']</p>';
		// 	}
			
		// 	return plugin(name, args);
		// }

		renderer.oembed = function(caption, href, props) {
			var key, value, tmp = {};

			if (!href) {
				return '';
			}

			props = !props ? '' : props ;

			if (props) {
				props = props.split(',');
				props.forEach(function(prop) {
					prop = prop.split(':');

					if (prop[0] && prop[1]) {
						tmp[prop[0].trim()] = prop[1].trim();
					}
				});
				props = JSON.stringify(tmp);
				props = encodeURIComponent(props);
			}
			return '<p data-url="'+ href +'" data-props="'+ props +'" class="oembed">'+ loading +'</p>';
		}
	
		renderer.math = function(text, display) {
			if (display) {
				return '<p data-type="math/tex" data-mode="'+ display
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