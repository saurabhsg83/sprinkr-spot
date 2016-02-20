module.exports = function(grunt) {
  var requirejs_paths = require('./src/scripts/amd-config');
  var path = require('path');
  var fs = require('fs');
  var utils = require('./node_modules/grunt-hashres/tasks/hashresUtils');
  var liveReloadPort = grunt.option('liveReloadPort') || 35729;
  var serverPort = grunt.option('port') || 9000;
  var protocol = grunt.option('https')?'https' : 'http';
  var HOST_IP = 'localhost';
  var lrSnippet = require('connect-livereload')({ port: liveReloadPort });
  var req_file_names = [];
  var _mainConfig = [];
  var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  /**
   * Generates object of files hashes and its old file names to be used in hash replacing in hashfiles task
   * @param  {strung} module_path Path of the module to be hashed
   * @param  {string} module_name Name of the module
   * @return {object}             returns object containing module original name, path and hashed name and path
   */
  function hashname(module_path, module_name) {
    //module_path is used to create hash
    //module_name is used to create new name
    var hsh = utils.md5(module_path).slice(0, 8);
    var bundleNewName = module_name + '.' + hsh + '.cache';
    var mod_dir = path.dirname(module_path);
    var bundleNewPath = mod_dir + '/' + bundleNewName.split('/').slice(-1).join('') + '.js';
    var obj = {
      oldbundleName: module_name,
      oldbundlePath: module_path,
      newbundelName: bundleNewName,
      newbundlePath: bundleNewPath
    };
    return obj;
  }

  /**
   * Replace content in dest file with obj provided
   * @param  {string} dest file path where replacements will occur
   * @param  {object} obj  object containing old and new file names obtained from @hashname
   */
  function replaceContent(dest, obj) {
    try {
      grunt.file.expand(dest).forEach(function(f) {
        var regexp = new RegExp(utils.preg_quote(obj.oldbundleName) + '(\\?[0-9a-z]+)?', 'g');
        var destContents = fs.readFileSync(f, 'utf8');
        destContents = destContents.replace(regexp, obj.newbundelName);
        fs.writeFileSync(f, destContents, 'utf8');
      });
      fs.renameSync(obj.oldbundlePath, obj.newbundlePath);
      grunt.log.debug('filePath:' + obj.oldbundlePath);  //fs.renameSync(obj.oldbundlePath + '.map', obj.newbundlePath + '.map');
    } catch (e) {
      // Something went wrong.
      grunt.verbose.or.error(e.message);
      grunt.fail.warn('Something went wrong. in hash rename');
    }
  }

  /**
   * Task which is run after requirejs for hashing the files and replacements
   */
  grunt.registerMultiTask('hashfiles', 'Hash changed files ', function() {
    var dest = this.data.dest;
    var allfiles = this.data.filenames;

    for (var x = 0, xL = allfiles.length; x < xL; x++) {
      allfiles[x] = hashname(allfiles[x].oldbundlePath, allfiles[x].oldbundleName);
      replaceContent(this.data.dest, allfiles[x]);
    }
  });

  grunt.initConfig({

    yeoman: {
      app: 'src',
      dist: 'dist',
      root: '.'
    },

    connect: {
    server: {
      options: {
        port: serverPort,
        hostname: HOST_IP,
        protocol : protocol,
        base: './',
        keepalive: true,
        open: {
          target: 'http://localhost:9000'
        }
      }
    }
  },

    // /**
    //  * Server task for
    //  * @type {npm-task} grunt-contrib-connect
    //  */
    // connect: {
    //   options: {
    //     port: serverPort,
    //     hostname: HOST_IP,
    //     base: './',
    //     protocol : protocol,
    //     keepalive: true,
    //   },
    //   livereload: {
    //     options: {
    //       middleware: function(connect) {
    //         return [
    //           lrSnippet,
    //           mountFolder(connect, './')
    //         ];
    //       }
    //     }
    //   }
    // },

    /**
     * Open task for opening web pages. Used after starting the server
     * @type {Object} grunt-contrib-open
     */
    open: {
      dev: { path: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.options.port %>/src/' },
      prod: { path: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.options.port %>/dist/' }
    },

    /**
     * Uglify task for merging modernizer and requirejs
     * @type {Object}
     */
    uglify: {
      all: {
        files: {
          '<%= yeoman.dist %>/scripts/require.cache.js': [
            '<%= yeoman.app %>/scripts/vendor/bower_components/modernizr/modernizr.js',
            '<%= yeoman.app %>/scripts/vendor/bower_components/requirejs/require.js'
          ]
        }
      },
      dev: {
        files: {
          '<%= yeoman.app %>/scripts/require.cache.js': [
            '<%= yeoman.app %>/scripts/vendor/bower_components/modernizr/modernizr.js',
            '<%= yeoman.app %>/scripts/vendor/bower_components/requirejs/require.js'
          ]
        }
      }
    },

    /**
     * Custom task written in this file, hash and replaces the content of requirejs bundles
     * Configuration is generated at runtime in global variables in this file req_file_names and _mainConfig
     * @type {custom-task}
     */
    hashfiles: {
      allMain: {
        filenames: req_file_names,
        dest: ['<%= yeoman.dist %>/scripts/mainConfig.js']
      },
      mainConfig: {
        filenames: _mainConfig,
        dest: ['<%= yeoman.dist %>/index.html']
      }
    },

    /**
     * Task which hashes the file and replaces the references in dest.
     * @type {Object}
     */
    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.cache.${ext}',
        renameFiles: true
      },
      css: {
        options: {},
        src: [
          '<%= yeoman.dist %>/css/tinyowlmin.css',
          '<%= yeoman.dist %>/scripts/config/config.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: '<%= yeoman.dist %>/index.html'
      }
    },

    /**
     * html minification
     * @type {Object}
     */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
        }
      }
    },

    /**
     * Task for cleaning dirs. Used in deployment and build.
     * @type {Object}
     */
    clean: {
      options: { force: true },
      build: { src: ['<%= yeoman.dist %>'] },
      css: {
        src: [
          '<%= yeoman.dist %>/**/*.css',
          '!<%= yeoman.dist %>/css/tinyowlmin.*.css'
        ]
      },
      js: {
        src: [
          '<%= yeoman.dist %>/scripts/vendor/bower_components',
          '<%= yeoman.dist %>/**/*.js',
          '<%= yeoman.dist %>/**/*.ejs',
          '!<%= yeoman.dist %>/**/*.cache.js'
        ]
      }
    },

    /**
     * image minification.
     * @type {Object}
     */
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['**/*.{png,jpg,gif}', '!**/**/bower_components/**/*'],
          dest: '<%= yeoman.dist %>/'
        }]
      }
    },

    sass: {
      options: {
          sourceMap: true
      },
      mysass: {
        files: {
          'src/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    /**
     * Task for watching files and perform necessary actions.
     * @type {Object}
     */
    watch: {
      options: { livereload: liveReloadPort },
      css: {
        files: ['<%= yeoman.app %>/**/*.css'],
        tasks: ['cssmin:localcss']
      },
      sass: {
        files: ['<%= yeoman.app %>/**/*.scss'],
        tasks: ['sass', 'cssmin:localcss']
      }
    },

    requirejs: {
      compile: {
        options: {
          jsx: {
            fileExtension: '.jsx',
            transformOptions: {
              harmony: true,
              stripTypes: false,
              inlineSourceMap: true
            },
            usePragma: false
          },
          appDir: "src/",
          baseUrl: "scripts",
          dir: "dist",
          paths: requirejs_paths.paths,
          removeCombined: false,
          optimizeCss: 'none',
          optimize: 'uglify2',
          skipDirOptimize: true,
          findNestedDependencies: true,
          preserveLicenseComments: false,
          generateSourceMaps: true,
          shim: requirejs_paths.shim,
          onModuleBundleComplete: function(data) {
            var modules = this.modules,

            //accessing the above module object
            mod = null;
            for (var i = 0, length = modules.length; i < length; i++) {
              if (modules[i].name == data.name) {
                mod = modules[i];  //found module
              }
            }

            var bundleObj = hashname(mod._buildPath, data.name);
            if (bundleObj.newbundelName.indexOf('mainConfig') != -1) {
              _mainConfig.push(bundleObj);
              return;
            }

            req_file_names.push(bundleObj);
          },
          modules: [{
              name: 'libs'
            }, {
              name: 'mainConfig',
              exclude: [
                'libs'
              ]
            },

            {
              name: 'modules/restaurant/users/views/LandingPage',
              exclude: [
                'libs'
              ]
            },

            {
              name: 'modules/restaurant/users/views/LogoutPage',
              exclude: [
                'libs'
              ]
            },

            {
              name: 'modules/employee_management/views/spot_main_view',
              exclude: [
                'libs'
              ]
            }
          ]
        }
      }
    },

    cssmin: {
      options: {
        rebase: true
      },
      sitecss: {
        files: {
          '<%= yeoman.dist %>/css/tinyowlmin.css': [
            '<%= yeoman.app %>/scripts/vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
            '<%= yeoman.app %>/fonts/fontawesome/css/font-awesome.min.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/jquery-timepicker-jt/jquery.timepicker.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/select2/select2.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/select2/select2-bootstrap.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/alertify.js/dist/css/alertify.css',
            '<%= yeoman.app %>/css/fonts.css',
            '<%= yeoman.app %>/css/circle.css',
            '<%= yeoman.app %>/css/restaurants.css',
            '<%= yeoman.app %>/css/main.css',
            '<%= yeoman.app %>/css/style.css'
          ]
        }
      },
      localcss: {
        files: {
          '<%= yeoman.app %>/css/tinyowlmin.css': [
            '<%= yeoman.app %>/scripts/vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
            '<%= yeoman.app %>/fonts/fontawesome/css/font-awesome.min.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/jquery-timepicker-jt/jquery.timepicker.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/select2/select2.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/select2/select2-bootstrap.css',
            '<%= yeoman.app %>/scripts/vendor/bower_components/alertify.js/dist/css/alertify.css',
            '<%= yeoman.app %>/css/fonts.css',
            '<%= yeoman.app %>/css/circle.css',
            '<%= yeoman.app %>/css/restaurants.css',
            '<%= yeoman.app %>/css/style.css'
          ]
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('reqhash', [
    'requirejs',
    'hashres',
    'hashfiles'
  ]);

  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:build',
      'sass',
      'cssmin:sitecss',
      'reqhash',
      'uglify',
      'htmlmin',
      'imagemin',
      'clean:css',
      'clean:js',
      'watch'
    ]);
  });

  grunt.registerTask('start', function(target){
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'connect'
      ]);
    }

    return grunt.task.run([
      'clean:build',
      'uglify',
      'sass',
      'cssmin:localcss',
      'connect',
      'watch'
    ]);
  });

  grunt.registerTask('serve', function(target) {
    if(target){
      return grunt.task.run('start:' + target);
    }
    grunt.task.run('start');
  });
};
