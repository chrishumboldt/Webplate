/**
 * File: gruntfile.js
 * Type: Grunt build file
 * Author: Chris Humboldt
 * Last Edited: 2 June 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// 

module.exports = function(grunt) {

	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shared-config');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['shared_config', 'concat', 'sass', 'uglify']);
	grunt.registerTask('build-sass', ['shared_config', 'concat', 'sass']);
	grunt.registerTask('build-js', ['shared_config', 'uglify']);

	// Variables
	var $webConfig = grunt.file.readJSON('../project/config.json');
	var $styles = ['sass/core.scss'];
	var $scripts = ['js/modernizr.js', 'js/velocity.js', 'js/tools.js'];
	var $sourceMap = $webConfig.project.build != undefined && $webConfig.project.build.sourcemap != undefined ? $webConfig.project.build.sourcemap : 'none';

	// Add to scripts & styles
	if ($webConfig.project['build'] != undefined && $webConfig.project['build']['component'] != undefined) {
		var $webComponentBuild = $webConfig.project['build']['component'];
		for (var $i = 0; $i < $webComponentBuild.length; $i++) {
			var $componentName = $webComponentBuild[$i];
			var $bowerJSON = grunt.file.readJSON('../project/component/' + $componentName + '/.bower.json');
			if (typeof $bowerJSON.main == 'object') {
				for (var $i2 = 0; $i2 < $bowerJSON.main.length; $i2++) {
					var $thisPath = '../project/component/' + $componentName + '/' + $bowerJSON.main[$i2];
					if ($bowerJSON.main[$i2].indexOf('.js') > -1) {
						$scripts.push($thisPath);
					} else if ($bowerJSON.main[$i2].indexOf('.css') > -1) {
						$styles.push($thisPath);
					}
				}
			} else {
				var $thisPath = '../project/component/' + $componentName + '/' + $bowerJSON.main;
				if ($bowerJSON.main.indexOf('.js') > -1) {
					$scripts.push($thisPath);
				} else if ($bowerJSON.main.indexOf('.css') > -1) {
					$styles.push($thisPath);
				}
			}
		}
	}

	// Clean out the contents of the config file
	grunt.file.write('sass/config.scss', '');

	// Initialize config
	grunt.initConfig({
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// Shared config
		shared_config: {
			default: {
				options: {
					name: "config",
					cssFormat: "dash",
					mask: 'config-mask.json'
				},
				src: '../project/config.json',
				dest: [
					'sass/config.scss'
				]
			}
		},
		// SASS
		concat: {
			dist: {
				src: $styles,
				dest: 'sass/build-import.scss'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: $sourceMap
				},
				files: [{
					// Project files
					expand: true,
					cwd: '../project/sass',
					src: ['**/*.scss'],
					dest: '../project/css',
					ext: '.css'
				}, {
					// UI files
					expand: true,
					cwd: '../project/ui',
					src: ['**/style.scss'],
					dest: '../project/ui',
					ext: '.css'
				}, {
					// Core file
					'css/styles.css': 'sass/build-import.scss'
				}]
			}
		},
		// End of SASS
		// Uglify
		uglify: {
			// Start file
			start: {
				files: {
					'../start.js': [
						'js/core.js'
					]
				}
			},
			// Imports
			imports: {
				files: {
					'js/min/scripts.min.js': $scripts
				}
			},
			// Touch
			touch: {
				files: {
					'js/min/touch.min.js': [
						'js/fastclick.js'
					],
				}
			},
			// Project files
			project: {
				files: [{
					expand: true,
					cwd: '../project/js',
					src: '*.js',
					dest: '../project/js/min',
					ext: '.min.js'
				}]
			},
			// UI files
			ui: {
				files: [{
					expand: true,
					cwd: '../project/ui',
					src: '**/script.js',
					dest: '../project/ui',
					ext: '.min.js'
				}]
			},
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: [
					'**/*.scss',
					'../_settings.scss',
					'../project/sass/*.scss',
					'../project/sass/**/*.scss',
					'../project/ui/**/*.scss'
				],
				tasks: ['shared_config', 'concat', 'sass']
			},
			// End of CSS
			// Scripts
			start: {
				files: ['js/core.js'],
				tasks: ['uglify:start']
			},
			imports: {
				files: [
					'js/modernizr.js',
					'js/velocity.js',
					'js/tools.js'
				],
				tasks: ['uglify:imports']
			},
			touch: {
				files: [
					'js/fastclick.js'
				],
				tasks: ['uglify:touch']
			},
			project: {
				files: ['../project/js/*.js'],
				tasks: ['uglify:project']
			},
			ui: {
				files: ['../project/ui/**/script.js'],
				tasks: ['uglify:ui']
			},
			// End of scripts
			// Config
			config: {
				files: ['../project/config.json'],
				tasks: ['shared_config', 'concat', 'sass', 'uglify']
			},
			// End of config
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