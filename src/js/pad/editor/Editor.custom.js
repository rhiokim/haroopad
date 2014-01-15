define([], function() {
  var view, config = store.get('Editor') || {};
  var userStyle = config.userStyle || '';

  var CustomStyle = Backbone.View.extend({
    el : document.createElement('style'),

    initialize: function() {
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(this.el);
    },

    updateStyle: function(css) {
      this.$el.text(css || '');
    }
  });

  view = new CustomStyle;

  window.parent.ee.on('preferences.editor.userStyle', view.updateStyle.bind(view));
});