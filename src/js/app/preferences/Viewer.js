define([
		'preferences/Viewer.opt'
	], function(option) {

		var ViewerTabView = Backbone.View.extend({
			el: '#viewer-tab',

			events: {
				'change select[name=viewStyle]': 'changeViewStyle',
				'change select[name=codeStyle]': 'changeCodeStyle',
				'click input[name=clickableLink]': 'clickableLink'	
			},

			initialize: function() {
				this.$el.find('select').select2();
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