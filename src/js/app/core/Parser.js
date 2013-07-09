define([
  ],
  function() {
    // var opt = {
    //   gfm: true,
    //   tables: true,
    //   breaks: false,
    //   pedantic: false,
    //   sanitize: false,
    //   smartLists: true,
    //   smartypants: true,
    //   silent: false,
    //   langPrefix: 'language-'
    // };

    var marked = require("marked");

    var defaults = {
        "gfm": true,
        "tables": true,
        "breaks": false,
        "pedantic": false,
        "sanitize": false,
        "smartLists": true,
        "smartypants": true,
        "silent": false,
        "highlight": null,
        "langPrefix": ''
    };
    var opt = store.get('Markdown') || defaults;

    marked.setOptions(opt);
    var renderer = new marked.Renderer();

    var gui = require('nw.gui'),
        win = gui.Window.get();
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
      options = options || marked.defaults;
      return marked.parser(marked.lexer(src, options), options, renderer);
    }

    window.ee.on('preferences.markdown.gfm', function(value) {
      marked.setOptions({ gfm: value });
    });
    window.ee.on('preferences.markdown.sanitize', function(value) {
      marked.setOptions({ sanitize: value });
    });
    window.ee.on('preferences.markdown.tables', function(value) {
      marked.setOptions({ tables: value });
    });
    window.ee.on('preferences.markdown.breaks', function(value) {
      marked.setOptions({ breaks: value });
    });
    window.ee.on('preferences.markdown.smartLists', function(value) {
      marked.setOptions({ smartLists: value });
    });
    window.ee.on('preferences.markdown.smartypants', function(value) {
      marked.setOptions({ smartypants: value });
    });

    return parse;
    // return marked;
});