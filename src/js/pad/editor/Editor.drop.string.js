define([
	], function() {

		function URI(str, cb) {
			var hostname = url('hostname', str);
			var res = '@['+ str +']('+ str +')' ;

			cb(res);
		}

		return {
			uri: URI
		};
	});