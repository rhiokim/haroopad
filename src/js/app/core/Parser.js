define([
    'core/Lexer',
    'core/InlineLexer'
  ],
  function(Lexer, InlineLexer) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    var marked = require("marked");
    marked.InlineLexer = InlineLexer;
    
    var parse = function(src) {
      var tokens = Lexer.lex(src);
      return marked.parser(tokens, Lexer.options);
    }

    return parse;
});