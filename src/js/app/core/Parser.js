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

    var opt = store.get('Markdown') || {};
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
      options = options || opt;
      return marked.parser(marked.lexer(src, options), options, renderer);
    }

    win.on('preferences.markdown.gfm', function(value) {
      marked.setOptions({ gfm: value });
    });
    win.on('preferences.markdown.sanitize', function(value) {
      marked.setOptions({ sanitize: value });
    });
    win.on('preferences.markdown.tables', function(value) {
      marked.setOptions({ tables: value });
    });
    win.on('preferences.markdown.breaks', function(value) {
      marked.setOptions({ breaks: value });
    });
    win.on('preferences.markdown.smartLists', function(value) {
      marked.setOptions({ smartLists: value });
    });
    win.on('preferences.markdown.smartypants', function(value) {
      marked.setOptions({ smartypants: value });
    });

    return parse;
    // return marked;
});