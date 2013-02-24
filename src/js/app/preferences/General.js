define([
		'preferences/General.opt'
	], function(option) {

		var config = option.toJSON();

		var GeneralTabView = Backbone.View.extend({
			el: '#general-tab',

			events: {
				'click input[name=enableSyncScroll]': 'enableSyncScroll',	
				'click input[name=playKeypressSound]': 'playKeypressSound'	
			},

			initialize: function() {
				this.$el.find('input[name=enableSyncScroll]').prop('checked', config.enableSyncScroll);
				this.$el.find('input[name=playKeypressSound]').prop('checked', config.playKeypressSound);
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