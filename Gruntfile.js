module.exports = function(grunt) {
  var path = require('path');

  require('time-grunt')(grunt);

  grunt.initConfig();
  
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-asciify');

  function platform() {
    var os = process.platform;
    if (os === 'linux') {
      return 'linux'
    } else if (os === 'darwin') {
      return 'osx'
    } else {
      return 'win';
    }
  }

  function arch() {
    var arch = process.arch;

    return arch == 'x64' ? arch : 'ia32';
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('./src/package.json'),

    nwv: '0.12.0',
    os: platform(),
    arch: arch(),
    app: path.normalize('lib/nwjs-v<%= nwv %>-<%= os %>-<%= arch %>'),

    resdir: path.normalize(platform() == 'osx' ? '<%= app %>/nwjs.app/Contents' : '<%= app %>'),

    nwexe: path.normalize(platform() == 'osx' ? '<%= resdir %>/MacOS/nwjs' : '<%= resdir %>/nw'),

    vendors: 'src/js/vendors',
    build: 'build',
    dist: 'dists/<%= pkg.version %>',

    asciify: { 
      banner:{
        text: 'Haroopad',

        // Add the awesome to the console, and use the best font.
        options:{ 
          font:'larry3d',
          log:true
        }
      }
    },
    
    clean: {
      build: [ 'build/*' ],
      release: [ 'build/haroopad.app' ],
      core: [ 'build/haroopad.app' ],
      nwlibs: [ '<%= resdir %>/Libraries'],
      nwres: [ '<%= resdir %>/Resources/Themes','<%= resdir %>/Resources/Boxes' ]
    },

    jshint: {
      all: {
        src: ['src/js/pad/**/*.js']
      }
    },

    cssmin: {
      pad: {
        files: {
          "build/haroopad/css/pad.vendors.min.css": [
            '<%= vendors %>/todc-bootstrap/dist/css/bootstrap.css',
            '<%= vendors %>/todc-bootstrap/dist/css/todc-bootstrap.css'
          ],
          "build/haroopad/css/pad.layout.min.css": [
            'src/css/layout/basic.css',
            'src/css/layout/header.css',
            'src/css/layout/footer.css',
            'src/css/layout/nav.css',
            'src/css/layout/aside.css'
          ],
          "build/haroopad/css/pad.style.min.css": [
            'src/css/header.css',
            'src/css/aside-toc.css',
            'src/css/aside-oembed.css',
            'src/css/nav-md-help.css',
            'src/css/pad.dialog.css',
            'src/css/app.css'
          ]
        }
      },

      preferences: {
        files: {
          "build/haroopad/css/preferences.vendors.min.css": [
            '<%= vendors %>/todc-bootstrap/dist/css/bootstrap.css',
            '<%= vendors %>/todc-bootstrap/dist/css/todc-bootstrap.css',
            '<%= vendors %>/select2/select2-bootstrap.css',
            '<%= vendors %>/select2/select2.css'
          ],
          "build/haroopad/css/preferences.style.min.css": [
            'src/css/preferences.dialog.css',
            'src/css/preferences.css'
          ]
        }
      },

      viewer: {
        files: {
          "build/haroopad/css/viewer.min.css": [
            '<%= vendors %>/haroopad-oembed/jquery.oembed.css',
            '<%= vendors %>/mermaid/dist/mermaid.css',
            '<%= vendors %>/mermaid/dist/mermaid.forest.css',
            'src/css/viewer.css'
          ]
        }
      },

      codemirror: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          "build/haroopad/css/editor.min.css": [
            '<%= vendors %>/CodeMirror/lib/codemirror.css',
            '<%= vendors %>/CodeMirror/theme/*.css',
            '<%= vendors %>/CodeMirror/addon/hint/show-hint.css',
            '<%= vendors %>/CodeMirror/addon/fold/foldgutter.css',
            '<%= vendors %>/CodeMirror-custom/addon/dialog/dialog.css'
          ]
        }
      }
    },

    concat: {
      app: {
        files: {
          '<%= build %>/app.bin.js': [
            'src/js/app/before.app.js',
            // '<%= build%>/app.common.min.js',
            '<%= build%>/menu.min.js',
            '<%= build%>/app.r.min.js',
            'src/js/app/after.app.js'
          ]
        }
      },

      appVendors: {
        files: {
          '<%= build %>/haroopad/js/app.vendors.min.js': [
            '<%= vendors %>/jquery/dist/jquery.min.js',
            '<%= vendors %>/eventEmitter/EventEmitter.min.js',
            '<%= vendors %>/underscore/underscore-min.js',
            '<%= vendors %>/backbone/backbone.min.js',
            '<%= vendors %>/haroopad-keymage/keymage.min.js',
            '<%= vendors %>/store.js/store.min.js',
            '<%= vendors %>/i18next/i18next.min.js',
            '<%= vendors %>/requirejs/require.min.js'
          ]
        }
      },

      pad: {
        files: {
          '<%= build %>/pad.bin.js': [
            'src/js/pad/before.pad.js',
            // '<%= build%>/pad.common.min.js',
            '<%= build%>/menu.min.js',
            '<%= build%>/pad.r.min.js',
            'src/js/pad/after.pad.js'
          ]
        }
      },

      padVendors: {
        files: {
          '<%= build %>/haroopad/js/pad.vendors.min.js': [
            '<%= vendors %>/jquery/dist/jquery.min.js',
            '<%= vendors %>/eventEmitter/EventEmitter.min.js',
            '<%= vendors %>/underscore/underscore-min.js',
            '<%= vendors %>/backbone/backbone.min.js',
            '<%= vendors %>/todc-bootstrap/dist/js/bootstrap.min.js',
            '<%= vendors %>/store.js/store.min.js',
            '<%= vendors %>/haroopad-keymage/keymage.min.js',
            '<%= vendors %>/haroopad-reMarked.js/reMarked.min.js',
            '<%= vendors %>/haroopad-notifer.js/notifier.min.js',
            '<%= vendors %>/i18next/i18next.min.js',
            '<%= vendors %>/requirejs/require.min.js'
          ]
        }
      },

      preferences: {
        files: {
          '<%= build %>/preferences.bin.js': [
            'src/js/preferences/before.preferences.js',
            // '<%= build%>/preferences.common.min.js',
            '<%= build%>/preferences.r.min.js',
            'src/js/preferences/after.preferences.js'
          ]
        }
      },

      preferencesVendors: {
        files: {
          '<%= build %>/haroopad/js/preferences.vendors.min.js': [
            '<%= vendors %>/jquery/dist/jquery.min.js',
            '<%= vendors %>/underscore/underscore-min.js',
            '<%= vendors %>/backbone/backbone.min.js',
            '<%= vendors %>/todc-bootstrap/dist/js/bootstrap.min.js',
            '<%= vendors %>/select2/select2.min.js',
            '<%= vendors %>/store.js/store.min.js',
            '<%= vendors %>/haroopad-keymage/keymage.min.js',
            '<%= vendors %>/i18next/i18next.min.js',
            '<%= vendors %>/requirejs/require.min.js'
          ]
        }
      },

      viewer: {
        files: {
          '<%= build %>/haroopad/js/viewer.min.js': [
            '<%= vendors %>/eventEmitter/EventEmitter.min.js',
            '<%= vendors %>/jquery/dist/jquery.min.js',
            '<%= vendors %>/haroopad-echo/dist/echo.min.js',
            '<%= vendors %>/haroopad-oembed/jquery.oembed.min.js',
            '<%= vendors %>/highlight.js/build/highlight.pack.js',
            '<%= vendors %>/mermaid/dist/mermaid.full.min.js',
            '<%= build %>/viewer.min.js'
          ]
        }
      }//,

      // snapshot: {
      //   files: {
      //     '<%= build %>/haroopad.bin.js': [
      //       '<%= build %>/haroopad/js/app.js',
      //       '<%= build %>/haroopad/js/pad.js',
      //       '<%= build %>/haroopad/js/preferences.js'
      //     ]
      //   }
      // }
    },

    uglify: {
      preBuiltLibs: {
        files: {
          '<%= vendors %>/CodeMirror/codemirror.min.js': [
            '<%= vendors %>/CodeMirror/lib/codemirror.js',
            '<%= vendors %>/CodeMirror/addon/hint/show-hint.js',
            '<%= vendors %>/CodeMirror-custom/addon/hint/markdown-hint.js',
            '<%= vendors %>/CodeMirror/addon/selection/active-line.js',
            '<%= vendors %>/CodeMirror/addon/display/placeholder.js',
            '<%= vendors %>/CodeMirror/addon/fold/foldcode.js',
            '<%= vendors %>/CodeMirror/addon/fold/foldgutter.js',
            '<%= vendors %>/CodeMirror/addon/fold/markdown-fold.js',
            '<%= vendors %>/CodeMirror-custom/addon/edit/continuelist.js',
            '<%= vendors %>/CodeMirror/addon/edit/closebrackets.js',
            '<%= vendors %>/CodeMirror/addon/edit/trailingspace.js',
            '<%= vendors %>/CodeMirror-custom/addon/dialog/dialog.js',
            '<%= vendors %>/CodeMirror/addon/search/searchcursor.js',
            '<%= vendors %>/CodeMirror-custom/addon/search/search.js',
            '<%= vendors %>/CodeMirror/addon/mode/overlay.js',
            '<%= vendors %>/CodeMirror/mode/xml/xml.js',
            '<%= vendors %>/CodeMirror/mode/markdown/markdown.js',
            '<%= vendors %>/CodeMirror/mode/gfm/gfm.js',
            '<%= vendors %>/CodeMirror/mode/ruby/ruby.js',
            '<%= vendors %>/CodeMirror/mode/python/python.js',
            '<%= vendors %>/CodeMirror/mode/javascript/javascript.js',
            '<%= vendors %>/CodeMirror/mode/clike/clike.js',
            '<%= vendors %>/CodeMirror/mode/css/css.js',
            '<%= vendors %>/CodeMirror/mode/htmlmixed/htmlmixed.js',
            '<%= vendors %>/CodeMirror/mode/php/php.js',
            '<%= vendors %>/CodeMirror/mode/perl/perl.js',
            '<%= vendors %>/CodeMirror/keymap/vim.js',
            '<%= vendors %>/CodeMirror/keymap/emacs.js',
            '<%= vendors %>/CodeMirror/keymap/sublime.js'
          ],

          '<%= vendors %>/backbone/backbone.min.js': [ 
            '<%= vendors %>/backbone/backbone.js' 
          ],

          '<%= vendors %>/requirejs/require.min.js': [ 
            '<%= vendors %>/requirejs/require.js' 
          ],

          '<%= vendors %>/haroopad-keymage/keymage.min.js': [ 
            '<%= vendors %>/haroopad-keymage/keymage.js' 
          ],

          /* pad */
          '<%= vendors %>/haroopad-reMarked.js/reMarked.min.js': [ 
            '<%= vendors %>/haroopad-reMarked.js/reMarked.js' 
          ],
          '<%= vendors %>/haroopad-notifer.js/notifier.min.js': [ 
            '<%= vendors %>/haroopad-notifer.js/notifier.js' 
          ],

          /* viewer */
          '<%= vendors %>/haroopad-echo/dist/echo.min.js': [ 
            '<%= vendors %>/haroopad-echo/src/echo.js' 
          ],
          '<%= vendors %>/haroopad-oembed/jquery.oembed.min.js': [ 
            '<%= vendors %>/haroopad-oembed/jquery.oembed.js' 
          ]
        }
      },

      menu: {
        files: {
          '<%= build %>/menu.min.js': [
            'src/js/common/menu/MenuBar.js',
            'src/js/common/menu/Menu.edit.js',
            'src/js/common/menu/Menu.file.js',
            'src/js/common/menu/Menu.file.recents.js',
            'src/js/common/menu/Menu.file.send.js',
            'src/js/common/menu/Menu.file.exports.js',
            'src/js/common/menu/Menu.file.activities.js',
            'src/js/common/menu/Menu.find.js',
            'src/js/common/menu/Menu.view.js',
            'src/js/common/menu/Menu.view.mode.js',
            'src/js/common/menu/Menu.view.column.js',
            'src/js/common/menu/Menu.view.zoom.js',
            'src/js/common/menu/Menu.view.font.js',
            'src/js/common/menu/Menu.insert.js',
            'src/js/common/menu/Menu.insert.section.js',
            'src/js/common/menu/Menu.insert.header.js',
            'src/js/common/menu/Menu.tools.js',
            'src/js/common/menu/Menu.tools.post.js',
            'src/js/common/menu/Menu.tools.presentation.js',
            'src/js/common/menu/Menu.tools.send.js',
            'src/js/common/menu/Menu.share.js',
            'src/js/common/menu/Menu.help.js'
          ]
        }
      },

      // appCommon: {
      //   options: {
      //     width: 80,
      //     mangle: false
      //   },
      //   files: {
      //     '<%= build %>/app.common.min.js': [
      //       'src/js/lib/disable.debug.js',
      //       'src/js/lib/system.js',
      //       'src/js/lib/logger.js',
      //       'src/js/lib/utils/util.js',
      //       'src/js/lib/utils/analytics.js',
      //       'src/js/lib/i18n.js'
      //     ]
      //   }
      // },

      appR: {
        files: {
          '<%= build %>/app.r.min.js': [
            '<%= build %>/app.r.js'
          ]
        }
      },

      // padCommon: {
      //   options: {
      //     width: 80,
      //     mangle: false
      //   },
      //   files: {
      //     '<%= build %>/pad.common.min.js': [
      //       'src/js/lib/logger.js',
      //       'src/js/lib/disable.debug.js',
      //       'src/js/lib/utils/util.js'
      //     ]
      //   }
      // },

      padR: {
        files: {
          '<%= build %>/pad.r.min.js': [
            '<%= build %>/pad.r.js'
          ]
        }
      },

      // preferencesCommon: {
      //   options: {
      //     width: 80,
      //     mangle: false
      //   },
      //   files: {
      //     '<%= build %>/preferences.common.min.js': [
      //       'src/js/lib/logger.js',
      //       'src/js/lib/disable.debug.js',
      //       'src/js/lib/utils/util.js'
      //     ]
      //   }
      // },

      preferencesR: {
        files: {
          '<%= build %>/preferences.r.min.js': [
            '<%= build %>/preferences.r.js'
          ]
        }
      },

      viewer: {
        files: {
          '<%= build %>/viewer.min.js': [
            'src/js/lib/disable.debug.js',
            'src/js/viewer/main.js'
          ]
        }
      },

      system: {
        options: {
          width: 80,
          mangle: false
        },
        files: {
          '<%= build %>/sys.min.js': [
            'src/js/app/sys/system.js',
            'src/js/app/sys/analytics.js',
            'src/js/app/sys/i18n.js'
          ]
        }
      },

      common: {
        options: {
          width: 80,
          mangle: false
        },
        files: {
          '<%= build %>/common.min.js': [
            'src/js/lib/disable.debug.js',
            'src/js/lib/logger.js',
            'src/js/lib/utils.js'
          ]
        }
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad/img/' },
          { expand: true, cwd: 'src/css/markdown/', src: [ '**' ], dest: 'build/haroopad/css/markdown/' },
          { expand: true, cwd: 'src/css/column/', src: [ '**' ], dest: 'build/haroopad/css/column/' },
          { expand: true, cwd: 'src/css/viewer-toc/', src: [ '**' ], dest: 'build/haroopad/css/viewer-toc/' },
          { expand: true, cwd: 'src/html/', src: [ '**' ], dest: 'build/haroopad/html/' },
          { src: 'src/index.bin.html', dest: 'build/haroopad/index.html' },
          { src: 'src/pad.bin.html', dest: 'build/haroopad/pad.html' },
          { src: 'src/preferences.bin.html', dest: 'build/haroopad/preferences.html' },
          { src: 'src/viewer.bin.html', dest: 'build/haroopad/viewer.html' },
          { src: 'src/package.bin.json', dest: 'build/haroopad/package.json' },
          { src: 'src/logo.png', dest: 'build/haroopad/logo.png' },
          { src: 'src/css/select2.png', dest: 'build/haroopad/css/select2.png' },
          { src: 'src/css/select2x2.png', dest: 'build/haroopad/css/select2x2.png' }
        ]
      },

      debug: {
        files: [
          // { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/font/' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/img/' },
          { expand: true, flatten: true, src: [ 'src/css/*' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/', filter:'isFile' },
          { expand: true, cwd: 'src/js/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/js/' },
          { expand: true, cwd: 'src/tpl/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/tpl/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/code/' },
          { expand: true, cwd: 'src/css/viewer/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/viewer/' },
          { expand: true, cwd: 'src/css/viewer-toc/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/viewer-toc/' },
          { expand: true, cwd: 'src/css/markdown/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/markdown/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/code/' },
          { src: 'src/pad.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/pad.html' },
          { src: 'src/viewer.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/viewer.html' },
          { src: 'src/index.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/index.html' },
          { src: 'src/preferences.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/preferences.html' },
          { src: 'src/package.json', dest: 'build/haroopad.app/Contents/Resources/app.nw/package.json' },
          { src: 'src/css/preferences.css', dest: 'build/haroopad.app/Contents/Resources/app.nw/css/preferences.css' },
          { src: 'src/css/keys.css', dest: 'build/haroopad.app/Contents/Resources/app.nw/css/keys.css' },
          { src: 'src/css/select2.png', dest: 'build/haroopad.app/Contents/Resources/app.nw/css/select2.png' },
          { src: 'lib/haroopad.icns', dest: 'build/haroopad.app/Contents/Resources/nw.icns' },
          { src: 'src/logo.png', dest: 'build/haroopad.app/Contents/Resources/app.nw/logo.png' },
          { src: 'About.md', dest: 'build/haroopad.app/Contents/Resources/app.nw/About.md' }
        ]
      },

      ffmpeg: {
        files: [
          { src:'libs/ffmpegsumo.so', dest: 'lib/nwjs.app/Contents/Frameworks/nwjs Framework.framework/Libraries/ffmpegsumo.so' }
        ]
      },

      build: {
        files: [
          { expand: true, cwd: 'build/haroopad/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/' },
          { src: 'lib/haroopad.icns', dest: 'build/haroopad.app/Contents/Resources/nw.icns' },
          { src: 'lib/markdown.icns', dest: 'build/haroopad.app/Contents/Resources/markdown.icns' }
        ]
      },

      node_modules: {
        files: [
          { expand: true, cwd: 'src/node_modules/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.node_modules/'}
        ]
      },

      locales: {
        files: [
          { expand: true, cwd: 'lib/haroopad-locales/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.locales/' }
        ]
      },

      docs: {
        files: [
          { expand: true, cwd: 'src/docs/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.docs/' }
        ]
      },

      userThemes: {
        files: [
          { expand: true, cwd: '<%= vendors %>/haroopad-theme/editor/', src: [ '**' ], dest: '<%= resdir %>/Resources/Themes/editor/'},
          { expand: true, cwd: '<%= vendors %>/haroopad-theme/viewer/', src: [ '**' ], dest: '<%= resdir %>/Resources/Themes/viewer/'}
        ]
      },

      pkgres: {
        files: [
          { expand: true, cwd: '<%= vendors %>/todc-bootstrap/dist/img/', src: [ '**' ], dest: 'build/haroopad/img/' },
          { expand: true, cwd: '<%= vendors %>/todc-bootstrap/dist/fonts/', src: [ '**' ], dest: 'build/haroopad/fonts/' },
          { src: '<%= vendors %>/select2/select2.png', dest: 'build/haroopad/css/select2.png' },
          { src: '<%= vendors %>/select2/select2x2.png', dest: 'build/haroopad/css/select2x2.png' }
        ]
      },

      codemirror: {
        files: [
          { src: '<%= vendors %>/CodeMirror/codemirror.min.js', dest: 'build/haroopad/js/editor.min.js' }
        ]
      },

      mkdcss: {
        files: [
          { expand: true, cwd: '<%= vendors %>/markdown-css/build/', src: [ '**' ], dest: 'src/css/markdown/' }
        ]
      },

      /* vendors */
      // btmodal: {
      //   files: [
      //     { expand: true, cwd: '<%= vendors %>/bootstrap-modal/css/', src: [ '**' ], dest: 'src/css/' }
      //   ]
      // },

      // twbs: {
      //   files: [
      //     { expand: true, cwd: '<%= vendors %>/bootstrap/dist/css/', src: [ '**' ], dest: 'src/css/' },
      //     { expand: true, cwd: '<%= vendors %>/bootstrap/dist/fonts/', src: [ '**' ], dest: 'src/img/' }
      //   ]
      // },

      // todc: {
      //   files: [
      //     { expand: true, cwd: '<%= vendors %>/todc-bootstrap/dist/', src: [ '**' ], dest: 'src/css/' },
      //     { expand: true, cwd: '<%= vendors %>/todc-bootstrap/img/', src: [ '**' ], dest: 'src/img/' }
      //   ]
      // },

      // libs: {
      //   files: [
      //     { expand: true, cwd: 'lib/nwjs.app/Contents/Libraries/MathJax/', src: [ '**' ], dest: 'build/lib/MathJax/' }
      //   ]
      // },

      mathjax: {
        files: [
          { expand: true, cwd: '<%= vendors %>/MathJax/config/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/config/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/extensions/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/extensions/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/fonts/HTML-CSS/TeX/woff/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/fonts/HTML-CSS/TeX/woff/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/fonts/HTML-CSS/STIX-Web/woff/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/fonts/HTML-CSS/STIX-Web/woff/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/images/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/images/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/jax/input/TeX', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/jax/input/TeX/' },
          { expand: true, cwd: '<%= vendors %>/MathJax/jax/output/HTML-CSS', src: [ '**' ], dest: '<%= resdir %>/Libraries/.js/MathJax/jax/output/HTML-CSS/' },
          { expand: true, flatten: true, src: [ '<%= vendors %>/MathJax/*' ], dest: '<%= resdir %>/Libraries/.js/MathJax/', filter: 'isFile'}
        ]
      },
      
      highlightjs: {
        files: [
          { expand: true, cwd: '<%= vendors %>/highlight.js/src/styles/', src: [ '**' ], dest: '<%= resdir %>/Libraries/.css/code/' }
        ]
      },

      boxes: {
        files: [
          { expand: true, cwd: 'src/box/presentation/dist', src: [ '**' ], dest: '<%= resdir %>/Resources/Boxes/presentation' }
        ]
      }
      
      // select2: {
      //   files: [
          // { src: '<%= vendors %>/select2/select2.png', dest: 'src/css/select2.png' },
          // { src: '<%= vendors %>/select2/select2x2.png', dest: 'src/css/select2x2.png' }
        // ]
      // },
      
      // jqoembed: {
        // files: [
          // { src: '<%= vendors %>/haroopad-oembed/jquery.oembed.css', dest: 'src/css/jquery.oembed.css' }
        // ]
      // }
    },

    shell: {
      debug: {
        command: '<%= nwexe %> src --debug' 
      },

      cpLib: {
        command: 'cp -R lib/nwjs.app build/haroopad.app'
      },

      cpZipSrc: {
        command: 'cp -R ./build/haroopad  ./build/haroopad.app/Contents/Resources/app.nw'
      },

      exec: {
        command: 'open ./build/haroopad.app'
      },

      /* v8 heap snapshot for protect source */
      // bin: {
      //   command: './lib/nwjc --extra_code ./build/haroopad.min.js ./build/haroopad/js/haroopad.bin'
      // },

      deploy: {
        command: [
          'rm -rf /Applications/haroopad.app',
          'cp -R ./lib/nwjs.app /Applications/haroopad.app',
          'cp -R ./build/haroopad /Applications/haroopad.app/Contents/Resources/app.nw'
        ].join(';')
      },

      /* v8 heap snapshot for protect source */
      ss_darwin: {
        command: [
          '../haroopad-build/lib/osx-ia32/nwjc',
          '--extra_code',
          './build/haroopad.bin.js',
          './build/haroopad/js/haroopad.bin'
        ].join(' ')
      },

      ss_win32: {
        command: [
          '..\\haroopad-build\\lib\\win-ia32\\nwjc.exe',
          '--extra_code',
          'build\\haroopad.bin.js',
          'build\\haroopad\\js\\haroopad.bin'
        ].join(' ')
      },

      ss_linux32: {
        command: [
          '../haroopad-build/lib/linux-ia32/nwjc',
          '--extra_code',
          './build/haroopad.bin.js',
          './build/haroopad/js/haroopad.bin'
        ].join(' ')
      },

      ss_linux64: {
        command: [
          '../haroopad-build/lib/linux-ia64/nwjc',
          '--extra_code',
          './build/haroopad.bin.js',
          './build/haroopad/js/haroopad.bin'
        ].join(' ')
      },

      highlightjs: {
        command: 'node tools/build.js -t browser',
        options: {
          stdout: true,
          execOptions: {
            cwd: './src/js/vendors/highlight.js/'
          }
        }
      },

      pouchdb: {
        command: [
          'nw-gyp configure --target=<%= nwv %>',
          'nw-gyp build'
        ].join('&&'),
        options: {
          stdout: true,
          execOptions: {
            cwd: './src/node_modules/pouchdb/node_modules/leveldown/'
          }
        }
      },

      snap: {
        command: [
          '<%=app%>/nwjc',
          './build/common.min.js',
          './build/haroopad/js/common.bin'
        ].join(' ')
      },

      snapSys: {
        command: [
          '<%=app%>/nwjc',
          './build/sys.min.js',
          './build/haroopad/js/sys.bin'
        ].join(' ')
      },

      snapApp: {
        command: [
          '<%=app%>/nwjc',
          './build/app.bin.js',
          './build/haroopad/js/app.bin'
        ].join(' ')
      },

      snapPad: {
        command: [
          '<%=app%>/nwjc',
          './build/pad.bin.js',
          './build/haroopad/js/pad.bin'
        ].join(' ')
      },

      snapPref: {
        command: [
          '<%=app%>/nwjc',
          './build/preferences.bin.js',
          './build/haroopad/js/preferences.bin'
        ].join(' ')
      }
    },

    replace: {
      info: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            title: '<%= pkg.name %>'
          },
          prefix: '@@'
        },
        files: {
          './build/haroopad.app/Contents/Info.plist': [
            'Info.plist'
          ]
        }
      }
    },

    requirejs: {
      app: {
        options: {
          name: 'index',
          baseUrl: 'src/js/app',
          mainConfigFile: 'src/js/app/index.js',
          out: 'build/app.r.js',
          preserveLicenseComments: false
        }
      },

      pad: {
        options: {
          name: 'index',
          baseUrl: "src/js/pad",
          mainConfigFile: "src/js/pad/index.js",
          out: "build/pad.r.js",
          preserveLicenseComments: false
        }
      },

      preferences: {
        options: {
          name: 'index',
          baseUrl: "src/js/preferences",
          mainConfigFile: "src/js/preferences/index.js",
          out: "build/preferences.r.js",
          preserveLicenseComments: false
        }
      }
    },

    htmlmin: {
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/haroopad/index.html': 'src/index.bin.html',     // 'destination': 'source'
          'build/haroopad/pad.html': 'src/pad.bin.html',
          'build/haroopad/preferences.html': 'src/preferences.bin.html',
          'build/haroopad/viewer.html': 'src/viewer.bin.html'
        }
      }
    }
  });


  /* v8 protect source code task for cross platform */
  grunt.registerTask('snapshot', 'cross platform nwjc', function() {
    var postfix;

    if (process.platform === 'linux') {
      if (process.arch === 'x64') {
        postfix = 'linux64';
      } else {
        postfix = 'linux32'
      }
    } else {
      postfix = process.platform;
    }
    grunt.task.run('uglify:system');
    grunt.task.run('uglify:common');
    grunt.task.run('shell:snap');
    grunt.task.run('shell:snapSys');
    grunt.task.run('shell:snapApp');
    grunt.task.run('shell:snapPad');
    grunt.task.run('shell:snapPref');
  });

  grunt.registerTask('prebuilt', function() {
    var nwv = grunt.option('target') || grunt.config.get('nwv');
    var arch = grunt.option('arch') || 'x64';
    var deep = grunt.option('deep') || false;

    grunt.config.set('nwv', nwv);
    grunt.config.set('arch', arch);

    if (deep) {
      grunt.task.run('shell:pouchdb');
    }

    grunt.task.run('uglify:preBuiltLibs');
    grunt.task.run('shell:highlightjs');
  });
  
  /* deploy to Application directory */
  grunt.registerTask('deploy', [ 'shell:deploy']);

  /* luanch mac app */
  grunt.registerTask('build', [ 'clean:release', 'shell:cpLib', 'shell:bin', 'copy:build', 'replace:info', 'shell:exec' ]);

  /* built-in libs for nwjs */
  grunt.registerTask('nwlibs', [ 'clean:nwlibs', 'copy:mathjax', 'copy:highlightjs', 'copy:node_modules', 'copy:docs', 'copy:locales', 'copy:ffmpeg' ]);
  grunt.registerTask('nwres', [ 'clean:nwres', 'copy:userThemes', 'copy:mkdcss', 'copy:boxes' ]);

  grunt.registerTask('cp', [ 'copy:main', 'copy:pkgres', 'nwlibs', 'nwres' ]);

  /* css */
  grunt.registerTask('css', [ 'cssmin:pad', 'cssmin:preferences', 'cssmin:viewer', 'cssmin:codemirror' ]);

  /* app */
  grunt.registerTask('app', [ 'concat:appVendors', /*'uglify:appCommon',*/ 'requirejs:app', 'uglify:appR', 'concat:app' ]);

  /* pad */
  grunt.registerTask('pad', [ 'concat:padVendors', /*'uglify:padCommon',*/ 'requirejs:pad', 'uglify:padR', 'concat:pad', 'copy:codemirror' ]);

  /* preference */
  grunt.registerTask('preferences', [ 'concat:preferencesVendors', /*'uglify:preferencesCommon',*/ 'requirejs:preferences', 'uglify:preferencesR', 'concat:preferences' ]);

  /* viewer */
  grunt.registerTask('viewer', [ 'uglify:viewer', 'concat:viewer' ]);

  /* uglify */
  grunt.registerTask('menu', [ 'uglify:menu' ]);

  /* pkg */
  grunt.registerTask('default', [ 'asciify', 'clean', 'cp', 'menu', 'css' ]);
  grunt.registerTask('pkg2', [ 'app', 'pad', 'preferences', 'viewer', 'snapshot', 'htmlmin' ]);
};
