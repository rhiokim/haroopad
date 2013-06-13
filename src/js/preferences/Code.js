define([
		'Code.opt'
	], function(option) {

		var config = option.toJSON();

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