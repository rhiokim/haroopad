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
    setDefault: function(dir) {
      var f = new File(dir +'/Untitled.md', 'Untitled.md');
      var files = new FileList();
      files.append(f);

      this.$el[0].files = files;
    },

  	show: function(dir) {
      this.$el.attr({ nwworkingdir: dir });
      // this.setDefault(dir);

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