define([
  ],
  function() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      silent: false,
      highlight: null,
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

    var renderer = new marked.Renderer();
    // renderer.header = function(text, level) {
    //   return '<div class="h-'+ level +'">'+ text +'</div>';
    // }

    var parse = function(src, options) {
      options = options || marked.defaults;
      return marked.parser(marked.lexer(src, options), options, renderer);
    }

    return parse;
    // return marked;
});