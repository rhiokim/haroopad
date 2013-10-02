define([
		'editor/mimes/sites'
	], function(SITES) {

		function URI(str, cb) {
			var hostname = url('hostname', str);
			var site = SITES[hostname];
			var res = '@['+ str +']('+ str +')' ;
			// var res = site ? site(str) : '['+ str +']('+ str +')' ;

			cb(res);
		}

		return {
			uri: URI
		};
	});