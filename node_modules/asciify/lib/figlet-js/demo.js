var Figlet = require("./figlet-node").Figlet;

var puts = require("sys").puts;
Figlet.write("Figlet JS", "standard", function(str) {
	puts(str);
});

