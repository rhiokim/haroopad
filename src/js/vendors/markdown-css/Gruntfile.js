module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib');

	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["themes"]
				},

				files: {
					"build/markdown.css": "themes/markdown.less",
					"build/clearness-dark/clearness-dark.css": "themes/clearness-dark/clearness-dark.less",
					"build/clearness/clearness.css": "themes/clearness/clearness.less",
					"build/github/github.css": "themes/github/github.less",
					"build/haroopad/haroopad.css": "themes/haroopad/haroopad.less",
					"build/solarized-dark/solarized-dark.css": "themes/solarized-dark/solarized-dark.less",
					"build/solarized-light/solarized-light.css": "themes/solarized-light/solarized-light.less",
					"build/node-dark/node-dark.css": "themes/node-dark/node-dark.less",
					"build/metro-vibes/metro-vibes.css": "themes/metro-vibes/metro-vibes.less",
					"build/metro-vibes-dark/metro-vibes-dark.css": "themes/metro-vibes-dark/metro-vibes-dark.less",
					"build/wood/wood.css": "themes/wood/wood.less",
					"build/wood-ri/wood-ri.css": "themes/wood-ri/wood-ri.less"
				}
			}
		},

		copy: {
			main: {
				files: [
					// { expand: true, cwd: 'themes/node-dark/', src: ['**'], dest: 'assets/css/' }
				]
			},
			preview: {
				files: [
					{ expand: true, cwd: 'build/', src: ['**'], dest: 'assets/css/' }
				]
			},
			resources: {
				files: [
          { src: 'themes/wood/wood.jpg', dest: 'build/wood/wood.jpg' },
          { src: 'themes/wood-ri/wood.jpg', dest: 'build/wood-ri/wood.jpg' }
				]
			}
		}
	});

	grunt.registerTask('default', [ 'less:development', 'copy:resources', 'copy:preview' ]);
	grunt.registerTask('build', [ 'less:development', 'copy' ]);
}