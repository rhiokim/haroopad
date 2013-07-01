// production
(function(root) {
	
	function noop(x){return x;}
	
	// disable debug
	if(root.console) {
		var prop;
		for(prop in console) {
			console[prop]=noop
		}
	}

	//disable alert
	root.alert = noop;

})(window);