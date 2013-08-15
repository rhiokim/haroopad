define([], function() {
	var http = require('http'),

		manifest = gui.App.manifest,
		url = manifest.upgrade,
		currVersion = manifest.version;

	function updateCheck(newVersion, force) {
		if (!compareVersions(newVersion, currVersion)) {
			if (force) process.emit('up.to.date.haroopad', currVersion);
			return;
		}

		process.emit('update.haroopad', currVersion, newVersion);
	}

	function check(force) {
		http.get(url, function(res) {
			res.on("data", function(chunk) {
				try {
					serverInfo = JSON.parse(chunk);

					updateCheck(serverInfo.version, force);
				} catch(e) {
					serverInfo = {};
				}
			});
		}).on('error', function(e) {});
	}

	window.ee.on('check.version', function(force) {
		check(force);
	});

	window.ee.on('download.haroopad', function() {
		gui.Shell.openExternal(serverInfo.download[getPlatformName()]);
	});

	window.ee.on('release.note.haroopad', function() {
		gui.Shell.openExternal(serverInfo.release);
	});

	check();
});
