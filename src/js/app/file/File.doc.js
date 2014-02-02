define([
    'file/File.toc'
  ],
  function(TOC) {
    // 'use strict'
    //viewer 에서 doc 엘리먼트를 넘겨서
    //viewer 에서 dom 트리 조작이 발생하여 _body 는 초기화 됨
    // var _body = document.createElement('body');
    // var _headers = [], _header;

    // function isChangeTOC(headers) {
    //   var i = 0, res, header,
    //       // headers = _body.querySelectorAll('h1, h2, h3, h4, h5, h6');
    //       headers = Array.prototype.slice.call(headers, 0);

    //   if (headers.length <= 0) {
    //     return false;
    //   }

    //   for (i; i < headers.length; i++) {
    //     header = headers[i];
    //     _header = _headers[i];

    //     if (!_header) {
    //       return true;
    //     }

    //     if (header.textContent != _header.textContent) {
    //       return true;
    //     }
    //   }

    //   _headers = headers;

    //   return false;
    // }

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
        var i = 0, res, header,
            headers = Array.prototype.slice.call(headers, 0);

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

      // update: function(html) {
      //   _body.innerHTML = html || '';
      // },

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

        if (this.isChangeTOC(headers)) {
          this.set({
            toc: TOC.get(headers)
          });
        }
      }
    });
});