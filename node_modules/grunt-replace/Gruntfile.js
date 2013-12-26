
/*
 *  Copyright 2013 outaTiME.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

module.exports = function (grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    replace: {
      simple: {
        options: {
          variables: {
            'key': 'value'
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/simple.txt'], dest: 'tmp/'}
        ]
      },
      prefix: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ],
          prefix: '@replace:'
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/prefix.txt'], dest: 'tmp/'}
        ]
      },
      template_key: {
        options: {
          patterns: [
            {
              match: '<%= "key" %>',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/template_key.txt'], dest: 'tmp/'}
        ]
      },
      template_value: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: '<%= grunt.template.today("yyyy") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/template_value.txt'], dest: 'tmp/'}
        ]
      },
      cwd: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, cwd: 'test/fixtures/cwd/', src: ['**/*.txt'], dest: 'tmp/cwd/'}
        ]
      },
      flatten: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/flatten/**/*.txt'], dest: 'tmp/flatten/'}
        ]
      },
      force: {
        options: {
          force: true
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/force.txt'], dest: 'tmp/'}
        ]
      },
      sort: {
        options: {
          patterns: [
            {
              match: 'header',
              replacement: 'bar'
            },
            {
              match: 'head',
              replacement: 'foo'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/sort.txt'], dest: 'tmp/'}
        ]
      },
      doc_cache: {
        options: {
          patterns: [
            {
              match: 'year',
              replacement: '<%= grunt.template.today("yyyy") %>'
            }
          ]
        },
        files: [
          {src: ['test/fixtures/cache.html'], dest: 'tmp/cache.html'}
        ]
      },
      doc_include: {
        options: {
          patterns: [
            {
              match: 'include',
              replacement: '<%= grunt.file.read("test/fixtures/content.txt") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/include.txt'], dest: 'tmp/'}
        ]
      },
      escape: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: '$$\''
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/escape.txt'], dest: 'tmp/'}
        ]
      },
      special_chars: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'detta är en sträng'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/special_chars.txt'], dest: 'tmp/'}
        ]
      },
      fn: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: function () {
                return 'value';
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/function.txt'], dest: 'tmp/'}
        ]
      },
      new_way: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value',
              expression: false
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/new_way.txt'], dest: 'tmp/'}
        ]
      },
      regexp: {
        options: {
          patterns: [
            {
              match: /@@key/g,
              replacement: 'value',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/regexp.txt'], dest: 'tmp/'}
        ]
      },
      regexp_template: {
        options: {
          patterns: [
            {
              match: '/@@<%= "key" %>/g',
              replacement: 'value',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/regexp_template.txt'], dest: 'tmp/'}
        ]
      },
      doc_regexp: {
        options: {
          patterns: [
            {
              match: /(\w+)\s(\w+)/,
              replacement: '$2, $1',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/username.txt'], dest: 'tmp/'}
        ]
      },
      json: {
        options: {
          patterns: [
            {
              json: {
                "key": "value"
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json.txt'], dest: 'tmp/'}
        ]
      },
      json_external: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external.txt'], dest: 'tmp/'}
        ]
      },
      json_external_nested: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_nested.txt'], dest: 'tmp/'}
        ]
      },
      json_external_template_key: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_template_key.txt'], dest: 'tmp/'}
        ]
      },
      json_external_template_value: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_template_value.txt'], dest: 'tmp/'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      files: '<config:lint.all>',
      tasks: 'default'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load helper plugins for testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'replace', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
