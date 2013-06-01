define(function() {

  // $('#crash-dialog').modal();
  var el = $('#error-dialog');
  
  return {
  	throw: function(type, message) {
  		var body = el.find('strong');
  		body.removeAttr('class');
  		body.addClass('text-'+ type);
  		body.html(message);

  		el.modal();
  	}
  };
});