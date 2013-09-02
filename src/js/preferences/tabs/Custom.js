define([
		'tabs/Custom.opt'
	], function(options) {
		var readdir = require('readdir');
		var path = require('path');

		var config = options.toJSON() || {};

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.custom.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		function loadCSSFiles(dir) {
			var csses = readdir.readSync(dir, [ '*.css' ], readdir.ABSOLUTE_PATHS + readdir.CASELESS_SORT);
			var name, themes = {};

			csses.forEach(function(css, idx) {
				name = path.basename(css).replace('.css','');
				themes[name] = {
					id: idx,
					name: name,
					path: css
				}
			});

			return themes;
		}

		var ViewerTabView = Backbone.View.extend({
			el: '#custom-tab',

			events: {
				'change select[name=customTheme]': 'changeCustomTheme',
				'click #custom-theme-open': 'openDirWindow',
				'click #custom-theme-reload': 'reloadThemes',
				'change #openCustomTheme': 'changeDir'
			},

			initialize: function() {
				this.setPath(config.themeDir);
				this.setThemeData(config.themes || []);

				this.$('select[name=customTheme]').select2({
                	placeholder: "Select Your Theme",
				}).select2("val", config.theme && config.theme.name);
			},

			clearOptions: function() {
				var blankOpt = $('<option>').text('');
				var clearOpt = $('<option>').attr('name', 'not-select').text('Not Select');
				this.$('select[name=customTheme]').empty().append(blankOpt);
				this.$('select[name=customTheme]').append(clearOpt);
			},

			setPath: function(dir) {
				this.$('#custom-theme-path').val(dir);
				this.$('#custom-theme-path').attr('title', dir);
				this.$('#openCustomTheme').attr('nwworkingdir', dir);
			},

			setThemeData: function(themes) {
				var prop, option, item;

				this.clearOptions();

				for(prop in themes) {
					items = themes[prop];

					option = $('<option>').attr('value', prop).text(prop);
					this.$('select[name=customTheme]').append(option);
				}

				this.$('select[name=customTheme]').select2({
                	placeholder: "Select Your Theme",
				});
			},

			openDirWindow: function(e) {
				this.$('#openCustomTheme').trigger('click');
			},

			changeDir: function(e) {
				var dir = $(e.target).val();
				var themes;

				themes = loadCSSFiles(dir);
				
				options.set({ themes: themes });
				options.set({ themeDir: dir });

				this.setPath(dir);
				this.setThemeData(themes);

    			global._gaq.push('haroopad.preferences', 'change.custom.dir', '');
			},

			reloadThemes: function(e) {
				var dir = options.get('themeDir');
				var themes = loadCSSFiles(dir);
				
				options.set({ themes: themes });

				this.setThemeData(themes);
			},

			changeCustomTheme: function(e) {
				var themes = options.get('themes');
				var el = $(e.target);

				//not select theme
				if (el.attr('name') == 'not-select') {
					options.set({ theme: {} });
					return;
				}

				options.set({ theme: themes[e.val] });

    			global._gaq.push('haroopad.preferences', 'change.custom.theme', e.val);
			}
		});

		return new ViewerTabView;

});