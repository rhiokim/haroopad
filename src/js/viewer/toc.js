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
        result += '<a href="#' + this.anchor + '">' + this.text + '</a>';
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
var previewContentsElt = undefined;
function buildToc() {
    var anchorList = {};
    function createAnchor(element) {
        var id = element.id || element.textContent || 'title';
        var anchor = id;
        var index = 0;
        if (anchorList.hasOwnProperty(anchor)) {
            anchor = id + '-' + (++index);
        }
        anchorList[anchor] = true;
        // Update the id of the element
        element.id = anchor;
        return anchor;
    }

    var elementList = [];

    var headers = document.getElementById('root').querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers = Array.prototype.slice.call(headers, 0);

    headers.forEach(function(elt) {
        elementList.push(new TocElement(elt.tagName, createAnchor(elt), elt.textContent));
    });
    elementList = groupTags(elementList);
    return '<div class="toc">\n<ul>\n' + elementList.join("") + '</ul>\n</div>\n';
}