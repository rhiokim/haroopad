module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    shell: {
      note: {
        command: 'marked -o release-note.html Release-Notes.md --gfm'
      }
    }
  });

  grunt.registerTask('default', [ 'shell:note' ]);
}