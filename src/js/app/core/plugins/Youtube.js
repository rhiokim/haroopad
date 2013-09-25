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
	var _height = '315';

	return function(name, args) {
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		// var origin = '<iframe class="youtube" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe>';
		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);
		// return '<img src="img/plugins/youtube.jpg" width="'+width+'" height="'+height+'" data-origin="'+ real +'" class="plugin" />';
		return '<iframe data-origin="'+ origin +'" class="youtube" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe>';
	}
});