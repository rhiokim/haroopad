define([
		'vendors/keyboard',
		'text!tpl/menu.html'
	], function(keyboard, html) {

	keyboard.on('ctrl + b', function() {
		alert('show menu');
	});

});