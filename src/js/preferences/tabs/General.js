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
				'click input[name=enableAutoComplete]': 'enableAutoComplete',	
				'click input[name=enableMath]': 'enableMath',	
				'click input[name=enableSyncScroll]': 'enableSyncScroll',	
				'click input[name=enableLastFileRestore]': 'enableLastFileRestore',
				'click input[name=playKeypressSound]': 'playKeypressSound',
				'change select[name=displayLanguage]': 'changeDisplayLanguage'
			},

			initialize: function() {
				this.$('input[name=enableAutoComplete]').prop('checked', config.enableAutoComplete);
				this.$('input[name=enableMath]').prop('checked', config.enableMath);
				this.$('input[name=enableSyncScroll]').prop('checked', config.enableSyncScroll);
				this.$('input[name=enableLastFileRestore]').prop('checked', config.enableLastFileRestore);
				this.$('input[name=playKeypressSound]').prop('checked', config.playKeypressSound);

				this.$('select[name=displayLanguage]').select2({
					width: '180px'
				}).select2('val', config.displayLanguage);
			},

			enableAutoComplete: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableAutoComplete', bool);
			},

			enableMath: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableMath', bool);
			},

			enableSyncScroll: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableSyncScroll', bool);
			},

			enableLastFileRestore: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('enableLastFileRestore', bool);
			},

			changeDisplayLanguage: function(e) {
				options.set('displayLanguage', e.val);
			},

			playKeypressSound: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('playKeypressSound', bool);
			}
		});

		return new GeneralTabView;

});