module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	
	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '../sass',
					src: ['**/*.scss'],
					dest: '../css',
					ext: '.css'
				},{
					'../../core/css/webplate.css': '../../core/sass/web-engine.scss'
				}]
			}
		}, 
		// End of SASS
		// Uglify
		uglify: {
			targets: {
				files: [{
					expand: true,
					cwd: '../js',
					src: '*.js',
					dest: '../js/min',
					ext: '.min.js'
				}]
			}
		},
		// End of uglify
		// Watch
		watch: {
			// CSS
			css: {
				files: ['../sass/*.scss', '../sass/**/*.scss', '../../_settings.scss'],
				tasks: ['sass']
			},
			// End of CSS
			// Scripts
			scripts: {
				files: ['../js/*.js'],
				tasks: ['uglify']
			},
			// End of scripts
			// Live reload
			options: {
		      livereload: true,
		    } 
		    // End of live reload
		} 
		// End of watch
	});
	// End of initialize config
}