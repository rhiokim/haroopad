module.exports = function(grunt) {

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-replace');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // dist: 'build/Release/<%= pkg.version %>',

    // concat: {
    //   dist: {
    //     files: {
    //       '<%= dist %>/baas.io.js': [
    //             'src/build.before.js',
    //             'src/base/core/core.js',
    //             'src/base/entity/entity.js', 
    //             'src/base/collection/collection.js', 
    //             'src/build.after.js'
    //         ]
    //     }
    //   },

    //   release: {
    //     options: {
    //       stripBanners: true,
    //       banner: '// baas.io.js - v<%= pkg.version %>\n' +
    //               '// <%= pkg.homepage %>\n' +
    //               '// <%= pkg.description %>\n' +
    //               '// (c) 2012-2013 KTH, <%= pkg.author %>\n'
    //     },
    //     files: {
    //       'baas.io.min.js': [ '<%= dist %>/baas.io.min.js' ],
    //       'baas.io.js': [ '<%= dist %>/baas.io.js' ]
    //     }
    //   },

    //   kitchen: {
    //     files: {
    //       'kitchen_sink/desktop/js/baas.io.min.js': [ '<%= dist %>/baas.io.min.js' ],
    //       'kitchen_sink/desktop/js/baas.io.js': [ '<%= dist %>/baas.io.js' ],
    //       'kitchen_sink/demo/js/baas.io.min.js': [ '<%= dist %>/baas.io.min.js' ],
    //       'kitchen_sink/demo/js/baas.io.js': [ '<%= dist %>/baas.io.js' ]
    //     }
    //   }
    // },

    copy: {
      build: {
        files: [
          { cwd:'lib/nw.app/', src: [ '**' ], dest: 'build/haroopad.app/' }
        ]
      }
    },

    // compress: {
    //   demo: {
    //     options: {
    //       archive: '<%= dist %>/demo/baasio_js_demoapp_V<%= pkg.version %>.zip'
    //     },

    //     files: [
    //       { expand: true, cwd: 'kitchen_sink/demo/', src: ['**'] }
    //     ]
    //   }
    // },

    shell: {
      cpLib: {
        command: 'cp -R lib/nw.app build/haroopad.app'
      },

      cpSrc: {
        command: 'cp -R ./src  ./build/haroopad.app/Contents/Resources/app.nw'
      },

      clear: {
        command: 'rm -rf build; mkdir -p build'
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
    }
  });

  grunt.registerTask('default', [  ]);
  grunt.registerTask('clean', [ 'shell:clear' ]);
  grunt.registerTask('build', [ 'shell:clear', 'shell:cpLib', 'shell:cpSrc', 'replace:info' ]);
};