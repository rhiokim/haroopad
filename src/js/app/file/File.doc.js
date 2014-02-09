define([
    'file/File.toc'
  ],
  function(TOC) {

    return Backbone.Model.extend({
      _body: null,
      _headers: null,
      _header: null,

      initialize: function() {
        this._body = document.createElement('div');
        this._headers = [];

        this.on('change:html', function(child, html) {
          this._body.innerHTML = html || '';
          this.trigger('update', this, html);
        });
      },

      isChangeTOC: function(headers) {
        var i = 0, res, header;

        if (headers.length <= 0) {
          return false;
        }

        for (i; i < headers.length; i++) {
          header = headers[i];
          this._header = this._headers[i];

          if (!this._header) {
            return true;
          }

          if (header.textContent != this._header.textContent) {
            return true;
          }
        }

        this._headers = headers;

        return false;
      },

      dom: function() {
        return this._body;
      },

      html: function() {
        return this._body.innerHTML;
      },

      parse: function() {
        var headers     = this._body.querySelectorAll('h1, h2, h3, h4, h5, h6');
        var imgs        = this._body.querySelectorAll('img');
        var codes       = this._body.querySelectorAll('code');
        var blockquotes = this._body.querySelectorAll('blockquote');
        var paragraphs  = this._body.querySelectorAll('p');
        var links       = this._body.querySelectorAll('a');
        var tables      = this._body.querySelectorAll('table');

        this.set({
          title: headers[0] && headers[0].textContent || 'Untitled',
          dom: {
            header    : headers.length,
            paragraph : paragraphs.length,
            link      : links.length,
            image     : imgs.length,
            code      : codes.length,
            blockquote: blockquotes.length,
            table     : tables.length
          }
        });

        /* remove header 1 in toc */
        headers = Array.prototype.slice.call(headers, 0);
        headers = headers.filter(function(header) {
          return header.tagName !== 'H1';
        });

        if (this.isChangeTOC(headers)) {
          this.set({
            toc: TOC.get(headers)
          });
        }
      }
    });
});