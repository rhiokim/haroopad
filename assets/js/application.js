function setStarrre() {
	var text = $('h1, h2, h3, h4, h5, h6')[0].innerText || '';
	$('#shareme').attr('data-url', window.location.href);
	$('#shareme').attr('data-text', text);
  $('#shareme').sharrre({
	  share: {
	    googlePlus: true,
	    facebook: true,
	    twitter: true,
	    digg: true,
	    delicious: true,
	    stumbleupon: true,
	    linkedin: true/*,
	    pinterest: true*/
	  },
	  buttons: {
	    googlePlus: {size: 'tall', annotation:'bubble'},
	    facebook: {layout: 'box_count'},
	    twitter: {count: 'vertical'},
	    digg: {type: 'DiggMedium'},
	    delicious: {size: 'tall'},
	    stumbleupon: {layout: '5'},
	    linkedin: {counter: 'top'}/*,
	    pinterest: {media: 'http://sharrre.com/img/example1.png', description: $('#shareme').data('text'), layout: 'vertical'}*/
	  },
	  enableHover: false,
	  enableCounter: false,
	  enableTracking: true
	});
}

function loadPost(file) {
  var dir = 'docs/'+ file.replace('#', '') +'/';
  file = dir +'index.md';

  $.ajax({
    url: file
  }).done(function(data) {
    var str = marked(data);
    str = str.replace(/src=\"images/g, 'src="'+ dir +'images');
    $('.contents').html(str);


  	setStarrre();
  });
}

var __timeout;

$(document).ready(function() {
  var file;
  var prevHash;
  
  window.setInterval(function() {
  	if (prevHash && prevHash != window.location.href) {
    	window.location.href =  $(this).attr('href');
    	window.location.reload();
    	window.clearInterval(__timeout);
    	return;
  	}

  	prevHash = window.location.href;
  }, 10);

  $('.share a').click(function(e) {
    file = $(this).attr('href');
    e.preventDefault();

    window.location.replace($(this).attr('href'));
    window.reload();
  });

  file = url('#');

  if(file) {
    loadPost(file);
  } else {
    loadPost('about');
  }
});