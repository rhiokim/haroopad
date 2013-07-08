module.exports = function(grunt) {

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    vendors: 'src/js/vendors',
    
    clean: {
      build: [ 'build/*' ],
      release: [ 'build/haroopad.app' ],
      core: [ 'build/haroopad.app' ]
    },

    cssmin: {
      compress: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          "build/haroopad/css/codemirror.min.css": [
            '<%= vendors %>/CodeMirror/lib/codemirror.css',
            '<%= vendors %>/CodeMirror/theme/ambiance-mobile.css',
            '<%= vendors %>/CodeMirror/theme/ambiance.css',
            '<%= vendors %>/CodeMirror/theme/blackboard.css',
            '<%= vendors %>/CodeMirror/theme/cobalt.css',
            '<%= vendors %>/CodeMirror/theme/eclipse.css',
            '<%= vendors %>/CodeMirror/theme/elegant.css',
            '<%= vendors %>/CodeMirror/theme/erlang-dark.css',
            '<%= vendors %>/CodeMirror/theme/lesser-dark.css',
            '<%= vendors %>/CodeMirror/theme/midinight.css',
            '<%= vendors %>/CodeMirror/theme/monokai.css',
            '<%= vendors %>/CodeMirror/theme/neat.css',
            '<%= vendors %>/CodeMirror/theme/night.css',
            '<%= vendors %>/CodeMirror/theme/rubyblue.css',
            '<%= vendors %>/CodeMirror/theme/solarized.css',
            '<%= vendors %>/CodeMirror/theme/twilight.css',
            '<%= vendors %>/CodeMirror/theme/vibrant-ink.css',
            '<%= vendors %>/CodeMirror/theme/xq-dark.css',
            '<%= vendors %>/CodeMirror/theme/xq-light.css',
            '<%= vendors %>/CodeMirror-custom/addon/dialog/dialog.css',
            'src/css/app.css'
          ],
          "build/haroopad/css/haroopad.min.css": [
            'src/css/bootstrap.css',
            'src/css/todc-bootstrap.css',
            'src/css/bootstrap-modal.css'
          ],
          "build/haroopad/css/viewer.min.css": [
            'src/css/viewer.css'
          ],
          "build/haroopad/css/preferences.min.css": [
            'src/css/bootstrap.css',
            'src/css/todc-bootstrap.css',
            'src/css/bootstrapSwitch.css',
            'src/css/select2.css',
            'src/css/font-awesome.min.css',
            'src/css/preferences.css'
          ]
        }
      }
    },

    concat: {
      common: {
        files: {
          'build/menu.concat.js': [
            'src/js/common/menu/MenuBar.js',
            'src/js/common/menu/Menu.file.js',
            'src/js/common/menu/Menu.file.recents.js',
            'src/js/common/menu/Menu.file.exports.js',
            'src/js/common/menu/Menu.file.activities.js',
            'src/js/common/menu/Menu.file.js',
            'src/js/common/menu/Menu.find.js',
            'src/js/common/menu/Menu.view.js',
            'src/js/common/menu/Menu.action.js',
            'src/js/common/menu/Menu.tools.js',
            'src/js/common/menu/Menu.tools.post.js',
            'src/js/common/menu/Menu.tools.presentation.js',
            'src/js/common/menu/Menu.tools.send.js',
            'src/js/common/menu/Menu.help.js'
          ]
        }
      },
      dist: {
        files: {
          'build/index.js': [
            'src/js/lib/logger.js',
            'build/menu.concat.js',
            '<%= vendors %>/eventemitter.js',
            '<%= vendors %>/underscore.js',
            '<%= vendors %>/backbone.js',
            '<%= vendors %>/store.js',
            '<%= vendors %>/require.js'
          ],
          'build/haroopad.js': [
            '<%= vendors %>/eventemitter.js',
            '<%= vendors %>/underscore.js',
            'src/js/app/before.bin.js',
            'src/js/lib/logger.js',
            '<%= vendors %>/jquery-1.9.1.js',
            '<%= vendors %>/backbone.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrap-modalmanager.js',
            '<%= vendors %>/bootstrap-modal.js',
            '<%= vendors %>/store.js',
            'src/js/app/after.bin.js'
          ],
          'build/preferences.js': [
            'src/js/lib/logger.js',
            '<%= vendors %>/jquery-1.9.1.js',
            '<%= vendors %>/underscore.js',
            '<%= vendors %>/backbone.js',
            '<%= vendors %>/require.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrapSwitch.js',
            '<%= vendors %>/select2.js'
          ],
          'build/vendors.js': [
            'build/menu.concat.js',
            '<%= vendors %>/require.js'
          ],
          'build/codemirror.js': [
            '<%= vendors %>/CodeMirror/lib/codemirror.js',
            '<%= vendors %>/CodeMirror/addon/edit/continuelist.js',
            '<%= vendors %>/CodeMirror/addon/edit/closebrackets.js',
            '<%= vendors %>/CodeMirror/addon/edit/trailingspace.js',
            '<%= vendors %>/CodeMirror-custom/addon/dialog/dialog.js',
            '<%= vendors %>/CodeMirror/addon/search/searchcursor.js',
            '<%= vendors %>/CodeMirror-custom/addon/search/search.js',
            '<%= vendors %>/CodeMirror/addon/mode/overlay.js',
            '<%= vendors %>/CodeMirror/mode/xml/xml.js',
            '<%= vendors %>/CodeMirror/mode/gfm/gfm.js',
            '<%= vendors %>/CodeMirror/mode/htmlmixed/htmlmixed.js',
            '<%= vendors %>/CodeMirror/mode/markdown/markdown.js',
            '<%= vendors %>/CodeMirror/keymap/vim.js'
          ]
        }
      }
    },

    uglify: {
      pad: {
        options: {
          mangle: false
          // mangle: {
          //   except: ['jQuery', 'Backbone', '_']
          // },
          // compress: false
        },
        files: {
          'build/haroopad/js/index.min.js': [
            'build/index.js'
          ],
          'build/haroopad.min.js': [
            'build/haroopad.js'
          ],
          'build/haroopad/js/preferences.min.js': [
            'build/preferences.js'
          ],
          'build/haroopad/js/vendors.min.js': [
            'build/vendors.js'
          ],
          'build/haroopad/js/codemirror.min.js': [
            'build/codemirror.js'
          ]
        }
      },

      viewer: {
        options: {},
        files: {
          'build/haroopad/js/viewer.min.js': [
            'src/js/viewer/disable.debug.js',
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/highlight.pack.js',
            'src/js/viewer/main.js'
          ]
        }
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad/font/' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad/img/' },
          // { expand: true, cwd: 'src/node_modules/', src: [ '**' ], dest: 'build/haroopad/node_modules/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad/css/code/' },
          { expand: true, cwd: 'src/css/markdown/', src: [ '**' ], dest: 'build/haroopad/css/markdown/' },
          { expand: true, cwd: 'src/docs/', src: [ '**' ], dest: 'build/haroopad/docs/' },
          { src: 'src/index.bin.html', dest: 'build/haroopad/index.html' },
          { src: 'src/pad.bin.html', dest: 'build/haroopad/pad.html' },
          { src: 'src/preferences.bin.html', dest: 'build/haroopad/preferences.html' },
          { src: 'src/viewer.bin.html', dest: 'build/haroopad/viewer.html' },
          { src: 'src/package.bin.json', dest: 'build/haroopad/package.json' },
          { src: 'src/logo.png', dest: 'build/haroopad/logo.png' },
          { src: 'src/css/keys.css', dest: 'build/haroopad/css/keys.css' },
          { src: 'src/css/select2.png', dest: 'build/haroopad/css/select2.png' }
        ]
      },

      node_modules: {
        files: [
          { src: 'src/node_modules/base62/base62.js', dest: 'build/haroopad/node_modules/base62/base62.js' },
          { src: 'src/node_modules/base62/package.json', dest: 'build/haroopad/node_modules/base62/package.json' },
          { src: 'src/node_modules/marked/lib/marked.js', dest: 'build/haroopad/node_modules/marked/lib/marked.js' },
          { src: 'src/node_modules/marked/package.json', dest: 'build/haroopad/node_modules/marked/package.json' },
          { src: 'src/node_modules/readdir/lib/readdir.js', dest: 'build/haroopad/node_modules/readdir/lib/readdir.js' },
          { src: 'src/node_modules/readdir/package.json', dest: 'build/haroopad/node_modules/readdir/package.json' },
          { src: 'src/node_modules/watch/main.js', dest: 'build/haroopad/node_modules/watch/main.js' },
          { src: 'src/node_modules/watch/package.json', dest: 'build/haroopad/node_modules/watch/package.json' }
        ]
      },

      debug: {
        files: [
          { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/font/' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/img/' },
          { expand: true, flatten: true, src: [ 'src/css/*' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/', filter:'isFile' },
          { expand: true, cwd: 'src/js/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/js/' },
          // { expand: true, cwd: 'src/node_modules/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/node_modules/' },
          { expand: true, cwd: 'src/tpl/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/tpl/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/code/' },
          { expand: true, cwd: 'src/css/viewer/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/viewer/' },
          { expand: true, cwd: 'src/css/markdown/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/markdown/' },
          { expand: true, cwd: 'src/docs/', src: [ '**' ], dest: 'build/haroopad/docs/' },
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

      build: {
        files: [
          { expand: true, cwd: 'build/haroopad/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/' },
          { src: 'lib/haroopad.icns', dest: 'build/haroopad.app/Contents/Resources/nw.icns' }
        ]
      },

      mdcss: {
        files: [
          { expand: true, cwd: 'lib/markdown-css/build/', src: [ '**' ], dest: 'src/css/markdown' }
        ]
      }
    },

    shell: {
      cpLib: {
        command: 'cp -R lib/nw.app build/haroopad.app'
      },

      cpZipSrc: {
        command: 'cp -R ./build/haroopad  ./build/haroopad.app/Contents/Resources/app.nw'
      },

      exec: {
        command: 'open ./build/haroopad.app'
      },

      /* v8 heap snapshot for protect source */
      ss_darwin: {
        command: './lib/nwsnapshot --extra_code ./build/haroopad.min.js ./build/haroopad/js/haroopad.bin'
      },

      deploy: {
        command: 'cp -R ./build/haroopad.app /Applications'
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
      index: {
        options: {
          name: 'index',
          baseUrl: "src/js/app",
          mainConfigFile: "src/js/app/index.js",
          out: "build/haroopad/js/index.modules.js",
          preserveLicenseComments: false
        }
      },

      pad: {
        options: {
          name: 'haroopad',
          baseUrl: "src/js/pad",
          mainConfigFile: "src/js/pad/haroopad.js",
          out: "build/haroopad/js/modules.js",
          preserveLicenseComments: false
        }
      },

      preferences: {
        options: {
          name: 'index',
          baseUrl: "src/js/preferences",
          mainConfigFile: "src/js/preferences/index.js",
          out: "build/haroopad/js/preferences.modules.js",
          preserveLicenseComments: false
        }
      }
    }
  });

  grunt.registerTask('default', [ 'clean', 'concat:common', 'concat', 'uglify:pad', 'uglify:viewer', 'cssmin', 'copy:main', 'copy:node_modules', 'requirejs:index', 'requirejs:pad', 'requirejs:preferences' ]);
  grunt.registerTask('deploy', [ 'shell:deploy']);
  grunt.registerTask('core', [ 'clean:core', 'shell:cpLib', 'copy:debug', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('debug', [ 'clean:release', 'shell:cpLib', 'copy:debug', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('build', [ 'clean:release', 'shell:cpLib', 'shell:ss_darwin', 'copy:build', 'replace:info', 'shell:exec' ]);
};
