'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean: ['md5.js','md5.min.js','src/md5.js','bower.json','component.json'],

		curl: {
			'src/md5.js' : 'http://www.myersdaily.org/joseph/javascript/md5.js'
		},
		concat: {
			dist: {
		      src: ['src/umd-prefix.js','src/md5.js','src/umd-postfix.js'],
		      dest: 'md5.js',
		  }
		},

		uglify: {
			dist: {
				src: 'md5.js',
				dest: 'md5.min.js'
			}
		},

		update_json: {
			bower: {
				src: 'package.json',
				dest: 'bower.json',
				fields: [
					'name',
					'version',
					'main',
					'ignore',
					'dependencies',
					'devDependencies',
					'keywords',
					'license',
					'authors',
					'homepage',
					'repository',
				]
			},
			component: {
				src: 'package.json',
				dest: 'component.json',
				fields: {
					'name'			: null,
					'repository'	: 'repo',
					'description'	: null,
					'version'		: null,
					'keywords'		: null,
					'main'			: null,
					'dependencies'	: null,
					'development'	: 'devDependencies',
					'license'		: null,
				}
			}
		}
	});

	grunt.registerTask('default', ['concat','uglify','update_json']);
	grunt.registerTask('fresh', ['clean','curl','default']);
};