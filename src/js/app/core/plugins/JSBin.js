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
		rev = args[1] || 1;
		panels = args[2] || 'html,output';
		width = args[3] || _width;
		height = args[4] || _height;

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		return '<iframe data-origin="'+ origin +'" style="width:'+ width +'; height:'+ height +';" src="http://jsbin.com/'+ key +'/'+ rev +'/watch?'+ panels +'"></iframe>';
	}
});
