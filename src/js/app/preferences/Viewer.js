define([
		'preferences/Viewer.opt'
	], function(option) {

		var ViewerTabView = Backbone.View.extend({
			el: '#viewer-tab',

			events: {
				'click input[name=enableSyncScroll]': 'enableSyncScroll'	
			},

			initialize: function() {
				console.log(option.toJSON());
			},

			enableSyncScroll: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('enableSyncScroll', bool);
			}
		});

		return ViewerTabView;

});