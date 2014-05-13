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
				files: {
					'../css/webplate.css': '../sass/web-engine.scss'
				}
			}
		}, 
		// End of SASS
		// Uglify
		uglify: {
			// Stack file
			stack: {
				files: {
					'../../stack.js': [
						'../js/web-engine.js'
					]
				}
			},
			// Imports
			imports: {
				files: {
					'../js/min/web-imports.min.js': [
						'../js/web-jquery.js',
						'../js/web-modernizr.js',
						'../js/web-velocity.js',
						'../js/web-tools.js',
						'../js/web-buttonplate.js',
						'../js/web-forms.js'
					]
				}
			},
			// Touch
			touch: {
				files: {
					'../js/min/web-touch.min.js': [
						'../js/web-jquery.finger.js',
						'../js/web-fastclick.js'
					],
				}
			},
			// LESS
			less: {
				files: {
					'../js/min/web-less.min.js': [
						'../js/web-less.js'
					],
				}
			},
			// Flickerplate
			flickerplate: {
				files: {
					'../js/min/web-flickerplate.min.js': [
						'../js/web-flickerplate.js'
					],
				}
			},
			// Penplate
			penplate: {
				files: {
					'../js/min/web-penplate.min.js': [
						'../js/web-penplate.js'
					],
				}
			}
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: ['../**/*.scss', '../../_settings.scss'],
				tasks: ['sass']
			},
			// End of CSS
			// Scripts
			stack: {
				files: ['../js/web-engine.js'],
				tasks: ['uglify:stack']
			},
			imports: {
				files: ['../js/web-jquery.js', '../js/web-modernizr.js', '../js/web-tools.js', '../js/web-buttonplate.js', '../js/web-forms.js'],
				tasks: ['uglify:imports']
			},
			touch: {
				files: ['../js/web-jquery.finger.js', '../js/web-fastclick.js'],
				tasks: ['uglify:touch']
			},
			less: {
				files: ['../js/web-less.js'],
				tasks: ['uglify:less']
			},
			flickerplate: {
				files: ['../js/web-flickerplate.js'],
				tasks: ['uglify:flickerplate']
			},
			penplate: {
				files: ['../js/web-penplate.js'],
				tasks: ['uglify:penplate']
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