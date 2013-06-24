define([
		'tabs/General.opt'
	], function(options) {

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.general.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

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
				options.set('enableSyncScroll', bool);
			},

			playKeypressSound: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('playKeypressSound', bool);
			}
		});

		return new GeneralTabView;

});