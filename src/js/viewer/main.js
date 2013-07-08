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
}

//for performance
var timeoutSyntaxHighlight;
function _lazySyntaxHighlight() {
  clearTimeout(timeoutSyntaxHighlight);

  timeoutSyntaxHighlight = setTimeout(function() {
    $('pre>code').each(function(i, e) {

      var codeEl = $(this);
      var code = codeEl.html();
      var lang = codeEl.attr('class');

      if (!lang) {
        codeEl.html(hljs.highlightAuto(code).value);
      } else {
        codeEl.html(hljs.highlight(lang, code).value);
      }
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
  var wrapper = $('<div>').html(html);
  var frags, _frag, origin;

  wrapper.find('img').each(function() {
    var src = $(this).attr('src');

    if(src.indexOf('://') == -1) {
      $(this).attr('src', _options.dirname +'/'+ src);
    }
  });

  frags = wrapper.find('>*');

  _frags = document.querySelectorAll('body>*') || [];
  _frags = Array.prototype.slice.call(_frags, 0);

  //이전에 작성된 내용이 없는 경우
  // if (_frags.length <= 0) {
  //   $(document.body).html(wrapper[0].innerHTML);
  //   return;
  // }

  var scollTick = 0;
  //작성된 내용이 있는 경우 새로운 프레그먼트로 치환
  frags.each(function(idx, frag) {
    _frag = _frags.shift();

    //이전 프레그먼트 없는 경우 body 에 추가
    if (!_frag) {
      // var el = $(frag).appendTo(document.body);

      document.body.appendChild(frag);
      if(scollTick <= 0) {
      }
    } else {

      //이전 렌더링에 origin 문자열이 있는 경우 origin 문자열로 대조한다.
      // origin = $(_frag).attr('origin');
      origin = _frag.getAttribute('origin');

      //origin 문자열이 없는 경우
      if (!origin) {
        //새로운 프레그먼트와 이전 프레그먼트가 다른 경우는 새로운 프레그먼트로 치환
        if (frag.outerHTML != _frag.outerHTML) {

          _frag.style.display = 'none';
          document.body.insertBefore(frag, _frag);
          document.body.removeChild(_frag);

          if(scollTick <= 0) {
          }
        }
      } else {
        //origin 문자열이 있는 경우
        if (frag.outerHTML != origin) {

          _frag.style.display = 'none';
          document.body.insertBefore(frag, _frag);
          document.body.removeChild(_frag);
        }
      }
    }
  });

  var pres = document.body.querySelectorAll('pre')
  for (var i = 0; i < pres.length; i++) {
    pres[i].setAttribute('origin', pres[i].outerHTML);
  }
  // $(document.body).find('pre').each(function(i, e) {
  //   $(this).attr('origin', $(this)[0].outerHTML);
  // });

  //새로이 작성된 내용이 지난 작성 내용에 비해 적을 경우
  //남아 있는 프레그먼트를 모두 제거
  if (_frags.length > 0) {
    _frags.forEach(function(frag, idx) {
      document.body.removeChild(frag);
      // $(frag).remove();
    });
  }
  
  // if (frags.find('img').length > 0) {
  //   _fixImagePath();
  // }
  
  _preventDefaultAnchor();
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