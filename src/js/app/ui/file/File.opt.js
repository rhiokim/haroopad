define(function() {

  var Model = Backbone.Model.extend({
    defaults: {
      created_at: new Date,
      updated_at: new Date,
      fileEntry: undefined,
      extname: 'md',
      basename: undefined,
      markdown: undefined
    }
  });

  return model = new Model;
});