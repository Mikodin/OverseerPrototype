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
        'app/public/minified/**/*.css',
        'app/public/minified/**/*.js'
      ]
    },
    jshint: {
      src: [
          'app.js',
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
          'app.js',
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
              'app/public/minified/js/app.js': [
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-cookie/angular-cookie.js',
                'bower_components/angular-bootstrap/ui-bootstrap.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-bootstrap-show-errors/src/showErrors.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-validation-match/dist/angular-validation-match.js',
                'bower_components/angular-vertilize/angular-vertilize.js',
                'app.js',
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
          'app/public/minified/js/base.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-ui-router-title/angular-ui-router-title.js',
            'bower_components/angular-loader/angular-loader.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap-show-errors/src/showErrors.js',
            'bower_components/angular-vertilize/angular-vertilize.js',
          ]
        }
      },
      app: {
        files: {
          'app/public/minified/js/app.js': [
            'app.js',
            'app/overseer/services/user.js',
            'app/overseer/services/board.js',
            'app/overseer/controllers/OverviewCtrl.js',
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
          'app/public/minified/css/base.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'app/assets/css/styles.css'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'app.js',
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
