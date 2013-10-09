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
	var _height = '300px';

	return function(name, args) {
		var key, user, width, height;

		args = args.split(' ');
		key = args[0];
		user = args[1] || '-';
		width = args[2] || _width;
		height = args[3] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		return '<iframe data-origin="'+ origin +'" style="width:'+ width +'; height:'+ height +';" src="http://codepen.io/'+ user +'/embed/'+ key +'"></iframe>';
	}
});
