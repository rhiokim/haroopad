/*
   _____     __________________  .___ .___ ________________.___.._.
  /  _  \   /   _____/\_   ___ \ |   ||   |\_   _____/\__  |   || |
 /  /_\  \  \_____  \ /    \  \/ |   ||   | |    __)   /   |   || |
/    |    \ /        \\     \____|   ||   | |     \    \____   | \|
\____|__  //_______  / \______  /|___||___| \___  /    / ______| __
        \/         \/         \/                \/     \/        \/     

Usage: node example.js
*/

var asciify = require('../');

asciify.getFonts(function (err, fonts) {
	console.log('Available fonts',fonts);
});

asciify('ASCIIFY!', {color: 'green'}, function (err, result) {
	console.log('\nASCIIFY!\n' + result);
});

asciify('Got   Fonts?', '3-d', function (err, result) {
	console.log('\nGot Fonts?\n' + result);
});

asciify('What the fudge', {font: 'larry3d', maxWidth: 90 }, function (err, result) {
  console.log('\nWhat The\n' + result);
});