'use strict';
var Server = require('tiny-lr');
var path = require('path');
var url = require('url');

var utils = module.exports;

var port = 35729;

utils.startLRServer = function startLRServer(grunt, done) {
  var _ = grunt.util._;
  var _server;

  var options = _.defaults(grunt.config('livereload') || {}, {
    port: 35729
  });

  _server = new Server();
  grunt.log.writeln('... Starting Livereload server on ' + options.port + ' ...');
  port = options.port;

  _server.listen(options.port, done);
  return _server;
};

var getSnippet = function () {
  /*jshint quotmark:false */
  var snippet = [
          "<!-- livereload snippet -->",
          "<script>document.write('<script src=\"http://'",
          " + (location.host || 'localhost').split(':')[0]",
          " + ':" + port + "/livereload.js?snipver=1\"><\\/script>')",
          "</script>",
          ""
          ].join('\n');
  return snippet;
};

//
// This function returns a connect middleware that will insert a snippet
// of JavaScript needed to connect to the livereload server
//
// Usage:
// First require the needed module
// var lrSnippet = require('livereload/lib/utils').livereloadSnippet;
//
// Then in your grunt-contrib-connect config:
//
// server: {
//   dist: {
//     middleware: function() {
//       return [lrSnippet, folderMount('dist')]
//     }
//   },
//   test: {
//     middleware: function() {
//       return [lrSnippet(grunt), folderMount('dist')]
//     }
//   }
// }

utils.livereloadSnippet = function livereloadSnippet(req, res, next) {
  var write = res.write;

  var filepath = url.parse(req.url).pathname;
  filepath = filepath.slice(-1) === '/' ? filepath + 'index.html' : filepath;

  if (path.extname( filepath ) !== '.html') {
    return next();
  }

  res.write = function (string, encoding) {
    var body = string instanceof Buffer ? string.toString() : string;

    body = body.replace(/<\/body>/, function (w) {
      return getSnippet() + w;
    });

    if (string instanceof Buffer) {
      string = new Buffer(body);
    } else {
      string = body;
    }

    if (!this.headerSent) {
      this.setHeader('content-length', Buffer.byteLength(body));
      this._implicitHeader();
    }

    write.call(res, string, encoding);
  };

  next();
};
