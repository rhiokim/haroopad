var figlet = require("../figlet-node.js").Figlet;

module.exports = {
	
	// Figlet should replace uknown characters in the font with an unknown character character - a space character
	// TODO: Expose unknown character character as an option?
	"Test render unknown characters": function (test) {
		
		test.expect(2);
		
		figlet.write("(ノಠ益ಠ)ノ彡", "graffiti", function (er, text) {
			test.ifError(er);
			test.equal("    ___      ___      \n   /  /      \\  \\     \n  /  /        \\  \\    \n (  (          )  )   \n  \\  \\        /  /    \n   \\__\\      /__/     \n", text);
			test.done();
		});
	},
	
	"Test render empty string": function (test) {
		
		test.expect(2);
		
		figlet.write("", "standard", function (er, text) {
			test.ifError(er);
			test.strictEqual("", text);
			test.done();
		});
	},
	
	"Test render undefined": function (test) {
		
		test.expect(2);
		
		figlet.write(undefined, "standard", function (er, text) {
			test.ifError(er);
			test.strictEqual("", text);
			test.done();
		});
	},
	
	"Test render null": function (test) {
		
		test.expect(2);
		
		figlet.write(null, "standard", function (er, text) {
			test.ifError(er);
			test.strictEqual("", text);
			test.done();
		});
	},
	
	"Test render false": function (test) {
		
		test.expect(2);
		
		figlet.write(false, "standard", function (er, text) {
			test.ifError(er);
			test.strictEqual("", text);
			test.done();
		});
	}
};