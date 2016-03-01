 /**
 * Figlet JS node.js module
 * 
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://github.com/scottgonzalez/figlet-js
 */

var fs = require("fs");
var path = require('path');
var Figlet = require("./figlet").Figlet;

Figlet.loadFont = function(name, fn) {

	var fileName = name + ".flf";
	
	var filePath = path.resolve(__dirname, "fonts", fileName);

	fs.readFile(filePath, "utf8", function(err, contents) {

		fn(err, contents);
	});
};

exports.Figlet = Figlet;
