// Load native UI library.
var gui = require('nw.gui');
var _options;

function loadCss(url) {
  var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

function setViewStyle(style) {
  loadCss('css/markdown/'+ style +'/'+ style +'.css');
  $(document.body).removeClass();
  $(document.body).addClass('markdown');
  $(document.body).addClass(style);
}

function setCodeStyle(style) {
  loadCss('css/code/'+ style +'.css');
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
  _options = options;

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

/**
 * update contents
 * @param  {[type]} contents [description]
 * @return {[type]}          [description]
 */
function update(contents) {
  //unregister previous anchor click event handler
  $('a').off('click', '**');
  $(document.body).html(contents);

  _fixImagePath();
  // createTOC();
}

/**
 * enable click event at link
 * @return {[type]} [description]
 */
function allowLink() {
  $('a').on('click', function(e) {
    gui.Shell.openExternal($(e.target).attr('href'));
    e.preventDefault();
  });
}

/**
 * disable click event at link
 * @return {[type]} [description]
 */
function blockLink() {
  $('a').on('click', function(e) {
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