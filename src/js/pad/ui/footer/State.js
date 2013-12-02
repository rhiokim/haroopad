define([
	'editor/Editor'
	], function(Editor) {

		var humanize = require('humanize');

		function _count () {
		    var doc = nw.editor.getDoc();
		    var trimmed = doc.getValue();

		    /**
		     * Most of the performance improvements are based on the works of @epmatsw.
		     *
		     * @see <http://goo.gl/SWOLB>
		     */

		    return {
		      paragraphs: trimmed ? (trimmed.match(/\n+/g) || []).length + 1 : 0,
		      words: trimmed ? (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0
		    }
		  }

	var State = Backbone.View.extend({
		el: 'footer .navbar-inner',

		events: {
			'mouseover #elementsInfo': 'hoverHandler'
		},

		initialize: function() {
			this.lineCount = this.$('#lineCount ._cnt');
			this.wordCount = this.$('#wordCount ._cnt');
			// this.paraCount = this.$('#paraCount ._cnt');
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
			var count = _count();
			var lineCnt = cm.lineCount();
			var wordCnt = cm.getValue().length || 0;
			var line = humanize.numberFormat(lineCnt, 0);
			var word = humanize.numberFormat(count.words, 0);


			this.lineCount.text(line);
			this.wordCount.text(word);
			// this.paraCount.text(count.paragraphs);
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

				key += i18n.t('pad:state.'+ prop) +'<br>';
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
				title: i18n.t('pad:state.label'),
				placement: 'top',
				content: val+key,
				animation: false
			});
		}
	});

	return new State;
});