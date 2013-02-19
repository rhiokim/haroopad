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
        text: '../vendors/text',
        editor: 'editor/Editor',
        store: '../vendors/store',
        keyboard: '../vendors/keymage'
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
        'editor',
        'file/File',
        'preferences/Preferences'
    ], function(Editor, file) {

        var res;
        // var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        //   mode: 'markdown',
        //   lineNumbers: true,
        //   theme: "solarized dark",
        //   keyMap: "vim",
        //   viewportMargin: 40,
        //   lineWrapping: true,
        //   extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
        // });

        marked.setOptions({
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          // langPrefix: 'language-',
          highlight: function(code, lang) {
            if(!lang) {
              return code;
            }
            lang = lang == 'js' && 'javascript';
            return hljs.highlight(lang, code).value;
          }
        });

        /**
         * 코드미러 내용 변경 이벤트 핸들러
         * @return {[type]} [description]
         */
        function changeHandler() {
            //TODO: throttle 적용
          res = marked(Editor.getValue());
          $('#haroo article').html(res);
        }

        Editor.on("change", changeHandler);
        changeHandler();

});