module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass', 'uglify']);
	
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
					// Core file
					'../css/webplate.css': '../sass/web-engine.scss',
					'../css/flickerplate.css': '../sass/web-flickerplate.scss',
					'../css/penplate.css': '../sass/web-penplate.scss'
				},{
					// Project files
					expand: true,
					cwd: '../../project/sass',
					src: ['**/*.scss'],
					dest: '../../project/css',
					ext: '.css'
				},{
					// UI files
					expand: true,
					cwd: '../../project/ui',
					src: ['**/style.scss'],
					dest: '../../project/ui',
					ext: '.css'
				}]
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
						'../js/web-hammer.js',
						'../js/web-hammer-jquery.js',
						'../js/web-velocity.js',
						'../js/web-tools.js',
						'../js/web-buttonplate.js',
						'../js/web-formplate.js',
						'../js/web-modalplate.js'
					]
				}
			},
			// Touch
			touch: {
				files: {
					'../js/min/web-touch.min.js': [
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
			},
			// Project files
			project: {
				files: [{
					expand: true,
					cwd: '../../project/js',
					src: '*.js',
					dest: '../../project/js/min',
					ext: '.min.js'
				}]
			},
			// UI files
			ui: {
				files: [{
					expand: true,
					cwd: '../../project/ui',
					src: '**/script.js',
					dest: '../../project/ui',
					ext: '.min.js'
				}]
			},
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: [
					'../**/*.scss', 
					'../../_settings.scss', 
					'../../project/sass/*.scss', 
					'../../project/sass/**/*.scss',
					'../../project/ui/**/*.scss'
				],
				tasks: ['sass']
			},
			// End of CSS
			// Scripts
			stack: {
				files: ['../js/web-engine.js'],
				tasks: ['uglify:stack']
			},
			imports: {
				files: [
					'../js/web-jquery.js',
					'../js/web-modernizr.js',
					'../js/web-hammer.js',
					'../js/web-hammer-jquery.js',
					'../js/web-velocity.js',
					'../js/web-tools.js',
					'../js/web-buttonplate.js',
					'../js/web-formplate.js',
					'../js/web-modalplate.js'
				],
				tasks: ['uglify:imports']
			},
			touch: {
				files: [
					'../js/web-fastclick.js'
				],
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
			project: {
				files: ['../../project/js/*.js'],
				tasks: ['uglify:project']
			},
			ui: {
				files: ['../../project/ui/**/script.js'],
				tasks: ['uglify:ui']
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