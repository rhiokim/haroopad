var _options = {
  dirname: '.'
};
var viewStyle, codeStyle;

window.ee = new EventEmitter();

window.ondragover = function(e) { 
  e.preventDefault(); 
  return false;
};
window.ondrop = function(e) { 
  e.preventDefault(); 
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
    $(this).attr('title', 'It is not possible to display image does not exist in that location.');
  });
}

//for performance
// var timeoutSyntaxHighlight;
// function _lazySyntaxHighlight2() {
//   clearTimeout(timeoutSyntaxHighlight);

//   timeoutSyntaxHighlight = setTimeout(function() {
//     $('pre>code').each(function(i, e) {

//       var codeEl = $(this);
//       var code = codeEl.html();
//       var lang = codeEl.attr('class');

//       lang = lang == 'js' ? 'javascript' : '';

//       try {
//         if (!lang) {
//           codeEl.html(hljs.highlightAuto(code).value);
//         } else {
//           codeEl.html(hljs.highlight(lang, code).value);
//         }
//       } catch(e) {
//         return code;
//       }
//     });
//   }, 400);
// }

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.textContent;
}

//for performance
function _lazySyntaxHighlight(el) {
  var codeEl = el.firstElementChild;
  var code = codeEl.innerHTML;
  var lang = codeEl.className; 

  lang = lang == 'js' ? 'javascript' : lang;
  code = htmlDecode(code);

  try {
    if (!lang) {
      codeEl.innerHTML = hljs.highlightAuto(code).value;
    } else {
      codeEl.innerHTML = hljs.highlight(lang, code).value;
    }
  } catch(e) {
    // return code;
  }

    // $('pre>code').each(function(i, e) {

    //   var codeEl = $(this);
    //   var code = codeEl.html();
    //   var lang = codeEl.attr('class');

    //   lang = lang == 'js' ? 'javascript' : '';

    //   try {
    //     if (!lang) {
    //       codeEl.html(hljs.highlightAuto(code).value);
    //     } else {
    //       codeEl.html(hljs.highlight(lang, code).value);
    //     }
    //   } catch(e) {
    //     return code;
    //   }
    // });
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
  // var wrapper = $('<div>').html(html);
  var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
  var i, frag, frags, _frag, origin, _origin;

  frags = wrapper.querySelectorAll(':scope>*');
  frags = Array.prototype.slice.call(frags, 0);
  _frags = document.body.querySelectorAll(':scope>*');
  _frags = Array.prototype.slice.call(_frags, 0);

  
  //새로 생성된 pre 엘리먼트 origin attribute 에 본래 html 을 저장
  var pres = wrapper.querySelectorAll('pre');
  var _pres = document.body.querySelectorAll('pre');
  for (i = 0; i < pres.length; i++) {
    origin = pres[i].outerHTML;
    pres[i].setAttribute('origin', origin);

    if (_pres[i]) {
      _origin = _pres[i].getAttribute('origin');

      if (origin != _origin) {
        _lazySyntaxHighlight(pres[i]);
      }
    } else {
      _lazySyntaxHighlight(pres[i]);
    }
  }

  var src, imgs = wrapper.querySelectorAll('img');
  for (i = 0; i < imgs.length; i++) {
    src = imgs[i].getAttribute('src');

    if(src.indexOf('://') == -1) {
      imgs[i].setAttribute('src', _options.dirname +'/'+ src);
    }
  }

  //작성된 내용이 있는 경우 새로운 프레그먼트로 치환
  // frags.each(function(idx, frag) {
  for(i = 0; i < frags.length; i++) {
    frag = frags[i];
    _frag = _frags.shift();

    //이전 프레그먼트 없는 경우 body 에 추가
    if (!_frag) {
      // var el = $(frag).appendTo(document.body);

      document.body.appendChild(frag);
    } else {

      //이전 렌더링에 origin 문자열이 있는 경우 origin 문자열로 대조한다.
      // origin = $(_frag).attr('origin');
      _origin = _frag.getAttribute('origin');

      //origin 문자열이 없는 경우
      if (!_origin) {
        //새로운 프레그먼트와 이전 프레그먼트가 다른 경우는 새로운 프레그먼트로 치환
        if (frag.outerHTML != _frag.outerHTML) {

          _frag.style.display = 'none';
          document.body.insertBefore(frag, _frag);
          document.body.removeChild(_frag);

        }
      } else {
        origin = frag.getAttribute('origin');
        //origin 문자열이 있는 경우
        if (origin != _origin) {

          _frag.style.display = 'none';
          document.body.insertBefore(frag, _frag);
          document.body.removeChild(_frag);

          // _lazySyntaxHighlight(frag);
        }
      }
    }
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
  // _lazySyntaxHighlight();
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