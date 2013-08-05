define([
		'utils/AppConfig'
	], function(AppConfig) {
		var http = require('http');

		var gui = require('nw.gui');

		var info = AppConfig.maintainers[0];
		var url = info.upgrade,
			currVersion = AppConfig.version;

		function updateCheck(newVersion, force) {
			if (!compareVersions(newVersion, currVersion)) {
			// if (currVersion == newVersion) {
				if (force) process.emit('up.to.date.haroopad', currVersion);
				return;
			}

			process.emit('update.haroopad', currVersion, newVersion);
		}

		function check(force) {
			updateGoogleAnalytics();
			
			http.get(url, function(res) {
				res.on("data", function(chunk) {
					try {
						serverInfo = JSON.parse(chunk);

						updateCheck(serverInfo.version, force);
					} catch(e) {
						serverInfo = {};
					}
				});
			}).on('error', function(e) {
			});
		}

		window.ee.on('check.version', function(force) {
			check(force);
		});

		window.ee.on('download.haroopad', function() {
			gui.Shell.openExternal(serverInfo.download[getPlatformName()]);
		});

		check();
	});