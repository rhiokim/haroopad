define(function() {
	var _width = '500';
	var _height = '250';
	var _zoom = 12;
	var _maptype = 'roadmap';

	var qs = require('querystring');
	// function escape(html, encode) {
	//   return html
	//     .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	//     .replace(/</g, '&lt;')
	//     .replace(/>/g, '&gt;')
	//     .replace(/"/g, '&quot;')
	//     .replace(/'/g, '&#39;');
	// }

	return function(name, args) {
		//refs https://developers.google.com/maps/documentation/staticmaps/index
		args = args.split(' ');
		key = args[0];
		width = args[1] || _width;
		height = args[2] || _height;
		zoom = args[3] || _zoom;
		maptype = args[4] || _maptype;

		var o = {
			center: key,
			size: width +'x'+ height,
			zoom: zoom,
			maptype: maptype,
			markers: 'size:mid|color:red|'+ key,
			sensor: true
		};

		var origin = '['+ name +':'+ args +']';
			origin = escape(origin);

		var real = qs.stringify(o);
		return '<img data-origin="'+ origin +'" src="http://maps.googleapis.com/maps/api/staticmap?'+ real +'"/>';
	}

});