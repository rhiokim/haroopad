define([
	'tabs/Editor.opt'
], function(options) {
	var readDir = require('readdir');
	var path = require('path');
	var config = options.toJSON();

	var themes = global.THEMES.editor;
	var themesUser = global.THEMES.user.editor;

  var _gaq = global._gaq;

	options.bind('change', function(model) {
		var prop, en,
			data = model.changedAttributes();

		for (prop in data) {
			en = 'preferences.editor.' + prop;
			window.parent.ee.emit(en, data[prop]);
		}
	});

	function reload() {
		themesUser = loadCSSFiles(global.PATHS.theme_dest_editor);
	}

	function loadCSSFiles(dir) {
		var csses = readDir.readSync(dir, ['*.css'], readDir.CASELESS_SORT);
		var name, themes = [];

		csses.forEach(function(css, idx) {
			name = path.basename(css).replace('.css', '');
			themes.push(name);
		});

		return themes;
	}

	var EditorTabView = Backbone.View.extend({
		el: '#editor-tab',

		events: {
			'change select[name=theme]': 'changeTheme',
			'change select[name=fontSize]': 'changeFontSize',
			'change select[name=userTheme]': 'changeUserTheme',
			'click input[name=displayLineNumber]': 'displayLineNumber',
			'click input[name=displayActiveLine]': 'displayActiveLine',
			'click input[name=vimKeyBinding]': 'vimKeyBinding',
			'click input[name=indentWithTabs]': 'indentWithTabs',
			'click input[name=autoPairCharacters]': 'autoPairCharacters',
			'click a[data-tab-size]': 'setTabsize',
			'click #openUserThemeDir': 'openUserThemeDir',
			'click #reloadUserTheme': 'reloadUserTheme'
		},

		initialize: function() {
			var optEl, themeEl = document.querySelector('#editor-tab select[name=theme]');

			themes.forEach(function(theme) {
				optEl = document.createElement('option');
				optEl.innerHTML = theme;
				themeEl.appendChild(optEl);
			});

			this.setThemeData(themesUser);

			this.$('select[name=theme]').val(config.theme).select2({
				width: '200px'
			});
			this.$('select[name=fontSize]').val(config.fontSize).select2({
				width: '70px'
			});

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
			options.set({
				theme: e.val
			});
		},

		changeFontSize: function(e) {
			options.set({
				fontSize: Number(e.val)
			});
		},

		changeUserTheme: function(e) {
			var el = $(e.target);
			var theme = el.val();

			options.set({
				userTheme: theme
			});

    	_gaq.push('haroopad.preferences', 'editor user theme', theme);
		},

		openUserThemeDir: function(e) {
			this.trigger('open-theme', options.get('userTheme'));
		},

		reloadUserTheme: function(e) {
			reload();

			this.setThemeData(themesUser);

			window.parent.ee.emit('preferences.editor.userTheme', options.get('userTheme'));
		},

		setThemeData: function(themes) {
			var optEl, el = this.$('select[name=userTheme]');

			el.empty();

			themes.forEach(function(theme) {
				optEl = document.createElement('option');
				optEl.innerHTML = theme;
				el.append(optEl);
			});

			el.val(options.get('userTheme')).select2({
				width: '200px'
			});
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
			this.$('a[data-tab-size=' + size + ']').addClass('active');
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