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
		var key, origin = [];
		args = args.split(' ');
		key = args[0];

		origin.push('tweet');
		origin.concat(args);

		var real = '<img src="img/__json_proxy.png" onload="getTweet(this, \''
			+ key 
			+ '\''
			+ ');"/>';

		return '<p origin="'+ escape(origin.join('-')) +'">'+ real +'</p>';
	}
});
