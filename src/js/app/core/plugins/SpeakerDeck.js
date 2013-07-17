define(function() {

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	return function(args) {
		var _width = '100%';
		var _height = '315px';

		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		var real = '<iframe frameborder="0" src="https://speakerdeck.com/player/' + key + '" width="'+ width +'" height="'+ height +'"></iframe>';
		real = escape(real);
		return '<img src="img/plugins/speakerdeck.png" width="'+ width +'" height="'+  height+'" origin="'+ real +'" class="plugin" />';
	}
});
