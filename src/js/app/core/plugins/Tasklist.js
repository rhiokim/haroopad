define([], function() {

  return function(tokens, options) {
    var opts = _.extend({}, options);

    var i, t, token, text, tasks = [];

    for(i = 0; i < tokens.length; i++) {
      token = tokens[i];
      if (token.type === 'list_item_start' || token.type === 'loose_item_start') {
        i++;
        text = tokens[i].text;
        if (/^(\s|<p>)*\[[x ]\]\s*/.test(text)) { 
          tasks.push({
            done: text.charAt(1).toLowerCase() === 'x',
            text: text.substr(4, text.length)
          });
        }
        i++;
      }
    }
    
    return tasks;
  };
});