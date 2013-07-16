define([
		'ui/file/File.opt'
	], function(FileOpt) {
		var dirname;

		var types = {
			'image': function(name, url) {
				dirname = FileOpt.get('dirname');

				if (dirname) {
					url = url.replace(dirname, '.');
				}

				return '\n!['+ name +']('+ url +')\n';
			}
		};
		
		function Files(items, cb) {
			var type, part, name, path, size;

			_.forEach(items, function(item) {
				path = item.path;
				name = item.name;
				type = item.type;
				part = type.split('/')[0];

				if (part === 'image') {
					cb(types[part](name, path));
				} else {
					console.log(name)
					console.log(type)
				}
			});
		}

		return Files;
	});