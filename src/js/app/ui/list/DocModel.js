define([
    'db/DB'
  ], function(DB) {
    var updateTimeOut;

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
      this.on('change:markdown', this.updateMarkdown);
    },

    save: function() {
      var doc = this.toJSON();
      delete doc._id;

      // console.log(doc, this.id)
      DB.put(doc, this.id, function(err, response) {
        if (err) {
          console.log(err);
          throw err;
          return;
        }
        // console.log('save complete:', response)
        this.set({ _rev: response.rev });
        // console.log('updated:', response);
      }.bind(this));
    },

    updateMarkdown: function() {
      clearTimeout(updateTimeOut);
      updateTimeOut = setTimeout(function() {
        this.set({ update_at: new Date().getTime() });
        this.save();
      }.bind(this), 1000);
    },

    updateDoc: function(child, data) {
      // console.log(data);
    },

    toggle: function() {
      this.save({ done: !this.get("done") });
    }
    
  });

  return ItemModel;
});