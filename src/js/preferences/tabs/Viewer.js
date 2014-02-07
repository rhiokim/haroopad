define([
	'tabs/Viewer.opt'
], function(options) {
	var readDir = require('readdir');
	var path = require('path');
	var config = options.toJSON();

	var themes = global.THEMES.viewer;
	var themesUser = global.THEMES.user.viewer;

  var _gaq = global._gaq;

	options.bind('change', function(model) {
		var prop, en,
			data = model.changedAttributes();

		for (prop in data) {
			en = 'preferences.viewer.' + prop;
			window.parent.ee.emit(en, data[prop]);
		}
	});

	function reload() {
		//FIXME: dependency
		themesUser = global.THEMES.user.viewer = loadCSSFiles(global.PATHS.theme_dest_viewer);
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

			this.setThemeData(themesUser);

			this.$('select[name=theme]').val(config.theme).select2({
				width: '200px'
			});
			this.$('select[name=fontSize]').val(config.fontSize).select2({
				width: '70px'
			})

			this.$('input[name=clickableLink]').prop('checked', config.clickableLink);
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
			var el = $(e.target);
			var theme = el.val();

			options.set({
				userTheme: theme
			});

    	_gaq.push('haroopad.preferences', 'viewer user theme', theme);
		},

		openUserThemeDir: function(e) {
			this.trigger('open-theme', options.get('userTheme'));
		},

		reloadUserTheme: function(e) {
			reload();

			this.setThemeData(themesUser);

			window.parent.ee.emit('preferences.viewer.userTheme', options.get('userTheme'));
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

		clickableLink: function(e) {
			var bool = $(e.target).is(':checked');
			options.set('clickableLink', bool);
		}
	});

	return new ViewerTabView;

});