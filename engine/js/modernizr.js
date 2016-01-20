/*! modernizr 3.0.0-alpha.4 (Custom Build) | MIT *
 * http://modernizr.com/download/#-appearance-applicationcache-audio-backgroundsize-bgrepeatspace_bgrepeatround-bgsizecover-borderradius-boxshadow-canvas-cssanimations-csscolumns-cssgradients-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvminunit-cssvwunit-filereader-flexbox-generatedcontent-geolocation-hashchange-history-inlinesvg-input-inputtypes-lastchild-localstorage-mediaqueries-nthchild-opacity-svg-textshadow-touchevents-video-websqldatabase-addtest-domprefixes-hasevent-mq-prefixed-prefixes-shiv-testallprops-testprop-teststyles !*/
! function(e, t, n) {
	function r(e, t) {
		return typeof e === t
	}

	function a() {
		var e, t, n, a, i, o, s;
		for (var d in w) {
			if (e = [], t = w[d], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
				for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
			for (a = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) o = e[i], s = o.split("."), 1 === s.length ? Modernizr[s[0]] = a : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), Modernizr[s[0]][s[1]] = a), T.push((a ? "" : "no-") + s.join("-"))
		}
	}

	function i(e) {
		var t = S.className,
			n = Modernizr._config.classPrefix || "";
		if (E && (t = t.baseVal), Modernizr._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
			t = t.replace(r, "$1" + n + "js$2")
		}
		Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), E ? S.className.baseVal = t : S.className = t)
	}

	function o() {
		return "function" != typeof t.createElement ? t.createElement(arguments[0]) : E ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
	}

	function s(e, t) {
		if ("object" == typeof e)
			for (var n in e) P(e, n) && s(n, e[n]);
		else {
			e = e.toLowerCase();
			var r = e.split("."),
				a = Modernizr[r[0]];
			if (2 == r.length && (a = a[r[1]]), "undefined" != typeof a) return Modernizr;
			t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
		}
		return Modernizr
	}

	function d(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
			return t + n.toUpperCase()
		}).replace(/^-/, "")
	}

	function l(e, t) {
		return e - 1 === t || e === t || e + 1 === t
	}

	function c() {
		var e = t.body;
		return e || (e = o(E ? "svg" : "body"), e.fake = !0), e
	}

	function u(e, n, r, a) {
		var i, s, d, l, u = "modernizr",
			f = o("div"),
			p = c();
		if (parseInt(r, 10))
			for (; r--;) d = o("div"), d.id = a ? a[r] : u + (r + 1), f.appendChild(d);
		return i = o("style"), i.type = "text/css", i.id = "s" + u, (p.fake ? p : f).appendChild(i), p.appendChild(f), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), f.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", l = S.style.overflow, S.style.overflow = "hidden", S.appendChild(p)), s = n(f, e), p.fake ? (p.parentNode.removeChild(p), S.style.overflow = l, S.offsetHeight) : f.parentNode.removeChild(f), !!s
	}

	function f(e, t) {
		return !!~("" + e).indexOf(t)
	}

	function p(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	}

	function h(e, t, n) {
		var a;
		for (var i in e)
			if (e[i] in t) return n === !1 ? e[i] : (a = t[e[i]], r(a, "function") ? p(a, n || t) : a);
		return !1
	}

	function m(e) {
		return e.replace(/([A-Z])/g, function(e, t) {
			return "-" + t.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}

	function v(t, r) {
		var a = t.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; a--;)
				if (e.CSS.supports(m(t[a]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; a--;) i.push("(" + m(t[a]) + ":" + r + ")");
			return i = i.join(" or "), u("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == getComputedStyle(e, null).position
			})
		}
		return n
	}

	function g(e, t, a, i) {
		function s() {
			c && (delete q.style, delete q.modElem)
		}
		if (i = r(i, "undefined") ? !1 : i, !r(a, "undefined")) {
			var l = v(e, a);
			if (!r(l, "undefined")) return l
		}
		for (var c, u, p, h, m, g = ["modernizr", "tspan"]; !q.style;) c = !0, q.modElem = o(g.shift()), q.style = q.modElem.style;
		for (p = e.length, u = 0; p > u; u++)
			if (h = e[u], m = q.style[h], f(h, "-") && (h = d(h)), q.style[h] !== n) {
				if (i || r(a, "undefined")) return s(), "pfx" == t ? h : !0;
				try {
					q.style[h] = a
				} catch (y) {}
				if (q.style[h] != m) return s(), "pfx" == t ? h : !0
			}
		return s(), !1
	}

	function y(e, t, n, a, i) {
		var o = e.charAt(0).toUpperCase() + e.slice(1),
			s = (e + " " + I.join(o + " ") + o).split(" ");
		return r(t, "string") || r(t, "undefined") ? g(s, t, a, i) : (s = (e + " " + z.join(o + " ") + o).split(" "), h(s, t, n))
	}

	function b(e, t, r) {
		return y(e, n, n, t, r)
	}
	var T = [],
		w = [],
		x = {
			_version: "3.0.0-alpha.4",
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
				w.push({
					name: e,
					fn: t,
					options: n
				})
			},
			addAsyncTest: function(e) {
				w.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = x, Modernizr = new Modernizr, Modernizr.addTest("applicationcache", "applicationCache" in e), Modernizr.addTest("geolocation", "geolocation" in navigator), Modernizr.addTest("history", function() {
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
	var C = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
	x._prefixes = C;
	var S = t.documentElement,
		E = "svg" === S.nodeName.toLowerCase();
	E || ! function(e, t) {
		function n(e, t) {
			var n = e.createElement("p"),
				r = e.getElementsByTagName("head")[0] || e.documentElement;
			return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
		}

		function r() {
			var e = b.elements;
			return "string" == typeof e ? e.split(" ") : e
		}

		function a(e, t) {
			var n = b.elements;
			"string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), b.elements = n + " " + e, l(t)
		}

		function i(e) {
			var t = y[e[v]];
			return t || (t = {}, g++, e[v] = g, y[g] = t), t
		}

		function o(e, n, r) {
			if (n || (n = t), u) return n.createElement(e);
			r || (r = i(n));
			var a;
			return a = r.cache[e] ? r.cache[e].cloneNode() : m.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !a.canHaveChildren || h.test(e) || a.tagUrn ? a : r.frag.appendChild(a)
		}

		function s(e, n) {
			if (e || (e = t), u) return e.createDocumentFragment();
			n = n || i(e);
			for (var a = n.frag.cloneNode(), o = 0, s = r(), d = s.length; d > o; o++) a.createElement(s[o]);
			return a
		}

		function d(e, t) {
			t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
				return b.shivMethods ? o(n, e, t) : t.createElem(n)
			}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
				return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
			}) + ");return n}")(b, t.frag)
		}

		function l(e) {
			e || (e = t);
			var r = i(e);
			return !b.shivCSS || c || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || d(e, r), e
		}
		var c, u, f = "3.7.2",
			p = e.html5 || {},
			h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			v = "_html5shiv",
			g = 0,
			y = {};
		! function() {
			try {
				var e = t.createElement("a");
				e.innerHTML = "<xyz></xyz>", c = "hidden" in e, u = 1 == e.childNodes.length || function() {
					t.createElement("a");
					var e = t.createDocumentFragment();
					return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
				}()
			} catch (n) {
				c = !0, u = !0
			}
		}();
		var b = {
			elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
			version: f,
			shivCSS: p.shivCSS !== !1,
			supportsUnknownElements: u,
			shivMethods: p.shivMethods !== !1,
			type: "default",
			shivDocument: l,
			createElement: o,
			createDocumentFragment: s,
			addElements: a
		};
		e.html5 = b, l(t)
	}(this, t);
	var _ = function(e) {
		function n(t, n) {
			var a;
			return t ? (n && "string" != typeof n || (n = o(n || "div")), t = "on" + t, a = t in n, !a && r && (n.setAttribute || (n = o("div")), n.setAttribute(t, ""), a = "function" == typeof n[t], n[t] !== e && (n[t] = e), n.removeAttribute(t)), a) : !1
		}
		var r = !("onblur" in t.documentElement);
		return n
	}();
	x.hasEvent = _, Modernizr.addTest("hashchange", function() {
		return _("hashchange", e) === !1 ? !1 : t.documentMode === n || t.documentMode > 7
	}), Modernizr.addTest("audio", function() {
		var e = o("audio"),
			t = !1;
		try {
			(t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
		} catch (n) {}
		return t
	}), Modernizr.addTest("canvas", function() {
		var e = o("canvas");
		return !(!e.getContext || !e.getContext("2d"))
	}), Modernizr.addTest("video", function() {
		var e = o("video"),
			t = !1;
		try {
			(t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
		} catch (n) {}
		return t
	}), Modernizr.addTest("cssgradients", function() {
		var e = "background-image:",
			t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
			n = "linear-gradient(left top,#9f9, white);",
			r = e + C.join(n + e).slice(0, -e.length);
		Modernizr._config.usePrefixes && (r += e + "-webkit-" + t);
		var a = o("a"),
			i = a.style;
		return i.cssText = r, ("" + i.backgroundImage).indexOf("gradient") > -1
	}), Modernizr.addTest("opacity", function() {
		var e = o("a").style;
		return e.cssText = C.join("opacity:.55;"), /^0.55$/.test(e.opacity)
	}), Modernizr.addTest("inlinesvg", function() {
		var e = o("div");
		return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI)
	});
	var k = "Moz O ms Webkit",
		z = x._config.usePrefixes ? k.toLowerCase().split(" ") : [];
	x._domPrefixes = z;
	var P;
	! function() {
		var e = {}.hasOwnProperty;
		P = r(e, "undefined") || r(e.call, "undefined") ? function(e, t) {
			return t in e && r(e.constructor.prototype[t], "undefined")
		} : function(t, n) {
			return e.call(t, n)
		}
	}(), x._l = {}, x.on = function(e, t) {
		this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
			Modernizr._trigger(e, Modernizr[e])
		}, 0)
	}, x._trigger = function(e, t) {
		if (this._l[e]) {
			var n = this._l[e];
			setTimeout(function() {
				var e, r;
				for (e = 0; e < n.length; e++)(r = n[e])(t)
			}, 0), delete this._l[e]
		}
	}, Modernizr._q.push(function() {
		x.addTest = s
	});
	var N = "CSS" in e && "supports" in e.CSS,
		$ = "supportsCSS" in e;
	Modernizr.addTest("supports", N || $);
	var A = o("input"),
		R = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
		j = {};
	Modernizr.input = function(t) {
		for (var n = 0, r = t.length; r > n; n++) j[t[n]] = !!(t[n] in A);
		return j.list && (j.list = !(!o("datalist") || !e.HTMLDataListElement)), j
	}(R);
	var L = "search tel url email datetime date month week time datetime-local number range color".split(" "),
		M = {};
	Modernizr.inputtypes = function(e) {
		for (var r, a, i, o = e.length, s = ":)", d = 0; o > d; d++) A.setAttribute("type", r = e[d]), i = "text" !== A.type && "style" in A, i && (A.value = s, A.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && A.style.WebkitAppearance !== n ? (S.appendChild(A), a = t.defaultView, i = a.getComputedStyle && "textfield" !== a.getComputedStyle(A, null).WebkitAppearance && 0 !== A.offsetHeight, S.removeChild(A)) : /^(search|tel)$/.test(r) || (i = /^(url|email|number)$/.test(r) ? A.checkValidity && A.checkValidity() === !1 : A.value != s)), M[e[d]] = !!i;
		return M
	}(L);
	var B = function() {
		var t = e.matchMedia || e.msMatchMedia;
		return t ? function(e) {
			var n = t(e);
			return n && n.matches || !1
		} : function(t) {
			var n = !1;
			return u("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
				n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
			}), n
		}
	}();
	x.mq = B, Modernizr.addTest("mediaqueries", B("only all"));
	var F = x.testStyles = u;
	Modernizr.addTest("touchevents", function() {
		var n;
		if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
		else {
			var r = ["@media (", C.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			F(r, function(e) {
				n = 9 === e.offsetTop
			})
		}
		return n
	}), F('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(e) {
		Modernizr.addTest("generatedcontent", e.offsetHeight >= 7)
	}), F("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(e) {
		Modernizr.addTest("lastchild", e.lastChild.offsetWidth > e.firstChild.offsetWidth)
	}, 2), F("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(e) {
		Modernizr.addTest("nthchild", function() {
			for (var t = e.getElementsByTagName("div"), n = !0, r = 0; 5 > r; r++) n = n && t[r].offsetWidth === r % 2 + 1;
			return n
		})
	}, 5), F("#modernizr { height: 50vh; }", function(t) {
		var n = parseInt(e.innerHeight / 2, 10),
			r = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).height, 10);
		Modernizr.addTest("cssvhunit", r == n)
	}), F("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}", function(t) {
		var n = t.childNodes[1],
			r = t.childNodes[0],
			a = parseInt((r.offsetWidth - r.clientWidth) / 2, 10),
			i = S.clientWidth / 100,
			o = S.clientHeight / 100,
			s = parseInt(50 * Math.min(i, o), 10),
			d = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).width, 10);
		Modernizr.addTest("cssvminunit", l(s, d) || l(s, d - a))
	}, 2), F("#modernizr { width: 50vw; }", function(t) {
		var n = parseInt(e.innerWidth / 2, 10),
			r = parseInt((e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
		Modernizr.addTest("cssvwunit", r == n)
	});
	var I = x._config.usePrefixes ? k.split(" ") : [];
	x._cssomPrefixes = I;
	var O = function(t) {
		var r, a = C.length,
			i = e.CSSRule;
		if ("undefined" == typeof i) return n;
		if (!t) return !1;
		if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
		for (var o = 0; a > o; o++) {
			var s = C[o],
				d = s.toUpperCase() + "_" + r;
			if (d in i) return "@-" + s.toLowerCase() + "-" + t
		}
		return !1
	};
	x.atRule = O;
	var W = {
		elem: o("modernizr")
	};
	Modernizr._q.push(function() {
		delete W.elem
	});
	var q = {
		style: W.elem.style
	};
	Modernizr._q.unshift(function() {
		delete q.style
	});
	var D = x.testProp = function(e, t, r) {
		return g([e], n, t, r)
	};
	Modernizr.addTest("textshadow", D("textShadow", "1px 1px")), x.testAllProps = y;
	x.prefixed = function(e, t, n) {
		return 0 === e.indexOf("@") ? O(e) : (-1 != e.indexOf("-") && (e = d(e)), t ? y(e, t, n) : y(e, "pfx"))
	};
	x.testAllProps = b, Modernizr.addTest("cssanimations", b("animationName", "a", !0)), Modernizr.addTest("bgrepeatround", b("backgroundRepeat", "round")), Modernizr.addTest("bgrepeatspace", b("backgroundRepeat", "space")), Modernizr.addTest("appearance", b("appearance")), Modernizr.addTest("backgroundsize", b("backgroundSize", "100%", !0)), Modernizr.addTest("bgsizecover", b("backgroundSize", "cover")), Modernizr.addTest("borderradius", b("borderRadius", "0px", !0)),
		function() {
			Modernizr.addTest("csscolumns", function() {
				var e = !1,
					t = b("columnCount");
				try {
					(e = !!t) && (e = new Boolean(e))
				} catch (n) {}
				return e
			});
			for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++) e = n[r].toLowerCase(), t = b("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || b(n[r])), Modernizr.addTest("csscolumns." + e, t)
		}(), Modernizr.addTest("boxshadow", b("boxShadow", "1px 1px", !0)), Modernizr.addTest("flexbox", b("flexBasis", "1px", !0)), Modernizr.addTest("csstransforms", function() {
			return -1 === navigator.userAgent.indexOf("Android 2.") && b("transform", "scale(1)", !0)
		}), Modernizr.addTest("csstransforms3d", function() {
			var e = !!b("perspective", "1px", !0),
				t = Modernizr._config.usePrefixes;
			if (e && (!t || "webkitPerspective" in S.style)) {
				var n;
				Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", F(n, function(t) {
					e = 9 === t.offsetLeft && 5 === t.offsetHeight
				})
			}
			return e
		}), Modernizr.addTest("csstransitions", b("transition", "all", !0)), a(), i(T), delete x.addTest, delete x.addAsyncTest;
	for (var H = 0; H < Modernizr._q.length; H++) Modernizr._q[H]();
	e.Modernizr = Modernizr
}(window, document);
