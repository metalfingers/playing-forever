module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: 'all'
        },
        files: [{
          expand: true,
          cwd: 'js',
          src: '*.js',
          dest: 'build/'
        }]
      },
      prod: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: false,
          compress: true,
          mangle: true
        },
        files: [{
          expand: true,
          cwd: 'js',
          src: '*.js',
          dest: 'build/'
        }]      
      }

    },
    
    sass: {
      dev: {
        options: {
          sourcemap: true,
          style: 'nested'
        },
        files: {
          'css/style.css': 'sass/style.scss'
        }
      },
      prod: {
        options: {
          sourcemap: true,
          style: 'compressed'
        },
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },
    
    scsslint: {
      allFiles: [
        'sass/*.scss',
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: null
      },
    },

    watch: {
      scripts: {
        files: ['js/*.js', 'sass/*.scss'],
        tasks: ['uglify:dev', 'notify:js', 'scsslint', 'sass:dev', 'notify:sass'],
        options: {
          spawn: false,
        }
      }
    },
    
    notify: {
      js: {
        options: {
          title: "<%= pkg.name %>",
          message: "Javascript minified!"
        }
      },
      sass: {
        options: {
          title: "<%= pkg.name %>",
          message: "Javascript minified! \nSass files compiled!"
        }
      }
    }
  });

  // Load our plugins.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-scss-lint');

  // Register tasks.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('prod', ['uglify:prod', 'scsslint', 'sass:prod', 'notify:watch']);

};
