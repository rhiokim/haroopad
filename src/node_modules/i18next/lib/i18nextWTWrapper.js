var express;

try {
    express = require('express');
} catch (err) {
    express = undefined;
}

var defaults = {
    path: '/i18next',
    i18nextWTOptions: {
        languages: ['dev'],
        namespaces: ['translation'],
        resGetPath: 'locales/__lng__/__ns__.json',
        resChangePath: 'locales/change/__lng__/__ns__',
        resRemovePath: 'locales/remove/__lng__/__ns__',
        fallbackLng: 'dev',
        dynamicLoad: false
    },
    resourceSets: [
        // { 
        //     language: 'test',
        //     resources: {
        //         layout: {
        //             header: {
        //                 language: 'english'
        //             }
        //         },
        //         editor: {
        //             choose: 'select',
        //             addKey: 'add Key',
        //             add: 'add',
        //             'delete': 'delete',
        //             edit: 'edit',
        //             cancel: 'cancel',
        //             save: 'save',
        //             test: 'test',
        //             filterKeys: 'filter keys',
        //             th: {
        //                 key: 'key',
        //                     specificValue: 'specific value',
        //                     displayedValue: 'displayed value'
        //             },
        //             resourceItem: {
        //                 options: 'options',
        //                 optionsDesc: 'one option per line, eg. count=0'
        //             }
        //         }
        //     }
        // }
    ],
    authenticated: function(req, res) { return true; },
    index: [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
          '<meta charset="utf-8">',
          '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
          '<meta name="viewport" content="width=device-width,initial-scale=1">',

          '<title>i18next - webtranslate</title>',

          '<!-- Application root. -->',
          '<base href="/">',

          '<!-- Application styles. -->',
          '<link rel="stylesheet" href="__path__/css/i18nextWT.css">',
        '</head>',

        '<body>',
          '<div class="header">',
            '<div class="header-inner"></div>',
          '</div>',

          '<div class="main">',
            '<div class="main-inner"></div>',
          '</div>',

          '<div class="footer">',
            '<div class="footer-inner"></div>',
          '</div>',

          '<!-- Application source. -->',
          '<script src="__path__/js/i18nextWT.js"></script>',
          '<script language="javascipt" type="text/javascript">',
            'i18nextWT_onready = function(wt) {',

              '__loadResources__',

              'wt.config(',
                'JSON.parse(\'__i18nextWTOptions__\')',
              ')',

              'wt.start();',
            '};',
          '</script>',
        '</body>',
        '</html>'
    ].join('\n')
};

var extend = function(target, source) {
    if (!source || typeof source === 'function') {
        return target;
    }
    
    for (var attr in source) { target[attr] = source[attr]; }
    return target;
};

var parseResources = function(resourceSets) {
    var content = '';

    for (var i = 0, len = resourceSets.length; i < len; i++) {
        var res = resourceSets[i];
        content += 'wt.addResourceSet("' + res.language + '", JSON.parse(\'' + JSON.stringify(res.resources) + '\'));\n';
    }

    return content;
};


module.exports = {

    serve: function(app, options) {
        if (!express) {
          console.log('to serve i18next-webtranslate you need express installed. npm install express.');
          return;
        }

        options = options || {};
        options.i18nextWTOptions = extend(defaults.i18nextWTOptions, options.i18nextWTOptions || {}); // extend inner opts
        options = extend(defaults, options);

        var path = require('path').resolve(__dirname + '/dep/i18nextWT');
        app.use(options.path, express.static(path));

        app.get(options.path, function(req, res) {
            if (!options.authenticated(req, res)) {
                res.end();
                return;
            }

            var html = options.index;
            html = html.replace('__i18nextWTOptions__', JSON.stringify(options.i18nextWTOptions));

            html = html.replace('__loadResources__', parseResources(options.resourceSets));

            html = html.replace(/__path__/g, options.path);

            res.send(html);
        });
    }

};