define([
    'txt!tpl/modal-export-setting.html'
  ], 
  function(html) {
    $('#dialogs').append(html);

    var View = Backbone.View.extend({
      el: '#export-setting-dialog',

      events: {
        'click button[name=yes]': 'yesHandler',
        'click button[name=no]': 'noHandler'
      },

      initialize: function() {
        this.$el.i18n();
      },

      show: function(file) {
        this.$el.modal('show');
      },

      hide: function() {
        this.$el.modal('hide');
      },

      yesHandler: function() {
        this.trigger('yes');
        this.hide();
      },

      noHandler: function() {
        this.trigger('no');
        this.hide();
      }
    });

    return new View;
});