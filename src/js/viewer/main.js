var _options = {
  dirname: '.'
};
var viewStyle, codeStyle;
var contentElements;

window.ee = new EventEmitter();

window.ondragover = function(e) {
  e.preventDefault();
  return false;
};
window.ondrop = function(e) {
  var i = 0, file, fArr, ext;

  for (i; i < e.dataTransfer.files.length; ++i) {

    ee.emit('drop', e.dataTransfer.files[i]);
    // file = e.dataTransfer.files[i].path;
    // fArr = file.split('.');
    // ext = fArr[fArr.length-1];

    // if (ext.toLowerCase() === 'css') {
    //   loadCustom(file);
    //   $(document.body).addClass('custom');
    // }
  }
  e.preventDefault();
};

function loadCss(url) {
  $('<link>').attr({
    type: 'text/css',
    rel: 'stylesheet',
    href: url
  }).appendTo('head');
}

function setViewStyle(style) {
  var href = 'css/markdown/' + style + '/' + style + '.css';

  $('#view').attr({
    href: href
  });

  $(document.body).removeClass();
  $(document.body).addClass('markdown');
  $(document.body).addClass(style);
}

function setCodeStyle(style) {
  var href = 'css/code/' + style + '.css';
  $('#code').attr({
    href: href
  });
}

function loadCustomCSS(style) {
  $(document.body).addClass('custom');

  $('#custom').attr({
    href: style +'?'+ new Date().getTime()
  });
}

/**
 * set column layout
 * @param {[type]} count [description]
 */
function setColumn(count) {
  var href,
    count = count || 'single';
    
  href = 'css/column/' + count + '.css';
  $('#column').attr({
    href: href
  });
}

/**
 * set toc style
 */
function showOutline() {
  var href;
    
  href = 'css/viewer-toc/default.css';
  $('#toc').attr({
    href: href +'?'+ new Date().getTime()
  });
}
function showTOC() {
  var href;
    
  href = 'css/viewer-toc/only-toc.css';
  $('#toc').attr({
    href: href +'?'+ new Date().getTime()
  });
}

function hideOutline() {
  $('#toc').removeAttr('href');
}

function hideTOC() {
  $('#toc').removeAttr('href');
}

function showOnlyTOC() {
  // var elArr = document.body.querySelectorAll(':scope>*');
  // elArr = Array.prototype.slice.call(elArr, 0);
  
  // contentElements = elArr.filter(function(el) {
  //   return !/^H[1-6]/.test(el.tagName);
  // });

  // contentElements.forEach(function(el) {
  //   el.style.display = 'none';
  // });  
}

function showAllContent() {alert('all show')
  contentElements.forEach(function(el) {
    el.style.display = '';
  });  
}

function createTOC() {
  var toc = generateTOC($(document.body)[0]);
  $(document.body).prepend('<div id="toc"></div>');
  $('#toc').html(toc);
  $(document.body).scrollspy('refresh');
}

function init(options) {
  _options = options || {
    dirname: '.'
  };
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

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.textContent;
}

//for performance

function _lazySyntaxHighlight(el) {
  // var codeEl = el.firstElementChild;
  var code = el.innerHTML;
  var lang = el.className;

  lang = lang == 'js' ? 'javascript' : lang;
  code = htmlDecode(code);

  try {
    if (!lang) {
      el.innerHTML = hljs.highlightAuto(code).value;
    } else {
      el.innerHTML = hljs.highlight(lang, code).value;
    }
  } catch (e) {
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

function countFragments(target) {
  var header = target.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
  var img = target.querySelectorAll('img').length;
  // var bold = target.querySelectorAll('strong').length;
  // var italic = target.querySelectorAll('i').length;
  var code = target.querySelectorAll('code').length;
  // var fencedcode = code - target.querySelectorAll('pre>code').length;
  var blockquote = target.querySelectorAll('blockquote').length;
  var paragraph = target.querySelectorAll('p').length;
  var link = target.querySelectorAll('a').length;
  var table = target.querySelectorAll('table').length;

  window.ee.emit('dom', {
    header: header,
    paragraph: paragraph,
    link: link,
    image: img,
    code: code,
    // fencedcode: fencedcode,
    blockquote: blockquote,
    table: table
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
  var i, frag, frags, _frag, _frags, origin, _origin,
    code, codes, _code, _codes;

  frags = wrapper.querySelectorAll(':scope>*');
  frags = Array.prototype.slice.call(frags, 0);

  _frags = document.body.querySelectorAll(':scope>*');
  _frags = Array.prototype.slice.call(_frags, 0);

  //새로 생성된 pre 엘리먼트 origin attribute 에 본래 html 을 저장
  codes = wrapper.querySelectorAll('pre>code');
  codes = Array.prototype.slice.call(codes, 0);

  _codes = document.body.querySelectorAll('pre>code');
  _codes = Array.prototype.slice.call(_codes, 0);

  for (i = 0; i < codes.length; i++) {
    code = codes[i];
    _code = _codes[i];

    origin = code.parentElement.outerHTML;
    code.setAttribute('origin', origin);

    if (_code) {
      _origin = _code.parentElement.getAttribute('origin');

      if (origin != _origin) {
        _lazySyntaxHighlight(code);
      }
    } else {
      _lazySyntaxHighlight(code);
    }
  }

  var src, imgs = wrapper.querySelectorAll('img');
  for (i = 0; i < imgs.length; i++) {
    src = imgs[i].getAttribute('src');

    if (src.indexOf('//') == -1 && !/^\//.test(src)) {
      imgs[i].setAttribute('src', _options.dirname + '/' + src);
    }
  }

  //작성된 내용이 있는 경우 새로운 프레그먼트로 치환
  // frags.each(function(idx, frag) {
  for (i = 0; i < frags.length; i++) {
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

  // _preventDefaultAnchor();
  // _lazySyntaxHighlight();
  
  countFragments(document.body);
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

function replaceExternalContent(el, origin) {
  var plugin = $(origin)[0];
  plugin.setAttribute('origin', origin);
  el.style.display = 'none';
  document.body.insertBefore(plugin, el);
  document.body.removeChild(el);
}

$(document.body).ready(function() {

  $(document.body).click(function(e) {
    var origin, el = e.target;
    e.preventDefault();

    switch (el.tagName.toUpperCase()) {
      case 'IMG':
        origin = el.getAttribute('origin');
        if (origin) {
          replaceExternalContent(el, origin);
        }
        break;
      case 'A':
        window.ee.emit('link', el.getAttribute('href'));
        break;
    }

  });

});