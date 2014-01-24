define([
    'core/Lexer'
  ],
  function(Lexer) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    var marked = require("marked");
    
    var parse = function(src) {
      var tokens = Lexer.lex(src);
      return marked.parser(tokens, Lexer.options);
    }

    return parse;
});