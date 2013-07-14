define([
	], function() {
		
		function File(item) {
			console.log(JSON.stringify(item));
		}

		return {
			'application/pdf': File,
			'image/png': File,
			'image/jpg': File,
			'image/gif': File,
			'md': File,
			'markdown': File
		};
	});