/**
 * Author: Chris Humboldt
**/

'use strict';

/*
Rocket require
This module is baked directly into Rocket as it is a requirement.
The same is true for the Rocket Tools.
*/
Rocket.defaults.require = {
    errors: true,
    rootPath: './node_modules/'
};
var RockMod_Module;
(function (RockMod_Module) {
    var listModules = {};
    var moduleMethods = {
        add: function (obj) {
            if (!Rocket.is.object(obj)) {
                return false;
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (validate.module(key, obj[key])) {
                        listModules[key] = {
                            loaded: false,
                            loading: false
                        };
                        if (Rocket.is.string(obj[key].css) || Rocket.is.array(obj[key].css)) {
                            listModules[key].css = moduleMethods.sanitisePaths(obj[key].css);
                        }
                        if (Rocket.is.string(obj[key].js) || Rocket.is.array(obj[key].js)) {
                            listModules[key].js = moduleMethods.sanitisePaths(obj[key].js);
                        }
                        if (Rocket.is.array(obj[key].requires)) {
                            listModules[key].requires = obj[key].requires;
                        }
                    }
                }
            }
        },
        dependencies: function (name) {
            if (!Rocket.is.string(name)) {
                return false;
            }
            var dependencies = [];
            function checkModule(name) {
                if (moduleMethods.exists(name)) {
                    dependencies.push(name);
                    var thisModule = listModules[name];
                    if (Rocket.is.array(thisModule.requires)) {
                        for (var _i = 0, _a = thisModule.requires; _i < _a.length; _i++) {
                            var moduleName = _a[_i];
                            if (dependencies.indexOf(moduleName) > -1) {
                                if (Rocket.defaults.require.errors) {
                                    throw new Error('ROCKET REQUIRE: You have a dependency loop with module: ' + name);
                                }
                                else {
                                    return false;
                                }
                            }
                            checkModule(moduleName);
                        }
                    }
                }
            }
            ;
            checkModule(name);
            return dependencies;
        },
        exists: function (name) {
            if (!Rocket.is.string(name)) {
                return false;
            }
            return Rocket.exists(listModules[name]);
        },
        get: function (name) {
            if (!Rocket.is.string(name)) {
                return false;
            }
            return listModules[name];
        },
        isLoaded: function (name) {
            if (!Rocket.is.string(name)) {
                return false;
            }
            var thisModule = listModules[name];
            return (Rocket.is.object(thisModule)) ? thisModule.loaded : false;
        },
        isLoading: function (name) {
            if (!Rocket.is.string(name)) {
                return false;
            }
            var thisModule = listModules[name];
            return (Rocket.is.object(thisModule)) ? thisModule.loading : false;
        },
        listLoaded: function () {
            var listLoaded = [];
            for (var key in listModules) {
                if (listModules.hasOwnProperty(key) && listModules[key].loaded) {
                    listLoaded.push(key);
                }
            }
            return listLoaded;
        },
        remove: function (name) {
            if (!Rocket.is.string(name) || !Rocket.exists(listModules[name])) {
                return false;
            }
            delete listModules[name];
        },
        sanitisePaths: function (paths) {
            if (Rocket.is.string(paths)) {
                paths = [paths];
            }
            for (var len = paths.length, i = 0; i < len; i++) {
                paths[i] = paths[i].replace(/~\//g, Rocket.defaults.require.rootPath);
            }
            return paths;
        }
    };
    var validate = {
        module: function (name, obj) {
            var hasCSS = false;
            var hasJS = false;
            var hasRequires = false;
            if (!Rocket.is.string(name)) {
                return false;
            }
            if (!Rocket.is.object(obj)) {
                return false;
            }
            if (!Rocket.exists(obj.css) && !Rocket.exists(obj.js)) {
                return false;
            }
            if ((Rocket.is.string(obj.css) || Rocket.is.array(obj.css) && obj.css.length > 0)) {
                hasCSS = true;
            }
            if ((Rocket.is.string(obj.js) || Rocket.is.array(obj.js) && obj.js.length > 0)) {
                hasJS = true;
            }
            if (Rocket.is.array(obj.requires) && obj.requires.length > 0) {
                hasRequires = true;
            }
            if (!hasCSS && !hasJS && !hasRequires) {
                return false;
            }
            return true;
        }
    };
    RockMod_Module.add = moduleMethods.add;
    RockMod_Module.exists = moduleMethods.exists;
    RockMod_Module.get = moduleMethods.get;
    RockMod_Module.isLoaded = moduleMethods.isLoaded;
    RockMod_Module.isLoading = moduleMethods.isLoading;
    RockMod_Module.dependencies = moduleMethods.dependencies;
    RockMod_Module.list = listModules;
    RockMod_Module.loaded = moduleMethods.listLoaded;
    RockMod_Module.remove = moduleMethods.remove;
})(RockMod_Module || (RockMod_Module = {}));
var RockMod_Require;
(function (RockMod_Require) {
    function loadFile(file, callback, customRootPath) {
        var theInclude;
        var type;
        var rootUrl = (Rocket.is.string(customRootPath)) ? customRootPath : '';
        var filePath = (Rocket.is.url(file)) ? file : rootUrl + file;
        if (/(.css)$/.test(file)) {
            type = 'css';
            theInclude = document.createElement('link');
            theInclude.rel = 'stylesheet';
            theInclude.href = filePath;
        }
        else if (/(.js)$/.test(file)) {
            type = 'js';
            theInclude = document.createElement('script');
            theInclude.setAttribute('async', true);
            theInclude.src = filePath;
        }
        theInclude.onload = function () {
            if (type !== 'js' && Object.hasOwnProperty.call(window, "ActiveXObject") && !window['ActiveXObject']) {
                if (Rocket.is.function(callback)) {
                    return callback(false);
                }
            }
            if (Rocket.is.function(callback)) {
                return callback(true);
            }
        };
        theInclude.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                this.onreadystatechange = null;
                if (type === 'js' && Rocket.is.function(callback)) {
                    return callback(false);
                }
                if (Rocket.is.function(callback)) {
                    return callback(true);
                }
            }
        };
        theInclude.onerror = function () {
            if (Rocket.is.function(callback)) {
                return callback(false);
            }
        };
        document.getElementsByTagName('head')[0].appendChild(theInclude);
    }
    function loadModuleFiles(thisModule, callback) {
        var count = 0;
        var files = [];
        if (Rocket.is.string(thisModule.css)) {
            files.push(thisModule.css);
        }
        else if (Rocket.is.array(thisModule.css) && thisModule.css.length > 0) {
            files = files.concat(thisModule.css);
        }
        if (Rocket.is.string(thisModule.js)) {
            files.push(thisModule.js);
        }
        else if (Rocket.is.array(thisModule.js) && thisModule.js.length > 0) {
            files = files.concat(thisModule.js);
        }
        count = files.length;
        if (count < 1) {
            return callback();
        }
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            loadFile(file, function (response) {
                count--;
                if (count === 0) {
                    thisModule.loaded = true;
                    return callback();
                }
            }, false);
        }
    }
    var Require = (function () {
        function Require() {
            this.modules = [];
        }
        Require.prototype.add = function (name) {
            if (!Rocket.is.string(name)
                || !Rocket.module.exists(name)
                || Rocket.module.isLoaded(name)
                || this.modules.indexOf(name) > -1) {
                return false;
            }
            this.modules = this.modules.concat(Rocket.module.dependencies(name));
            this.modules = Rocket.array.unique(this.modules);
        };
        Require.prototype.load = function (callback) {
            var self = this;
            function loadExecute() {
                loadModules(self.modules, function () {
                    self.modules = [];
                    if (Rocket.is.function(callback)) {
                        return callback();
                    }
                });
            }
            function loadModule(name, callback) {
                if (!Rocket.module.exists(name)) {
                    if (Rocket.defaults.require.errors) {
                        throw new Error('ROCKET REQUIRE: You are missing a required module: ' + name);
                    }
                }
                else {
                    var thisModule_1 = Rocket.module.get(name);
                    if (thisModule_1.loaded || thisModule_1.loading) {
                        if (thisModule_1.loaded) {
                            return callback();
                        }
                        else {
                            var modIntervalCheck_1 = setInterval(function () {
                                if (thisModule_1.loaded) {
                                    clearInterval(modIntervalCheck_1);
                                    return callback();
                                }
                            }, 10);
                        }
                    }
                    else {
                        var dependencies = (Rocket.is.array(thisModule_1.requires) && thisModule_1.requires.length > 0) ? thisModule_1.requires : false;
                        thisModule_1.loading = true;
                        if (!dependencies) {
                            return loadModuleFiles(thisModule_1, callback);
                        }
                        else {
                            loadModules(dependencies, function () {
                                return loadModuleFiles(thisModule_1, callback);
                            });
                        }
                    }
                }
            }
            function loadModules(modules, callback) {
                var count = modules.length;
                for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
                    var thisModule = modules_1[_i];
                    loadModule(thisModule, function () {
                        count--;
                        if (count === 0) {
                            return callback();
                        }
                    });
                }
            }
            loadExecute();
        };
        return Require;
    }());
    RockMod_Require.newRequire = Require;
    RockMod_Require.load = loadFile;
})(RockMod_Require || (RockMod_Require = {}));
Rocket.module = RockMod_Module;
Rocket.require = function () {
    return new RockMod_Require.newRequire;
};

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
