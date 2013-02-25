function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
    
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
    parser: 'editor/Parser',
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
    'window/Window',
    'editor',
    'parser',
    'viewer'
  ], function(Window, Editor, Parser, Viewer) {

    var res;

    /**
     * 코드미러 내용 변경 이벤트 핸들러
     * @return {[type]} [description]
     */
    function changeHandler() {
      //TODO: throttle 적용
      res = Parser(Editor.getValue());
      Viewer.update(res);

      Window.edited();
    }

    Editor.on("change", changeHandler);


});