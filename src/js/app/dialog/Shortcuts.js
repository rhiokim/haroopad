define([
		'vendors/text!tpl/modal-shortcuts.html',
		'keyboard'
	], 
	function(html, HotKey) {
		$('#dialogs').append(html);
		
		loadCss('css/keys.css');

		var View = Backbone.View.extend({
			el: '#shortcuts-dialog',

			events: {
			},

			initialize: function() {
				HotKey('defmod-ctrl-k', this.show.bind(this));
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