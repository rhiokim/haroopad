define([
		'tabs/Markdown.opt'
	], function(options) {
		var gui = require('nw.gui');
		var shell = gui.Shell;

		var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.markdown.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		var MarkdownTabView = Backbone.View.extend({
			el: '#markdown-tab',

			events: {
				'click a': 'clickHandler',
				'click input[name=gfm]': 'enableGFM',	
				'click input[name=sanitize]': 'enableSanitize',	
				'click input[name=tables]': 'enableTables',	
				'click input[name=breaks]': 'enableBreaks',	
				'click input[name=smartLists]': 'enableSmartLists',	
				'click input[name=smartypants]': 'enableSmartyPants',	
				'click input[name=mathjax]': 'enableMathjax'	
			},

			initialize: function() {
				this.$el.find('input[name=gfm]').prop('checked', config.gfm);
				this.$el.find('input[name=sanitize]').prop('checked', config.sanitize);
				this.$el.find('input[name=tables]').prop('checked', config.tables);
				this.$el.find('input[name=breaks]').prop('checked', config.breaks);
				this.$el.find('input[name=smartLists]').prop('checked', config.smartLists);
				this.$el.find('input[name=smartypants]').prop('checked', config.smartypants);
				this.$el.find('input[name=mathajx]').prop('checked', config.mathjax);
			},

			clickHandler: function(e) {
				var href = $(e.target).attr('href');
				e.preventDefault();
				shell.openExternal(href);
			},

			enableGFM: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('gfm', bool);
			},

			enableSanitize: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('sanitize', bool);
			},

			enableTables: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('tables', bool);
			},

			enableBreaks: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('breaks', bool);
			},

			enableSmartLists: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('smartLists', bool);
			},

			enableSmartyPants: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('smartypants', bool);
			},

			enableMathjax: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('mathjax', bool);
			}
		});

		return new MarkdownTabView;

});