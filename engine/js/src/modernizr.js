/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-applicationcache-audio-canvas-cssanimations-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvminunit-cssvwunit-filereader-flexbox-geolocation-history-input-inputtypes-localstorage-mediaqueries-svg-touchevents-video-websqldatabase-addtest-domprefixes-hasevent-mq-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
! function(e, t, n) {
	function r(e, t) {
		return typeof e === t
	}

	function o() {
		var e, t, n, o, i, a, s;
		for (var l in S)
			if (S.hasOwnProperty(l)) {
				if (e = [], t = S[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
					for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
				for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) a = e[i], s = a.split("."), 1 === s.length ? Modernizr[s[0]] = o : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), Modernizr[s[0]][s[1]] = o), C.push((o ? "" : "no-") + s.join("-"))
			}
	}

	function i(e) {
		var t = T.className,
			n = Modernizr._config.classPrefix || "";
		if (E && (t = t.baseVal), Modernizr._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
			t = t.replace(r, "$1" + n + "js$2")
		}
		Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), E ? T.className.baseVal = t : T.className = t)
	}

	function a(e, t) {
		if ("object" == typeof e)
			for (var n in e) z(e, n) && a(n, e[n]);
		else {
			e = e.toLowerCase();
			var r = e.split("."),
				o = Modernizr[r[0]];
			if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
			t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
		}
		return Modernizr
	}

	function s() {
		return "function" != typeof t.createElement ? t.createElement(arguments[0]) : E ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
	}

	function l(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
			return t + n.toUpperCase()
		}).replace(/^-/, "")
	}

	function c(e, t) {
		return e - 1 === t || e === t || e + 1 === t
	}

	function u() {
		var e = t.body;
		return e || (e = s(E ? "svg" : "body"), e.fake = !0), e
	}

	function d(e, n, r, o) {
		var i, a, l, c, d = "modernizr",
			f = s("div"),
			p = u();
		if (parseInt(r, 10))
			for (; r--;) l = s("div"), l.id = o ? o[r] : d + (r + 1), f.appendChild(l);
		return i = s("style"), i.type = "text/css", i.id = "s" + d, (p.fake ? p : f).appendChild(i), p.appendChild(f), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), f.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = T.style.overflow, T.style.overflow = "hidden", T.appendChild(p)), a = n(f, e), p.fake ? (p.parentNode.removeChild(p), T.style.overflow = c, T.offsetHeight) : f.parentNode.removeChild(f), !!a
	}

	function f(e, t) {
		return !!~("" + e).indexOf(t)
	}

	function p(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}

	function m(e, t, n) {
		var o;
		for (var i in e)
			if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? p(o, n || t) : o);
		return !1
	}

	function h(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return "-" + t.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}

	function v(t, r) {
		var o = t.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; o--;)
				if (e.CSS.supports(h(t[o]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; o--;) i.push("(" + h(t[o]) + ":" + r + ")");
			return i = i.join(" or "), d("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == getComputedStyle(e, null).position
			})
		}
		return n
	}

	function g(e, t, o, i) {
		function a() {
			u && (delete H.style, delete H.modElem)
		}
		if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
			var c = v(e, o);
			if (!r(c, "undefined")) return c
		}
		for (var u, d, p, m, h, g = ["modernizr", "tspan"]; !H.style;) u = !0, H.modElem = s(g.shift()), H.style = H.modElem.style;
		for (p = e.length, d = 0; p > d; d++)
			if (m = e[d], h = H.style[m], f(m, "-") && (m = l(m)), H.style[m] !== n) {
				if (i || r(o, "undefined")) return a(), "pfx" == t ? m : !0;
				try {
					H.style[m] = o
				} catch (y) {}
				if (H.style[m] != h) return a(), "pfx" == t ? m : !0
			}
		return a(), !1
	}

	function y(e, t, n, o, i) {
		var a = e.charAt(0).toUpperCase() + e.slice(1),
			s = (e + " " + D.join(a + " ") + a).split(" ");
		return r(t, "string") || r(t, "undefined") ? g(s, t, o, i) : (s = (e + " " + P.join(a + " ") + a).split(" "), m(s, t, n))
	}

	function w(e, t, r) {
		return y(e, n, n, t, r)
	}
	var C = [],
		S = [],
		b = {
			_version: "3.3.1",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, t) {
				var n = this;
				setTimeout(function() {
					t(n[e])
				}, 0)
			},
			addTest: function(e, t, n) {
				S.push({
					name: e,
					fn: t,
					options: n
				})
			},
			addAsyncTest: function(e) {
				S.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = b, Modernizr = new Modernizr, Modernizr.addTest("applicationcache", "applicationCache" in e), Modernizr.addTest("geolocation", "geolocation" in navigator), Modernizr.addTest("history", function() {
		var t = navigator.userAgent;
		return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") ? e.history && "pushState" in e.history : !1
	}), Modernizr.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), Modernizr.addTest("filereader", !!(e.File && e.FileList && e.FileReader)), Modernizr.addTest("localstorage", function() {
		var e = "modernizr";
		try {
			return localStorage.setItem(e, e), localStorage.removeItem(e), !0
		} catch (t) {
			return !1
		}
	}), Modernizr.addTest("websqldatabase", "openDatabase" in e);
	var x = b._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	b._prefixes = x;
	var T = t.documentElement,
		E = "svg" === T.nodeName.toLowerCase();
	E || ! function(e, t) {
		function n(e, t) {
			var n = e.createElement("p"),
				r = e.getElementsByTagName("head")[0] || e.documentElement;
			return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
		}

		function r() {
			var e = w.elements;
			return "string" == typeof e ? e.split(" ") : e
		}

		function o(e, t) {
			var n = w.elements;
			"string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), w.elements = n + " " + e, c(t)
		}

		function i(e) {
			var t = y[e[v]];
			return t || (t = {}, g++, e[v] = g, y[g] = t), t
		}

		function a(e, n, r) {
			if (n || (n = t), d) return n.createElement(e);
			r || (r = i(n));
			var o;
			return o = r.cache[e] ? r.cache[e].cloneNode() : h.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !o.canHaveChildren || m.test(e) || o.tagUrn ? o : r.frag.appendChild(o)
		}

		function s(e, n) {
			if (e || (e = t), d) return e.createDocumentFragment();
			n = n || i(e);
			for (var o = n.frag.cloneNode(), a = 0, s = r(), l = s.length; l > a; a++) o.createElement(s[a]);
			return o
		}

		function l(e, t) {
			t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
				return w.shivMethods ? a(n, e, t) : t.createElem(n)
			}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
				return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
			}) + ");return n}")(w, t.frag)
		}

		function c(e) {
			e || (e = t);
			var r = i(e);
			return !w.shivCSS || u || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || l(e, r), e
		}
		var u, d, f = "3.7.3",
			p = e.html5 || {},
			m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			v = "_html5shiv",
			g = 0,
			y = {};
		! function() {
			try {
				var e = t.createElement("a");
				e.innerHTML = "<xyz></xyz>", u = "hidden" in e, d = 1 == e.childNodes.length || function() {
					t.createElement("a");
					var e = t.createDocumentFragment();
					return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
				}()
			} catch (n) {
				u = !0, d = !0
			}
		}();
		var w = {
			elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
			version: f,
			shivCSS: p.shivCSS !== !1,
			supportsUnknownElements: d,
			shivMethods: p.shivMethods !== !1,
			type: "default",
			shivDocument: c,
			createElement: a,
			createDocumentFragment: s,
			addElements: o
		};
		e.html5 = w, c(t), "object" == typeof module && module.exports && (module.exports = w)
	}("undefined" != typeof e ? e : this, t);
	var _ = "Moz O ms Webkit",
		P = b._config.usePrefixes ? _.toLowerCase().split(" ") : [];
	b._domPrefixes = P;
	var z;
	! function() {
		var e = {}.hasOwnProperty;
		z = r(e, "undefined") || r(e.call, "undefined") ? function(e, t) {
			return t in e && r(e.constructor.prototype[t], "undefined")
		} : function(t, n) {
			return e.call(t, n)
		}
	}(), b._l = {}, b.on = function(e, t) {
		this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
			Modernizr._trigger(e, Modernizr[e])
		}, 0)
	}, b._trigger = function(e, t) {
		if (this._l[e]) {
			var n = this._l[e];
			setTimeout(function() {
				var e, r;
				for (e = 0; e < n.length; e++)(r = n[e])(t)
			}, 0), delete this._l[e]
		}
	}, Modernizr._q.push(function() {
		b.addTest = a
	});
	var N = function() {
		function e(e, t) {
			var o;
			return e ? (t && "string" != typeof t || (t = s(t || "div")), e = "on" + e, o = e in t, !o && r && (t.setAttribute || (t = s("div")), t.setAttribute(e, ""), o = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o) : !1
		}
		var r = !("onblur" in t.documentElement);
		return e
	}();
	b.hasEvent = N, Modernizr.addTest("audio", function() {
		var e = s("audio"),
			t = !1;
		try {
			(t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
		} catch (n) {}
		return t
	}), Modernizr.addTest("canvas", function() {
		var e = s("canvas");
		return !(!e.getContext || !e.getContext("2d"))
	}), Modernizr.addTest("video", function() {
		var e = s("video"),
			t = !1;
		try {
			(t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
		} catch (n) {}
		return t
	});
	var k = s("input"),
		$ = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
		A = {};
	Modernizr.input = function(t) {
		for (var n = 0, r = t.length; r > n; n++) A[t[n]] = !!(t[n] in k);
		return A.list && (A.list = !(!s("datalist") || !e.HTMLDataListElement)), A
	}($);
	var j = "search tel url email datetime date month week time datetime-local number range color".split(" "),
		F = {};
	Modernizr.inputtypes = function(e) {
		for (var r, o, i, a = e.length, s = "1)", l = 0; a > l; l++) k.setAttribute("type", r = e[l]), i = "text" !== k.type && "style" in k, i && (k.value = s, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && k.style.WebkitAppearance !== n ? (T.appendChild(k), o = t.defaultView, i = o.getComputedStyle && "textfield" !== o.getComputedStyle(k, null).WebkitAppearance && 0 !== k.offsetHeight, T.removeChild(k)) : /^(search|tel)$/.test(r) || (i = /^(url|email)$/.test(r) ? k.checkValidity && k.checkValidity() === !1 : k.value != s)), F[e[l]] = !!i;
		return F
	}(j);
	var L = "CSS" in e && "supports" in e.CSS,
		M = "supportsCSS" in e;
	Modernizr.addTest("supports", L || M);
	var O = function() {
		var t = e.matchMedia || e.msMatchMedia;
		return t ? function(e) {
			var n = t(e);
			return n && n.matches || !1
		} : function(t) {
			var n = !1;
			return d("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
				n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
			}), n
		}
	}();
	b.mq = O, Modernizr.addTest("mediaqueries", O("only all"));
	var q = b.testStyles = d;
	Modernizr.addTest("touchevents", function() {
		var n;
		if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
		else {
			var r = ["@media (", x.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			q(r, function(e) {
				n = 9 === e.offsetTop
			})
		}
		return n
	}), q("#modernizr { height: 50vh; }", function(t) {
		var n = parseInt(e.innerHeight / 2, 10),
			r = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).height, 10);
		Modernizr.addTest("cssvhunit", r == n)
	}), q("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}", function(t) {
		var n = t.childNodes[2],
			r = t.childNodes[1],
			o = t.childNodes[0],
			i = parseInt((r.offsetWidth - r.clientWidth) / 2, 10),
			a = o.clientWidth / 100,
			s = o.clientHeight / 100,
			l = parseInt(50 * Math.min(a, s), 10),
			u = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).width, 10);
		Modernizr.addTest("cssvminunit", c(l, u) || c(l, u - i))
	}, 3), q("#modernizr { width: 50vw; }", function(t) {
		var n = parseInt(e.innerWidth / 2, 10),
			r = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
		Modernizr.addTest("cssvwunit", r == n)
	});
	var D = b._config.usePrefixes ? _.split(" ") : [];
	b._cssomPrefixes = D;
	var I = function(t) {
		var r, o = x.length,
			i = e.CSSRule;
		if ("undefined" == typeof i) return n;
		if (!t) return !1;
		if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
		for (var a = 0; o > a; a++) {
			var s = x[a],
				l = s.toUpperCase() + "_" + r;
			if (l in i) return "@-" + s.toLowerCase() + "-" + t
		}
		return !1
	};
	b.atRule = I;
	var B = {
		elem: s("modernizr")
	};
	Modernizr._q.push(function() {
		delete B.elem
	});
	var H = {
		style: B.elem.style
	};
	Modernizr._q.unshift(function() {
		delete H.style
	});
	b.testProp = function(e, t, r) {
		return g([e], n, t, r)
	};
	b.testAllProps = y;
	b.prefixed = function(e, t, n) {
		return 0 === e.indexOf("@") ? I(e) : (-1 != e.indexOf("-") && (e = l(e)), t ? y(e, t, n) : y(e, "pfx"))
	};
	b.testAllProps = w, Modernizr.addTest("cssanimations", w("animationName", "a", !0)), Modernizr.addTest("flexbox", w("flexBasis", "1px", !0)), Modernizr.addTest("csstransforms", function() {
		return -1 === navigator.userAgent.indexOf("Android 2.") && w("transform", "scale(1)", !0)
	}), Modernizr.addTest("csstransforms3d", function() {
		var e = !!w("perspective", "1px", !0),
			t = Modernizr._config.usePrefixes;
		if (e && (!t || "webkitPerspective" in T.style)) {
			var n, r = "#modernizr{width:0;height:0}";
			Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", q(r + n, function(t) {
				e = 7 === t.offsetWidth && 18 === t.offsetHeight
			})
		}
		return e
	}), Modernizr.addTest("csstransitions", w("transition", "all", !0)), o(), i(C), delete b.addTest, delete b.addAsyncTest;
	for (var R = 0; R < Modernizr._q.length; R++) Modernizr._q[R]();
	e.Modernizr = Modernizr
}(window, document);