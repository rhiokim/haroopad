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
			var key, value, tmp = {};

			if (!href) {
				return '';
			}

			props = !props ? '' : props ;

			if (props) {
				props = props.split(',');
				props.forEach(function(prop) {
					prop = prop.split(':');
					tmp[prop[0]] = prop[1];
				});
				props = JSON.stringify(tmp);
				props = encodeURIComponent(props);
			}
			return '<p href="'+ href +'" data-origin="'+ href +'#'+ props +'" data-props="'+ props +'" class="oembed">'+ loading +'</p>';
		}

		renderer.image = function(cap, href, props) {
			var key, value, tmp = {};
			var imgPattern = /[^\s]+(\.(jpg|png|gif|bmp|jpeg))$/i;

			if (!href) {
				return '';
			}

			if (imgPattern.test(href)) {
			  return '<img src="'
			      + href
			      + '" alt="'
			      + escape(cap[1])
			      + '"'
			      + (props
			      ? ' title="'
			      + escape(props)
			      + '"'
			      : '')
			      + '>';
			}

			props = !props ? '' : props ;

			if (props) {
				props = props.split(',');
				props.forEach(function(prop) {
					prop = prop.split(':');
					tmp[prop[0]] = prop[1];
				});
				props = JSON.stringify(tmp);
				props = encodeURIComponent(props);
			}
			return '<p href="'+ href +'" data-origin="'+ href +'#'+ props +'" data-props="'+ props +'" class="oembed">'+ loading +'</p>';
		}

		return renderer;
});