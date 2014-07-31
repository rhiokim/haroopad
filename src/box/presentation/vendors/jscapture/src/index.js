/* global screen, navigator, setTimeout, URL, Whammy, document */

var JSCapture = JSCapture || (function () {

  'use strict';

  var _isRecording = false,
      _screenWidth = screen.availWidth,
      _screenHeight = screen.availHeight,
      _initialized = false,
      _stream = null,
      _video = null,
      _canvas = null,
      _bufferElems = {},
      _encoder;

  var _defaultConfig = {
    delay: 0,
    x: 0,
    y: 0,
    width: _screenWidth,
    height: _screenHeight,
    scale: 1,
    done: function () {},
    process: [],
    duration: Infinity,
    frameRate: 32,
    fail: function () {}
  };

  navigator.getUserMedia =
    navigator.getUserMedia || navigator.webkitGetUserMedia;

  function capture(config) {
    _setDefaults(config);
    _initialize(function () {
      if (typeof config.done === 'function') {
        setTimeout(function () {
          _captureFrame(config);
          config.done(_canvas.toDataURL());
          //_stream.close();
        }, config.delay);
      }
    }, config);
  }

  function record(config) {
    _setDefaults(config);
    if (typeof Whammy === 'undefined') {
      throw new Error('Whammy is required as dependency for screen recording');
    }
    _initialize(function () {
      _encoder = new Whammy.Video(config.frameRate);
      _isRecording = true;
      setTimeout(function () {
        _record(0, (1 / config.frameRate) * 1000, config);
      }, config.delay);
    }, config);
  }

  function stopRecording(done) {
    if (_isRecording) {
      var result = _encoder.compile();
      _isRecording = false;
//      _stream.stop();
      if (typeof done === 'function') {
        done(result);
      }
    }
  }

  function isRecording() {
    return _isRecording;
  }

  function _captureFrame(config) {
    var context = _canvas.getContext('2d');
    _canvas.width = config.width * config.scale;
    _canvas.height = config.height * config.scale;
    config.process.forEach(function (cb) {
      cb(context, _canvas);
    });
    context.drawImage(_video, -config.x * config.scale,
                              -config.y * config.scale,
                              _screenWidth * config.scale,
                              _screenHeight * config.scale);
  }

  function _setDefaults(config) {
    var keys = Object.keys(_defaultConfig);
    keys.forEach(function (key) {
      config[key] = config[key] || _defaultConfig[key];
    });
    return config;
  }

  function _initialize(success, config) {
    if (_initialized) {
      success(_stream);
    } else {
      navigator.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: 'screen',
            maxWidth: _screenWidth,
            maxHeight: _screenHeight,
            minWidth: _screenWidth,
            minHeight: _screenHeight
          }
        }
      }, function (stream) {
        _stream = stream;
        _initialized = true;
        _canvas = _createHiddenElement('canvas', config);
        _video = _createHiddenElement('video', config);
        _video.src = URL.createObjectURL(stream);
        _video.oncanplay = function () {
          success(stream);
        };
      }, config.fail);
    }
  }

  function _createHiddenElement(elem, config) {
    var el = _bufferElems[elem] || document.createElement(elem);
    document.body.appendChild(el);
    el.width = _screenWidth * config.scale;
    el.height = _screenHeight * config.scale;
    el.style.position = 'absolute';
    el.style.top = (-_screenHeight * config.scale) + 'px';
    el.style.left = (-_screenWidth * config.scale) + 'px';
    if (elem === 'video') {
      el.setAttribute('autoplay', true);
    }
    return el;
  }

  function _record(current, timeout, config) {
    if (current >= config.duration) {
      return stopRecording(config.done);
    }
    _captureFrame(config);
    setTimeout(function () {
      _encoder.add(_canvas);
    }, 0);
    setTimeout(function () {
      _record(current + timeout, timeout, config);
    }, timeout);
  }

  return {
    capture: capture,
    record: record,
    stopRecording: stopRecording,
    isRecording: isRecording
  };
}());

