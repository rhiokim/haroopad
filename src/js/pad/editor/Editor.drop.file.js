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
			'application': function() {}
		};

		//#[]()
		function audio(entry, name, ext, type) {
			return entry;
			
			switch (type) {
			}
		}

		//@[]()
		function video(entry, name, ext, type) {
			return entry;

			switch (type) {
				case 'video/mp4': 
					return '<video width="100%" height="400" controls>'
							+ '	<source src="'+ entry +'" type="'+ type +'">'
							+ '</video>'
				break;
				case 'video/webm': 
				break;
				case 'video/ogg': 
				break;
			}
		}

		/* unknow file type */
		function unknown(entry, ext, cb) {
			switch (ext) {
				case '.md':
				case '.mmd':
				case '.markdown':
				case '.mdown':
				case '.markdn':
				case '.mkd':
				case '.mkdn':
				case '.mdwn':
				case '.mtxt':
				case '.mtext':
				case '.mdml':
				case '.txt':
				case '.text':
    				window.parent.ee.emit('drop.file.open', entry);
				break;
				default:
					cb(entry)
				break;
			}
		}
		
		function Files(items, cb) {
			var type, part, name, entry, ext, size;

			_.forEach(items, function(item) {
				entry = item.path;
				name = item.name;
				type = item.type;
				ext = path.extname(name);
				part = type.split('/')[0];

				switch(part) {
					case 'image' :
						cb(types[part](name, entry));
						
						// cb(entry);
					break;
					case 'audio' :
						cb(audio(entry, name, ext, type));
						// cb(entry);
					break;
					case 'video' :
						cb(video(entry, name, ext, type));
						// cb(entry);
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