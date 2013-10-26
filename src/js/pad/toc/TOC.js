define([
		'keyboard',
		'toc/TocElement'
	], function(HotKey, TocElement) {

		var stringEx = require('stringex');

		var iframe = $('#haroo iframe')[0];
		var _viewer = iframe.contentWindow;
		var _viewerDoc = iframe.contentDocument;
		var _md_body = _viewerDoc.getElementById('root')
		var aside = $('#main > aside');
		var toc = $('#toc');
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
		        if(currentElement !== undefined) {
		            if(currentElement.children.length > 0) {
		                currentElement.children = groupTags(currentElement.children, level + 1);
		            }
		            result.push(currentElement);
		        }
		    }

		    array.forEach(function(element, index) {
		        if(element.tagName != tagName) {
		            if(currentElement === undefined) {
		                currentElement = new TocElement();
		            }
		            currentElement.children.push(element);
		        }
		        else {
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
		    nw.file.set({ toc: toc });

		    return toc;
		}

		function updateToc() {
			var str = nw.file.get('toc');
			var doc = nw.editor.getDoc();
			var height = 0, over = 0, lineCnt = 0;
			var gap = 18;
			mdSectionList = [];

			doc.eachLine(function(line) {
				lineCnt += (line.height / 18);

				if (line.styles && line.styles[2] == 'header') {
					if (line.height > 18) {
						over += (line.height / 18 - 1);
					}

					mdSectionList.push({
						over: over,
						info: line,
						num: lineCnt
					});

					if (line.height > 18) {
						gap += (18 - line.height);
					}
				}
				height += line.height;

			});

			toc.html(str);
		}

		_viewer.ee.on('rendered', function() {
			var toc = buildToc();

			if (isShow) {
				updateToc();
			}

			_viewer.renderTOC(toc);
		});

		window.addEventListener('resize', function(e){
		  updateToc();
		});

		window.ee.on('menu.view.doc.outline', function(show) {
			show ? _viewer.showOutline() : _viewer.hideOutline();
		});
		window.ee.on('menu.view.doc.toc', function(show) {
			if (show) {
				aside.stop().fadeIn(200);
				updateToc();
			} else {
				aside.stop().fadeOut(100);
			}

			isShow = show;
		});

		HotKey('ctrl-t', function() {
			window.ee.emit('menu.view.doc.toc', !isShow);
		});

		$('#toc').click(function(e) {
	    var el = e.target,
	    	hash, target,
	    	tag = el.tagName;
	    
	    e.preventDefault();

	    switch (tag) {
	      case 'A':
	      	hash = el.getAttribute('href').replace('#', '');
	      	target = _viewerDoc.getElementById(hash);

	      	$(_viewerDoc.body).stop().animate({
	          scrollTop: $(target).offset().top - 20
	        }, 500);

					var doc = nw.editor.getDoc();
	      	var idx = $(target).data('idx');
	      	var line = mdSectionList[idx];

	      	console.log(line.num, line.over);

	        $('.CodeMirror-scroll').stop().animate({
	        	scrollTop: line.num * 18 - (line.over * 18)
	        }, 500);

        break;
	    }
		});

		return {
			build: buildToc
		}
});