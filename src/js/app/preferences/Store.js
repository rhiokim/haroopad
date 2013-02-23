define([
		'module',
		'store'
	], function(module, store) {

		var general = store.get('general') || { enableSyncScroll: false },
				editor = store.get('editor'),
				viewer = store.get('viewer'),
				helper = store.get('helper'),
				parser = store.get('parser'),
				external = store.get('external');

		var General = Backbone.Model.extend({
			defaults: {
				enableSyncScroll: true,
				playKeypressSound: false
			}
		});

		var Editor = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				displayLineNumber: false,
				vimKeyBinding: false,
				insertFourSpace: false,
				autoPairCharacters: true
			}
		});

		var Viewer = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				codeTheme: 'default',
				clickableLink: false
			}
		});

		var Helper = Backbone.Model.extend({
			defaults: {
				youtube: true,
				slideshare: true,
				vimeo: true,
				jsfiddle: true,
				tweet: true,
				gist: true
			}
		});

		var Parser = Backbone.Model.extend({
			defaults: {}
		});

		var External = Backbone.Model.extend({
			defaults: {}
		});

		module.exports = {
			general : new General(general),
			editor : new Editor(editor),
			viewer : new Viewer(viewer),
			helper : new Helper(helper),
			parser : new Parser(parser),
			external : new External(external)
		};

});