define([
		'text!tpl/modal-shortcuts.html'
	], 
	function(html, HotKey) {
		$('#dialogs').append(html);
		
		loadCss('css/keys.css');

		var View = Backbone.View.extend({
			el: '#shortcuts-dialog',

			events: {
			},

			initialize: function() {
			},

			show: function() {
				this.$el.modal('show');
			},

			hide: function() {
				this.$el.modal('hide');
			}
		});

		return View;
});