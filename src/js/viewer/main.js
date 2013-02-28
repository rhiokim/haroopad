// Load native UI library.
var gui = require('nw.gui');

function loadCss(url) {
  var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

function setViewStyle(style) {
  loadCss('css/viewer/'+ style +'.css');
}
function setCodeStyle(style) {
  loadCss('css/code/'+ style +'.css');
}

function createTOC() {
  // $("#toc").html('');
  // $("#toc").tocify({ selectors: "h2, h3, h4" }).data("toc-tocify").generateToc();
  // $("#toc").tocify();
  var toc = generateTOC($('#contents')[0]);
  $('#toc').html(toc);
}

/**
 * update contents
 * @param  {[type]} contents [description]
 * @return {[type]}          [description]
 */
function update(contents) {
  //unregister previous anchor click event handler
  $('a').off('click', '**');
  $('#contents').html(contents);

  createTOC();
}

function allowLink() {
  $('a').on('click', function(e) {
    gui.Shell.openExternal($(e.target).attr('href'));
    e.preventDefault();
  });
}

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