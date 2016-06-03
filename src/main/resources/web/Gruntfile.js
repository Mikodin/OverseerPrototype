module.exports = function(grunt) {
  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-log-headers']
  });

  require('grunt-log-headers')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    newer: {
      options: {
        gruntLogHeader: false
      }
    },
    'newer-postrun': {
      options: {
        gruntLogHeader: false
      }
    },
    clean: {
      src: [
        'app/public/**/*.css',
        'app/public/**/*.js'
      ]
    },
    jshint: {
      src: [
          'app/app.js',
          'app/overseer/**/*.js'
      ],
      options: {
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true,
          console: true
        }
      },

    },
    jscs: {
      src: [
          'app/app.js',
          'app/overseer/**/*.js'
      ],
      options: {
        "config": ".jscsrc",
        "preset": "google",
        "maximumLineLength": 160,
        "validateIndentation": 2,
        "disallowMultipleVarDecl": false,
        "requireCamelCaseOrUpperCaseIdentifiers": "ignoreProperties",
        "requireCapitalizedComments": false,
        "fix": false 
      }
    },
    ngAnnotate: {
        angular_app: {
            files: {
              'app/public/js/app.js': [
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-cookie/angular-cookie.js',
                'bower_components/angular-bootstrap/ui-bootstrap.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-bootstrap-show-errors/src/showErrors.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-validation-match/dist/angular-validation-match.js',
                'bower_components/angular-vertilize/angular-vertilize.js',
                'app/app.js',
                'app/overseer/**/*.js'
              ]
            }
        },
    },
    uglify: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: false,
        beautify: true,
        //beautify: false,
        mangle: false
      },
      base: {
        files: {
          'app/public/js/base.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js'
          ]
        }
      },
      app: {
        files: {
          'app/public/js/app.js': [
            'app/public/js/app.js'
          ]
        }
      }
    },
    less: {
      base: {
        options: {
          paths: ["app/assets/less"]
        },
        files: {
          "app/public/css/styles.css": "app/assets/less/styles.less"
        }
      }
    },
    cssmin: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */',
        root: './app/'
      },
      base: {
        files: {
          'app/public/css/base.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'app/public/css/styles.css'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'app/app.js',
          'app/overseer/**/*.js'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: [
          'app/assets/less/*.less',
          'app/assets/less/**/*.less'
        ],
        tasks: ['less', 'cssmin'],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'ngAnnotate:angular_app',
    'newer:uglify',
    'newer:less',
    'newer:cssmin',
    'newer:jscs'
  ]);

  grunt.registerTask('lint', [
    'jshint',
    'jscs',
  ]);
};
