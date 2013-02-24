define([
		'preferences/General.opt'
	], function(option) {

		var GeneralTabView = Backbone.View.extend({
			el: '#general-tab',

			events: {
				'click input[name=enableSyncScroll]': 'enableSyncScroll',	
				'click input[name=playKeypressSound]': 'playKeypressSound'	
			},

			initialize: function() {
			},

			enableSyncScroll: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('enableSyncScroll', bool);
			},

			playKeypressSound: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('playKeypressSound', bool);
			}
		});

		return GeneralTabView;

});