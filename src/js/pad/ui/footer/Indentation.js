define(function() {

	var Intentation = Backbone.View.extend({
		el: 'footer #indentation',

		events: {
			'click': 'clickHandler',
			'click a[data-tab-size]': 'changeTabSize',
			'click a[data-using-tab]': 'toggleIndentUsingTab'
		},

		initialize: function() {
		},
		
		clickHandler: function(e) {
			this.trigger('click');
		},

		selectTabSize: function(size) {
			this.$('a[data-tab-size]').removeClass('active');
			this.$('a[data-tab-size='+ size +']').addClass('active');
		},

		checkUseTab: function(use) {
			var target = this.$('a[data-using-tab]');
			use ? target.addClass('active') : target.removeClass('active');
		},

		changeTabSize: function(e) {
			var target = $(e.target);
			var tabSize = target.data('tab-size');

			this.selectTabSize(tabSize);

			this.trigger('change', tabSize);
		},

		toggleIndentUsingTab: function(e) {
			var target = $(e.target);
			var use = target.hasClass('active');

			use = !use;
			this.checkUseTab(use);
			
			this.trigger('use.tab', use);
		}
	});

	return new Intentation;
});