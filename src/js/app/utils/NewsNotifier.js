define([], function() {
  var http = require('http'),
  
    manifest = global.Manifest,
    url = manifest.app.news,
    currVersion = manifest.version;

  function check(url) {
    var body = '';

    http.get(url, function(res) {

      res.setEncoding('utf8');
      res.on("data", function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        window.ee.emit('up.to.date.news', body);
      });

    }).on('error', function(e) {

    });
  }

  return function(news) {
    check(news.url);
  }
});
