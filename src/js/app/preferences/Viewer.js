define([
		'preferences/Viewer.opt'
	], function(option) {

		var config = option.toJSON();

		var ViewerTabView = Backbone.View.extend({
			el: '#viewer-tab',

			events: {
				'change select[name=viewStyle]': 'changeViewStyle',
				'change select[name=codeStyle]': 'changeCodeStyle',
				'click input[name=clickableLink]': 'clickableLink'	
			},

			initialize: function() {
				this.$el.find('select[name=viewStyle]').select2().select2("val", config.viewStyle);
				this.$el.find('select[name=codeStyle]').select2().select2("val", config.codeStyle);
				
				this.$el.find('input[name=clickableLink]').prop('checked', config.clickableLink);
			},

			changeViewStyle: function(e) {
				option.set({ viewStyle: e.val });
			},

			changeCodeStyle: function(e) {
				option.set({ codeStyle: e.val });
			},

			clickableLink: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('clickableLink', bool);
			}
		});

		return ViewerTabView;

});