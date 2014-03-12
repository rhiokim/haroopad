define([
  ], function(DocModel) {

  var Nav = Backbone.View.extend({

    el: '#nav',

    events: {
      'click #btnWrite': 'writeHandler',
      'click #btnNew': 'newHandler',
      'click #btnSave': 'saveHandler',
      'click #btnMore': 'moreHandler',
      'click #btnSync': 'syncHandler'
    },

    initialize: function() {
    },

    writeHandler: function() {
      this.trigger('write');
      console.log('write hander');
    },

    newHandler: function() {
      console.log('new handler');
      this.trigger('new');
    },

    saveHandler: function() {
      console.log('save handler');
      this.trigger('save');
    },

    moreHandler: function() {
      console.log('more handler');
      this.trigger('more');
    },

    syncHandler: function() {
      console.log('sync handler');
      this.trigger('sync');
    }
  });

  return new Nav;
});