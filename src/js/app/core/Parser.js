define([
    'core/Lexer',
    'core/InlineLexer',
    'core/Renderer',
    'core/plugins/TOC',
    'core/plugins/Tasklist'
  ],
  function(Lexer, InlineLexer, Renderer, TOC, Tasklist) {

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
      // var toc = TOC(tokens);
      var tasks = Tasklist(tokens);
      // var title = toc.tokens[0] && toc.tokens[0].heading;
      var res = {};

      // res.title = title || i18n.t('untitled');

      // if (toc) {
      //   res.toc = toc;
      // }

      if (tasks.length) {
        res.tasks = tasks;
      }

      res.tokens = tokens;  //parser 에 의해서 tokens 유실됨
      res.html = marked.parser(tokens, lexer.options);

      Renderer.finish();
      return res;
    }

    window.ee.on('preferences.markdown.change', function(options) {
      lexer = Lexer(options);
      marked.InlineLexer = InlineLexer(options);

      window.ee.emit('preferences.markdown.change.after');
    });

    return parse;
});