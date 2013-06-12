define([
		'context/search/Google'
	],
	function(Google) {

		var gui = require('nw.gui'),
	        win = gui.Window.get();
		var Search = new gui.Menu();

		Search.append(Google);

		return Search;
	});