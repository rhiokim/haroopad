define([
    'file/File.toc.element'
], function(TocElement) {

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
    var toc = '';

    function buildToc(headers) {
        var anchorList = {};
        var elementList = [];
        // var headers;

        function createAnchor(element) {
            var anchor, id = element.id || element.textContent || 'title';
            // id = id.toLowerCase();
            /*@TODO Critical performance issue
      id = stringEx.toASCII(id);
      id = stringEx.toUrl(id);
      */
            // var anchor = id.trim();
            var index = 0;
            anchor = id;
            while (anchorList.hasOwnProperty(anchor)) {
                anchor = id + "-" + (++index);
            }
            anchorList[anchor] = true;
            // Update the id of the element
            element.id = anchor;
            return anchor;
        }

        // headers = target.querySelectorAll(':scope>h1, :scope>h2, :scope>h3, :scope>h4, :scope>h5, :scope>h6');
        headers = Array.prototype.slice.call(headers, 0);

        headers.forEach(function(elt, idx) {
            elt.setAttribute('data-idx', idx);
            elementList.push(new TocElement(elt.tagName, createAnchor(elt), elt.textContent, idx));
        });

        elementList = groupTags(elementList);

        toc = '<ul>\n<h5>Table of Contents</h5>\n' + elementList.join("") + '\n</ul>\n';

        return toc;
    }

    return {
        get: buildToc
    }

});