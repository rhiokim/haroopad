/**
 * require.js 환경 설정
 */
requirejs.config({
    baseUrl: 'js/app',
    waitSeconds: 30,
    locale: 'ko-kr',
    paths: {
        tpl: '../../tpl',
        vendors: '../vendors',
        editor: 'editor/Editor',
        viewer: 'viewer/Viewer',
        text: '../vendors/text',
        store: '../vendors/store',
        keyboard: '../vendors/keymage'
    },
    config: {
        text: {
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
        'viewer',
        'file/File',
        'preferences/Preferences'
    ], function(Editor, Viewer, file) {

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
          langPrefix: '',
          highlight: function(code, lang) {
            var res;
            if(!lang) {
              return code;
            }

            switch(lang) {
              case 'js':
                lang = 'javascript';
              break;
            }

            try {
              res = hljs.highlight(lang, code).value;
            } catch(e) {

            } finally {
              return res || code;
            }
          }
        });

        /**
         * 코드미러 내용 변경 이벤트 핸들러
         * @return {[type]} [description]
         */
        function changeHandler() {
            //TODO: throttle 적용
          res = marked(Editor.getValue());
          Viewer.update(res);
        }

        Editor.on("change", changeHandler);
        // changeHandler();

});