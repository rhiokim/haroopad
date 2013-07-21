global.package = (function() {
	var fs = require('fs');

	var packageInfo = fs.readFileSync(process.cwd() + '/package.json', 'utf8');
	try {
		packageInfo = JSON.parse(packageInfo);
	} catch (e) {
		packageInfo = {};
	}

	return packageInfo;
})();