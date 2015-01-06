define([], function() {

  var template = _.template('<%= depth %><%= bullet %>[<%= heading %>](#<%= url %>)\n');
  
  return function(tokens, options) {
    var opts = _.extend({
      firsth1: false,
      blacklist: true,
      omit: [],
      maxDepth: 3
    }, options);

    var toc = '';
    // var tokens = [];
    var tocArray = [];
    // toks.forEach(function(tok, idx) {
    //   tokens[idx] = _.clone(tok);
    // });

    // Remove the very first h1, true by default
    // if(opts.firsth1 === false) {
    //   tokens.shift();
    // }

    // Do any h1's still exist?
    // var h1 = _.any(tokens, {depth: 1});

    var heads = tokens.filter(function (token) {
      // Filter out everything but headings
      if (token.type !== 'heading' || token.type === 'code') {
        return false;
      }

      return true;
    })

    heads.forEach(function (h) {

      if(h.depth > opts.maxDepth) {
        return;
      }

      var data = _.extend({}, opts.data, {
        depth  : new Array((h.depth - 1) * 2 + 1).join(' '),
        bullet : opts.bullet ? opts.bullet : '* ',
        heading: h.text,
        url    : h.text.toLowerCase().replace(/[\s]+/g, '-')
      });

      tocArray.push(data);

      // var tmpl = opts.template || defaultTemplate;
      toc += template(data);
    });

    return {
      tokens: tocArray,
      markdown: opts.clean ? utils.clean(toc, opts) : toc
    };
  };
});