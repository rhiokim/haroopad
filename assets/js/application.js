function setStarrre() {
	$('#shareme').attr('data-url', window.location.href);
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

$(document).ready(function() {
  var file;

  $('.share a').click(function(e) {
    file = $(this).attr('href');

    if(file.indexOf('#') < 0) {
      e.preventDefault();
      return;
    } else {
      loadPost(file);
    }
  });

  file = url('#');

  if(file) {
    loadPost(file);
  } else {
    loadPost('about');
  }
});