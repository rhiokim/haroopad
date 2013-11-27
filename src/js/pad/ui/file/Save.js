define(function() {
  var view;

  function setDefault() {
    var f = new File('/path/to/file', 'name'); 
    var files = new FileList(); 
    files.append(f); 
    document.getElementById('input0').files = files; 
  }

  var View = Backbone.View.extend({
  	el: '#saveFile',
  	
  	events: {
  	  'change': 'changeHandler'
  	},

  	initialize: function() {
  	},

    /* it does not work exactly */
    setDefault: function(file) {
      file = file || ( nw.file.get('title') || 'Untitled' ) + '.md';

      this.$el.attr('nwsaveas', file);
    },

  	show: function(dir, file) {
      this.$el.attr({ nwworkingdir: dir });
      this.setDefault(file);

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