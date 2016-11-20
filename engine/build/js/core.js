/**
 * File: engine/js/core.js
 * Type: Javascript engine
 * Author: Chris Humboldt
**/

'use strict';

// Global functions
var globalDomHead = document.getElementsByTagName('head')[0];
function requireCSS (urls, callback) {
   // Catch
   if (typeof urls !== 'object' || (urls instanceof Array === false)) {
      return false;
   }
   // Continue
   for (var i = 0, len = urls.length; i < len; i++) {
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = urls[i];
      globalDomHead.appendChild(link);

      if ((i + 1) === len) {
         if (typeof callback === 'function') {
            return callback();
         }
      }
   }
};

// Rocket core
(function () {
   // Variables
   var pathRoot = document.getElementById('rocket').getAttribute('src').replace('launch.js', '');
   var path = {
      cockpit: pathRoot + 'cockpit.json',
      css: pathRoot + 'css/',
      js: pathRoot + 'js/',
      modules: pathRoot + 'node_modules/',
      root: pathRoot
   };
   var cockpit = false;
   var load = {
		allowedFileTypes: ['css', 'js'],
		css: [],
      cssModules: [],
		js: [],
		iconFont: false
	};
	var rocketContent = document.getElementById('rocket-content');

   // Requires
   var autoLoadIgnores = ['rocketBurnerFull', 'rocketBurnerLight', 'rocketTouch'];
   var requireBaseUrl = './';
   var requirePathsJS = {
      rocketBurnerFull: 'engine/js/burner-full.min',
      rocketBurnerLight: 'engine/js/burner-light.min',
      rocketTouch: 'engine/js/touch.min'
   };
   var requirePathsCSS = {
      rocketBurnerFull: 'engine/css/burner-full.min.css',
      rocketBurnerLight: 'engine/css/burner-light.min.css',
   };

   // Functions
   var core = {
      addUserDefinedModules: function (modules) {
         // Catch
         if (typeof modules !== 'object') {
            return false;
         }
         // Continue
         for (var key in modules) {
            if (modules.hasOwnProperty(key)) {
               var thisModule = modules[key];
               if (typeof thisModule.css === 'string') {
                  load.cssModules.push(core.cleanPath(thisModule.css));
               }
               if (typeof thisModule.js === 'string') {
                  requirePathsJS[key] = core.cleanPath(thisModule.js);
               }
            }
         }
      },
      cleanPath: function (path) {
         // Catch
         if (typeof path !== 'string') {
            return false;
         }
         // Continue
         var ext = core.helper.getExtension(path);
         switch (ext) {
            case 'js':
               return path.substring(0, path.length - 3);
            case 'css':
               return path;
            default:
               return path;
         }
      },
      getFileLoads: function () {
         if (!cockpit) {
				return false;
			}

			// Variables
			var pageMatch = false;
			var queryString = '';
			var urlData = core.getURL();

			// Root config
			load.css = core.helper.setDefault(cockpit.css, []);
			load.js = core.helper.setDefault(cockpit.js, []);
			load.iconFont = core.helper.setDefault(cockpit.iconFont);

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
						load.iconFont = Rocket.helper.setDefault(page.iconFont, load.iconFont);
						if (page.overwrite === true) {
							// Overwrite
							load.css = core.helper.setDefault(page.css, []);
							load.js = core.helper.setDefault(page.js, []);
						} else {
							// Merge
							if (core.helper.isArray(page.css)) {
								load.css = load.css.concat(page.css);
							}
							if (core.helper.isArray(page.js)) {
								load.js = load.js.concat(page.js);
							}
						}
						break;
					}
				}
			}

			// Set the query string & paths
			if (cockpit.cache && cockpit.cache.bust) {
				queryString = '?ts=' + cockpit.cache.bust;
			}
			if (load.css.length > 0) {
				for (var i = 0, len = load.css.length; i < len; i++) {
					load.css[i] = path.css + load.css[i] + queryString;
				}
			}
			if (load.js.length > 0) {
				for (var i = 0, len = load.js.length; i < len; i++) {
					load.js[i] = path.js + load.js[i] + queryString;
				}
			}
			return true;
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
      getURL: function () {
         var windowLocation = window.location;
			var fullUrl = windowLocation.href;

			var currentUrl = fullUrl.split('#')[0];
			var host = windowLocation.host;
			var protocol = windowLocation.protocol + '//';

			var baseUrl = '';
			if (document.getElementsByTagName('base').length > 0) {
				baseUrl = document.getElementsByTagName('base')[0].href;
			} else {
				baseUrl = protocol + host;
			}

			return {
				base: baseUrl,
				current: currentUrl
			};
      },
      helper: {
         getExtension: function (file) {
   			return file.split('.').pop().toLowerCase();
   		},
         isArray: function (check) {
   			return (typeof check === 'object' && check instanceof Array) ? true : false;
   		},
         setDefault: function (setValue, defaultValue) {
   			if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
   				return false;
   			} else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
   				return setValue;
   			} else if (typeof setValue === typeof defaultValue) {
   				return setValue;
   			} else {
   				return defaultValue;
   			}
         }
   	},
      init: function () {
         core.getJSON(path.cockpit, function (error, json) {
            // Catch
				if (error) {
					throw new Error('Rocket: Not initialised because the cockpit.json file was not found.');
					return false;
				}
				// Continue
            cockpit = json;
            core.getFileLoads();
            core.addUserDefinedModules(cockpit.modules);

            // Requirejs config
            requirejs.config({
               baseUrl: requireBaseUrl,
               paths: requirePathsJS
            });

            // Require
            var autoload = (typeof cockpit.modulesAutoLoad === 'boolean') ? cockpit.modulesAutoLoad : false;
            var baseCSS = [requirePathsCSS.rocketBurnerFull];
            var baseJS = ['rocketBurnerFull'];
            if (typeof cockpit.engine === 'object' && typeof cockpit.engine.burner === 'string' && cockpit.engine.burner === 'light') {
               baseCSS = [requirePathsCSS.rocketBurnerLight];
               baseJS = ['rocketBurnerLight'];
            }

            // Auto load
            if (autoload) {
               baseCSS = baseCSS.concat(load.cssModules);
               for (var key in requirePathsJS) {
                  if (requirePathsJS.hasOwnProperty(key) && autoLoadIgnores.indexOf(key) < 0) {
                     baseJS.push(key);
                  }
               }
            }

            // Start requires
            requireCSS(baseCSS);
            require(baseJS, function () {
               // Project CSS
               if (load.css.length > 0) {
                  requireCSS(load.css);
               }
               // Project JS
               if (load.js.length < 1) {
                  core.showPage();
               } else {
                  require(load.js, function () {
                     core.showPage();
                  });
               }
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
      showPage: function () {
         if (rocketContent !== null) {
				rocketContent.removeAttribute('style');
				document.getElementById('rocket-page-loader').parentNode.removeChild(document.getElementById('rocket-page-loader'));
			} else {
				Rocket.dom.body.removeAttribute('style');
			}
			core.log('Rocket: Page show...successful');
      }
   };

   // Execute
   core.init();
})();
