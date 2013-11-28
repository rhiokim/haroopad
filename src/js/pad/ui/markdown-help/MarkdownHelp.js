define([
		'keyboard',
		'vendors/text!tpl/markdown-help.html'
	], 
	function(HotKey, html) {
		$('#md-help #md-help-content').append(html);

		var view, isShow = false;
		var View = Backbone.View.extend({
			el: '#md-help',

			events: {
			},

			initialize: function() {
				this.$el.i18n();
			},

			show: function() {
				this.$el.show();
			},

			hide: function() {
				this.$el.hide();
			},

			toggle: function() {
				this.$el.toggle();
			}
		});

		view = new View;

		HotKey('defmod-shift-h', function() {
			view.toggle();
		});
});