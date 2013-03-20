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
      release: [ 'build/haroopad.app' ]
    },

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

    concat: {
      dist: {
        files: {
          'build/haroopad.js': [
            '<%= vendors %>/underscore.js',
            '<%= vendors %>/marked.js',
            '<%= vendors %>/highlight.pack.js',
            'src/js/app/before.bin.js',
            '<%= vendors %>/jquery-1.9.1.js',
            '<%= vendors %>/backbone.js',
            '<%= vendors %>/bootstrap.min.js',
            '<%= vendors %>/bootstrapSwitch.js',
            '<%= vendors %>/bootstrap-modalmanager.js',
            '<%= vendors %>/bootstrap-modal.js',
            '<%= vendors %>/select2.js',
            'src/js/app/after.bin.js'
          ],
          'build/vendors.js': [
            '<%= vendors %>/require.js'
          ],
          'build/codemirror.js': [
            '<%= vendors %>/CodeMirror/lib/codemirror.js',
            '<%= vendors %>/CodeMirror/addon/edit/continuelist.js',
            '<%= vendors %>/CodeMirror/addon/edit/closebrackets.js',
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
          // mangle: true,
          // compress: true
        },
        files: {
          'build/haroopad.bin.js': [
            'build/haroopad.js'
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
          { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad/font/' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad/img/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad/css/code/' },
          { expand: true, cwd: 'src/css/markdown/build/', src: [ '**' ], dest: 'build/haroopad/css/markdown/' },
          { src: 'src/pad.bin.html', dest: 'build/haroopad/pad.html' },
          { src: 'src/viewer.bin.html', dest: 'build/haroopad/viewer.html' },
          { src: 'src/package.bin.json', dest: 'build/haroopad/package.json' },
          { src: 'src/logo.png', dest: 'build/haroopad/logo.png' },
          { src: 'src/css/keys.css', dest: 'build/haroopad/css/keys.css' },
          { src: 'src/css/select2.png', dest: 'build/haroopad/css/select2.png' }
        ]
      },

      debug: {
        files: [
          // { expand: true, cwd: 'src/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/' },
          { expand: true, cwd: 'src/font/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/font/' },
          { expand: true, cwd: 'src/img/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/img/' },
          { expand: true, flatten: true, src: [ 'src/css/*' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/', filter:'isFile' },
          { expand: true, cwd: 'src/js/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/js/' },
          { expand: true, cwd: 'src/tpl/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/tpl/' },
          { expand: true, cwd: 'src/css/code/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/code/' },
          { expand: true, cwd: 'src/css/viewer/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/viewer/' },
          { expand: true, cwd: 'src/css/markdown/build/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/css/markdown/' },
          { src: 'src/pad.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/pad.html' },
          { src: 'src/viewer.html', dest: 'build/haroopad.app/Contents/Resources/app.nw/viewer.html' },
          { src: 'src/package.json', dest: 'build/haroopad.app/Contents/Resources/app.nw/package.json' },
          { src: 'src/css/keys.css', dest: 'build/haroopad.app/Contents/Resources/app.nw/css/keys.css' },
          { src: 'src/css/select2.png', dest: 'build/haroopad.app/Contents/Resources/app.nw/css/select2.png' },
          { src: 'lib/haroopad.icns', dest: 'build/haroopad.app/Contents/Resources/nw.icns' },
          { src: 'src/logo.png', dest: 'build/haroopad.app/Contents/Resources/app.nw/logo.png' }
        ]
      },

      build: {
        files: [
          { expand: true, cwd: 'build/haroopad/', src: [ '**' ], dest: 'build/haroopad.app/Contents/Resources/app.nw/' }
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

      deploy: {
        command: 'cp -R ./build/haroopad.app /Applications'
      },

      ss_darwin: {
        command: './lib/nwsnapshot --extra_code ./build/haroopad.bin.js ./build/haroopad/js/haroopad.bin'
      },

      ss_win32: {
        command: '"./lib/nwsnapshot.exe" --extra_code ./build/haroopad.bin.js ./build/haroopad/js/haroopad.bin'
      },

      ss_linux: {
        command: './lib/nwsnapshot --extra_code ./build/haroopad.bin.js ./build/haroopad/js/haroopad.bin'
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
          name: 'haroopad',
          baseUrl: "src/js/app",
          mainConfigFile: "src/js/app/haroopad.js",
          out: "build/haroopad/js/modules.js",
          preserveLicenseComments: false
        }
      }
    }
  });
  
  /* v8 protect source code task for cross platform */  
  grunt.registerTask('snapshot', 'cross platform snapshot', function() {
    grunt.task.run('shell:ss_'+ process.platform);
  });

  grunt.registerTask('default', [ 'clean', 'concat', 'uglify:pad', 'uglify:viewer', 'cssmin', 'copy:main', 'requirejs', 'snapshot' ]);
  grunt.registerTask('deploy', [ 'shell:deploy']);
  grunt.registerTask('debug', [ 'clean:release', 'shell:cpLib', 'copy:debug', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('build', [ 'clean:release', 'shell:cpLib', 'copy:build', 'replace:info', 'shell:exec' ]);
  grunt.registerTask('pkg', [ 'clean:release', 'shell:cpLib', 'shell:cpZipSrc', 'replace:info', 'shell:exec' ]);
};
