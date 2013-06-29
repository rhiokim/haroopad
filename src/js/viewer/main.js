// Load native UI library.
// var gui = require('nw.gui'),
//     win = gui.Window.get();
var _options = {
  dirname: '.'
};
var viewStyle, codeStyle;
window.ee = new EventEmitter();

window.ondragover = function(e) { 
  e.preventDefault(); 
  win.emit('dragover', e);
  return false;
};
window.ondrop = function(e) { 
  e.preventDefault(); 
  win.emit('dragdrop', e);
  return false;
};

function loadCss(url) {
  // var link = document.createElement("link");
  //     link.type = "text/css";
  //     link.rel = "stylesheet";
  //     link.href = url;
  // viewStyle = document.getElementsByTagName("head")[0].appendChild(link);
  $('<link>').attr({
    type: 'text/css',
    rel: 'stylesheet',
    href: url
  }).appendTo('head');
}

function setViewStyle(style) {
  var href = 'css/markdown/'+ style +'/'+ style +'.css';

  $('#view').attr({ href: href });

  $(document.body).removeClass();
  $(document.body).addClass('markdown');
  $(document.body).addClass(style);
}

function setCodeStyle(style) {
  var href = 'css/code/'+ style +'.css';
  $('#code').attr({ href: href });
}

function createTOC() {
  var toc = generateTOC($(document.body)[0]);
  $(document.body).prepend('<div id="toc"></div>');
  $('#toc').html(toc);
  $(document.body).scrollspy('refresh');
}

function delegateKeydown() {
}

function init(options) {
  _options = options || { dirname: '.' };

  delegateKeydown();
}

/**
 * for fix image path
 * @return {[type]} [description]
 */
function _fixImagePath() {
  $('img').each(function() {
    var src = $(this).attr('src');

    if(src.indexOf('://') == -1) {
      $(this).attr('src', _options.dirname +'/'+ src);
    }
  });
}

//for performance
var timeoutSyntaxHighlight;
function _lazySyntaxHighlight() {
  clearTimeout(timeoutSyntaxHighlight);

  setTimeout(function() {
    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  }, 400);
}

/**
 * update contents
 * @param  {[type]} contents [description]
 * @return {[type]}          [description]
 */
function update(contents) {
  //unregister previous anchor click event handler
  $('a').off('click', '**');
  $(document.body).html(contents);

  $('img').on('error', function() {
    $(this).attr('src', './img/noimage.gif');
  });
  _fixImagePath();
  // createTOC();
  
  _preventDefaultAnchor();
  _lazySyntaxHighlight();
}

/**
 * enable click event at link
 * @return {[type]} [description]
 */
function _preventDefaultAnchor() {
  $('a').on('click', function(e) {
    window.ee.emit('link', $(e.target).attr('href'));
    e.preventDefault();
  });
}

/**
 * sync scroll position
 * @param  {[type]} per [description]
 * @return {[type]}     [description]
 */
function scrollTop(per) {
  var h = $(window).height();
  var top = $(document.body).prop('clientHeight') - h;

  $(window).scrollTop(top / 100 * per);
}