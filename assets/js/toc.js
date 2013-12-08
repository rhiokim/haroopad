// TOC element description
function TocElement(tagName, anchor, text) {
    this.tagName = tagName;
    this.anchor = anchor;
    this.text = text;
    this.children = [];
}

TocElement.prototype.childrenToString = function() {
    if(this.children.length === 0) {
        return "";
    }
    var result = "<ul>\n";
    this.children.forEach(function(child) {
        result += child.toString();
    });
    result += "</ul>\n";
    return result;
};

TocElement.prototype.toString = function() {
    var result = "<li>";
    if(this.anchor && this.text) {
        result += '<a href="#' + this.anchor + '" title="'+ this.text +'">' + this.text + '</a>';
    }
    result += this.childrenToString() + "</li>\n";
    return result;
};


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
	var toc, anchorList = {};

	function createAnchor(element) {
		var id = element.id || element.textContent || 'title';
		id = id.toLowerCase();

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
	var root = document.querySelector('div.contents');
	var headers = root.querySelectorAll(':scope>h1, :scope>h2, :scope>h3, :scope>h4, :scope>h5, :scope>h6');
	headers = Array.prototype.slice.call(headers, 0);

	headers.forEach(function(elt, idx) {
		elt.setAttribute('data-idx', idx);
		elementList.push(new TocElement(elt.tagName, createAnchor(elt), elt.textContent));
	});
	elementList = groupTags(elementList);

	toc = '<ul>\n' + elementList.join("") + '</ul>\n';

	return toc;
}