var supportLanuages = ['en', 'ko'];
var language = window.navigator.language || window.navigator.userLanguage;
language = language.substr(0, 2);

/**
 * Setup default language
 */
language = (_.indexOf(supportLanuages, language) === -1) ? 'ko' : language;

/**
 * Social button in blog article
 */

function setStarrre(title) {
	$('#shareme').attr('data-url', window.location.href);
	$('#shareme').attr('data-text', title);
	$('#shareme').sharrre({
		share: {
			googlePlus: true,
			facebook: true,
			twitter: true,
			digg: true,
			delicious: true,
			stumbleupon: true,
			linkedin: true
			/*,
	    pinterest: true*/
		},
		buttons: {
			googlePlus: {
				size: 'tall',
				annotation: 'bubble'
			},
			facebook: {
				layout: 'box_count'
			},
			twitter: {
				count: 'vertical'
			},
			digg: {
				type: 'DiggMedium'
			},
			delicious: {
				size: 'tall'
			},
			stumbleupon: {
				layout: '5'
			},
			linkedin: {
				counter: 'top'
			}
			/*,
	    pinterest: {media: 'http://sharrre.com/img/example1.png', description: $('#shareme').data('text'), layout: 'vertical'}*/
		},
		enableHover: false,
		enableCounter: false,
		enableTracking: true
	});
}

function loadPost(file) {
	var dir = 'docs/' + language + '/' + file.replace('#', '') + '/';
	file = dir + 'index.md';

	$.ajax({
		url: file
	}).done(function(data) {
		var str = parse(data);
		str = str.replace(/src=\"images/g, 'src="' + dir + 'images');
		$('.contents').html(str);

		var title = $('h1, h2, h3, h4, h5, h6')[0].innerText || '';
		title += ' | Haroopad - The Next Document processor based on Markdown'
		window.document.title = title;

		drawEmbedContents($('.contents')[0]);
		setStarrre(title.replace(' | ', '\n\n') + '\n#markdown #haroopad');
	});
}

var ebdOpt = {
  includeHandle: false,
  embedMethod: 'fill',
  afterEmbed: function(oembedData, externalUrl) {
    if (typeof oembedData.code == 'string') {
      this.attr('data-replace', oembedData.code);
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

var __timeout;

$(document).ready(function() {
	var file;
	var prevHash;

	file = url('?f');

	if (file) {
		loadPost(file);
	} else {
		loadPost('about');
	}

	/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	var disqus_shortname = 'haroopad'; // required: replace example with your forum shortname

	/* * * DON'T EDIT BELOW THIS LINE * * */
	(function() {
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
});