define(function() {

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	var _width = '100%';
	var _height = '281';

	return function(name, args) {
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);
		// var real = '<iframe src="http://player.vimeo.com/video/'+ key +'?title=0&amp;byline=0&amp;portrait=0&amp;color=bb2323" width="'+ width +'" height="'+ height +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
		// real = escape(real);
		// return '<img src="img/plugins/vimeo.jpg" width="'+width+'" height="'+height+'" data-origin="'+ origin +'" class="plugin" />';
		return '<iframe data-origin="'+ origin +'" src="http://player.vimeo.com/video/'+ key +'?title=0&amp;byline=0&amp;portrait=0&amp;color=bb2323" width="'+ width +'" height="'+ height +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
	}

});