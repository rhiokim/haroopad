define([
  'editor/Editor.custom.StyleParser'
], function(parse) {
  var view, config = store.get('Editor') || {};
  var userStyle = config.userStyle || '';

  var CustomStyle = Backbone.View.extend({
    el: document.createElement('style'),

    initialize: function() {
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(this.el);

      this.updateStyle(userStyle);
    },

    updateStyle: function(css) {
      try {
        var style = parse(css);
        this.$el.text(style || '');

        if (nw.editor) {
          nw.editor.refresh();
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  view = new CustomStyle;

  window.parent.ee.on('preferences.editor.userStyle', view.updateStyle.bind(view));
});