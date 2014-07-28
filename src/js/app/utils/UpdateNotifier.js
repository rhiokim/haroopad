define([
    'utils/NewsNotifier'
  ], function(News) {
	var http = require('http'),
	
		manifest = global.Manifest,
		url = manifest.app.upgrade,
		currVersion = manifest.version;

	function updateCheck(newVersion, force) {
		if (!compareVersions(newVersion, currVersion)) {
			if (force) window.ee.emit('up.to.date.haroopad', currVersion);
			return;
		}

		window.ee.emit('update.haroopad', currVersion, newVersion);
	}

	function check(force) {
		http.get(url, function(res) {
			res.on("data", function(chunk) {
				try {
					serverInfo = JSON.parse(chunk);
					manifest.app.info = serverInfo;

					updateCheck(serverInfo.version, force);
					News(serverInfo.news);
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

});
