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
					style: 'compressed',
					sourcemap: 'none'
				},
				files: [{
					// Core file
					'../css/webplate.css': '../sass/engine.scss'
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
						'../js/engine.js'
					]
				}
			},
			// Imports
			imports: {
				files: {
					'../js/min/webplate.min.js': [
						'../js/jquery.js',
						'../js/modernizr.js',
						'../js/hammer.js',
						'../js/hammer-jquery.js',
						'../js/velocity.js',
						'../js/tools.js',
						'../js/buttonplate.js',
						'../js/flickerplate.js',
						'../js/formplate.js',
						'../js/modalplate.js'
					]
				}
			},
			// Touch
			touch: {
				files: {
					'../js/min/touch.min.js': [
						'../js/fastclick.js'
					],
				}
			},
			// LESS
			less: {
				files: {
					'../js/min/less.min.js': [
						'../js/less.js'
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
				files: ['../js/engine.js'],
				tasks: ['uglify:stack']
			},
			imports: {
				files: [
					'../js/jquery.js',
					'../js/modernizr.js',
					'../js/hammer.js',
					'../js/hammer-jquery.js',
					'../js/velocity.js',
					'../js/tools.js',
					'../js/buttonplate.js',
					'../js/flickerplate.js',
					'../js/formplate.js',
					'../js/modalplate.js'
				],
				tasks: ['uglify:imports']
			},
			touch: {
				files: [
					'../js/fastclick.js'
				],
				tasks: ['uglify:touch']
			},
			less: {
				files: ['../js/less.js'],
				tasks: ['uglify:less']
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