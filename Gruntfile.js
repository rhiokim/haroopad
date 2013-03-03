module.exports = function(grunt) {

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    vendors: 'src/js/vendors',
    
    clean: {
      build: [ '**' ]
    },
    // concat: {
    //   pad: {
    //     src: [ 
    //       '<%= vendors %>/jquery-1.9.1.min.js',
    //       '<%= vendors %>/bootstrap.min.js',
    //       '<%= vendors %>/bootstrapSwitch.js',
    //       '<%= vendors %>/bootstrap-modalmanager.js',
    //       '<%= vendors %>/bootstrap-modal.js',
    //       '<%= vendors %>/select2',
    //       '<%= vendors %>/marked.js',
    //       '<%= vendors %>/highlight.pack.js',
    //       '<%= vendors %>/underscore.js',
    //       '<%= vendors %>/backbone.js'
    //     ],
    //     dest: 'build/js/haroopad.vendors.concat.js'
    //   },

    //   codeMirror: {
    //     src: [
    //       '<%= vendors %>/CodeMirror/lib/codemirror.js',
    //       '<%= vendors %>/CodeMirror/addon/edit/continuelist.js',
    //       '<%= vendors %>/CodeMirror/addon/edit/closebrackets.js',
    //       '<%= vendors %>/CodeMirror/addon/mode/overlay.js',
    //       '<%= vendors %>/CodeMirror/mode/xml/xml.js',
    //       '<%= vendors %>/CodeMirror/mode/gfm/gfm.js',
    //       '<%= vendors %>/CodeMirror/mode/htmlmixed/htmlmixed.js',
    //       '<%= vendors %>/CodeMirror/mode/markdown/markdown.js',
    //       '<%= vendors %>/CodeMirror/keymap/vim.js',
    //     ],
    //     dest: 'build/js/codemirror.concat.js'
    //   }
    // },

    cssmin: {
      compress: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          "build/haroopad/css/codemirror.min.css": [
            '<%= vendors %>/CodeMirror/lib/codemirror.css',
            '<%= vendors %>/CodeMirror/theme/ambiance.css',
            '<%= vendors %>/CodeMirror/theme/blackboard.css',
            '<%= vendors %>/CodeMirror/theme/cobalt.css',
            '<%= vendors %>/CodeMirror/theme/elegant.css',
            '<%= vendors %>/CodeMirror/theme/erlang-dark.css',
            '<%= vendors %>/CodeMirror/theme/lesser-dark.css',
            '<%= vendors %>/CodeMirror/theme/monokai.css',
            '<%= vendors %>/CodeMirror/theme/neat.css',
            '<%= vendors %>/CodeMirror/theme/night.css',
            '<%= vendors %>/CodeMirror/theme/rubyblue.css',
            '<%= vendors %>/CodeMirror/theme/solarized.css',
            '<%= vendors %>/CodeMirror/theme/twilight.css',
            '<%= vendors %>/CodeMirror/theme/vibrant-ink.css',
            '<%= vendors %>/CodeMirror/theme/xq-dark.css'
          ],
          "build/haroopad/css/haroopad.min.css": [
            'src/css/bootstrap.css',
            'src/css/todc-bootstrap.css',
            'src/css/bootstrapSwitch.css',
            'src/css/select2.css',
            'src/css/font-awesome.min.css',
            'src/css/bootstrap-modal.css',
            'src/css/app.css',
          ],
          "build/haroopad/css/viewer.min.css": [
            'src/css/viewer.css'
          ]
        }
      }
    },

    uglify: {
      pad: {
        options: {
          // mangle: true,
          // compress: true
        },
        files: {
          'build/haroopad/js/haroopad.bin.js': [
            '<%= vendors %>/marked.js',
            '<%= vendors %>/highlight.pack.js',
            '<%= vendors %>/underscore.js',
            'src/js/app/before.bin.js'
          ],
          'build/haroopad/js/haroopad.vendors.min.js': [ 
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/backbone.js',
            '<%= vendors %>/require.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrapSwitch.js',
            '<%= vendors %>/bootstrap-modalmanager.js',
            '<%= vendors %>/bootstrap-modal.js',
            '<%= vendors %>/select2'
          ],
          'build/haroopad/js/codemirror.min.js': [
            '<%= vendors %>/CodeMirror/lib/codemirror.js',
            '<%= vendors %>/CodeMirror/addon/edit/continuelist.js',
            '<%= vendors %>/CodeMirror/addon/edit/closebrackets.js',
            '<%= vendors %>/CodeMirror/addon/mode/overlay.js',
            '<%= vendors %>/CodeMirror/mode/xml/xml.js',
            '<%= vendors %>/CodeMirror/mode/gfm/gfm.js',
            '<%= vendors %>/CodeMirror/mode/htmlmixed/htmlmixed.js',
            '<%= vendors %>/CodeMirror/mode/markdown/markdown.js',
            '<%= vendors %>/CodeMirror/keymap/vim.js',
          ]
        }
      },

      viewer: {
        options: {},
        files: {
          'build/haroopad/js/viewer.min.js': [
            '<%= vendors %>/jquery-1.9.1.min.js',
            '<%= vendors %>/js-url.js',
            'src/js/viewer/main.js',
          ]
        }
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad/font' },
          { expand: true, cwd: 'src/images/', src: [ '**' ], dest: 'build/haroopad/images' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad/img/' },
          { expand: true, cwd: 'src/tpl/', src: [ '**' ], dest: 'build/haroopad/tpl' },
          { expand: true, cwd: 'src/js/app/', src: [ '**' ], dest: 'build/haroopad/js/app' },
          // { expand: true, cwd: 'src/js/viewer/', src: [ '**' ], dest: 'build/haroopad/js/viewer' },
          { src: 'src/pad.bin.html', dest: 'build/haroopad/pad.html' },
          { src: 'src/viewer.bin.html', dest: 'build/haroopad/viewer.html' },
          { src: 'src/package.bin.json', dest: 'build/haroopad/package.json' }
        ]
      }
    },

    shell: {
      cpLib: {
        command: 'cp -R lib/nw.app build/haroopad.app'
      },

      cpSrc: {
        command: 'cp -R ./src  ./build/haroopad.app/Contents/Resources/app.nw'
      },

      cpZipSrc: {
        command: 'cp -R ./build/haroopad  ./build/haroopad.app/Contents/Resources/app.nw'
      },

      clear: {
        command: 'rm -rf build; mkdir -p build'
      },

      exec: {
        command: 'open ./build/haroopad.app'
      },

      deploy: {
        command: 'cp -R ./build/haroopad.app /Applications'
      },

      snapShot: {
        command: './lib/nwsnapshot --extra_code ./build/haroopad/js/haroopad.bin.js ./build/haroopad/js/haroopad.bin'
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
      compile: {
        options: {
          baseUrl: "src/js/app",
          mainConfigFile: "src/js/app/main.js",
          dir: "build/",
          modules: [
            { name: "main" }
          ],
          uglify: {
              max_line_length: 100
          }
        }
      }
    }
  });

  grunt.registerTask('default', [ 'clean', 'uglify:pad', 'uglify:viewer', 'cssmin', 'copy', 'shell:snapShot' ]);
  grunt.registerTask('clean', [ 'shell:clear' ]);
  grunt.registerTask('deploy', [ 'shell:deploy']);
  grunt.registerTask('build', [ 'shell:clear', 'shell:cpLib', 'shell:cpSrc', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('pkg', [ 'shell:cpLib', 'shell:cpZipSrc', 'replace:info', 'shell:exec' ]);
};
