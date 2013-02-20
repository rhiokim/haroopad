define([
		'module',
		'text!tpl/preferences.html',
		'keyboard'
	], function(module, html, HotKey) {

		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			// el: '#dialogs',

			// events: {
			// 	'click ._preferences': 'clickHandler'	
			// },

			initialize: function() {

				HotKey('super-,', function(e) {
					$('._preferences').modal('show');
				});

			},

			clickHandler: function() {
			}
		});

		module.exports = new View();

});