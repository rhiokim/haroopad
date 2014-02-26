define([
  'txt!tpl/modal-update-languages.html'
  ], function(html) {
    $('#dialogs').append(html);

    var manifest = global.Manifest,
      info = manifest.app.info || {},
      language = info.language || {},
      locales = language.locales || [];

    var fs = require('fs-extra');
    var download = require('download-github-repo');
    var pkgObj = fs.readJsonSync(global.PATHS.locales +'/package.json', 'utf8');

    function update() {
      download(language.path, global.PATHS.locales, function(err) {
        if (err) {
          $('#update-languages-dialog .modal-body strong').html(i18n.t('system.language.update.error'));
          return;
        }

        $('#update-languages-dialog .modal-body strong').html(i18n.t('system.language.update.done'));
        $('#update-languages-dialog button[name=yes]').html(i18n.t('done'));

        setTimeout(function() {
          $('#update-languages-dialog').modal('hide');
        }, 2500);
      });
    }

    if (locales.indexOf(window.navigator.language.toLowerCase().split('-')[0]) > -1 && compareVersions(language.version, pkgObj.version)) {
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

    $('#update-languages-dialog button[name=yes]').attr({ 'data-loading-text': i18n.t('updating') });

});