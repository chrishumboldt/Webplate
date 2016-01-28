/**
 * File: engine/js/core.js
 * Type: Javascript engine
 * Author: Chris Humboldt
 */

// Table of contents
// Yepnope
// Webplate

// Yepnope - 1.5.x|WTFPL
(function(a, b, c) {
	function d(a) {
		return "[object Function]" == o.call(a)
	}

	function e(a) {
		return "string" == typeof a
	}

	function f() {}

	function g(a) {
		return !a || "loaded" == a || "complete" == a || "uninitialized" == a
	}

	function h() {
		var a = p.shift();
		q = 1, a ? a.t ? m(function() {
			("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
		}, 0) : (a(), h()) : q = 0
	}

	function i(a, c, d, e, f, i, j) {
		function k(b) {
			if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
				"img" != a && m(function() {
					t.removeChild(l)
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
		1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
			k.call(this, r)
		}, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
	}

	function j(a, b, c, d, f) {
		return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
	}

	function k() {
		var a = B;
		return a.loader = {
			load: j,
			i: 0
		}, a
	}
	var l = b.documentElement,
		m = a.setTimeout,
		n = b.getElementsByTagName("script")[0],
		o = {}.toString,
		p = [],
		q = 0,
		r = "MozAppearance" in l.style,
		s = r && !!b.createRange().compareNode,
		t = s ? l : n.parentNode,
		l = a.opera && "[object Opera]" == o.call(a.opera),
		l = !!b.attachEvent && !l,
		u = r ? "object" : l ? "script" : "img",
		v = l ? "script" : u,
		w = Array.isArray || function(a) {
			return "[object Array]" == o.call(a)
		},
		x = [],
		y = {},
		z = {
			timeout: function(a, b) {
				return b.length && (a.timeout = b[0]), a
			}
		},
		A, B;
	B = function(a) {
		function b(a) {
			var a = a.split("!"),
				b = x.length,
				c = a.pop(),
				d = a.length,
				c = {
					url: c,
					origUrl: c,
					prefixes: a
				},
				e, f, g;
			for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
			for (f = 0; f < b; f++) c = x[f](c);
			return c
		}

		function g(a, e, f, g, h) {
			var i = b(a),
				j = i.autoCallback;
			i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
				k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
			})))
		}

		function h(a, b) {
			function c(a, c) {
				if (a) {
					if (e(a)) c || (j = function() {
						var a = [].slice.call(arguments);
						k.apply(this, a), l()
					}), g(a, j, b, 0, h);
					else if (Object(a) === a)
						for (n in m = function() {
								var b = 0,
									c;
								for (c in a) a.hasOwnProperty(c) && b++;
								return b
							}(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
							var a = [].slice.call(arguments);
							k.apply(this, a), l()
						} : j[n] = function(a) {
							return function() {
								var b = [].slice.call(arguments);
								a && a.apply(this, b), l()
							}
						}(k[n])), g(a[n], j, b, n, h))
				} else !c && l()
			}
			var h = !!a.test,
				i = a.load || a.both,
				j = a.callback || f,
				k = j,
				l = a.complete || f,
				m, n;
			c(h ? a.yep : a.nope, !!i), i && c(i)
		}
		var i, j, l = this.yepnope.loader;
		if (e(a)) g(a, 0, l, 0);
		else if (w(a))
			for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
		else Object(a) === a && h(a, l)
	}, B.addPrefix = function(a, b) {
		z[a] = b
	}, B.addFilter = function(a) {
		x.push(a)
	}, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
		b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
	}, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
		var k = b.createElement("script"),
			l, o, e = e || B.errorTimeout;
		k.src = a;
		for (o in d) k.setAttribute(o, d[o]);
		c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
			!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
		}, m(function() {
			l || (l = 1, c(1))
		}, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
	}, a.yepnope.injectCss = function(a, c, d, e, g, i) {
		var e = b.createElement("link"),
			j, c = i ? h : c || f;
		e.href = a, e.rel = "stylesheet", e.type = "text/css";
		for (j in d) e.setAttribute(j, d[j]);
		g || (n.parentNode.insertBefore(e, n), m(c, 0))
	}
})(this, document);

// Webplate
(function() {
	'use strict';

	// Variables
	var $webContent = document.getElementById('webplate-content');
	var $pathRoot = document.getElementById('webplate').getAttribute('src').replace('start.js', '');
	var $pathEngine = $pathRoot + 'engine/';
	var $pathProject = $pathRoot + 'project/';
	var $path = {
		component: $pathProject + 'component/',
		config: $pathProject + 'config.json',
		engine: {
			css: $pathEngine + 'css/',
			js: $pathEngine + 'js/'
		},
		project: {
			css: $pathProject + 'css/',
			iconFont: {
				fontAwesome: $pathProject + 'icon-font/font-awesome/css/font-awesome.min.css',
				icoMoon: $pathProject + 'icon-font/icomoon/style.css'
			},
			js: $pathProject + 'js/',
			ui: $pathProject + 'ui/'
		},
		root: $pathRoot
	};

	var $arComponentFirstFiles = [];
	var $arComponentFiles = [];
	var $arExtraCSS = [];
	var $arExtraJS = [];
	var $engineFiles = [$path.engine.js + 'scripts.min.js', $path.engine.css + 'styles.css'];

	// Attach loader
	if ($webContent !== null) {
		var $loaderDiv = document.createElement('div');
		var $loaderText = 'Loading';
		var $i = 0;

		$webContent.style.display = 'none';

		$loaderDiv.id = 'web-page-loader';
		$loaderDiv.style.width = '140px';
		$loaderDiv.style.margin = '0px auto';
		$loaderDiv.style.paddingLeft = '38px';
		$loaderDiv.style.paddingTop = '150px';
		$loaderDiv.style.color = '#ccd1d9';
		$loaderDiv.style.fontSize = '20px';
		$loaderDiv.style.fontFamily = 'Arial, Helvetica, sans-serif';
		document.getElementsByTagName('body')[0].appendChild($loaderDiv);
		var $pageLoaderTimer = setInterval(function() {
			$i++;
			if (document.getElementById('web-page-loader') !== null) {
				document.getElementById('web-page-loader').innerHTML = $loaderText + new Array($i % 5).join('.');
			} else {
				clearInterval($pageLoaderTimer);
			}
		}, 500);
	}

	// Core
	var core = {
		init: function() {
			yepnope([{
				load: $engineFiles,
				complete: function() {
					// Touch inclusion
					if (Modernizr.touchevents) {
						yepnope({
							load: $path.engine.js + 'touch.min.js',
							complete: function() {
								if ('addEventListener' in document) {
									document.addEventListener('DOMContentLoaded', function() {
										FastClick.attach(document.body);
									}, false);
								}
							}
						});
					}

					// Call webplate functions
					web.overlayAdd();
					web.scrollWatch();
					web.windowWatch();

					// Load config
					var $urlData = web.url();
					core.loadJSON($path.config, function() {
						if (this.readyState == 4 && this.status == 200) {
							var $responseText = this.responseText;
							var $json = JSON.parse($responseText);
							var $pageMatch = false;

							// Root config
							var $bodyClass = $json.project['body-class'] || false;
							var $componentFirst = $json.project['component-first'] || [];
							var $component = $json.project['component'] || [];
							var $formColour = $json.project['form-colour'] || 'blue';
							var $iconFont = $json.project['icon-font'] || false;
							var $projectCSS = $json.project['css'] || [];
							var $projectJS = $json.project['js'] || [];
							var $ui = $json.project['ui'] || false;

							// Page check
							if ($json.project.page) {
								for (var $i = $json.project.page.length - 1; $i >= 0; $i--) {
									var $page = $json.project.page[$i];

									// Wildcard check
									if ($page['url'].indexOf('*') > -1) {
										if ($urlData.currentUrl.indexOf($page['url'].substring(0, $page['url'].length - 1)) > -1) {
											$pageMatch = true;
										}
									} else {
										if ($urlData.currentUrl === $urlData.baseUrl + $page['url']) {
											$pageMatch = true;
										}
									}
									if ($pageMatch === true) {
										// Page overwrite
										var $configType = $page['config-type'] || 'merge';

										if ($configType == 'new') {
											$bodyClass = $page['body-class'] || false;
											$componentFirst = $page['component-first'] || [];
											$component = $page['component'] || [];
											$formColour = $page['form-colour'] || 'blue';
											$iconFont = $page['icon-font'] || false;
											$projectCSS = $page['css'] || [];
											$projectJS = $page['js'] || [];
											$ui = $page['ui'] || false;
										} else {
											// Basic additions (some have to be overwritten by design)
											$bodyClass = $page['body-class'] ? $page['body-class'] : $bodyClass;
											$formColour = $page['form-colour'] ? $page['form-colour'] : $formColour;
											$iconFont = $page['form-colour'] ? $page['icon-font'] : $iconFont;
											$ui = $page['ui'] ? $page['ui'] : $ui;

											// Component add
											if ($page['component-first']) {
												for (var $i = 0, $len = $page['component-first'].length; $i < $len; $i++) {
													var $addComponentFirst = $page['component-first'][$i];

													if ($componentFirst.indexOf($addComponentFirst) == -1) {
														$componentFirst.push($addComponentFirst);
													}
												};
											}
											if ($page['component']) {
												for (var $i = 0, $len = $page['component'].length; $i < $len; $i++) {
													var $addComponent = $page['component'][$i];

													if ($component.indexOf($addComponent) == -1) {
														$component.push($addComponent);
													}
												};
											}

											// Project CSS
											if ($page['css']) {
												for (var $i = 0, $len = $page['css'].length; $i < $len; $i++) {
													var $addProjectCSS = $page['css'][$i];
													if ($projectCSS.indexOf($addProjectCSS) === -1) {
														$projectCSS.push($addProjectCSS);
													}
												};
											}

											// Project JS
											if ($page['js']) {
												for (var $i = 0, $len = $page['js'].length; $i < $len; $i++) {
													var $addProjectJS = $page['js'][$i];
													if ($projectJS.indexOf($addProjectJS) === -1) {
														$projectJS.push($addProjectJS);
													}
												};
											}
										}
										break;
									}
								};
							}

							// Set the body class
							if ($bodyClass !== false) {
								web.classAdd(web.element.body, $bodyClass.trim());
							}

							// Form colour
							if ($responseText.indexOf('formplate') > -1) {
								web.element.body.setAttribute('data-formplate-colour', $formColour);
							}

							// Icon fonts
							if ($iconFont == 'icomoon') {
								yepnope({
									load: $path.project.iconFont.icoMoon
								});
							} else if ($iconFont == 'font-awesome') {
								yepnope({
									load: $path.project.iconFont.fontAwesome
								});
							}

							// Load UI
							if ($ui != false) {
								$arExtraCSS.push($path.project.ui + $ui + '/style.css');
								$arExtraJS.push($path.project.ui + $ui + '/script.min.js');
							}

							// Load the components & project files
							if ($componentFirst.length > 0) {
								core.loadComponentsFirst($componentFirst, $component, $projectCSS, $projectJS);
							} else if ($component.length > 0) {
								core.loadComponents($component, $projectCSS, $projectJS);
							} else {
								core.loadProjectFiles($projectCSS, $projectJS);
							}
						};
					});
				}
			}]);
		},
		loadComponents: function($component, $projectCSS, $projectJS) {
			for (var $i = 0, $len = $component.length; $i < $len; $i++) {
				(function($i2) {
					var $val = $component[$i2++];

					core.loadJSON($path.component + $val + '/.bower.json', function() {
						if (this.readyState == 4 && this.status == 200) {
							var $json = JSON.parse(this.responseText);

							if (typeof $json.main == 'object') {
								for ($i = 0; $i < $json.main.length; $i++) {
									$arComponentFiles.push($path.component + $val + '/' + $json.main[$i]);
								}
							} else {
								$arComponentFiles.push($path.component + $val + '/' + $json.main);
							}

							// Load the project file
							if ($i2 == $component.length) {
								yepnope({
									load: $arComponentFiles,
									complete: function() {
										core.loadProjectFiles($projectCSS, $projectJS);
									}
								});
							}
						}
					});
				}($i));
			};
		},
		loadComponentsFirst: function($componentFirst, $component, $projectCSS, $projectJS) {
			for (var $r = 0, $len = $componentFirst.length; $r < $len; $r++) {
				(function($r2) {
					var $val = $componentFirst[$r2++];

					core.loadJSON($path.component + $val + '/.bower.json', function() {
						if (this.readyState == 4 && this.status == 200) {
							var $json = JSON.parse(this.responseText);

							if (typeof $json.main == 'object') {
								for (var $r = 0, $len = $json.main.length; $r < $len; $r++) {
									$arComponentFirstFiles.push($path.component + $val + '/' + $json.main[$r]);
								}
							} else {
								$arComponentFirstFiles.push($path.component + $val + '/' + $json.main);
							}

							if ($r2 == $componentFirst.length) {
								yepnope({
									load: $arComponentFirstFiles,
									complete: function() {
										if ($component.length > 0) {
											core.loadComponents($component, $projectCSS, $projectJS);
										} else {
											core.loadProjectFiles($projectCSS, $projectJS);
										}
									}
								});
							}
						}
					});
				}($r));
			};
		},
		loadJSON: function($file, $callback) {
			var $xmlhttp = new XMLHttpRequest();
			$xmlhttp.onreadystatechange = $callback;
			$xmlhttp.open('GET', $file, true);
			$xmlhttp.send();
		},
		loadProjectFiles: function($css, $js) {
			for (var $i = 0, $len = $css.length; $i < $len; $i++) {
				var $file = $css[$i].trim();
				if (web.getExtension($file) === 'css') {
					$arExtraCSS.push($path.project.css + $file);
				}
			};
			for ($i = 0; $i < $js.length; $i++) {
				var $file = $js[$i].trim();
				if (web.getExtension($file) === 'js') {
					if ($i === 0) {
						$arExtraJS.push($path.engine.js + 'overwrite.min.js');
					}
					$arExtraJS.push($path.project.js + $file);
				}
			};
			if ($arExtraCSS.length > 0) {
				yepnope({
					load: $arExtraCSS,
					complete: function() {
						if ($webContent !== null) {
							$webContent.removeAttribute('style');
							document.getElementById('web-page-loader').parentNode.removeChild(document.getElementById('web-page-loader'));
						} else {
							web.element.body.removeAttribute('style');
						}
						setTimeout(function() {
							yepnope({
								load: $arExtraJS
							});
						}, 50);
					}
				});
			} else if ($arExtraJS.length > 0) {
				if ($webContent !== null) {
					$webContent.removeAttribute('style');
					document.getElementById('web-page-loader').parentNode.removeChild(document.getElementById('web-page-loader'));
				} else {
					web.element.body.removeAttribute('style');
				}
				setTimeout(function() {
					yepnope({
						load: $arExtraJS
					});
				}, 50);
			} else {
				if ($webContent !== null) {
					$webContent.removeAttribute('style');
					document.getElementById('web-page-loader').parentNode.removeChild(document.getElementById('web-page-loader'));
				} else {
					web.element.body.removeAttribute('style');
				}
			}
		}
	};

	// Initialize core
	core.init();
})();