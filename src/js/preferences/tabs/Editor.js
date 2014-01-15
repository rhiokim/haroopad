define([
		'tabs/Editor.opt'
	], function(options) {
  	var css = require('css');

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
				'keyup textarea[name=userStyle]': 'changeUserStyle',
				'click input[name=displayLineNumber]': 'displayLineNumber',
				'click input[name=displayActiveLine]': 'displayActiveLine',
				'click input[name=vimKeyBinding]': 'vimKeyBinding',
				'click input[name=indentWithTabs]': 'indentWithTabs',
				'click a[data-tab-size]': 'setTabsize',
				'click input[name=autoPairCharacters]': 'autoPairCharacters'
			},

			initialize: function() {
				this.$('select[name=theme]').val(config.theme).select2({
					width: '200px'
				});
				this.$('select[name=fontSize]').val(config.fontSize).select2();
				
				this.$('input[name=displayLineNumber]').prop('checked', config.displayLineNumber);
				this.$('input[name=displayActiveLine]').prop('checked', config.displayActiveLine);
				this.$('input[name=vimKeyBinding]').prop('checked', config.vimKeyBinding);
				this.$('input[name=autoPairCharacters]').prop('checked', config.autoPairCharacters);
				this.$('input[name=indentWithTabs]').prop('checked', config.indentWithTabs);

				if (config.tabSize) {
					this.activeTabsize(config.tabSize);
				}
			
				options.bind('change:displayLineNumber', function(model, data) {
					this.$('input[name=displayLineNumber]').prop('checked', data);
				}.bind(this));
			},

			changeTheme: function(e) {
				options.set({ theme: e.val });
			},

			changeFontSize: function(e) {
				options.set({ fontSize: Number(e.val) });
			},

			changeUserStyle: function(e) {
				clearTimeout(this._tid);

				this._tid = setTimeout(function() {
					options.set({ userStyle: e.target.value });
				}, 800);
			},

			displayLineNumber: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('displayLineNumber', bool);
			},

			displayActiveLine: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('displayActiveLine', bool);
			},

			vimKeyBinding: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('vimKeyBinding', bool);
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