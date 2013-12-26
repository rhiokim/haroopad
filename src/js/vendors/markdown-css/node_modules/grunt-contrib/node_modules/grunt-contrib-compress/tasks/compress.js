/*
 * grunt-contrib-compress
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Chris Talkington, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var fs = require('fs');
  var path = require('path');
  var rimraf = require('rimraf');
  var prettySize = require('prettysize');

  grunt.registerMultiTask('compress', 'Compress files.', function() {
    var archiver = require('archiver');
    var zlib = require('zlib');

    var kindOf = grunt.util.kindOf;
    var helpers = require('grunt-lib-contrib').init(grunt);

    var done = this.async();

    var options = this.options({
      archive: null,
      mode: null,
      level: 1
    });

    var pretty = function(size) {
        if (!options.pretty) {
          return size + ' bytes';
        }
        return prettySize(size);
    };

    var archiverOptions = options;

    var supportedModes = ['zip', 'tar', 'tgz', 'gzip'];

    var shouldGzipTar = false;

    grunt.verbose.writeflags(options, 'Options');

    if (kindOf(options.archive) !== 'string' || options.archive.length === 0) {
      grunt.fail.warn('Unable to compress; no valid archive file was specified.');
    }

    var archiveFile = options.archive;
    var archiveDir = path.dirname(archiveFile);

    var mode = options.mode || autoDetectMode(archiveFile);

    if (mode === 'tgz') {
      shouldGzipTar = true;
      mode = 'tar';
    }

    if (grunt.util._.include(supportedModes, mode) === false) {
      grunt.fail.warn('Mode ' + mode.cyan + ' not supported.');
    }

    if (this.filesSrc.length === 0) {
      grunt.fail.warn('Unable to compress; no valid source files were found.');
    }

    if (grunt.file.exists(archiveDir) === false) {
      grunt.file.mkdir(archiveDir);
    }

    var archiveStream = fs.createWriteStream(archiveFile);

    var internalFileName;
    var srcFile;

    var filePairSrc;
    var isExpandedPair;

    var archive;

    if (mode === 'gzip') {
      // this needs to be evaluated as it doesn't fit new flow
      var srcFiles = this.filesSrc;

      srcFiles = srcFiles.filter(function(src) {
        return grunt.file.isFile(src);
      });

      if (srcFiles.length > 1) {
        grunt.fail.warn('Cannot specify multiple input files for gzip compression.');
      }

      var srcStream = fs.createReadStream(srcFiles[0]);

      srcStream.pipe(zlib.createGzip()).pipe(archiveStream);

      archiveStream.on('close', function() {
        grunt.log.writeln('File ' + archiveFile.cyan + ' created (' + pretty(getSize(archiveFile)) + ').');
        done();
      });
    } else if (mode === 'tar' || mode === 'zip') {
      archive = archiver.create(mode, archiverOptions);

      if (shouldGzipTar) {
        archive.pipe(zlib.createGzip()).pipe(archiveStream);
      } else {
        archive.pipe(archiveStream);
      }

      archive.on('error', function(err) {
        grunt.log.error(err);
        grunt.fail.warn('archiver failed');
      });

      grunt.util.async.forEachSeries(this.files, function(filePair, nextPair) {
        isExpandedPair = filePair.orig.expand || false;
        filePairSrc = filePair.src;

        filePairSrc = filePairSrc.filter(function(src) {
          return grunt.file.isFile(src);
        });

        grunt.util.async.forEachSeries(filePairSrc, function(srcFile, nextFile) {
          internalFileName = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest || '', srcFile));

          archive.addFile(fs.createReadStream(srcFile), { name: internalFileName }, function(err) {
            grunt.verbose.writeln('Archiving ' + srcFile.cyan + ' -> ' + archiveFile.cyan + '/'.cyan + internalFileName.cyan);
            nextFile(err);
          });
        }, nextPair);
      }, function(err) {
        if (err) {
          grunt.fail.warn(err);
        }

        archive.finalize(function(err, written) {
          if (shouldGzipTar) {
            grunt.log.writeln('Created ' + archiveFile.cyan + ' (' + pretty(getSize(archiveFile)) + ')');
          } else {
            grunt.log.writeln('Created ' + archiveFile.cyan + ' (' + pretty(written) + ')');
          }

          done(err);
        });
      });

    }
  });

  var getSize = function(filename) {
    try {
      return fs.statSync(filename).size;
    } catch (e) {
      return 0;
    }
  };

  var autoDetectMode = function(dest) {
    if (grunt.util._.endsWith(dest, '.tar.gz')) {
      return 'tgz';
    }

    var ext = path.extname(dest).replace('.', '');

    if (ext === 'gz') {
      return 'gzip';
    } else {
      return ext;
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};
