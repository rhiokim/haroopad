define([
	], 
	function() {

	var watch = require('watch'),
			path = require('path');

	function createFileWatcher(file) {
		var dir = path.dirname(file);
		
		watch.createMonitor(dir, function(monitor) {
			monitor.files[file];
			monitor.on('changed', function(f, curr, prev) {
				console.log(curr.size, prev.size);
			});
		});
	}

	return {
		push: function(file) {
			console.log('start monitor: '+ file);
			createFileWatcher(file);
		}
	}
});

