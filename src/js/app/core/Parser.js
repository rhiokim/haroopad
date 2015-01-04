define([
    'core/Lexer',
    'core/InlineLexer',
    'core/Renderer'
  ],
  function(Lexer, InlineLexer, Renderer) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    var marked = require("marked");
    var options = store.get('Markdown') || {
          breaks: true,
          smartLists: true,
          langPrefix: '',
          smartypants: true
    };

    var defaults = merge(marked.defaults, options, {
      renderer: Renderer
    });

    var lexer = Lexer(defaults);
    marked.InlineLexer = InlineLexer(defaults);
    // marked.setOptions(defaults);
    
    var parse = window.marked = function(src) {
      var tokens = lexer.lex(src);
      // return marked.parser(tokens, lexer.options);

      return {
        tokens: tokens,
        html: marked.parser(tokens, lexer.options)
      }
    }

    window.ee.on('preferences.markdown.change', function(options) {
      lexer = Lexer(options);
      marked.InlineLexer = InlineLexer(options);

      window.ee.emit('preferences.markdown.change.after');
    });

    return parse;
});