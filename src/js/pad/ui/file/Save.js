define(function() {
  var view;

  var View = Backbone.View.extend({
  	el: '#saveFile',
  	
  	events: {
  	  'change': 'changeHandler'
  	},

  	initialize: function() {
  	},

  	show: function(dir) {
      // this.$el.attr({ nwworkingdir: dir });
  	  this.$el.trigger('click');
  	},

  	changeHandler: function(e) {
  	  var file = this.$el.val();
      if (!file) {
        return;
      }
  	  view.trigger('file.save', file);
  	}
  });

  return view = new View;
});