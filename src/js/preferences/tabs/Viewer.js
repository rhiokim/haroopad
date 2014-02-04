define([
	'tabs/Viewer.opt'
], function(options) {
	var readDir = require('readdir');
	var path = require('path');
	var config = options.toJSON();
	var themes = global.THEMES.viewer;

	options.bind('change', function(model) {
		var prop, en,
			data = model.changedAttributes();

		for (prop in data) {
			en = 'preferences.viewer.' + prop;
			window.parent.ee.emit(en, data[prop]);
		}
	});

	function loadCSSFiles(dir) {
		var csses = readDir.readSync(dir, ['*.css'], readDir.CASELESS_SORT);
		var name, themes = {};

		csses.forEach(function(css, idx) {
			name = path.basename(css).replace('.css', '');
			themes[name] = {
				id: idx,
				name: name,
				path: css
			}
		});

		return themes;
	}

	var ViewerTabView = Backbone.View.extend({
		el: '#viewer-tab',

		events: {
			'change select[name=theme]': 'changeViewStyle',
			'change select[name=fontSize]': 'changeFontSize',
			'change select[name=userTheme]': 'changeUserTheme',
			'click input[name=clickableLink]': 'clickableLink',
			'click #openViewerThemeDir': 'openUserThemeDir',
			'click #reloadViewerTheme': 'reloadUserTheme'
		},

		initialize: function() {
			var optEl, themeEl = document.querySelector('#viewer-tab select[name=theme]');

			themes.forEach(function(theme) {
				optEl = document.createElement('option');
				optEl.innerHTML = theme;
				themeEl.appendChild(optEl);
			});

			this.$('select[name=theme]').val(config.theme).select2({
				width: '200px'
			});
			this.$('select[name=fontSize]').val(config.fontSize).select2({
				width: '70px'
			})

			this.$('input[name=clickableLink]').prop('checked', config.clickableLink);

			this.setThemeData(config.userThemes);
		},

		changeViewStyle: function(e) {
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
			var themes = options.get('userThemes');
			var el = $(e.target);
			var theme = themes[el.val()].name;

			config.userTheme = theme;
			options.set({
				userTheme: theme
			});

    	_gaq.push('haroopad.preferences', 'viewer user theme', theme);
		},

		openUserThemeDir: function(e) {
			var theme = this.$('select[name=userTheme]').val();
			this.trigger('open-theme', theme);
		},

		reloadUserTheme: function(e) {
			var theme = this.$('select[name=userTheme]').val();
			var themes = loadCSSFiles(path.join(gui.App.dataPath, 'Themes', 'viewer'));

			options.set({
				userThemes: themes
			});

			this.setThemeData(themes);

			window.parent.ee.emit('preferences.viewer.userTheme', theme);
		},

		setThemeData: function(themes) {
			var prop, option, el = this.$('select[name=userTheme]');

			el.empty();

			for (prop in themes) {
				items = themes[prop];

				option = $('<option>').attr('value', prop).text(prop);
				el.append(option);
			}

			el.val(config.userTheme).select2({
				width: '200px'
			});
		},

		clickableLink: function(e) {
			var bool = $(e.target).is(':checked');
			options.set('clickableLink', bool);
		}
	});

	return new ViewerTabView;

});