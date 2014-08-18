#!/usr/bin/env node

'use strict';

var PouchDB = require('pouchdb');
var COUCH_HOST = process.env.COUCH_HOST || 'http://127.0.0.1:5984';
var HTTP_PORT = 8001;
var CORS_PORT = 2021;

var cors_proxy = require("corsproxy");
var http_proxy = require("pouchdb-http-proxy");
var http_server = require("http-server");
var fs = require('fs');

var indexfile = "./test/test.js";
var dotfile = "./test/.test-bundle.js";
var outfile = "./test/test-bundle.js";
var watchify = require("watchify");
var w = watchify(indexfile);

w.on('update', bundle);
bundle();

function bundle() {
  var wb = w.bundle();
  wb.on('error', function (err) {
    console.error(String(err));
  });
  wb.on("end", end);
  wb.pipe(fs.createWriteStream(dotfile));

  function end() {
    fs.rename(dotfile, outfile, function (err) {
      if (err) { return console.error(err); }
      console.log('Updated:', outfile);
    });
  }
}

function startServers(couchHost) {
    http_server.createServer().listen(HTTP_PORT);
    cors_proxy.options = {target: couchHost || COUCH_HOST};
    http_proxy.createServer(cors_proxy).listen(CORS_PORT);
    console.log('Tests: http://127.0.0.1:' + HTTP_PORT + '/test/index.html');
}

if (require.main === module) {
  startServers();
} else {
  module.exports.start = startServers;
}
