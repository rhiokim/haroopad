define([
		'vendors/keyboard',
		'text!tpl/menu.html'
	], function(keyboard, html) {

	keyboard.on('ctrl + ,', function() {
		alert('open file');
	});

});