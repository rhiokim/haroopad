var test = require('tap').test;
var asciify = require('../');

test("Check it works at all", function (t) {

	t.plan(4);

	// Did any fonts go missing?
	asciify.getFonts(function (err, fonts){
		t.equal(fonts.length, 147, 'We should have 147 fonts');
	});

	// A simple line-noise style comparison of asciified result with raw string
	asciify('A', function(err, res){
		t.equal(res, '   _____   \n  /  _  \\  \n /  /_\\  \\ \n/    |    \\\n\\____|__  /\n        \\/ \n', 'A should have been asciified with the graphiti font');
	});

	// A crazyballs multiline hack style comparison, so the user may have some idea what's being compared. Neither is that readable.
	asciify('B', '3-d', function(err, res){
		t.equal(
			res,
			multilinehack(function(){/*
 ******  
/*////** 
/*   /** 
/******  
/*//// **
/*    /**
/******* 
///////  

*/}),
			'B should have been rendered in the 3-d figlet font'
		);
	});

	asciify('nosuch font', { font: 'nosuch' }, function(err, res){
		t.ok(err);
	});
});

// The font option is optional (obviously) and should default sensibly if a falsy value is passed
test("Check asciify defaults font option correctly", function (t) {

	var expected = multilinehack(function(){/*
        
_____   
\__  \  
 / __ \_
(____  /
     \/ 

*/});

	var fonts = [null, undefined, '', false, 0, NaN];
	
	t.plan(fonts.length * 2);
	
	fonts.forEach(function(font) {
		asciify('a', {font: font}, function(err, res){
			t.notOk(err);
			t.equal(res, expected, '"a" should have been rendered in the graffiti figlet font');
		});
	});
	
});

test("Check asciify ensures text is a string", function (t) {
	
	t.plan(3);
	
	asciify(138, 'pyramid', function(err, res){
		t.equal(
			res,
			multilinehack(function(){/*
  ^    ^    ^  
 /1\  /3\  /8\ 
<___><___><___>

*/}),
			'138 should have been rendered in the pyramid figlet font'
		);
	});
	
	asciify(false, 'pyramid', function(err, res){
		t.equal(
			res,
			multilinehack(function(){/*
  ^    ^    ^    ^    ^  
 /f\  /a\  /l\  /s\  /e\ 
<___><___><___><___><___>

*/}),
			'false should have been rendered in the pyramid figlet font'
		);
	});
	
	asciify(undefined, 'pyramid', function(err, res){
		t.equal(
			res,
			multilinehack(function(){/*
  ^    ^    ^    ^    ^    ^    ^    ^    ^  
 /u\  /n\  /d\  /e\  /f\  /i\  /n\  /e\  /d\ 
<___><___><___><___><___><___><___><___><___>

*/}),
			'undefined should have been rendered in the pyramid figlet font'
		);
	});
	
});

test("Check asciify errors if font name is not a string", function (t) {

	t.plan(2);

	asciify('OMG', {font: 10}, function(err, res){
		t.assert(err, 'Passing in 10 as the font name should cause an error');
	});

	asciify('OMG', 10, function(err, res){
		t.assert(err, 'Passing in 10 as the options object should cause an error');
	});
});

test("Check maxWidth option truncates output", function (t) {

	t.plan(1);

	asciify('OMG WTF BBQ', {maxWidth: 80}, function(err, res){
		t.equal(
			res,
			multilinehack(function () {/*
________      _____     ________   __      __ ______________________ __________ 
\_____  \    /     \   /  _____/  /  \    /  \\__    ___/\_   _____/ \______   \
 /   |   \  /  \ /  \ /   \  ___  \   \/\/   /  |    |    |    __)    |    |  _/
/    |    \/    Y    \\    \_\  \  \        /   |    |    |     \     |    |   \
\_______  /\____|__  / \______  /   \__/\  /    |____|    \___  /     |______  /
        \/         \/         \/         \/                   \/             \/ 

*/}),
			'OMG WTF BBQ should have been asciified and truncated to 80'
		);	
	});
});

// Helper to make the tests more "readable"
function multilinehack(mess){
	// Crazyballs multiline hack courtesy of: https://github.com/isaacs/node-tap/blob/69d721718acc56b5c8ae5875cf8d9bf53f7d5016/bin/tap.js#L58
	return mess.toString().split(/\n/).slice(1, -1).join("\n");
}
