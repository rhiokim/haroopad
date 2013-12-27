	___________.___   ________ .____     ______________________              ____.  _________
	\_   _____/|   | /  _____/ |    |    \_   _____/\__    ___/             |    | /   _____/
	 |    __)  |   |/   \  ___ |    |     |    __)_   |    |     ______     |    | \_____  \ 
	 |     \   |   |\    \_\  \|    |___  |        \  |    |    /_____/ /\__|    | /        \
	 \___  /   |___| \______  /|_______ \/_______  /  |____|            \________|/_______  /
	     \/                 \/         \/        \/                                       \/ 

[![Build Status](https://travis-ci.org/olizilla/figlet-js.png?branch=master)](https://travis-ci.org/olizilla/figlet-js)

[Figlet](http://www.figlet.org/) is a program for making large letters out of ordinary text.

Figlet-JS is a JavaScript implementation of a FIGdriver and is available as a Node module and a jQuery plugin.

For detailed information on fonts for Figlet, check out [the FIGfont documentation](http://www.jave.de/figlet/figfont.html).

Usage
=====

Node
----

	var puts = require("sys").puts;
	var Figlet = require("./lib/figlet-node");
	Figlet.write("node.js", "epic", function(str) {
		puts(str);
	});

jQuery
------

	$("pre").figlet("jQuery", "graffiti");

Written for Marak to support [asciimo](http://github.com/marak/asciimo).