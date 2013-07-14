define([
		'editor/mimes/sites'
	], function(SITES) {

		function URI(str, cb) {
			var domain = url('domain', str);
			var res = SITES[domain](str) || str;

			cb(res);
		}

		return {
			uri: URI
		};
	});