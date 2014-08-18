
requirejs.config({
  baseUrl: './js',
  waitSeconds: 30,
  paths: {
    // tpl: '../tpl',
    // txt: '../vendors/text/text'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  console.log(e.stack)
  alert('Oops! presentation box is crash :-(');
};


function tokenize(html) {
  var tokens = html.split('<hr class="page">');
  return tokens;
}

function convert(html) {
  var tokens, html, steps = [];

  tokens = tokenize(html);

  tokens.forEach(function(section, idx) {
    steps.push('<section class="slide"><div>\n\t' + section + '\n</div></section>');
  });

  return steps.join('\n\n');
}

function getTitle(data) {
  var str = '<header class="caption">'
            + '  <h1>'+ data.title +'</h1>'
            + '  <p>'+ +'</p>'
            + '</header>\n\n';

  return str;
}

function setCoverImage() {
  $('img[alt=cover]').each(function() {
    $(this).parent().parent().parent().addClass('cover');
  });
  $('img[alt*=picture]').each(function() {
    $(this).parent().parent().parent().addClass('cover');
  });
}

window.update = function(e, data) {
  window.ee = e;
  window.raw = data;

  shower.enterListMode();
  shower.slideList.length = 0;

  location.hash = '';

  $('body').prepend( getTitle(data) + convert(data.html) );

  $('body>section:nth-child(2)').attr({ id: "Cover" }).addClass('cover');
  setCoverImage();

  shower.init();
}

requirejs([], function() {
  $('a[href=#exit]').click(function(e) {
    shower.enterListMode();
    // window.ee.emit('exit.presentation');
  });

  $(document.body).keydown(function(e) {
    if (e.which == 27 && shower.isListMode()) {
      window.ee.emit('exit.presentation');
    }
  });
});