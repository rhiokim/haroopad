define(function() {

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	return function(name, args) {
		var key;
		args = args.split(' ');
		key = args[0];

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		var real = '<img src="img/__json_proxy.png" onload="getTweet(this, \''
			+ key 
			+ '\''
			+ ');"/>';

		return '<p data-origin="'+ origin +'">'+ real +'</p>';
	}
});
