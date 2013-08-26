define([
		'tabs/Custom.opt'
	], function(options) {
		var readdir = require('readdir');
		var path = require('path');

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.custom.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		function loadCSSFiles(dir) {
			var csses = readdir.readSync(dir, [ '*.css' ]);
			var themes = [];

			csses.forEach(function(css, idx) {
				themes.push({
					id: idx,
					text: path.basename(css)
				});
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
				this.$('select[name=customTheme]').select2({
                	placeholder: "Select Your Theme",
				});//.select2("val", config.theme);

				this.setPath(config.themeDir);
				this.setThemeData(config.themes || []);
			},

			clearOptions: function() {
				var blankOpt = $('<option>').text('');
				this.$('select[name=customTheme]').empty().append(blankOpt);
			},

			setPath: function(dir) {
				this.$('#custom-theme-path').val(dir);
				this.$('#custom-theme-path').attr('title', dir);
				this.$('#openCustomTheme').attr('nwworkingdir', dir);
			},

			setThemeData: function(themes) {
				var option;

				themes.forEach(function(item) {
					option = $('<option>').attr('value', item.text).text(item.text);
					this.$('select[name=customTheme]').append(option);
				});


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
				var dir = config.themeDir;
				var themes = loadCSSFiles(dir);
				
				options.set({ themes: themes });

				this.clearOptions();
				this.setThemeData(themes);
			},

			changeCustomTheme: function(e) {
				options.set({ theme: e.val });

    			global._gaq.push('haroopad.preferences', 'change.custom.theme', e.val);
			}
		});

		return new ViewerTabView;

});