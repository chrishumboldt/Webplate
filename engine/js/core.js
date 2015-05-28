/**
 * File: core.js
 * Type: Javascript core file
 * Author: Chris Humboldt
 * Last Edited: 16 May 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Yepnope
// Variables
// Function

// Yepnope
// ---------------------------------------------------------------------------------------
/*yepnope1.5.x|WTFPL*/
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


// Variables
// ---------------------------------------------------------------------------------------
var $crtScript = document.getElementById('webplate');
var $bodyElement = document.getElementsByTagName('body')[0];
var $htmlElement = document.getElementsByTagName('html')[0];
var $crtScriptSrc = $crtScript.getAttribute('src').replace('start.js', '');
var $root = $crtScriptSrc;
var $configFile = $root + 'project/config.json';
var $jsPath = $root + 'engine/js/';
var $cssPath = $root + 'engine/css/';
var $componentPath = $root + 'project/component/';
var $componentJSON = [];
var $iconFontPath = $root + 'project/icon-font/';
var $jsProjectPath = $root + 'project/js/';
var $cssProjectPath = $root + 'project/css/';
var $uiProjectPath = $root + 'project/ui/';
var $arEngineFiles = [$jsPath + 'min/script.min.js', $cssPath + 'style.css'];
var $arComponentFirstFiles = [];
var $arComponentFiles = [];
var $arExtraCSS = [];
var $arExtraJS = [];



// Functions
// ---------------------------------------------------------------------------------------
// Load JSON
function loadJSON($file, $callback) {
	var $xmlhttp = new XMLHttpRequest();
	$xmlhttp.onreadystatechange = $callback;
	$xmlhttp.open('GET', $file, true);
	$xmlhttp.send();
}

// Load project files
function loadProjectFiles($projectCSS, $projectJS) {
	// Add in project files
	for ($i = 0; $i < $projectCSS.length; $i++) {
		var $val = $projectCSS[$i];
		var $file = $val.trim();
		var $extension = web.getExtension($file);

		// Add to the array
		if ($extension == 'css') {
			$arExtraCSS.push($cssProjectPath + $file);
		}
	};
	for ($i = 0; $i < $projectJS.length; $i++) {
		var $val = $projectJS[$i];
		var $file = $val.trim();
		var $extension = web.getExtension($file);

		// Add to the array
		if ($extension == 'js') {
			$arExtraJS.push($jsProjectPath + $file);
		}
	};

	// Load
	if ($arExtraCSS.length > 0) {
		yepnope({
			load: $arExtraCSS,
			complete: function() {
				setTimeout(function() {
					yepnope({
						load: $arExtraJS
					});
					setTimeout(function() {
						$bodyElement.removeAttribute('style');
					}, 50);
				}, 50);
			}
		});
	} else if ($arExtraJS.length > 0) {
		setTimeout(function() {
			yepnope({
				load: $arExtraJS
			});
			setTimeout(function() {
				$bodyElement.removeAttribute('style');
			}, 50);
		}, 50);
	} else {
		setTimeout(function() {
			$bodyElement.removeAttribute('style');
		}, 50);
	}
}


// Load the necessary files and execute
// ---------------------------------------------------------------------------------------
yepnope([{
	load: $arEngineFiles,
	complete: function() {
		// Touch check
		if (Modernizr.touch) {
			// Load the library
			yepnope({
				load: $jsPath + 'min/touch.min.js',
				complete: function() {
					FastClick.attach(document.body);
				}
			});
		}

		// Add Webplate class
		web.idAdd($htmlElement, 'web-html');

		// Add webplate overlay
		var $webplateOverlay = document.createElement('div');
		web.idAdd($webplateOverlay, 'web-overlay');
		$bodyElement.appendChild($webplateOverlay);

		// Call Webplate functions
		web.navigation();
		web.windowType();
		web.scroll();

		// Load the config file
		$configJSON = loadJSON($configFile, function() {
			if (this.readyState == 4 && this.status == 200) {
				var $json = JSON.parse(this.responseText);

				// Variables
				$urlData = web.getUrl();

				// Root config
				$state = $json.project['state'] || 'production';
				$bodyClass = $json.project['body-class'] || false;
				$componentFirst = $json.project['component-first'] || [];
				$component = $json.project['component'] || [];
				$formColour = $json.project['form-colour'] || 'blue';
				$iconFont = $json.project['icon-font'] || false;
				$navigation = $json.project['navigation'] || false;
				$projectCSS = $json.project['css'] || [];
				$projectJS = $json.project['js'] || [];
				$ui = $json.project['ui'] || false;

				// Url base
				$urlSite = $urlData['sitePath'];
				$urlCheck = false;
				$urlPageCheck = false;

				if (($root == '') || ($root.substr(0, 3) == '../')) {
					$exRoot = $root.split('/');
					$exUrl = $urlSite.split('/');
					$urlBase = '';

					// Pop based on the root
					for ($i = 0; $i < $exRoot.length; $i++) {
						$exUrl.pop();
					};

					// Build new URL
					for ($i = 0; $i < $exUrl.length; $i++) {
						$urlBase += $exUrl[$i] + '/';
					};
				} else {
					$urlBase = $root;
				}

				// Url segments
				$urlSegments = [];
				$exSegments = $urlSite.replace($urlBase, '').split('/');
				for (var $i = 0; $i < $exSegments.length; $i++) {
					var $val = $exSegments[$i];
					if (web.exists($val) && $val !== '') {
						$urlSegments.push($val);
					}
				}

				// Page check
				if ($json.project.page) {
					for (var $i = 0; $i < $json.project.page.length; $i++) {
						// Variables
						$page = $json.project.page[$i];

						// Url page
						$urlPageSegments = [];
						$exPageSegments = $page['url'].split('/');
						$pageMatch = true;

						// Add to the segments object
						for (var $i = 0; $i < $exPageSegments.length; $i++) {
							var $val = $exPageSegments[$i];
							if (web.exists($val) && $val !== '') {
								$urlPageSegments.push($val);
							}
						}

						// Wildcard check
						if ($page['url'].indexOf('*') === -1) {
							$urlPageSegmentsLength = $urlPageSegments.length;
						} else {
							$urlPageSegmentsLength = $urlPageSegments.length - 1;
						}

						if ($urlSegments.length >= $urlPageSegmentsLength) {
							for (var $i = 0; $i < $urlSegments.length; $i++) {
								var $val = $urlSegments[$i];

								if (($urlPageSegments[$i] === '*')) {
									return false;
								} else {
									if ($val != $urlPageSegments[$i]) {
										$pageMatch = false;
									}
								}
							};
						} else {
							$pageMatch = false;
						}

						// Apply the config
						if ($pageMatch === true) {
							// Page overwrite
							$configType = $page['config-type'] || 'merge';

							if ($configType == 'new') {
								$bodyClass = $page['body-class'] || false;
								$componentFirst = $page['component-first'] || [];
								$component = $page['component'] || [];
								$formColour = $page['form-colour'] || 'blue';
								$iconFont = $page['icon-font'] || false;
								$navivation = $page['navigation'] || false;
								$projectCSS = $page['css'] || [];
								$projectJS = $page['js'] || [];
								$ui = $page['ui'] || false;
							} else {
								// Basic additions (some have to be overwritten by design)
								$bodyClass = $page['body-class'] ? $page['body-class'] : $bodyClass;
								$formColour = $page['form-colour'] ? $page['form-colour'] : $formColour;
								$iconFont = $page['form-colour'] ? $page['icon-font'] : $iconFont;
								$navivation = $page['navigation'] ? $page['navigation'] : $navigation;
								$ui = $page['ui'] ? $page['ui'] : $ui;

								// Component add
								if ($page['component-first']) {
									for (var $i = 0; $i < $page['component-first'].length; $i++) {
										var $addComponentFirst = $page['component-first'][$i];

										if ($componentFirst.indexOf($addComponentFirst) == -1) {
											$componentFirst.push($addComponentFirst);
										}
									};
								}
								if ($page['component']) {
									for (var $i = 0; $i < $page['component'].length; $i++) {
										var $addComponent = $page['component'][$i];

										if ($component.indexOf($addComponent) == -1) {
											$component.push($addComponent);
										}
									};
								}

								// Project CSS
								if ($page['css']) {
									for (var $i = 0; $i < $page['css'].length; $i++) {
										var $addProjectCSS = $page['css'][$i];
										if ($projectCSS.indexOf($addProjectCSS) === -1) {
											$projectCSS.push($addProjectCSS);
										}
									};
								}

								// Project JS
								if ($page['js']) {
									for (var $i = 0; $i < $page['js'].length; $i++) {
										var $addProjectJS = $page['js'][$i];
										if ($projectJS.indexOf($addProjectJS) === -1) {
											$projectJS.push($addProjectJS);
										}
									};
								}
							}

							// Break loop
							break;
						}
					};
				}

				// Set the body class
				if ($bodyClass !== false) {
					web.classAdd($bodyElement, $bodyClass.trim());
				}

				// Set the navigation type
				if ($navigation === false) {
					$navigation = 'web-nav-slide-from-left';
				} else {
					$navigation = 'web-nav-' + $navigation;
				}
				web.classAdd($htmlElement, $navigation);

				// Set the form colour
				$bodyElement.setAttribute('data-formplate-colour', $formColour);

				// Icon fonts
				if ($iconFont != false) {
					if ($iconFont == 'icomoon') {
						yepnope({
							load: [$iconFontPath + 'icomoon/style.css']
						});
					} else if ($iconFont == 'font-awesome') {
						yepnope({
							load: [$iconFontPath + 'font-awesome/css/font-awesome.min.css']
						});
					}
				}

				// Load UI
				if ($ui != false) {
					$arExtraCSS.push($uiProjectPath + $ui + '/style.css');
					$arExtraJS.push($uiProjectPath + $ui + '/script.min.js');
				}

				// Load the components & project files
				if ($componentFirst.length > 0) {
					for ($r = 0; $r < $componentFirst.length; $r++) {
						// Get Webplate config
						(function($r2) {
							var $val = $componentFirst[$r2++];

							$componentJSON = loadJSON($componentPath + $val + '/.bower.json', function() {
								if (this.readyState == 4 && this.status == 200) {
									var $json = JSON.parse(this.responseText);

									if (typeof $json.main == 'object') {
										for ($r = 0; $r < $json.main.length; $r++) {
											$arComponentFirstFiles.push($componentPath + $val + '/' + $json.main[$r]);
										}
									} else {
										$arComponentFirstFiles.push($componentPath + $val + '/' + $json.main);
									}

									// Load the project file
									if ($r2 == $componentFirst.length) {
										yepnope({
											load: $arComponentFirstFiles,
											complete: function() {
												if ($component.length > 0) {
													for ($i = 0; $i < $component.length; $i++) {
														// Get Webplate config
														(function($i2) {
															var $val = $component[$i2++];

															$componentJSON = loadJSON($componentPath + $val + '/.bower.json', function() {
																if (this.readyState == 4 && this.status == 200) {
																	var $json = JSON.parse(this.responseText);

																	if (typeof $json.main == 'object') {
																		for ($i = 0; $i < $json.main.length; $i++) {
																			$arComponentFiles.push($componentPath + $val + '/' + $json.main[$i]);
																		}
																	} else {
																		$arComponentFiles.push($componentPath + $val + '/' + $json.main);
																	}

																	// Load the project file
																	if ($i2 == $component.length) {
																		yepnope({
																			load: $arComponentFiles,
																			complete: function() {
																				loadProjectFiles($projectCSS, $projectJS);
																			}
																		});
																	}
																}
															});
														}($i));
													};
												} else {
													loadProjectFiles($projectCSS, $projectJS);
												}
											}
										});
									}
								}
							});
						}($r));
					};
				} else if ($component.length > 0) {
					for ($i = 0; $i < $component.length; $i++) {
						// Get Webplate config
						(function($i2) {
							var $val = $component[$i2++];

							$componentJSON = loadJSON($componentPath + $val + '/.bower.json', function() {
								if (this.readyState == 4 && this.status == 200) {
									var $json = JSON.parse(this.responseText);

									if (typeof $json.main == 'object') {
										for ($i = 0; $i < $json.main.length; $i++) {
											$arComponentFiles.push($componentPath + $val + '/' + $json.main[$i]);
										}
									} else {
										$arComponentFiles.push($componentPath + $val + '/' + $json.main);
									}

									// Load the project file
									if ($i2 == $component.length) {
										yepnope({
											load: $arComponentFiles,
											complete: function() {
												loadProjectFiles($projectCSS, $projectJS);
											}
										});
									}
								}
							});
						}($i));
					};
				} else {
					loadProjectFiles($projectCSS, $projectJS);
				}
			}
		});
	}
}]);