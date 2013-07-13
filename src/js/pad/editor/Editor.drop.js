define([
		'editor/Editor.drop.mimes'
	], function(MIMES) {

	function Drop(cm, e) {
    	var type, kind, file, item, items;
    	var dataTransfer = e.dataTransfer;

    	e.preventDefault();

    	items = dataTransfer.items;
    	files = e.dataTransfer.files;

	    for(var i = 0; i < items.length; i++) {
	    	item = items[i];
	    	file = files[i];
	    	kind = item.kind;
	    	type = item.type;

	    	if (kind == 'file') {
	    		console.log(file.path);
	    		console.log(type);
	    	} else if (kind == 'string') {
	    		if(i == 0) {
	    			// continue;
	    		}
	    		item.getAsString(function(str) {
	    			console.log(str);
	    			console.log(type);
	    		});
	    		// break;
	    	}
	    }
	}

	return Drop;
});