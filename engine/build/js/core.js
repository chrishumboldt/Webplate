/**
 * File: engine/js/core.js
 * Type: Javascript engine
 * Author: Chris Humboldt
**/

// Table of contents
// Yepnope
// Global variables
// Webplate

// Yepnope - 1.5.x|WTFPL
(function (a, b, c) {
	function d (a) {
		return '[object Function]' == o.call(a);
	}

	function e (a) {
		return 'string' == typeof a;
	}

	function f () {
	}

	function g (a) {
		return !a || 'loaded' == a || 'complete' == a || 'uninitialized' == a;
	}

	function h () {
		var a = p.shift();
		q = 1, a ? a.t ? m(function () {
			('c' == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
		}, 0) : (a(), h()) : q = 0;
	}

	function i (a, c, d, e, f, i, j) {
		function k (b) {
			if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
				'img' != a && m(function () {
					t.removeChild(l);
				}, 50);
				for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
			}
		}
		var j = j || B.errorTimeout,
			l = b.createElement(a),
			o = 0,
			r = 0,
			u = {
				t: d,
				s: c,
				e: f,
				a: i,
				x: j
			};
		1 === y[c] && (r = 1, y[c] = []), 'object' == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = '0', l.onerror = l.onload = l.onreadystatechange = function () {
			k.call(this, r);
		}, p.splice(e, 0, u), 'img' != a && (r || 2 === y[c]? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
	}

	function j (a, b, c, d, f) {
		return q = 0, b = b || 'j', e(a) ? i('c' == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this;
	}

	function k () {
		var a = B;
		return a.loader = {
			load: j,
			i: 0
		}, a;
	}
	var l = b.documentElement,
		m = a.setTimeout,
		n = b.getElementsByTagName('script')[0],
		o = {}.toString,
		p = [],
		q = 0,
		r = 'MozAppearance' in l.style,
		s = r && !!b.createRange().compareNode,
		t = s ? l : n.parentNode,
		l = a.opera && '[object Opera]' == o.call(a.opera),
		l = !!b.attachEvent && !l,
		u = r ? 'object' : l ? 'script' : 'img',
		v = l ? 'script' : u,
		w = Array.isArray || function (a) {
			return '[object Array]' == o.call(a);
		},
		x = [],
		y = {},
		z = {
			timeout: function (a, b) {
				return b.length && (a.timeout = b[0]), a;
			}
		},
		A, B;
	B = function (a) {
		function b (a) {
			var a = a.split('!'),
				b = x.length,
				c = a.pop(),
				d = a.length,
				c = {
					url: c,
					origUrl: c,
					prefixes: a
				},
				e, f, g;
			for (f = 0; f < d; f++) g = a[f].split('='), (e = z[g.shift()]) && (c = e(c, g));
			for (f = 0; f < b; f++) c = x[f](c);
			return c;
		}

		function g (a, e, f, g, h) {
			var i = b(a),
				j = i.autoCallback;
			i.url.split('.').pop().split('?').shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split('/').pop().split('?')[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url]? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && 'css' == i.url.split('.').pop().split('?').shift() ? 'c' : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
				k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
			})));
		}

		function h (a, b) {
			function c (a, c) {
				if (a) {
					if (e(a)) c || (j = function () {
							var a = [].slice.call(arguments);
							k.apply(this, a), l();
						}), g(a, j, b, 0, h);
					else if (Object(a) === a)
						for (n in m = function () {
								var b = 0,
									c;
								for (c in a) a.hasOwnProperty(c) && b++;
								return b;
							}(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
								var a = [].slice.call(arguments);
								k.apply(this, a), l();
							} : j[n] = function (a) {
								return function () {
									var b = [].slice.call(arguments);
									a && a.apply(this, b), l();
								};
							}(k[n])), g(a[n], j, b, n, h))
				} else !c && l();
			}
			var h = !!a.test,
				i = a.load || a.both,
				j = a.callback || f,
				k = j,
				l = a.complete || f,
				m, n;
			c(h ? a.yep : a.nope, !!i), i && c(i);
		}
		var i, j, l = this.yepnope.loader;
		if (e(a)) g(a, 0, l, 0);
		else if (w(a))
			for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
		else Object(a) === a && h(a, l);
	}, B.addPrefix = function (a, b) {
		z[a] = b;
	}, B.addFilter = function (a) {
		x.push(a);
	}, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = 'loading', b.addEventListener('DOMContentLoaded', A = function () {
		b.removeEventListener('DOMContentLoaded', A, 0), b.readyState = 'complete';
	}, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
		var k = b.createElement('script'),
			l, o, e = e || B.errorTimeout;
		k.src = a;
		for (o in d) k.setAttribute(o, d[o]);
		c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
			!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
		}, m(function () {
			l || (l = 1, c(1));
		}, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
	}, a.yepnope.injectCss = function (a, c, d, e, g, i) {
		var e = b.createElement('link'),
			j, c = i ? h : c || f;
		e.href = a, e.rel = 'stylesheet', e.type = 'text/css';
		for (j in d) e.setAttribute(j, d[j]);
		g || (n.parentNode.insertBefore(e, n), m(c, 0));
	};
})(this, document);

// Global variables
var webGlobal = {
	log: true
};

// Webplate
(function () {
	'use strict';

	// Variables
	var config = false;
	var pathRoot = document.getElementById('webplate').getAttribute('src').replace('start.js', '');
	var webContent = document.getElementById('webplate-content');
	// Paths
	var path = {
		engine: {
			css: pathRoot + 'engine/css/',
			js: pathRoot + 'engine/js/'
		},
		project: {
			component: pathRoot + 'project/component/',
			config: pathRoot + 'project/config.json',
			css: pathRoot + 'project/css/',
			iconFont: {
				fontAwesome: pathRoot + 'project/font-awesome/css/font-awesome.min.css',
				icoMoon: pathRoot + 'project/icomoon/style.css'
			},
			js: pathRoot + 'project/js/'
		},
		root: pathRoot
	};
	// Load
	var load = {
		engine: {
			files: [path.engine.css + 'styles.min.css', path.engine.js + 'scripts.min.js'],
			filesLight: [path.engine.css + 'styles-light.min.css', path.engine.js + 'scripts-light.min.js']
		},
		project: {
			allowedFileTypes: ['css', 'js'],
			componentsFirst: [],
			components: [],
			css: [],
			js: [],
			iconFont: false
		}
	};

	// Core
	var core = {
		activatePage: function () {
			if (webContent !== null) {
				webContent.removeAttribute('style');
				document.getElementById('web-page-loader').parentNode.removeChild(document.getElementById('web-page-loader'));
			} else {
				Web.dom.body.removeAttribute('style');
			}
			core.log('Webplate: Page show...successful');
		},
		checkProjectExtension: function (file) {
			if (load.project.allowedFileTypes.indexOf(Web.string.lowercase.all(Web.get.extension(file))) > -1) {
				return true;
			}
			return false;
		},
		log: function (text) {
			if (!window || !window.console || !config) {
				return false;
			}
			if (config.engine && typeof config.engine.log === 'boolean' && config.engine.log) {
				console.log(text);
			}
		},
		getEngineFiles: function () {
			if (config.engine && typeof config.engine.light === 'boolean' && config.engine.light) {
				return load.engine.filesLight;
			}
			return load.engine.files;
		},
		getJSON: function (url, callback) {
			var xhr = new XMLHttpRequest;
			xhr.onreadystatechange = function () {
				if (this.readyState === 4) {
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
		loadEngine: function (callback) {
			yepnope({
				load: core.getEngineFiles(),
				complete: function () {
					core.log('Webplate: Engine files load...successful');
					// Initialise injector
					Web.inject = Web.injectplateExecute();
					core.log('Webplate: Injectplate initialise...successful');

					return callback();
				}
			});
		},
		loadIconFont: function () {
			if (load.project.iconFont) {
				if (load.project.iconFont == 'icomoon') {
					yepnope({
						load: path.project.iconFont.icoMoon,
						complete: function () {
							core.log('Webplate: IcoMoon load...successful');
						}
					});
				} else if (load.project.iconFont == 'font-awesome') {
					yepnope({
						load: path.project.iconFont.fontAwesome,
						complete: function () {
							core.log('Webplate: Font awesome load...successful');
						}
					});
				}
			}
		},
		loadProject: function () {
			core.setProjectFileLoads();
			core.loadIconFont();
			if (load.project.componentsFirst.length > 0) {
				core.loadProjectComponentsFirst();
			} else if (load.project.components.length > 0) {
				core.loadProjectComponents();
			} else {
				core.loadProjectFiles();
			}
		},
		loadProjectComponent: function (component, callback) {
			core.getJSON(path.project.component + component + '/webplate.json', function (error, json) {
				// Catch
				if (error) {
					return callback(false);
				}
				// Load
				var loadFiles = [];
				if (typeof json.files === 'object') {
					for (var i = 0, len = json.files.length; i < len; i++) {
						if (core.checkProjectExtension(json.files[i])) {
						   loadFiles.push(path.project.component + component + '/' + json.files[i]);
						}
					}
				} else {
					if (core.checkProjectExtension(json.files)) {
						loadFiles.push(path.project.component + component + '/' + json.files);
					}
				}
				// Another catch
				if (loadFiles.length < 1) {
					return callback(false);
				}
				yepnope({
					load: loadFiles,
					complete: function () {
						callback(true);
					}
				});
			});
		},
		loadProjectComponents: function () {
			var loadCheck = load.project.components.length;
			for (var i = 0, len = load.project.components.length; i < len; i++) {
			   core.loadProjectComponent(load.project.components[i], function () {
					loadCheck--;
					if (loadCheck === 0) {
						core.log('Webplate: Components load...successful');
						core.loadProjectFiles();
					}
				});
			}
		},
		loadProjectComponentsFirst: function () {
			var loadCheck = load.project.componentsFirst.length;
			for (var i = 0, len = load.project.componentsFirst.length; i < len; i++) {
			   core.loadProjectComponent(load.project.componentsFirst[i], function () {
					loadCheck--;
					if (loadCheck === 0) {
						core.log('Webplate: Components first load...successful');
						if (load.project.components.length > 0) {
							core.loadProjectComponents();
						} else {
							core.loadProjectFiles();
						}
					}
				});
			}
		},
		loadProjectFiles: function () {
			// Variables
			var cssLength = load.project.css.length;
			var jsLength = load.project.js.length;
			// Catch
			if (cssLength < 1 && jsLength < 1) {
				core.activatePage();
			}
			// CSS
			if (cssLength > 0) {
				yepnope({
					load: load.project.css,
					complete: function () {
						cssLength = 0;
						core.log('Webplate: Project CSS load...successful');
						if (jsLength === 0) {
							core.activatePage();
						}
					}
				});
			}
			// JS
			if (jsLength > 0) {
				yepnope({
					load: load.project.js,
					complete: function () {
						jsLength = 0;
						core.log('Webplate: Project JS load...successful');
						if (cssLength === 0) {
							core.activatePage();
						}
					}
				});
			}
		},
		pageLoader: function () {
			if (webContent !== null) {
				var loaderDiv = document.createElement('div');
				var loaderText = 'Loading';
				var i = 0;

				webContent.style.display = 'none';

				loaderDiv.id = 'web-page-loader';
				loaderDiv.style.margin = '0px auto';
				loaderDiv.style.paddingTop = '150px';
				loaderDiv.style.color = '#ccd1d9';
				loaderDiv.style.fontSize = '20px';
				loaderDiv.style.fontFamily = 'Arial, Helvetica, sans-serif';
				loaderDiv.style.textAlign = 'center';
				document.getElementsByTagName('body')[0].appendChild(loaderDiv);
				var pageLoaderTimer = setInterval(function () {
					i++;
					if (document.getElementById('web-page-loader') !== null) {
						document.getElementById('web-page-loader').innerHTML = loaderText + new Array(i % 5).join('.');
					} else {
						clearInterval(pageLoaderTimer);
					}
				}, 300);
			}
		},
		setProjectFileLoads: function () {
			if (!config.project) {
				return false;
			}

			// Variables
			var pageMatch = false;
			var queryString = '';
			var urlData = Web.url();

			// Root config
			load.project.componentsFirst = Web.helper.setDefault(config.project.componentsFirst, []);
			load.project.components = Web.helper.setDefault(config.project.components, []);
			load.project.css = Web.helper.setDefault(config.project.css, []);
			load.project.js = Web.helper.setDefault(config.project.js, []);
			load.project.iconFont = Web.helper.setDefault(config.project.iconFont);

			// Page options
			if (config.project.page) {
				for (var i = 0, len = config.project.page.length; i < len; i++) {
				   var page = config.project.page[i];

					// Page match
					if (page.url.indexOf('*') > -1) {
						if (urlData.currentUrl.indexOf(page.url.substring(0, page.url.length - 1)) > -1) {
							pageMatch = true;
						}
					} else {
						if (urlData.currentUrl === urlData.baseUrl + page.url) {
							pageMatch = true;
						}
					}
					if (pageMatch) {
						load.project.iconFont = Web.helper.setDefault(page.iconFont, load.project.iconFont);
						if (page.overwrite === true) {
							// Overwrite
							load.project.componentsFirst = Web.helper.setDefault(page.componentsFirst, []);
							load.project.components = Web.helper.setDefault(page.components, []);
							load.project.css = Web.helper.setDefault(page.css, []);
							load.project.js = Web.helper.setDefault(page.js, []);
						} else {
							// Merge
							if (Array.isArray(page.componentsFirst)) {
								load.project.componentsFirst = load.project.componentsFirst.concat(page.componentsFirst);
							}
							if (Array.isArray(page.components)) {
								load.project.components = load.project.components.concat(page.components);
							}
							if (Array.isArray(page.css)) {
								load.project.css = load.project.css.concat(page.css);
							}
							if (Array.isArray(page.js)) {
								load.project.js = load.project.js.concat(page.js);
							}
						}
						break;
					}
				}
			}

			// Set the query string & paths
			if (config.cache && config.cache.bust) {
				queryString = '?ts=' + config.cache.bust;
			}
			if (load.project.css.length > 0) {
				for (var i = 0, len = load.project.css.length; i < len; i++) {
					load.project.css[i] = path.project.css + load.project.css[i] + queryString;
				}
			}
			if (load.project.js.length > 0) {
				for (var i = 0, len = load.project.js.length; i < len; i++) {
					load.project.js[i] = path.project.js + load.project.js[i] + queryString;
				}
			}
			return true;
		},
		init: function () {
			core.pageLoader();
			core.getJSON(path.project.config, function (error, json) {
				// Error catch
				if (error) {
					core.log('Webplate: Not initialised because the project config file was not found.');
					return false;
				}
				// Set the config variable
				config = json;
				// Set some globals
				if (config.project && typeof config.project.log === 'boolean') {
					webGlobal.log = config.project.log;
				};
				// Load engine first
				core.loadEngine(function () {
					// Load the project files
					core.loadProject();
				});
			});
		}
	};

	// Execute
	core.init();
})();
