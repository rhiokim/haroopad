define([
	'editor/Editor'
	], function(Editor) {

		var humanize = require('humanize');

	var State = Backbone.View.extend({
		el: 'footer .navbar-inner',

		events: {
			'mouseover #elementsInfo': 'hoverHandler'
		},

		initialize: function() {
			this.lineCount = this.$('#lineCount>span');
			this.wordCount = this.$('#wordCount>span');
			this.cursorPos = this.$('#cursorActivity');

			Editor.on('update', this.updateHandler.bind(this));
			Editor.on('cursorActivity', this.cursorActivity.bind(this));

			this.update({
				header: 0,
				paragraph: 0,
				link: 0,
				image: 0,
				code: 0,
				blockquote: 0,
				table: 0/*,
				page: 0*/
			});
		},

		hoverHandler: function(e) {
			this.trigger('hover');
		},

		updateHandler: function(cm) {
			var lineCnt = cm.lineCount();
			var line = humanize.numberFormat(lineCnt, 0);
			var word = humanize.numberFormat(cm.getValue().length, 0);
			this.lineCount.text(line);
			this.wordCount.text(word - lineCnt + 1);
		},

		cursorActivity: function(cm) {
			var pos = cm.getCursor();
			var line = humanize.numberFormat(pos.line+1, 0);
			var word = humanize.numberFormat(pos.ch, 0);
			this.cursorPos.text('('+ line + ' : ' + word +')');
		},

		update: function(dom) {
			var val = '', key = '', prop;
			// dom.page = humanize.numberFormat(dom.page, 1);

			for(prop in dom) {

				if (dom[prop] == 0) {
					continue;
				}

				key += prop +'<br>';
				val += '<b>'+ dom[prop] +'</b><br/>';
			}

			key = '<div class="pull-left text-right">'
					+ key
					+ '</div><i class="clearfix"></i>';
			val = '<div class="pull-right text-left" style="padding-left: 5px;">'
					+ val
					+ '</div>';

			this.$('#elementsInfo').popover('destroy');
			this.$('#elementsInfo').popover({
				html: true,
				trigger: 'hover',
				title: 'current state',
				placement: 'top',
				content: val+key
			});
		}
	});

	return new State;
});