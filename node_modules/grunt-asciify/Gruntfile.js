'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		asciify: {

			default_options: {  // Creates test output for the default options
				text: 'Asciify',
				dest: 'tmp/default_options'
			},

			custom_options: {  // Creates test output with custom options
				text: 'GRUNT!',
				options: {
					font:'doom',
				},
				dest:'tmp/custom_options'
			},

			banner:{ // Create an asciify_banner property used later in the uglify task
				text: 'GRUNT-ASCIIFY!',
				options:{
					font:'graffiti',
					log:true  // Add some hotness to the console.
				}
			}
		},

		uglify:{
			options: {
				// asciify creates a variable for each target, `asciify_[target name]`
				banner: '/*!\n <%= asciify_banner %> \n*/\n'
			},
			all:{
				src:'Gruntfile.js',
				dest:'Gruntfile.withbanner.min.js'        
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},

		clean: {
			tests: ['tmp'],
		},

		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['clean', 'asciify', 'nodeunit']);

	grunt.registerTask('default', ['jshint', 'asciify', 'uglify']);
};
