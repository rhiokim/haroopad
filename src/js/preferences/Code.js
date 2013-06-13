define([
		'Code.opt'
	], function(options) {

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.code.'+ prop;
				window.parent.win.emit(en, data[prop]);
			}
		});

		var ViewerTabView = Backbone.View.extend({
			el: '#code-tab',

			events: {
				'change select[name=codeStyle]': 'changeCodeStyle',
				'click input[name=diplayLineNumber]': 'displayLineNumber'	
			},

			initialize: function() {
				this.$el.find('select[name=codeStyle]').select2().select2("val", config.viewStyle);

				this.$el.find('input[name=displayLineNumber]').prop('checked', config.displayLineNumber);
			},

			changeCodeStyle: function(e) {
				option.set({ codeStyle: e.val });
			},

			displayLineNumber: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('displayLineNumber', bool);
			}
		});

		return new ViewerTabView;

});