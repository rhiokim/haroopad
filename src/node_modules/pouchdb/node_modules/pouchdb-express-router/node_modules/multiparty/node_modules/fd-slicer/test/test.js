var FdSlicer = require('../');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var streamEqual = require('stream-equal');
var assert = require('assert');
var Pend = require('pend');

var describe = global.describe;
var it = global.it;
var before = global.before;
var beforeEach = global.beforeEach;
var after = global.after;

var testBlobFile = path.join(__dirname, "test-blob.bin");
var testBlobFileSize = 20 * 1024 * 1024;
var testOutBlobFile = path.join(__dirname, "test-blob-out.bin");

describe("FdSlicer", function() {
  before(function(done) {
    var out = fs.createWriteStream(testBlobFile);
    for (var i = 0; i < testBlobFileSize / 1024; i += 1) {
      out.write(crypto.pseudoRandomBytes(1024));
    }
    out.end();
    out.on('close', done);
  });
  beforeEach(function() {
    try {
      fs.unlinkSync(testOutBlobFile);
    } catch (err) {
    }
  });
  after(function() {
    try {
      fs.unlinkSync(testBlobFile);
      fs.unlinkSync(testOutBlobFile);
    } catch (err) {
    }
  });
  it("reads a 20MB file (autoClose on)", function(done) {
    fs.open(testBlobFile, 'r', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var actualStream = fdSlicer.createReadStream();
      var expectedStream = fs.createReadStream(testBlobFile);

      var pend = new Pend();
      pend.go(function(cb) {
        fdSlicer.on('close', cb);
      });
      pend.go(function(cb) {
        streamEqual(expectedStream, actualStream, function(err, equal) {
          if (err) return done(err);
          assert.ok(equal);
          cb();
        });
      });
      pend.wait(done);
    });
  });
  it("reads 4 chunks simultaneously", function(done) {
    fs.open(testBlobFile, 'r', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd);
      var actualPart1 = fdSlicer.createReadStream({start: testBlobFileSize * 0/4, end: testBlobFileSize * 1/4});
      var actualPart2 = fdSlicer.createReadStream({start: testBlobFileSize * 1/4, end: testBlobFileSize * 2/4});
      var actualPart3 = fdSlicer.createReadStream({start: testBlobFileSize * 2/4, end: testBlobFileSize * 3/4});
      var actualPart4 = fdSlicer.createReadStream({start: testBlobFileSize * 3/4, end: testBlobFileSize * 4/4});
      var expectedPart1 = fdSlicer.createReadStream({start: testBlobFileSize * 0/4, end: testBlobFileSize * 1/4});
      var expectedPart2 = fdSlicer.createReadStream({start: testBlobFileSize * 1/4, end: testBlobFileSize * 2/4});
      var expectedPart3 = fdSlicer.createReadStream({start: testBlobFileSize * 2/4, end: testBlobFileSize * 3/4});
      var expectedPart4 = fdSlicer.createReadStream({start: testBlobFileSize * 3/4, end: testBlobFileSize * 4/4});
      var pend = new Pend();
      pend.go(function(cb) {
        streamEqual(expectedPart1, actualPart1, function(err, equal) {
          assert.ok(equal);
          cb(err);
        });
      });
      pend.go(function(cb) {
        streamEqual(expectedPart2, actualPart2, function(err, equal) {
          assert.ok(equal);
          cb(err);
        });
      });
      pend.go(function(cb) {
        streamEqual(expectedPart3, actualPart3, function(err, equal) {
          assert.ok(equal);
          cb(err);
        });
      });
      pend.go(function(cb) {
        streamEqual(expectedPart4, actualPart4, function(err, equal) {
          assert.ok(equal);
          cb(err);
        });
      });
      pend.wait(function(err) {
        if (err) return done(err);
        fs.close(fd, done);
      });
    });
  });

  it("writes a 20MB file (autoClose on)", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var actualStream = fdSlicer.createWriteStream();
      var inStream = fs.createReadStream(testBlobFile);

      fdSlicer.on('close', function() {
        var expected = fs.createReadStream(testBlobFile);
        var actual = fs.createReadStream(testOutBlobFile);

        streamEqual(expected, actual, function(err, equal) {
          if (err) return done(err);
          assert.ok(equal);
          done();
        });
      });
      inStream.pipe(actualStream);
    });
  });

  it("writes 4 chunks simultaneously", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd);
      var actualPart1 = fdSlicer.createWriteStream({start: testBlobFileSize * 0/4});
      var actualPart2 = fdSlicer.createWriteStream({start: testBlobFileSize * 1/4});
      var actualPart3 = fdSlicer.createWriteStream({start: testBlobFileSize * 2/4});
      var actualPart4 = fdSlicer.createWriteStream({start: testBlobFileSize * 3/4});
      var in1 = fs.createReadStream(testBlobFile, {start: testBlobFileSize * 0/4, end: testBlobFileSize * 1/4});
      var in2 = fs.createReadStream(testBlobFile, {start: testBlobFileSize * 1/4, end: testBlobFileSize * 2/4});
      var in3 = fs.createReadStream(testBlobFile, {start: testBlobFileSize * 2/4, end: testBlobFileSize * 3/4});
      var in4 = fs.createReadStream(testBlobFile, {start: testBlobFileSize * 3/4, end: testBlobFileSize * 4/4});
      var pend = new Pend();
      pend.go(function(cb) {
        actualPart1.on('finish', cb);
      });
      pend.go(function(cb) {
        actualPart2.on('finish', cb);
      });
      pend.go(function(cb) {
        actualPart3.on('finish', cb);
      });
      pend.go(function(cb) {
        actualPart4.on('finish', cb);
      });
      in1.pipe(actualPart1);
      in2.pipe(actualPart2);
      in3.pipe(actualPart3);
      in4.pipe(actualPart4);
      pend.wait(function() {
        fs.close(fd, function(err) {
          if (err) return done(err);
          var expected = fs.createReadStream(testBlobFile);
          var actual = fs.createReadStream(testOutBlobFile);
          streamEqual(expected, actual, function(err, equal) {
            if (err) return done(err);
            assert.ok(equal);
            done();
          });
        });
      });
    });
  });

  it("write stream emits error when max size exceeded", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var ws = fdSlicer.createWriteStream({start: 0, end: 1000});
      ws.on('error', function(err) {
        assert.strictEqual(err.code, 'ETOOBIG');
        fdSlicer.on('close', done);
      });
      ws.end(new Buffer(1001));
    });
  });

  it("write stream does not emit error when max size not exceeded", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var ws = fdSlicer.createWriteStream({end: 1000});
      fdSlicer.on('close', done);
      ws.end(new Buffer(1000));
    });
  });

  it("write stream start and end work together", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var ws = fdSlicer.createWriteStream({start: 1, end: 1000});
      ws.on('error', function(err) {
        assert.strictEqual(err.code, 'ETOOBIG');
        fdSlicer.on('close', done);
      });
      ws.end(new Buffer(1000));
    });
  });

  it("write stream emits progress events", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var ws = fdSlicer.createWriteStream();
      var progressEventCount = 0;
      var prevBytesWritten = 0;
      ws.on('progress', function() {
        progressEventCount += 1;
        assert.ok(ws.bytesWritten > prevBytesWritten);
        prevBytesWritten = ws.bytesWritten;
      });
      fdSlicer.on('close', function() {
        assert.ok(progressEventCount > 5);
        done();
      });
      for (var i = 0; i < 10; i += 1) {
        ws.write(new Buffer(16 * 1024 * 2));
      }
      ws.end();
    });
  });

  it("write stream unrefs when destroyed", function(done) {
    fs.open(testOutBlobFile, 'w', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var ws = fdSlicer.createWriteStream();
      fdSlicer.on('close', done);
      ws.write(new Buffer(1000));
      ws.destroy();
    });
  });

  it("read stream unrefs when destroyed", function(done) {
    fs.open(testBlobFile, 'r', function(err, fd) {
      if (err) return done(err);
      var fdSlicer = new FdSlicer(fd, {autoClose: true});
      var rs = fdSlicer.createReadStream();
      rs.on('error', function(err) {
        assert.strictEqual(err.message, "stream destroyed");
        fdSlicer.on('close', done);
      });
      rs.destroy();
    });
  });
});
