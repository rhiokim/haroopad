function parse(src) {
  var tokens = Lexer.lex(src);
  return marked.parser(tokens, Lexer.options);
} 