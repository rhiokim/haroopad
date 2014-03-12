define([
  'db/DB',
  'ui/list/DocModel'
  ], function(DB, DocModel) {

  var DocList = Backbone.Collection.extend({

    model: DocModel,

    query: {
      limit: 3,
      skip: 0,
      // descending: true,
      include_docs: true,
      conflicts: true
      // reverse: true,
      // startkey: '01AFC23B-6E44-4937-BF69-FA976265A941'
    },

    initialize: function() {
    },

    fetch: function() {
      var me = this;

      DB.allDocs(this.query, function(err, response) {
        response.rows.forEach(function(item, idx) {
          // console.log(item.doc);
          me.add(item.doc);
        });
      });
    },

    more: function() {
      var me = this;

      this.query.skip += this.query.limit;
      
      DB.allDocs(this.query, function(err, response) {
        response.rows.forEach(function(item, idx) {
          // console.log(item.doc);
          me.add(item.doc);
        });
      });
    },

    done: function() {
      return this.where({ done: true });
    },

    remaining: function() {
      return this.where({ done: false });
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('create_at') + 1;
    },

    comparator: 'create_at'

  });

  return new DocList;

});