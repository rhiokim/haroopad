define([
  ],
  function() {
    var opt = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      silent: false,
      langPrefix: 'language-'
    };

    marked.setOptions(opt);

    var renderer = new marked.Renderer();
    // renderer.blockcode = function(code, lang) {
    //   var res;
    //   if(!lang) {
    //     return code;
    //   }

    //   switch(lang) {
    //     case 'js':
    //       lang = 'javascript';
    //     break;
    //   }

    //   try {
    //     res = hljs.highlight(lang, code).value;
    //   } catch(e) {

    //   } finally {
    //     return res || code;
    //   }
    // };

    var parse = function(src, options) {
      options = options || opt;
      return marked.parser(marked.lexer(src, options), options, renderer);
    }

    return parse;
    // return marked;
});