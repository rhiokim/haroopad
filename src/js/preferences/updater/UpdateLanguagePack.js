define([], function() {

  global.Manifest.app.info = {
    language: {
      version: '0.11.1',
      path: 'https://github.com/rhiokim/haroopad-locales'
    }
  };

  var manifest = global.Manifest,
    info = manifest.app.info,
    language = info.language;

  var download = require('download-github-repo');
  var system = store.get('System') || {
    versions: {
      language: '0.11.0'
    }
  };

  if (compareVersions(language.version, system.versions.language)) {
    download(language.path, global.PATHS.locales, function(err) {
      console.log('update');
    });
  }

  // update('for-v0.10.0', global.PATHS.locales);

});