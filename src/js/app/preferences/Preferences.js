define([
		'module',
		'vendors/keyboard',
		'text!tpl/preferences.html'
	], function(module, keyboard, html) {

		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			// el: '#dialogs',

			// events: {
			// 	'click ._preferences': 'clickHandler'	
			// },

			initialize: function() {

				keyboard.on('super + i', function(e) {
					$('._preferences').modal('show');
				});

			},

			clickHandler: function() {
			}
		});

		module.exports = new View();

});