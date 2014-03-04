define([
		'tabs/Code.opt'
	], function(options) {

		var config = options.toJSON();
		var themes = global.THEMES.code;

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.code.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		var ViewerTabView = Backbone.View.extend({
			el: '#code-tab',

			events: {
				'change select[name=codeStyle]': 'changeCodeStyle',
				'click input[name=diplayLineNumber]': 'displayLineNumber'	
			},

			initialize: function() {
				var optEl, themeEl = document.querySelector('#code-tab select[name=codeStyle]');

				themes.forEach(function(theme) {
					optEl = document.createElement('option');
					optEl.innerHTML = theme;
					themeEl.appendChild(optEl);
				});

				this.$('select[name=codeStyle]').val(config.theme).select2({
					width: '200px'
				});

				this.$('input[name=displayLineNumber]').prop('checked', config.displayLineNumber);
			},

			changeCodeStyle: function(e) {
				options.set({ theme: e.val });
			},

			displayLineNumber: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('displayLineNumber', bool);
			}
		});

		return new ViewerTabView;

});