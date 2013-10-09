var _doc,
    _body,
    _md_body;
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

  $(_body).removeClass();
  $(_body).addClass('markdown');
  $(_body).addClass(style);
}

function setCodeStyle(style) {
  var href = 'css/code/' + style + '.css';
  $('#code').attr({
    href: href
  });
}

function loadCustomCSS(style) {
  $(_body).addClass('custom');

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

function showAllContent() {
  contentElements.forEach(function(el) {
    el.style.display = '';
  });  
}

function createTOC() {
  var toc = generateTOC(_body);
  $(_body).prepend('<div id="toc"></div>');
  $('#toc').html(toc);
  $(_body).scrollspy('refresh');
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
  var headers = target.querySelectorAll('h1, h2, h3, h4, h5, h6');
  var imgs = target.querySelectorAll('img');
  // var bold = target.querySelectorAll('strong').length;
  // var italic = target.querySelectorAll('i').length;
  var codes = target.querySelectorAll('code');
  // var fencedcode = code - target.querySelectorAll('pre>code').length;
  var blockquotes = target.querySelectorAll('blockquote');
  var paragraphs = target.querySelectorAll('p');
  var links = target.querySelectorAll('a');
  var tables = target.querySelectorAll('table');

  window.ee.emit('dom', {
    header: headers.length,
    paragraph: paragraphs.length,
    link: links.length,
    image: imgs.length,
    code: codes.length,
    // fencedcode: fencedcode,
    blockquote: blockquotes.length,
    table: tables.length
  });

  window.ee.emit('title', headers[0] && headers[0].innerHTML);
}

var _embedTimeout;
var ebdOpt = {
  includeHandle: false,
  embedMethod: 'fill',
  afterEmbed: function(oembedData, externalUrl) {
    // this[0].setAttribute('data-origin-url', externalUrl);
    if (typeof oembedData.code == 'string') {
      this[0].setAttribute('data-replace', oembedData.code);
    }
  },
  onProviderNotFound: function(url) {
    this.html('<a href="http://pad.haroopress.com/page.html?f=open-media">이 주소는 콘텐츠 스마트 임베딩을 지원하지 않습니다.</a>');
  }
};
function drawEmbedContents(target) {
  var url, embed, embeds = target.querySelectorAll('.oembed');
  embeds = Array.prototype.slice.call(embeds, 0);

  for (i = 0; i < embeds.length; i++) {
    ebdOpt.ebdOpt = {};
    embed = embeds[i];
    url = embed.getAttribute('data-url');

    $(embed).oembed(url, ebdOpt);

    embed.removeAttribute('class');
    embed.setAttribute('class', 'oembeded');
  }
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

  _frags = _md_body.querySelectorAll(':scope>*');
  _frags = Array.prototype.slice.call(_frags, 0);

  //새로 생성된 pre 엘리먼트 origin attribute 에 본래 html 을 저장
  codes = wrapper.querySelectorAll('pre>code');
  codes = Array.prototype.slice.call(codes, 0);

  _codes = _md_body.querySelectorAll('pre>code');
  _codes = Array.prototype.slice.call(_codes, 0);

  for (i = 0; i < codes.length; i++) {
    code = codes[i];
    _code = _codes[i];

    origin = code.parentElement.outerHTML;
    code.setAttribute('data-origin', origin);

    if (_code) {
      _origin = _code.parentElement.getAttribute('data-origin');

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

    origin = frag.outerHTML;
    frag.setAttribute('data-origin', origin);

    //이전 프레그먼트 없는 경우 body 에 추가
    if (!_frag) {
      // var el = $(frag).appendTo(document.body);

      _md_body.appendChild(frag);
    } else {

      //이전 렌더링에 origin 문자열이 있는 경우 origin 문자열로 대조한다.
      // origin = $(_frag).attr('origin');
      _origin = _frag.getAttribute('data-origin');

      //origin 문자열이 없는 경우
      if (!_origin) {
        //새로운 프레그먼트와 이전 프레그먼트가 다른 경우는 새로운 프레그먼트로 치환
        if (frag.outerHTML != _frag.outerHTML) {
        // if (frag.textContent != _frag.textContent) {

          _frag.style.display = 'none';
          _md_body.insertBefore(frag, _frag);
          _md_body.removeChild(_frag);

        }
      } else {
        // origin = frag.getAttribute('data-origin');

        //origin 문자열이 있는 경우
        if (origin != _origin) {

          _frag.style.display = 'none';
          _md_body.insertBefore(frag, _frag);
          _md_body.removeChild(_frag);

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
      _md_body.removeChild(frag);
      // $(frag).remove();
    });
  }

  // if (frags.find('img').length > 0) {
  //   _fixImagePath();
  // }

  // _preventDefaultAnchor();
  // _lazySyntaxHighlight();
  
  countFragments(_md_body);

  if (_embedTimeout) { 
    window.clearTimeout(_embedTimeout);
  }
  
  _embedTimeout = window.setTimeout(function() {
    drawEmbedContents(document.body);
  }, 1000);
}
/**
 * sync scroll position
 * @param  {[type]} per [description]
 * @return {[type]}     [description]
 */

function scrollTop(per) {
  var h = $(window).height();
  var top = $(_body).prop('clientHeight') - h;

  $(window).scrollTop(top / 100 * per);
}

// function replaceExternalContent(el, origin) {
//   var plugin = $(origin)[0];
//   plugin.setAttribute('origin', origin);
//   el.style.display = 'none';
//   document.body.insertBefore(plugin, el);
//   document.body.removeChild(el);
// }

$(_body).ready(function() {
  _doc = document,
  _body = _doc.body,
  _md_body = _doc.getElementById('root');

  $(_body).click(function(e) {
    var origin, el = e.target;
    e.preventDefault();

    switch (el.tagName.toUpperCase()) {
//       case 'IMG':
//         origin = el.getAttribute('origin');
//         if (origin) {
//           replaceExternalContent(el, origin);
//         }
//         break;
      case 'A':
        window.ee.emit('link', el.getAttribute('href'));
        break;
    }

  });

});