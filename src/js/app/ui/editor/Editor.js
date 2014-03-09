define([], function() {
  var Editor = Backbone.View.extend({

    el: '#editor',

    events: {
      'keyup textarea': 'keyupHandler'
    },

    initialize: function() {
    },

    keyupHandler: function(e) {
      var txt = e.target.value;

      this.trigger('change', txt);
    },

    set: function(str) {
      this.$('textarea').val(str);
    }
  });

  return new Editor;
});