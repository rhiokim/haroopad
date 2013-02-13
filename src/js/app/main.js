/**
 * require.js 환경 설정
 */
requirejs.config({
    baseUrl: 'js/app',
    waitSeconds: 30,
    locale: 'ko-kr',
    paths: {
        vendors: '../vendors',
        tpl: '../../tpl',
        text: '../vendors/text'
    },
    config: {
        text: {
            //Valid values are 'node', 'xhr', or 'rhino'
            env: 'xhr'
        }
    },
    urlArgs: 'v0.1.0'
});

requirejs.onError = function (e) {
    alert('requireJS Error raised, check the console');
    console.log(e);
};

requirejs([
        'shortcut/keymap'
    ], function(shortcut) {

        shortcut.bind('open_file', function(str) {
            // $('#code').val(str);
            editor.setValue(str);
        })

});