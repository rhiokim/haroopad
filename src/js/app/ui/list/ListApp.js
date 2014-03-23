define([
    'ui/list/DocView',
    'ui/list/DocModel',
    'ui/list/DocList'
  ], function(DocView, DocModel, DocList) {

    var docId = '';

  var ListApp = Backbone.View.extend({

    el: '#list',

    events: {
      'click >div': 'clickHandler'
    },

    initialize: function() {
      this.listenTo(DocList, 'add', this.addOne);
      this.listenTo(DocList, 'reset', this.reset);

      ee.on('update.doc', this.updateOne.bind(this));

      DocList.fetch();
    },

    add: function(doc) {
      DocList.add(doc, { index: 0, silent: true });

      this.newOne(new DocModel(doc));
    },

    query: function() {
      this.$el.html('');

      db.query({ map: function(doc) {
        if (doc.title !== 'Untitled') {
          emit(doc);
        }
      }}, { reduce: false, include_docs: true }, function(err, results) {
        if (err) {
          throw err;
        }

        DocList.reset();
        results.rows.forEach(function(row) {
          DocList.add(row.doc);
        });
        console.log(err, results);
      });
    },

    more: function() {
      DocList.more();
    },

    saveDoc: function() {
      var doc = DocList.get(docId);
      doc.save();
    },

    updateDoc: function(str) {
      var doc = DocList.get(docId);
      doc.set({ markdown: str });
    },

    newOne: function(doc) {
      var view = new DocView({ model: doc });
      this.$el.prepend(view.render().el);
    },

    addOne: function(doc) {
      var view = new DocView({ model: doc });
      this.$el.append(view.render().el);
    },

    updateOne: function(doc) {
      var d = DocList.get(doc._id);

      if (!d) {
        return;
      } 

      d.set(doc);
      var view = new DocView({ model: d });
      this.$('#'+ doc._id).html(view.render().$el.html());
    },

    addAll: function() {
      DocList.each(this.addOne, this);
    },

    clickHandler: function(e) {
      var el = e.currentTarget;

      docId && $('#'+ docId).removeClass('active');
      $(el).addClass('active');

      docId = el.id;

      this.trigger('select', DocList.get(docId));
    }
  });

  var app = new ListApp();

  return app;

});