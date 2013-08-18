define([
	'editor/Editor'
	], function(Editor) {

		var humanize = require('humanize');

	var Status = Backbone.View.extend({
		el: 'footer .navbar-inner',

		events: {
		},

		initialize: function() {
			this.lineCount = this.$('#lineCount>span');
			this.wordCount = this.$('#wordCount>span');
			this.cursorPos = this.$('#cursorActivity');

			Editor.on('update', this.updateHandler.bind(this));
			Editor.on('cursorActivity', this.cursorActivity.bind(this));

			this.$('#elementsInfo').popover({
				html: true,
				title: 'Current',
				// trigger: 'hover',
				placement: 'top',
				content: 'header: 43<br/>'
						+ 'boild: 14<br/>'
						+ 'italic: 3<br/>'
						+ 'blockquote: 3<br/>'
						+ 'img: 4<br/>'
						+ 'paragraph: 332<br/>'
						+ 'link: 72<br/>'
						+ 'table: 3<br/>'
						+ 'code: 8'
			})
		},

		updateHandler: function(cm) {
			var line = humanize.numberFormat(cm.lineCount(), 0);
			var word = humanize.numberFormat(cm.getValue().length, 0);
			this.lineCount.text(line);
			this.wordCount.text(word);
		},

		cursorActivity: function(cm) {
			var pos = cm.getCursor();
			var line = humanize.numberFormat(pos.line+1, 0);
			var word = humanize.numberFormat(pos.ch, 0);
			this.cursorPos.text('('+ line + ' : ' + word +')');
		}
	});

	new Status;
});