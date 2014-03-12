define([], function() {

  var DocView = Backbone.View.extend({

    tagName: 'div',

    template: _.template('<h3><%= title %></h3><span><%= markdown %></span><br/><small><%= create_at %>, <%= update_at %></small>'),

    events: {
      'click': 'clickHandler'
    },

    initialize: function() {}, 
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.attr('id', this.model.get('_id'));
      return this;
    },

    clickHandler: function(e) {
      this.trigger('select', this.model.toJSON());
    }

  });

  return DocView;

});