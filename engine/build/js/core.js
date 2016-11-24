/**
 * File: engine/js/core.js
 * Type: Javascript engine
 * Author: Chris Humboldt
**/

'use strict';

/*
This function executes the entire Rocket library.
It manages the main files, modules files and project files as set
by the cockpit.json file.
*/
(function () {
   // Variables
	var allowedFileTypes = ['css', 'js']
   var pathRoot = document.getElementById('rocket').getAttribute('src').replace('launch.js', '');
   var cockpit = false;
	var rocketContent = document.getElementById('rocket-content');

	// Variables dependant
   var path = {
      cockpit: pathRoot + 'cockpit.json',
      css: pathRoot + 'css/',
		engine: {
			css: pathRoot + 'engine/css/',
			js: pathRoot + 'engine/js/',
			module: pathRoot + 'engine/module/',
			root: pathRoot + 'engine/'
		},
      js: pathRoot + 'js/',
      module: pathRoot + 'node_modules/',
      root: pathRoot
   };
	var modules = {
		animejs: {
			js: path.engine.module + 'animejs/anime.js'
		},
		button: {
			css: path.engine.module + 'rocket-button/css/button.min.css',
			js: path.engine.module + 'rocket-button/js/button.min.js',
		},
		fastclick: {
			js: path.engine.module + 'fastclick/fastclick.min.js'
		},
		flicker: {
			css: path.engine.module + 'rocket-flicker/css/flicker.min.css',
			js: path.engine.module + 'rocket-flicker/js/flicker.min.js'
		},
		form: {
			css: path.engine.module + 'rocket-form/css/form.min.css',
			js: path.engine.module + 'rocket-form/js/form.min.js'
		},
		inject: {
			requires: ['mustache'],
			js: path.engine.module + 'rocket-inject/js/inject-lean.min.js'
		},
		mustache: {
			js: path.engine.module + 'mustache/mustache.min.js'
		},
		propel: {
			css: path.engine.module + 'rocket-propel/css/propel.min.css'
		},
		rocketStylesFull: {
			css: path.engine.css + 'styles-full.min.css'
		},
		rocketStylesLight: {
			css: path.engine.css + 'styles-light.min.css'
		}
	}

   // Core
	var core = {
		load: {
			modules: function (callback) {
				var loadModules = [];
				// Prefined modules
				if (Rocket.is.object(cockpit.engine) && Rocket.is.boolean(cockpit.engine.light) && cockpit.engine.light === true) {
					// Light version
					loadModules = loadModules.concat(['rocketStylesLight']);
				} else {
					// Full version
					loadModules = loadModules.concat([
						'rocketStylesFull',
						'animejs',
						'button',
						'flicker',
						'form',
						'inject',
						'mustache'
					]);
				}
			}
		},
		getJSON: function (url, callback) {
         var xhr = new XMLHttpRequest;
         xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
               // The "0" state is for Cordova as this a success response. Super dumb!
               if (this.status === 0 || (this.status >= 200 && this.status < 300)) {
                  return callback(false, JSON.parse(this.responseText));
               } else {
                  return callback(true);
               }
            }
         };
         xhr.open('GET', url);
         xhr.send();
      },
		init: function () {
			// Read cockpit file
			core.getJSON(path.cockpit, function (error, json) {
            // Catch
				if (error) {
					throw new Error('Rocket: Not initialised because the cockpit.json file was not found.');
					return false;
				}
				// Continue
            cockpit = json;

				// Load components
				core.load.modules(function () {
					Rocket.log('yay');
				});
			});
		}
	};

   // Execute
	core.setupModules
   core.init();
})();
