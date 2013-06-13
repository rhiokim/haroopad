define([
		'Viewer.opt'
	], function(option) {

		var config = option.toJSON();

		var ViewerTabView = Backbone.View.extend({
			el: '#viewer-tab',

			events: {
				'change select[name=viewStyle]': 'changeViewStyle',
				'click input[name=clickableLink]': 'clickableLink'	
			},

			initialize: function() {
				this.$el.find('select[name=viewStyle]').select2().select2("val", config.viewStyle);
				
				this.$el.find('input[name=clickableLink]').prop('checked', config.clickableLink);
			},

			changeViewStyle: function(e) {
				option.set({ viewStyle: e.val });
			},

			clickableLink: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('clickableLink', bool);
			}
		});

		return new ViewerTabView;

});