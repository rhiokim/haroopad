define([
	], 
	function() {

	var watch = require('watch'),
			path = require('path');

	var files = [];

	function createFileWatcher(file) {
		var dir = path.dirname(file);

		watch.createMonitor(dir, function(monitor) {
			monitor.files[file];
			monitor.on('changed', function(f, curr, prev) {
				console.log(curr.size)
				console.log(prev.size)
			});
		});
	}

	return {
		push: function(file) {
			if (files.indexOf(file) > -1) {
				return;
			}

			console.log('start monitor: '+ file);
			files.push(file);
			createFileWatcher(file);
		}
	}
});

