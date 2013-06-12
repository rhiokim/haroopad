//fixed text.js error on node-webkit
require.nodeRequire = require;

/**
 * require.js 환경 설정
 */
requirejs.config({
  baseUrl: 'js/preferences',
  waitSeconds: 30,
  locale: 'ko-kr',
  paths: {
    // tpl: '../../tpl',
    vendors: '../vendors',
    store: '../vendors/store'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! preferences is crash :-(');
};

requirejs([
  'Preferences'
  ], function(Preferences) {


});