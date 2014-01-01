define(function() {

    // TOC element description
    function TocElement(tagName, anchor, text, index) {
        this.tagName = tagName;
        this.anchor = anchor;
        this.text = text;
        this.index = index;
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
            result += '<span class="title">\n';
            result += '<a href="#' + this.anchor + '" title="'+ this.text +'">' + this.text + '</a>';
            result += '\n</span>\n';
            result += '<!--span class="number">\n';
            result += this.index;
            result += '\n</span-->\n';
        }
        result += this.childrenToString() + "</li>\n";
        return result;
    };

    return TocElement;
});