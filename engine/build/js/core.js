/**
@author Chris Humboldt
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
			module: pathRoot + 'engine/node_modules/',
			root: pathRoot + 'engine/'
		},
      js: pathRoot + 'js/',
      module: pathRoot + 'node_modules/',
      root: pathRoot
   };

   Rocket.module.add({
		fastclick: {
			js: path.engine.module + 'fastclick/lib/fastclick.js'
		},
      fontAwesome: {
         css: path.root + 'font-awesome/css/font-awesome.min.css'
      },
      icomoon: {
         css: path.root + 'icomoon/style.css'
      },
		rocket: {
			css: path.engine.css + 'styles.min.css',
         js: path.engine.js + 'scripts.min.js'
		},
		rocketLight: {
			css: path.engine.css + 'styles-light.min.css',
         js: path.engine.js + 'scripts.min.js'
		}
	});

   // Core
	var core = {
		load: {
			modules: function (callback) {
				var rootModules = [];

				// Prefined modules
				if (Rocket.is.object(cockpit.engine) && Rocket.is.boolean(cockpit.engine.light) && cockpit.engine.light === true) {
					rootModules.push('rocketLight');
				} else {
					rootModules.push('rocket');
				}

            // Touch inclusion
            if (Modernizr.touchevents) {
               rootModules.push('fastclick');
            }

            // Load other modules
            var app = {
               css: Rocket.helper.setDefault(cockpit.css, []),
               js: Rocket.helper.setDefault(cockpit.js, [])
            };
            var iconFont = Rocket.helper.setDefault(cockpit.iconFont, '');
            var load = Rocket.helper.setDefault(cockpit.load, []);
   			var pageMatch = false;
   			var queryString = '';
   			var urlData = Rocket.url.all();

   			// Page options
            if (cockpit.page) {
               for (var i = 0, len = cockpit.page.length; i < len; i++) {
   				   var page = cockpit.page[i];

                  // Page match
   					if (page.url.indexOf('*') > -1) {
   						if (urlData.current.indexOf(page.url.substring(0, page.url.length - 1)) > -1) {
   							pageMatch = true;
   						}
   					} else {
   						if (urlData.current === urlData.base + page.url) {
   							pageMatch = true;
   						}
   					}
                  if (pageMatch) {
                     if (page.overwrite === true) {
                        iconFont = Rocket.helper.setDefault(page.iconFont, '');
                        load = Rocket.helper.setDefault(page.load, []);
                        app.css = Rocket.helper.setDefault(page.css, []);
                        app.js = Rocket.helper.setDefault(page.js, []);
                     } else {
                        iconFont = Rocket.helper.setDefault(page.iconFont, iconFont);
                        load = Rocket.helper.setDefault(page.load, loads);
                        app.css = Rocket.helper.setDefault(page.css, app.css);
                        app.js = Rocket.helper.setDefault(page.js, app.js);
                     }
                  }
               }
            }

            // Fix the paths
            for (var i = 0, len = app.css.length; i < len; i++) {
               app.css[i] = path.css + app.css[i];
            }
            for (var i = 0, len = app.js.length; i < len; i++) {
               app.js[i] = path.js + app.js[i];
            }

            // Add to root and app modules
            if (iconFont !== '') {
               switch (iconFont) {
                  case 'font-awesome':
                     rootModules.push('fontAwesome');
                     break;
                  case 'icomoon':
                     rootModules.push('icomoon');
                     break;
               }
            }
            if (Rocket.is.array(load) && load.length > 0) {
               rootModules = rootModules.concat(load);
            }
            app.requires = rootModules;
            Rocket.module.add({
               rocketLaunch: app
            });

            // Require
            core.log('Rocket: Modules load...started');

            var require = Rocket.require();
            require.add('rocketLaunch');
            require.load(callback());
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
         core.pageLoader();

			// Read cockpit file
			core.getJSON(path.cockpit, function (error, json) {
            // Catch
				if (error) {
					throw new Error('Rocket: Not initialised because the cockpit.json file was not found.');
					return false;
				}
				// Continue
            cockpit = json;

            // Set loads
            if (cockpit.modules) {
               Rocket.module.add(cockpit.modules);
            }

				// Load modules
				core.load.modules(function () {
               core.log('Rocket: Modules load...successful');
					core.showPage();
				});
			});
		},
      log: function (text) {
			if (!window || !window.console || !cockpit) {
				return false;
			}
			if (cockpit.engine && typeof cockpit.engine.log === 'boolean' && cockpit.engine.log) {
				console.log(text);
			}
		},
      pageLoader: function () {
			if (rocketContent !== null) {
				var loaderDiv = document.createElement('div');
				var loaderText = 'Loading';
				var i = 0;

				rocketContent.style.display = 'none';

				loaderDiv.id = 'rocket-page-loader';
				loaderDiv.style.margin = '0px auto';
				loaderDiv.style.paddingTop = '150px';
				loaderDiv.style.color = '#ccd1d9';
				loaderDiv.style.fontSize = '20px';
				loaderDiv.style.fontFamily = 'Arial, Helvetica, sans-serif';
				loaderDiv.style.textAlign = 'center';
				document.getElementsByTagName('body')[0].appendChild(loaderDiv);

				var pageLoaderTimer = setInterval(function () {
					i++;
					if (document.getElementById('rocket-page-loader') !== null) {
						document.getElementById('rocket-page-loader').innerHTML = loaderText + new Array(i % 5).join('.');
					} else {
						clearInterval(pageLoaderTimer);
					}
				}, 250);
			}
		},
      showPage: function () {
         setTimeout(function () {
            if (rocketContent !== null) {
   				rocketContent.removeAttribute('style');
   				document.getElementById('rocket-page-loader').parentNode.removeChild(document.getElementById('rocket-page-loader'));
   			} else {
   				Rocket.dom.body.removeAttribute('style');
   			}
   			core.log('Rocket: Page show...successful');
         }, 10);
      }
	};

   // Execute
   core.init();
})();
