/*
   _____     __________________  .___ .___ ________________.___.._.
  /  _  \   /   _____/\_   ___ \ |   ||   |\_   _____/\__  |   || |
 /  /_\  \  \_____  \ /    \  \/ |   ||   | |    __)   /   |   || |
/    |    \ /        \\     \____|   ||   | |     \    \____   | \|
\____|__  //_______  / \______  /|___||___| \___  /    / ______| __
        \/         \/         \/                \/     \/        \/

Install: npm install asciify
Usage: 
	var asciify = require('asciify');
	asciify('Whoa', {font:'3-d'}, function(err, result){console.log(result)});
*/
var figlet = require('./lib/figlet-js/figlet-node');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

module.exports = function (text, opts, callback) {

	// Ensure text is a string
	text = text + '';

	if (typeof opts === 'function') {
		callback = opts;
		opts = null;
	}

	// Fix up the opts. Default font is graffiti.
	opts = opts || {};

	if (typeof opts === 'string') {
		opts = { font: opts };
	}

	opts.font = opts.font || 'graffiti';

	if (typeof opts.font !== 'string') {
		callback('opts.font should be a font name string');
	}

	// Current implementation depends on figlet-js.
	figlet.Figlet.write(text, opts.font, function (err, asciifiedText) {
		if (opts.maxWidth) {
			asciifiedText = trimToMaxWidth(opts.maxWidth, asciifiedText);
		}
		if (opts.color) {
			asciifiedText = chalk[opts.color](asciifiedText);
		}
		callback(err, asciifiedText);
	});
};

// truncate the ascii art to fit a thing
function trimToMaxWidth (width, text) {
	var truncated = text.split('\n').map(function (line) {
		return line.substring(0, width);
	});
	return truncated.join('\n');
}

/*
 * Provide the callback with array of font names, sans file extension.
 */
module.exports.getFonts = function (callback) {

	var fontsDir = path.resolve(__dirname, 'lib', 'figlet-js', 'fonts');

	// No caching, just reading. Caller should cache if they need to.
	fs.readdir(fontsDir, function (err, files) {

		if (err) { return callback(err); }
		
		var fonts = files.map(function (file) {
			return file.slice(0, file.length - 4); // chop off the '.flf' extension
		});

		callback(err, fonts);
	});
};
