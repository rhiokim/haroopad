define([
	'editor/Editor'
	], function(Editor) {

	var Footer = Backbone.View.extend({
		el: 'footer .navbar-inner',

		events: {
		},

		initialize: function() {
			this.lineCount = this.$('#lineCount>span');
			this.wordCount = this.$('#wordCount>span');
			this.cursorPos = this.$('#cursorActivity');

			Editor.on('update', this.updateHandler.bind(this));
			Editor.on('cursorActivity', this.cursorActivity.bind(this));
		},

		updateHandler: function(cm) {
			this.lineCount.text(cm.lineCount());
			this.wordCount.text(cm.getValue().length);
		},

		cursorActivity: function(cm) {
			var pos = cm.getCursor();
			this.cursorPos.text(pos.line + ':' + pos.ch);
		}
	});

	new Footer;
});