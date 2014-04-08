define([
  'db/DB'
  ], function(DB) {

    DB.info(function(err, info) {
      $('#dbinfo').html(JSON.stringify(info, null, 2));
    });
});