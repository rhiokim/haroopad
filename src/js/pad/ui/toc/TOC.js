define([
	'keyboard',
	'ui/toc/TocElement'
], function(HotKey, TocElement) {

	var stringEx = require('stringex');

	var iframe = $('#viewer iframe')[0];
	var _viewer = iframe.contentWindow;
	var _viewerDoc = iframe.contentDocument;
	var _md_body = _viewerDoc.getElementById('root')
	var $pad = $('#main');
	var tocEl = $('#main > aside#toc');
	var tocContentEl = tocEl.find('#toc-content');
	var isShow = false;
	var previewContentsElt = undefined;
	var mdSectionList = [];

	// Transform flat list of TocElement into a tree
	function groupTags(array, level) {
		level = level || 1;
		var tagName = "H" + level;
		var result = [];

		var currentElement = undefined;

		function pushCurrentElement() {
			if (currentElement !== undefined) {
				if (currentElement.children.length > 0) {
					currentElement.children = groupTags(currentElement.children, level + 1);
				}
				result.push(currentElement);
			}
		}

		array.forEach(function(element, index) {
			if (element.tagName != tagName) {
				if (currentElement === undefined) {
					currentElement = new TocElement();
				}
				currentElement.children.push(element);
			} else {
				pushCurrentElement();
				currentElement = element;
			}
		});
		pushCurrentElement();
		return result;
	}

	// Build the TOC
	function buildToc() {
		var anchorList = {};
		var toc = '';

		function createAnchor(element) {
			var id = element.id || element.textContent || 'title';
			id = id.toLowerCase();
			id = stringEx.toASCII(id);
			id = stringEx.toUrl(id);
			var anchor = id.trim();
			var index = 0;
			while (anchorList.hasOwnProperty(anchor)) {
				anchor = id + "-" + (++index);
			}
			anchorList[anchor] = true;
			// Update the id of the element
			element.id = anchor;
			return anchor;
		}

		var elementList = [];

		var headers = _md_body.querySelectorAll(':scope>h1, :scope>h2, :scope>h3, :scope>h4, :scope>h5, :scope>h6');
		headers = Array.prototype.slice.call(headers, 0);

		headers.forEach(function(elt, idx) {
			elt.setAttribute('data-idx', idx);
			elementList.push(new TocElement(elt.tagName, createAnchor(elt), elt.textContent));
		});
		elementList = groupTags(elementList);

		toc = '<ul class="toc">\n' + elementList.join("") + '</ul>\n';
		nw.file.set({
			toc: toc
		});

		return toc;
	}

	function updateToc() {
		var str = nw.file.get('toc');
		var doc = nw.editor.getDoc();
		var i = 1,
			y = 0;
		mdSectionList = [];

		doc.eachLine(function(line) {
			if (line.styles && line.styles[2] == 'header') {
				mdSectionList.push({
					y: y,
					info: line
				});
			}
			y += line.height;
		});

		tocContentEl.html(str);
	}

	_viewer.ee.on('rendered', function() {
		var toc = buildToc();

		if (isShow) {
			updateToc();
		}

		_viewer.renderTOC(toc);
	});

	var resizeTimeout;
	window.addEventListener('resize', function(e) {
		clearTimeout(resizeTimeout);

		resizeTimeout = window.setTimeout(function() {
			nw.editor.refresh();
			updateToc();
		}, 1000);
	});

	// tocEl.click(function(e) {
	// 	var el = e.target,
	// 		hash, target,
	// 		tag = el.tagName;

	// 	e.preventDefault();

	// 	switch (tag) {
	// 		case 'A':
	// 			hash = el.getAttribute('href').replace('#', '');
	// 			target = _viewerDoc.getElementById(hash);

	// 			$(_viewerDoc.body).stop().animate({
	// 				scrollTop: $(target).offset().top - 20
	// 			}, 500);

	// 			var idx = target.getAttribute('data-idx');
	// 			var line = mdSectionList[idx];

	// 			$('.CodeMirror-scroll').stop().animate({
	// 				scrollTop: line.y - 18
	// 			}, 500);

	// 		break;
	// 		case 'BUTTON':

	// 		break;
	// 	}
	// });

	var View = Backbone.View.extend({
		el: 'aside#toc',
		events: {
			'click #toc-content a': 'clickHeaderHandler',
			'click #close-toc': 'toggleTOC'
		},

		initialize: function() {},

		clickHeaderHandler: function(e) {
			var el = e.target,
				hash, target,
				tag = el.tagName;

			e.preventDefault();

			hash = el.getAttribute('href').replace('#', '');
			target = _viewerDoc.getElementById(hash);

			$(_viewerDoc.body).stop().animate({
				scrollTop: $(target).offset().top - 20
			}, 500);

			var idx = target.getAttribute('data-idx');
			var line = mdSectionList[idx];

			$('.CodeMirror-scroll').stop().animate({
				scrollTop: line.y - 18
			}, 500);
		},

		toggleTOC: function() {
			if (isShow) {
				$pad.removeClass('toc');
				updateToc();
			} else {
				$pad.addClass('toc');
			}

			isShow = !isShow;
		}
	});

	view = new View;


	window.ee.on('menu.view.doc.outline', function(show) {
		show ? _viewer.showOutline() : _viewer.hideOutline();
	});
	window.ee.on('menu.view.toggle.toc', function() {
		view.toggleTOC();
	});

	HotKey('defmod-shift-t', function() {
		window.ee.emit('menu.view.toggle.toc');
	});

	return {
		get: buildToc
	}
});