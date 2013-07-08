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
  $('img').on('error', function() {
    $(this).attr('src', './img/noimage.gif');
  });

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

  timeoutSyntaxHighlight = setTimeout(function() {
    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  }, 400);
}

/**
 * enable click event at link
 * @return {[type]} [description]
 */
function _preventDefaultAnchor() {
  $('a').off('click', '**');

  $('a').on('click', function(e) {
    window.ee.emit('link', $(e.target).attr('href'));
    e.preventDefault();
  });
}

/**
 * update contents
 * @param  {[type]} contents [description]
 * @return {[type]}          [description]
 */
function update(html) {
  var frags = $('<div>').html(html).find('>*');
  var _frag, 
  _frags = document.querySelectorAll('body>*');
  _frags = Array.prototype.slice.call(_frags, 0);

  //이전에 작성된 내용이 없는 경우
  if (_frags.length <= 0) {
    $(document.body).html(html);
    return;
  }

  var scollTick = 0;
  //작성된 내용이 있는 경우 새로운 프레그먼트로 치환
  frags.each(function(idx, frag) {
    _frag = _frags.shift();

    if (!_frag) {
      var el = $(frag).appendTo(document.body);

        if(scollTick <= 0) {
          $(document.body).scrollTop( el.offset().top - 20 );
          scollTick ++;
        }
    } else {
      if (frag.outerHTML != _frag.outerHTML) {
        var top = $(_frag).offset().top - 20;

        $(_frag).hide();  //did not rendering error when call replaceWith 
        $(_frag).replaceWith(frag.outerHTML);

        if(scollTick <= 0) {
          $(document.body).scrollTop( top );
          scollTick ++;
        }
      }
    }
  });

  //새로이 작성된 내용이 지난 작성 내용에 비해 적을 경우
  //남아 있는 프레그먼트를 모두 제거
  if (_frags.length > 0) {
    _frags.forEach(function(frag, idx) {
      $(frag).remove();
    });
  }
  
  if (frags.find('img').length > 0) {
    _fixImagePath();
  }
  
  if (frags.find('a').length > 0) {
    _preventDefaultAnchor();
  }

  _lazySyntaxHighlight();
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