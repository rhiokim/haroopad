define([
    'ui/db/DB'
  ], function(DB) {

  var ItemModel = Backbone.Model.extend({
    idAttribute: "_id",

    defaults: function() {
      return {
        title: undefined,
        head: undefined,
        type: undefined,
        markdown: undefined,
        toc: undefined,
        create_at: undefined,
        update_at: undefined
        // order: Todos.nextOrder(),
        // done: false
      };
    },

    initialize: function() {
    },

    save: function() {
      var doc = this.toJSON();
      console.log(this.id, doc._rev)
      DB.put(doc, this.id, function(err, response) {
        this.set({ _rev: response._rev });
        // console.log(err, response);
      });
    },

    updateDoc: function(child, data) {
      console.log(data);
    },

    toggle: function() {
      this.save({ done: !this.get("done") });
    }
    
  });

  return ItemModel;
});