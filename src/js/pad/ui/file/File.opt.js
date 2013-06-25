define(function() {

  var Model = Backbone.Model.extend({
    defaults: {
      created_at: new Date,
      updated_at: new Date,
      fileEntry: undefined,
      extname: '.md',
      dirname: undefined,
      basename: undefined,
      markdown: undefined,
      tmp: undefined
    }
  });

  return model = new Model;
});