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
		var key, file;
		args = args.split(' ');
		key = args[0];
		file = args[1];


		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);
		// origin.push('gist');
		// origin.concat(args);

		var real = '<img src="img/__json_proxy.png" onload="getGist(this, \''
			+ key 
			+ '\''
			+ (file ? ', \''+ file +'\'' : '')
			+ ');"/>';

		return '<p data-origin="'+ origin +'">'+ real +'</p>';
	}
});