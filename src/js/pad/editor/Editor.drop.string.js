define([
	], function() {

		function URI(str, cb) {
			var hostname = url('hostname', str);
			var proxyImg = new Image();
			var res;

			res = '['+ str +']('+ str +')';

			proxyImg.onload = function() {
				cb('!'+ res);
				proxyImg = null;
			}
			proxyImg.onerror = function() {
				cb('@'+ res);
				proxyImg = null;
			}
			proxyImg.src = str;
		}

		return {
			uri: URI
		};
	});