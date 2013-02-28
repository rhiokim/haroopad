/**
 * @author Louis Stowasser <louisstow@gmail.com>
 * License: MIT
 */
function generateTOC (rootNode, startLevel) {
  var stringEx = require('stringex');

  var lastLevel = 0;
  startLevel = startLevel || 2; //which H# tag to start indexing.
  
  var html = "<ul class=\"nav\">";

  //loop every node in rootNode
  for (var i = 0; i < rootNode.childNodes.length; ++i) {
    var node = rootNode.childNodes[i];
  
	//skip nodes that aren't <H#> tags
  	if (!node.tagName || node.tagName.charAt(0) !== "H") {
  		continue;
  	}
  
  	var level = +node.tagName.substr(1);
  
	//only parse at the start level
  	if (level < startLevel) { continue; }
  
	//if the <H#> tag has any children, take the text of the first child
	//else grab the text of the <H#> tag
  	var name = node.childNodes[0].innerText || node.innerText;
    
   	//create a string that can be used for an anchor hash based
    	//on the name but without dots or spaces
  	var hashable = name.replace(/[\.\s]/g, "-");
    
    hashable = stringEx.stripHtmlTags(hashable);
    hashable = stringEx.toASCII(hashable);
    hashable = stringEx.toUrl(hashable);

    	//set the id of the <H#> tag to this hash
  	node.id = hashable;
  
   	//generate the HTML
  	if (level > lastLevel) {
  		html += "";
  	} else if (level < lastLevel) {
  		html += (new Array(lastLevel - level + 2)).join("</ul></li>");
  	} else {
  		html += "</ul></li>";
  	}
  
  	html += "<li><a class='lvl"+level+"' href='#" + hashable + "'><i class=\"icon-chevron-right\"></i>" + name + "</a><ul>";
  	lastLevel = level;
  }

  html += "</ul>";
  return html;
}
