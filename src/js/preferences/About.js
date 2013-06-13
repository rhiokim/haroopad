define([
	], function() {
		var gui = require('nw.gui');
		var shell = gui.Shell;

		var AboutTabView = Backbone.View.extend({
			el: '#about-tab',

			events: {
				'click a': 'clickHandler'
			},

			initialize: function() {
			},

			clickHandler: function(e) {
				var href = $(e.target).attr('href');
				e.preventDefault();
				shell.openExternal(href);
			}
		});

		return new AboutTabView;

});