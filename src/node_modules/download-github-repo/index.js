
var fs = require('fs');
var rm = require('rimraf');
var tar = require('tar');
var wget = require('wget');
var zlib = require('zlib');

/**
 * Expose `download`.
 */

module.exports = download;

/**
 * Download GitHub `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Function} fn
 */

function download(repo, dest, fn){
  var url = github(normalize(repo));
  var dl = wget.download(url, dest + '.tar.gz');

  dl.on('error', function(err){
    fn(err);
  });

  dl.on('end', function(file){
    fs.createReadStream(file)
      .pipe(zlib.createGunzip())
      .pipe(tar.Extract({ path: dest, strip: 1 }))
      .on('error', function(err){ fn(err); })
      .on('end', function(){
        rm(file, fn);
      });
  });
}

/**
 * Return a GitHub url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

function github(repo){
  return 'https://codeload.github.com/'
    + repo.owner
    + '/'
    + repo.name
    + '/legacy.tar.gz/'
    + repo.branch;
}

/**
 * Normalize a repo string.
 *
 * @param {String} string
 * @return {Object}
 */

function normalize(string){
  var owner = string.split('/')[0];
  var name = string.split('/')[1];
  var branch = 'master';

  if (~name.indexOf('#')) {
    branch = name.split('#')[1];
    name = name.split('#')[0];
  }

  return {
    owner: owner,
    name: name,
    branch: branch
  };
}