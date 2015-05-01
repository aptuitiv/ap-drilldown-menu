module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dest: {
        files: {
          'ap-drilldown-menu.min.js': ['ap-drilldown-menu.js']
        }
      }
    }
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // default task
  grunt.registerTask('default', ['uglify']);

};

