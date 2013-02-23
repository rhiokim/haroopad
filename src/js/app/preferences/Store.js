define([
		// 'store'
	], function() {

		// var general = store.get('general') || { enableSyncScroll: false },
		// 		editor = store.get('editor'),
		// 		viewer = store.get('viewer'),
		// 		helper = store.get('helper'),
		// 		parser = store.get('parser'),
		// 		external = store.get('external');

		var Editor = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				displayLineNumber: false,
				vimKeyBinding: false,
				insertFourSpace: false,
				autoPairCharacters: true
			},
			localStorage: new Backbone.LocalStorage('Editor')
		});

		var Viewer = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				codeTheme: 'default',
				clickableLink: false
			},
			localStorage: new Backbone.LocalStorage('Viewer')
		});

		var Helper = Backbone.Model.extend({
			defaults: {
				youtube: true,
				slideshare: true,
				vimeo: true,
				jsfiddle: true,
				tweet: true,
				gist: true
			},
			localStorage: new Backbone.LocalStorage('Helper')
		});

		var Parser = Backbone.Model.extend({
			defaults: {},
			localStorage: new Backbone.LocalStorage('Parser')
		});

		var External = Backbone.Model.extend({
			defaults: {},
			localStorage: new Backbone.LocalStorage('External')
		});

		return {
			general : new General(),
			editor : new Editor(),
			viewer : new Viewer(),
			helper : new Helper(),
			parser : new Parser(),
			external : new External()
		};

});