define([
		'tabs/Editor.opt'
	], function(options) {

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.editor.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		var EditorTabView = Backbone.View.extend({
			el: '#editor-tab',

			events: {
				'change select[name=theme]': 'changeTheme',
				'change select[name=fontSize]': 'changeFontSize',
				'click input[name=displayLineNumber]': 'displayLineNumber',
				'click input[name=vimKeyBinding]': 'vimKeyBinding',
				'click input[name=insertFourSpace]': 'insertFourSpace',
				'click input[name=indentWithTabs]': 'indentWithTabs',
				'click a[data-tab-size]': 'setTabsize',
				'click input[name=autoPairCharacters]': 'autoPairCharacters'
			},

			initialize: function() {
				this.$el.find('select[name=theme]').select2().select2("val", config.theme);
				this.$el.find('select[name=fontSize]').select2().select2("val", config.fontSize);
				
				this.$el.find('input[name=displayLineNumber]').prop('checked', config.displayLineNumber);
				this.$el.find('input[name=vimKeyBinding]').prop('checked', config.vimKeyBinding);
				this.$el.find('input[name=insertFourSpace]').prop('checked', config.insertFourSpace);
				this.$el.find('input[name=autoPairCharacters]').prop('checked', config.autoPairCharacters);
				this.$el.find('input[name=indentWithTabs]').prop('checked', config.indentWithTabs);

				if (config.tabSize) {
					this.activeTabsize(config.tabSize);
				}
			
				options.bind('change:displayLineNumber', function(model, data) {
					this.$el.find('input[name=displayLineNumber]').prop('checked', data);
				}.bind(this));
			},

			changeTheme: function(e) {
				options.set({ theme: e.val });
			},

			changeFontSize: function(e) {
				options.set({ fontSize: e.val });
			},

			displayLineNumber: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('displayLineNumber', bool);
			},

			vimKeyBinding: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('vimKeyBinding', bool);
			},

			insertFourSpace: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('insertFourSpace', bool);
			},

			indentWithTabs: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('indentWithTabs', bool);
			},

			autoPairCharacters: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('autoPairCharacters', bool);
			},

			activeTabsize: function(size) {
				this.$('a[data-tab-size]').removeClass('active');
				this.$('a[data-tab-size='+ size +']').addClass('active');
			},

			setTabsize: function(e) {
				var target = $(e.target);
				var size = $(e.target).data('tab-size');

				this.activeTabsize(size);

				options.set('tabSize', size);
				options.set('indentUnit', size);
			}
		});

		return new EditorTabView;

});