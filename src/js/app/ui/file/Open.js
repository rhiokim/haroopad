define(function() {
  var view;

  var View = Backbone.View.extend({
  	el: '#openFile',
  	
  	events: {
  	  'change': 'changeHandler'
  	},

  	initialize: function() {
  	},

  	show: function() {
  	  this.$el.trigger('click');
  	},

  	changeHandler: function(e) {
  	  var file = this.$el.val();
  	  view.trigger('file.open', file);
  	}
  });

  return view = new View;
});