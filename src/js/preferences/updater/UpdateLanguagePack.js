define([
  'txt!tpl/modal-update-languages.html'
  ], function(html) {
    $('#dialogs').append(html);

    var manifest = global.Manifest,
      info = manifest.app.info || {},
      language = info.language || {},
      locales = language.locales || [];

    var download = require('download-github-repo');
    var system = store.get('System') || { versions: { language: manifest.version } };

    function update() {
      download(language.path, global.PATHS.locales, function(err) {
        if (err) {
          $('data-i18n=[system.update.language]').update(t.i18n('system.update.language.error'));
          return;
        }

        system.versions.language = language.version;
        store.set('System', system);

        $('#update-languages-dialog button[name=yes]').html('Done');

        setTimeout(function() {
          $('#update-languages-dialog').modal('hide');
        }, 1500);
      });
    }
    language.version = '0.11.2';
    if (locales.indexOf(global.LOCALES._lang) > -1 && compareVersions(language.version, system.versions.language)) {
      $('#update-languages-dialog').modal('show');
    }

    $('#update-languages-dialog button[name=yes]').click(function() {
      $(this).button('loading');
      $('#update-languages-dialog button[name=no]').attr('disabled', 'disabled');
      update();
    });

    $('#update-languages-dialog button[name=no]').click(function(e) {
      $('#update-languages-dialog').modal('hide');
    });

});