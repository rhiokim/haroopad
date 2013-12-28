/**
 * Figlet JS
 * 
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://github.com/scottgonzalez/figlet-js
 */

(function() {

var Figlet = (typeof exports !== "undefined" ? exports : window).Figlet = {
	fonts: {},
	
	parseFont: function(name, fn) {
		if (name in Figlet.fonts) {
			fn();
			return;
		}
		
		Figlet.loadFont(name, function(err, defn) {
			if (err) {
				fn(err);
				return;
			}
			Figlet._parseFont(name, defn, fn);
		});
	},
	
	_parseFont: function(name, defn, fn) {
		var lines = defn.split("\n"),
			header = lines[0].split(" "),
			hardblank = header[0].charAt(header[0].length - 1),
			height = +header[1],
			comments = +header[5];
		
		Figlet.fonts[name] = {
			defn: lines.slice(comments + 1),
			hardblank: hardblank,
			height: height,
			char: {}
		};
		fn();
	},
	
	parseChar: function(char, font) {
		var fontDefn = Figlet.fonts[font];
		if (char in fontDefn.char) {
			return fontDefn.char[char];
		}
		
		var height = fontDefn.height,
			start = (char - 32) * height,
			charDefn = [],
			i;
		
		// Is char defined?
		if (!fontDefn.defn[start]) {
			start = (" ".charCodeAt(0) - 32) * height;
		}
		
		for (i = 0; i < height; i++) {
			charDefn[i] = fontDefn.defn[start + i]
				.replace(/@/g, "")
				.replace(RegExp("\\" + fontDefn.hardblank, "g"), " ");
		}
		return fontDefn.char[char] = charDefn;
	},
	
	write: function(str, font, fn) {
		if (!str) {
			return fn(null, "");
		}
		
		Figlet.parseFont(font, function(err) {
			if (err) {
				fn(err);
				return;
			}
			var chars = [],
				result = "";
			for (var i = 0, len = str.length; i < len; i++) {
				chars[i] = Figlet.parseChar(str.charCodeAt(i), font);
			}
			for (i = 0; i < chars[0].length; i++) {
				for (var j = 0; j < len; j++) {
					result += chars[j][i];
				}
				result += "\n";
			}
			fn(null, result);
		});
	}
};

})();

