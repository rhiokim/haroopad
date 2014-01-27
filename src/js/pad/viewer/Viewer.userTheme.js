define([
  'viewer/Viewer.userTheme.StyleParser'
], function(parse) {
  var fs = require('fs');
  var path = require('path');
  var view, config = store.get('Viewer') || {};

  var iframe = $('#viewer iframe')[0];

  function loadUserCss(userTheme) {
    if (!userTheme) {
      return '';
    }

    var themeFile = path.join(gui.App.dataPath, 'Themes', 'viewer', userTheme);
    themeFile += '.css';

    try {
      return fs.readFileSync(themeFile, 'utf8');
    } catch (e) {}
  }

  var CustomStyle = Backbone.View.extend({
    el: document.createElement('style'),

    initialize: function() {
      var head = iframe.contentDocument.getElementsByTagName('head')[0];
      var css = loadUserCss(config.userTheme);
      head.appendChild(this.el);

      if (css) {
        this.updateStyle(css);
      }
    },

    init: function() {
      this.changeUserTheme(config.userTheme);
    },

    updateStyle: function(css) {
      var style = parse(css);
      this.$el.text(style || '');
    },

    changeUserTheme: function(theme) {
      var css = loadUserCss(theme);
      this.updateStyle(css);
    }
  });

  view = new CustomStyle;

  window.parent.ee.on('preferences.viewer.userTheme', view.changeUserTheme.bind(view));

  return view;
});