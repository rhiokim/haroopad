define([
  ], 
  function() {
    var model;

    var Model = Backbone.Model.extend({
      defaults: {
        zoomLevel: 0
      },

      initialize: function() {
        var opt = localStorage.getItem('PreferenceWindow');

        this.bind('change', function() {
          store.set('PreferenceWindow', this.toJSON());
        });

        if(opt) {
          this.set(JSON.parse(opt));
        } else {
          this.set(this.defaults);
          store.set('PreferenceWindow', this.toJSON());
        }
      }
    });

    return model = new Model();
});