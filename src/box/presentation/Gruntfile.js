module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({

    copy: {

      img: {
        files: [
          { expand: true, cwd: 'img', src: [ '**' ], dest: 'dist/img' }
        ]
      },

      fonts: {
        files: [
          { expand: true, cwd: 'vendors/shower-bright/fonts', src: [ '**' ], dest: 'dist/fonts' },
          // { expand: true, cwd: 'vendors/shower-ribbon/fonts', src: [ '**' ], dest: 'dist/fonts' }
        ]
      }
    },

    clean: {
      build: [
        'dist'
      ]
    },

    cssmin: {
      dist: {
        files: {
          "dist/css/app.min.css": [
            'vendors/shower-bright/styles/screen.css',
            'css/main.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/app.min.js': [
            'vendors/jquery/dist/jquery.min.js',
            'vendors/underscore/underscore.js',
            'vendors/backbone/backbone.js',
            'vendors/requirejs/require.js',
            'vendors/shower-core/shower.min.js',
            'js/main.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.bin.html'
        }
      }
    }

  });

  grunt.registerTask('default', [ 'clean', 'copy', 'uglify:dist', 'cssmin:dist', 'htmlmin:dist' ]);
  grunt.registerTask('build', [ 'shell:hljs' ]);

};