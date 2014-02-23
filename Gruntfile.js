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
        files: {
          'build/<%= pkg.name %>.min.js' : ['js/*.js']
        }
      },
      prod: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'js/*.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }        
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
        tasks: ['uglify:dev', 'scsslint', 'sass:dev', 'notify:watch'],
        options: {
          spawn: false,
        }
      }
    },
    
    notify: {
      watch: {
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
