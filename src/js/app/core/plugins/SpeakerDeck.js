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
	var _height = '315px';

	return function(name, args) {

		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		// var real = '<iframe frameborder="0" src="https://speakerdeck.com/player/' + key + '" width="'+ width +'" height="'+ height +'"></iframe>';
		// real = escape(real);
		// return '<img data-origin="'+ origin +'" src="img/plugins/speakerdeck.png" width="'+ width +'" height="'+  height+'" class="plugin" />';
		return '<iframe data-origin="'+ origin +'" frameborder="0" src="https://speakerdeck.com/player/' + key + '" width="'+ width +'" height="'+ height +'"></iframe>';
	}
});
