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
    var allowedFileTypes = ['css', 'js'];
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
        fadeOut: function (obj) {
            var fadeElm = Rocket.dom.element(obj.targets);
            fadeElm.style.opacity = 1;
            var fadeEffect = setInterval(function () {
                if (fadeElm.style.opacity < 0.01) {
                    clearInterval(fadeEffect);
                }
                else {
                    fadeElm.style.opacity -= 0.01;
                }
            }, (obj.duration / 100));
        },
        load: {
            modules: function (callback) {
                var rootModules = [];
                // Prefined modules
                if (Rocket.is.object(cockpit.engine) && Rocket.is.boolean(cockpit.engine.light) && cockpit.engine.light === true) {
                    rootModules.push('rocketLight');
                }
                else {
                    rootModules.push('rocket');
                }
                // Touch inclusion
                if (Modernizr.touchevents) {
                    rootModules.push('fastclick');
                }
                // Load other modules
                var main = {
                    css: Rocket.helper.setDefault(cockpit.main.css, []),
                    js: Rocket.helper.setDefault(cockpit.main.js, [])
                };
                var iconFont = Rocket.helper.setDefault(cockpit.main.iconFont, '');
                var load = Rocket.helper.setDefault(cockpit.main.load, []);
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
                        }
                        else {
                            if (urlData.current === urlData.base + page.url) {
                                pageMatch = true;
                            }
                        }
                        if (pageMatch) {
                            if (page.extend === true) {
                                iconFont = Rocket.helper.setDefault(page.iconFont, iconFont);
                                if (page.load) {
                                    load = main.load.concat(page.load);
                                }
                                if (page.css) {
                                    main.css = main.css.concat(page.css);
                                }
                                if (page.js) {
                                    main.js = main.js.concat(page.js);
                                }
                            }
                            else {
                                iconFont = Rocket.helper.setDefault(page.iconFont, '');
                                load = Rocket.helper.setDefault(page.load, []);
                                main.css = Rocket.helper.setDefault(page.css, []);
                                main.js = Rocket.helper.setDefault(page.js, []);
                            }
                        }
                    }
                }
                // Fix the paths
                for (var i = 0, len = main.css.length; i < len; i++) {
                    if (main.css[i].substring(0, 4) !== 'http') {
                        main.css[i] = path.css + main.css[i];
                    }
                }
                for (var i = 0, len = main.js.length; i < len; i++) {
                    main.js[i] = path.js + main.js[i];
                }
                // Add to root and main modules
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
                main.requires = rootModules;
                Rocket.module.add({
                    rocketLaunch: main
                });
                // Require
                core.log('Rocket: Modules load...started');
                var require = Rocket.require();
                require.add('rocketLaunch');
                require.load(callback);
            }
        },
        getJSON: function (url, callback) {
            var xhr = new XMLHttpRequest;
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    // The "0" state is for Cordova as this a success response. Super dumb!
                    if (this.status === 0 || (this.status >= 200 && this.status < 300)) {
                        return callback(false, JSON.parse(this.responseText));
                    }
                    else {
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
                if (error)
                    throw new Error('Rocket: Not initialised because the cockpit.json file was not found.');
                // Continue
                cockpit = json;
                // Set loads
                if (cockpit.modules) {
                    Rocket.module.add(cockpit.modules);
                }
                // Load modules
                if (rocketContent !== null) {
                    rocketContent.removeAttribute('style');
                }
                core.load.modules(function () {
                    core.log('Rocket: Modules load...successful');
                    core.showPage();
                });
            });
        },
        log: function (text) {
            if (!window || !window.console || !cockpit)
                return false;
            if (cockpit.engine && typeof cockpit.engine.log === 'boolean' && cockpit.engine.log)
                console.log(text);
        },
        pageLoader: function () {
            if (rocketContent !== null) {
                // Loader CSS
                var loaderCSS = "\n            #rocket-page-loader-container{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#fff;z-index:10000}#rocket-page-loader{position:relative;margin:0 auto;margin-top:150px;width:150px;height:3px;background-color:#ccd1d9;overflow:hidden}#rocket-page-loader-slider{position:relative;left:-50px;width:50px;height:3px;background-color:#3498db;-webkit-animation-name:\"rocket-page-loader-slider\";-moz-animation-name:\"rocket-page-loader-slider\";-ms-animation-name:\"rocket-page-loader-slider\";animation-name:\"rocket-page-loader-slider\";-webkit-animation-duration:.7s;-moz-animation-duration:.7s;-ms-animation-duration:.7s;animation-duration:.7s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:alternate;-moz-animation-direction:alternate;-ms-animation-direction:alternate;animation-direction:alternate}@-webkit-keyframes rocket-page-loader-slider{0%{left:-45px}100%{left:145px}}@-moz-keyframes rocket-page-loader-slider{0%{left:-45px}100%{left:145px}}@keyframes rocket-page-loader-slider{0%{left:-45px}100%{left:145px}}\n            ";
                var loaderStyleTag = document.createElement('style');
                loaderStyleTag.id = 'rocket-page-loader-style-tag';
                loaderStyleTag.type = 'text/css';
                if (loaderStyleTag.styleSheet) {
                    loaderStyleTag.styleSheet.cssText = loaderCSS.trim();
                }
                else {
                    loaderStyleTag.appendChild(document.createTextNode(loaderCSS.trim()));
                }
                document.getElementsByTagName('head')[0].appendChild(loaderStyleTag);
                // Loader elements
                var loaderContainer = document.createElement('div');
                var loaderDiv = document.createElement('div');
                var loaderSlider = document.createElement('div');
                loaderContainer.id = 'rocket-page-loader-container';
                loaderDiv.id = 'rocket-page-loader';
                loaderSlider.id = 'rocket-page-loader-slider';
                loaderDiv.appendChild(loaderSlider);
                loaderContainer.appendChild(loaderDiv);
                document.getElementsByTagName('body')[0].appendChild(loaderContainer);
            }
        },
        showPage: function () {
            if (rocketContent !== null) {
                setTimeout(function () {
                    core.fadeOut({
                        targets: '#rocket-page-loader-container',
                        duration: 500
                    });
                    setTimeout(function () {
                        Rocket.dom.remove('#rocket-page-loader-container');
                        Rocket.dom.remove('#rocket-page-loader-style-tag');
                        core.log('Rocket: Page show...successful');
                    }, 501);
                }, 350);
            }
            else {
                Rocket.dom.body.removeAttribute('style');
                core.log('Rocket: Page show...successful');
            }
        }
    };
    // Execute
    core.init();
})();
