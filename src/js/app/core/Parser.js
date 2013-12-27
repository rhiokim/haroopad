define([
    'core/Lexer'
  ],
  function(Lexer, Renderer) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    var marked = require("marked");
    
    var opt = store.get('Markdown') || Lexer.options;

    // marked.setOptions(opt);
    var parse = function(src) {
      var tokens = Lexer.lex(src);
      return marked.parser(tokens, Lexer.options);
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