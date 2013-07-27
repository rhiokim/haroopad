define([
	], function() {
		var path = require('path');
		var dirname;

		var types = {
			'image': function(name, url) {
				dirname = nw.file.get('dirname');

				if (dirname) {
					url = url.replace(dirname, '.');
				}

				return '\n!['+ name +']('+ url +')\n';
			},
			'audio': function() {},
			'video': function() {},
			'application': function() {}
		};

		/* unknow file type */
		function unknown(entry, ext, cb) {
			switch (ext) {
				case '.md':
				case '.markdown':
				case '.txt':
				case '.mkd':
				case '.text':
    				window.parent.ee.emit('file.open', entry);
				break;
				default:
					cb(entry)
				break;
			}
		}
		
		function Files(items, cb) {
			var type, part, name, entry, size;

			_.forEach(items, function(item) {
				entry = item.path;
				name = item.name;
				type = item.type;
				part = type.split('/')[0];

				switch(part) {
					case 'image' :
						// cb(types[part](name, entry));
						
						cb(entry);
					break;
					case 'audio' :
						cb(entry);
					break;
					case 'video' :
						cb(entry);
					break;
					case 'application' :
						cb(entry);
					break;
					default :
						var ext = path.extname(name);
						unknown(entry, ext, cb);
					break;

				}
			});
		}

		return Files;
	});