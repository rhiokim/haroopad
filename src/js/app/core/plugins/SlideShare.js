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
	var _height = '356';

	return function(name, args) {
		args = args.split(' ');
		key = args[0];

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		if (!isNaN(key)) {
			width = args[1] || _width;
			height = args[2] || _height;

			return '<iframe data-origin="'+ origin +'" src="http://www.slideshare.net/slideshow/embed_code/' + key + '" width="'+ width +'" height="'+ height +'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>';	
		} else {
			user = args[1];
			var real = '<img src="img/__json_proxy.png" onload="getSlideShare(this, \''
				+ user 
				+ '\',\''
				+ key 
				+ '\''
				+ ');"/>';

			return '<p data-origin="'+ origin +'">'+ real +'</p>';
		}
		// return '<iframe data-origin="'+ origin +'" src="http://www.slideshare.net/slideshow/embed_code/' + key + '" width="'+ width +'" height="'+ height +'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>';
	}
});
