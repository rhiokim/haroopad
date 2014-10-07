module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  function platform() {

    if (process.platform === 'linux') {
      if (process.arch === 'x64') {
        postfix = 'linux64';
      } else {
        postfix = 'linux32'
      }
    } else {
      postfix = process.platform;
    }
  }

  grunt.initConfig({

    copy: {

      mkdcss: {
        files: [
          { expand: true, cwd: 'vendors/markdown-css/build/', src: [ '**' ], dest: 'css/markdown/' }
        ]
      },

      hljs: {
        files: [
          { expand: true, cwd: 'vendors/highlight.js/src/styles/', src: [ '**' ], dest: 'css/code/' }
        ]
      }
    },

    shell: {

      hljs: {
        command: 'python3 tools/build.py',
        options: {
          stdout: true,
          execOptions: {
            cwd: './vendors/highlight.js/'
          }
        }
      }
    }

  });

  grunt.registerTask('default', [  ]);
  grunt.registerTask('build', [ 'shell:hljs' ]);

};