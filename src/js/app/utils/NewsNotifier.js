define([], function() {
  var http = require('http'),
  
    manifest = global.Manifest,
    url = manifest.app.news,
    currVersion = manifest.version;

  var expire;
  var newsData = store.get('_news') || {};

  function setCookie() {

  }

  function check(url) {
    var body = '';

    http.get(url, function(res) {

      res.setEncoding('utf8');
      res.on("data", function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        window.ee.emit('up.to.date.news', body);
        
        newsData.stime = new Date().getTime();
        newsData.body = body;

        store.set('_news', newsData);
      });

    }).on('error', function(e) {

    });
  }

  return function(news) {
    var nowTime = new Date().getTime();

    if (!news || !news.url) {
      return;
    }

    if (newsData.url != news.url) {
      newsData.url = news.url;

      check(news.url);
    } else {
      
      /* time over */
      if (newsData.stime + newsData.expire * 60 * 1000 > nowTime) {
        window.ee.emit('up.to.date.news', newsData.body);
      }
    }
  }
});
