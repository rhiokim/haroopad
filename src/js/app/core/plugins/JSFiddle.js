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
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		return '<iframe data-origin="'+ origin +'" style="width:'+ width +'; height:'+ height +';" src="http://jsfiddle.net/'+ key +'/embedded/js,resources,html,css,result/light/"></iframe>';
	}
});
