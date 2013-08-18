define(function() {

	var Intentation = Backbone.View.extend({
		el: 'footer #indentation',

		events: {
			'click a[data-tab-size]': 'changeTabSize',
			'click a[data-using-tab]': 'toggleIndentUsingTab'
		},

		initialize: function() {
		},

		changeTabSize: function(e) {
			var target = $(e.target);
			var tabSize = target.data('tab-size');

			this.$('a[data-tab-size]').removeClass('active');
			target.addClass('active');

			this.trigger('change', tabSize);
		},

		toggleIndentUsingTab: function(e) {
			var target = $(e.target);
			var use = target.hasClass('active');

			use = !use;
			use ? target.addClass('active') : target.removeClass('active');

			this.trigger('use.tab', use);
		}
	});

	return new Intentation;
});