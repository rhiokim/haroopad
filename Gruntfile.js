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
    pkg: grunt.file.readJSON('./src/package.json'),

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
            '<%= vendors %>/CodeMirror/theme/3024-day.css',
            '<%= vendors %>/CodeMirror/theme/3024-night.css',
            '<%= vendors %>/CodeMirror/theme/ambiance-mobile.css',
            '<%= vendors %>/CodeMirror/theme/ambiance.css',
            '<%= vendors %>/CodeMirror/theme/base16-dark.css',
            '<%= vendors %>/CodeMirror/theme/base16-light.css',
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
            '<%= vendors %>/CodeMirror/theme/tomorrow-night-eighties.css',
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
      menu: {
        files: {
          'build/menu.concat.js': [
            'src/js/common/menu/MenuBar.js',
            'src/js/common/menu/Menu.file.js',
            'src/js/common/menu/Menu.file.recents.js',
            'src/js/common/menu/Menu.file.exports.js',
            'src/js/common/menu/Menu.file.activities.js',
            'src/js/common/menu/Menu.find.js',
            'src/js/common/menu/Menu.view.js',
            'src/js/common/menu/Menu.action.js',
            'src/js/common/menu/Menu.action.header.js',
            'src/js/common/menu/Menu.tools.js',
            'src/js/common/menu/Menu.tools.post.js',
            'src/js/common/menu/Menu.tools.presentation.js',
            'src/js/common/menu/Menu.tools.send.js',
            'src/js/common/menu/Menu.help.js'
          ]
        }
      },
      app: {
        files: {
          'build/app.modules.js': [
            'src/js/app/before.app.js',
            // 'src/js/lib/logger.js',
            'src/js/lib/utils/util.js',
            'src/js/lib/utils/analytics.js',
            'src/js/lib/utils/package.info.js',
            'build/menu.concat.js',
            'build/app.r.js',
            'src/js/app/after.app.js'
          ],
          'build/app.vendors.js': [
            '<%= vendors %>/eventemitter.js',
            '<%= vendors %>/underscore.min.js',
            '<%= vendors %>/backbone.min.js',
            '<%= vendors %>/store.js',
            '<%= vendors %>/require.min.js'
          ]
        }
      },
      pad: {
        files: {
          'build/pad.modules.js': [
            'src/js/pad/before.pad.js',
            // 'src/js/lib/logger.js',
            'src/js/lib/utils/util.js',
            'src/js/pad/pad.common.js',
            'build/menu.concat.js',
            'build/pad.r.js',
            'src/js/pad/after.pad.js'
          ],
          'build/pad.vendors.js': [
            '<%= vendors %>/eventemitter.js',
            '<%= vendors %>/underscore.min.js',
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/backbone.min.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrap-modalmanager.js',
            '<%= vendors %>/bootstrap-modal.js',
            '<%= vendors %>/store.js',
            '<%= vendors %>/js-url.js',
            '<%= vendors %>/notifier.js',
            '<%= vendors %>/require.min.js'
          ]
        }
      },
      preferences: {
        files: {
          'build/preferences.modules.js': [
            'src/js/preferences/before.pref.js',
            // 'src/js/lib/logger.js',
            'build/preferences.r.js',
            'src/js/preferences/after.pref.js'
          ],
          'build/preferences.vendors.js': [
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/underscore.min.js',
            '<%= vendors %>/backbone.min.js',
            '<%= vendors %>/require.min.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrapSwitch.js',
            '<%= vendors %>/select2.js'
          ]
        }
      },
      snapshot: {
        files: {
          'build/haroopad.min.js': [
            'build/app.modules.min.js',
            'build/pad.modules.min.js',
            'build/preferences.modules.min.js'
          ]
        }
      },
      viewer: {
        files: {
          'build/haroopad/js/viewer.min.js': [
            '<%= vendors %>/eventemitter.js',
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/highlight.pack.js',
            'build/viewer.js'
          ]
        }
      }
    },

    uglify: {
      app: {
        files: {
          'build/haroopad/js/app.vendors.min.js': [
            'build/app.vendors.js'
          ],
          'build/app.modules.min.js': [
            'build/app.modules.js'
          ]
        }
      },
      pad: {
        files: {
          'build/haroopad/js/pad.vendors.min.js': [
            'build/pad.vendors.js'
          ],
          'build/pad.modules.min.js': [
            'build/pad.modules.js'
          ]
        }
      },
      preferences: {
        files: {
          'build/haroopad/js/preferences.vendors.min.js': [
            'build/preferences.vendors.js'
          ],
          'build/preferences.modules.min.js': [
            'build/preferences.modules.js'
          ]
        }
      },
      viewer: {
        files: {
          'build/viewer.js': [
            'src/js/viewer/disable.debug.js',
            'src/js/viewer/DynamicContents.js',
            'src/js/viewer/main.js'
          ]
        }
      },
      codemirror: {
        files: {
          'build/haroopad/js/codemirror.min.js': [
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
          { src: 'src/node_modules/clean-css/lib/clean.js', dest: 'build/haroopad/node_modules/clean-css/lib/clean.js' },
          { src: 'src/node_modules/clean-css/index.js', dest: 'build/haroopad/node_modules/clean-css/index.js' },
          { src: 'src/node_modules/clean-css/package.json', dest: 'build/haroopad/node_modules/clean-css/package.json' },

          { expand: true, cwd: 'src/node_modules/fs-extra/lib/', src: [ '**' ], dest: 'build/haroopad/node_modules/fs-extra/lib/' },
          { src: 'src/node_modules/fs-extra/package.json', dest: 'build/haroopad/node_modules/fs-extra/package.json' },

          { src: 'src/node_modules/graceful-fs/package.json', dest: 'build/haroopad/node_modules/graceful-fs/package.json' },
          { src: 'src/node_modules/graceful-fs/graceful-fs.js', dest: 'build/haroopad/node_modules/graceful-fs/graceful-fs.js' },
          { src: 'src/node_modules/graceful-fs/polyfills.js', dest: 'build/haroopad/node_modules/graceful-fs/polyfills.js' },

          { src: 'src/node_modules/jsonfile/package.json', dest: 'build/haroopad/node_modules/jsonfile/package.json' },
          { expand: true, cwd: 'src/node_modules/jsonfile/lib/', src: [ '**' ], dest: 'build/haroopad/node_modules/jsonfile/lib/' },

          { src: 'src/node_modules/mkdirp/package.json', dest: 'build/haroopad/node_modules/mkdirp/package.json' },
          { src: 'src/node_modules/mkdirp/index.js', dest: 'build/haroopad/node_modules/mkdirp/index.js' },

          { src: 'src/node_modules/ncp/package.json', dest: 'build/haroopad/node_modules/ncp/package.json' },
          { expand: true, cwd: 'src/node_modules/ncp/lib/', src: [ '**' ], dest: 'build/haroopad/node_modules/ncp/lib/' },

          { src: 'src/node_modules/rimraf/package.json', dest: 'build/haroopad/node_modules/rimraf/package.json' },
          { src: 'src/node_modules/rimraf/rimraf.js', dest: 'build/haroopad/node_modules/rimraf/rimraf.js' }
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
          { src: 'lib/haroopad.icns', dest: 'build/haroopad.app/Contents/Resources/nw.icns' },
          { src: 'lib/markdown.icns', dest: 'build/haroopad.app/Contents/Resources/markdown.icns' }
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
      bin: {
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
          name: 'haroopad',
          baseUrl: "src/js/pad",
          mainConfigFile: "src/js/pad/haroopad.js",
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
    }
  });

  grunt.registerTask('deploy', [ 'shell:deploy']);
  grunt.registerTask('core', [ 'clean:core', 'shell:cpLib', 'copy:debug', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('debug', [ 'clean:release', 'shell:cpLib', 'copy:debug', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('build', [ 'clean:release', 'shell:cpLib', 'shell:bin', 'copy:build', 'replace:info', 'shell:exec' ]);

  grunt.registerTask('cp', [ 'copy:main', 'copy:node_modules' ]);
  grunt.registerTask('app', [ 'requirejs:app', 'concat:app', 'uglify:app' ]);
  grunt.registerTask('pad', [ 'requirejs:pad', 'concat:pad', 'uglify:pad' ]);
  grunt.registerTask('prf', [ 'requirejs:preferences', 'concat:preferences', 'uglify:preferences' ]);
  grunt.registerTask('viewer', [ 'uglify:viewer', 'concat:viewer' ]);
  grunt.registerTask('codemirror', [ 'uglify:codemirror' ]);
  grunt.registerTask('default', [ 'clean', 'cp', 'cssmin', 'concat:menu', 'app', 'pad', 'prf', 'viewer', 'codemirror', 'concat:snapshot', 'shell:bin' ]);
};
