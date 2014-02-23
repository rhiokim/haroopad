define([], function() {

  var download = require('download');
  var config = store.get('_system');

  function update(version, path) {
    var file = 'https://github.com/rhiokim/haroopad-locales/archive/'+ version +'.tar.gz';

    if (version != config.languageVersion) {
      var o = download(file, path, { extract: true, strip: 1 });
      o.on('close', function() {

      });
    }
  }

  update('for-v0.10.0', global.PATHS.locales);

});