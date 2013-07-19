define([
		'utils/AppConfig'
	], function(AppConfig) {
		var http = require('http'),
			util = require('./js/app/utils/util');

		var gui = require('nw.gui');

		var info = AppConfig.maintainers[0];
		var url = info.upgrade,
			currVersion = AppConfig.version;

		function upgrade(newVersion) {
			if (currVersion == newVersion) {
				return;
			}

			process.emit('update.haroopad', currVersion, newVersion);
		}

		window.ee.on('download.haroopad', function() {
			alert(util.getPlatformName())
			gui.Shell.openExternal(serverInfo.download[util.getPlatformName()]);
		});

		http.get(url, function(res) {
			res.on("data", function(chunk) {
				try {
					serverInfo = JSON.parse(chunk);

					upgrade(serverInfo.version);
				} catch(e) {
					serverInfo = {};
				}
			});
		}).on('error', function(e) {
		});
	});