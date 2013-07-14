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


		// loadTweet(key)
		var url = 'http://syndication.twimg.com/tweets.json?ids='+ key +'&lang=en&callback=aaa&suppress_response_codes=true';
		url = escape(url);
		return '<script type="application/json" src="'+ url +'"></script>';
	}
});
