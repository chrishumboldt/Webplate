/**
 * File: buil/js/flickerplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Webplate tools module extension
var Web = (function (Web) {
	// Basic checks
	if (!Web.exists) {
		var exists = function (check) {
			return (check === null || check === false || typeof (check) == 'undefined') ? false : true;
		};
		Web.exists = exists;
	}
	if (!Web.has) {
		var has = {
			spaces: function (check) {
				return /\s/.test(check);
			},
			class: function (element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		};
		Web.has = has;
	}
	if (!Web.is) {
		var is = {
			touch: function () {
				return 'ontouchstart' in window || 'onmsgesturechange' in window;
			}
		};
		Web.is = is;
	}
	// Classes
	if (!Web.class) {
		var classMethods = {
			add: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = 0, len = className.length; i < len; i++) {
							classMethods.addExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.addExecute(element, classes[i]);
						}
					} else {
						classMethods.addExecute(element, className);
					}
				}
			},
			addExecute: function (element, className) {
				var crtClass = element.className;
				if (crtClass.match(new RegExp('\\b' + className + '\\b', 'g')) === null) {
					element.className = crtClass === '' ? className : crtClass + ' ' + className;
				}
			},
			clear: function (element) {
				if (exists(element)) {
					element.removeAttribute('class');
				}
			},
			remove: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = className.length - 1; i >= 0; i--) {
							classMethods.removeExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.removeExecute(element, classes[i]);
						}
					} else {
						classMethods.removeExecute(element, className);
					}
				}
			},
			removeExecute: function (element, className) {
				if (element.className.indexOf(className) > -1) {
					element.className = element.className.split(' ').filter(function (val) {
						return val != className;
					}).toString().replace(/,/g, ' ');
					if (element.className === '') {
						classMethods.clear(element);
					}
				}
			}
		};
		Web.class = classMethods;
	}
	// Gets
	if (!Web.get) {
		var get = {
			index: function (node) {
				return [].indexOf.call(node.parentNode.children, node);
			},
			extension: function (file) {
				return file.split('.').pop().toLowerCase();
			},
			integers: function (string) {
				return string.replace(/^\D+ /g, '').replace(/ /g, '');
			}
		};
		Web.get = get;
	}
	// Development
	if (!Web.log) {
		var log = function (text) {
			if (window && window.console) {
				console.log(text);
			}
		};
		Web.log = log;
	}
	// DOM
	if (!Web.dom) {
		Web.dom = {};
	}
	if (!Web.dom.html) {
		Web.dom.html = document.getElementsByTagName('html')[0];
	}
	// Events
	if (!Web.event) {
		var eventMethods = {
			add: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.addEventListener) {
					elem.addEventListener(type, eventHandle, false);
				} else if (elem.attachEvent) {
					elem.attachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			},
			remove: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.removeEventListener) {
					elem.removeEventListener(type, eventHandle, false);
				} else if (elem.detachEvent) {
					elem.detachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			}
		};
		Web.event = eventMethods;
	}

	// Time
	if (!Web.time) {
		var time = {
			hours: function (hours) {
				return hours * 60 * 60 * 1000;
			},
			minutes: function (minutes) {
				return minutes * 60 * 1000;
			},
			seconds: function (seconds) {
				return seconds * 1000;
			}
		};
		Web.time = time;
	}

	return Web;
})(Web || {});

// Component container
var Flickerplate = (function () {
	// Variables
	var defaults = {
		selector: '.flickerplate',
		animation: 'transform-slide',
		arrows: true,
		arrowsConstraint: false,
		autoFlick: true,
		autoFlickDelay: 10,
		dotAlignment: 'center',
		dots: true,
		position: 1,
		theme: 'light'
	};
	var isTouch = true;

	// HTML
	var html = {
		arrow: function (direction) {
			var direction = direction || 'left';
			var elmArrow = document.createElement('div');
			elmArrow.className = 'flickerplate-arrow _' + direction;
			return elmArrow;
		},
		dots: function (count) {
			var dots = document.createElement('div');
			var dotsUl = document.createElement('ul');

			dots.className = 'flickerplate-dots';
			for (var i = 0, len = count; i < len; i++) {
				var dotLi = document.createElement('li');
				var dot = document.createElement('div');
				dot.className = (i === 0) ? 'dot _active' : 'dot';

				dotLi.appendChild(dot);
				dotsUl.appendChild(dotLi);
			}
			dots.appendChild(dotsUl);
			return dots;
		}
	};

	// Functions
	var setup = function () {
		if (!Web.is.touch()) {
			Web.class.add(Web.dom.html, 'fp-no-touch');
			isTouch = false;
		}
	};
	var setupFlicker = function (flicker, options) {
		if (!flicker || typeof options !== 'object') {
			return false;
		}
		// Variables
		var options = JSON.parse(JSON.stringify(options));
		var flickerUL = flicker.querySelector('ul');
		var flickerLIs = flicker.querySelectorAll('li');
		var flicksCount = flickerLIs.length;
		var flickerEl = {
			UL: flickerUL,
			LIs: flickerLIs
		};
		options.count = flicksCount;

		Web.class.add(flicker, ['flickerplate', '_t-' + options.theme, '_a-' + options.animation]);
		Web.class.add(flickerUL, 'flicks');

		// Set backgrounds
		if (flicksCount > 0) {
			for (var i = 0, len = flicksCount; i < len; i++) {
				var background = flickerLIs[i].getAttribute('data-background') || false;
				if (background) {
					flickerLIs[i].style.backgroundImage = 'url(' + background + ')';
				}
			}
		}
		// Set arrows & dots
		if (options.animation !== 'scroller-slide') {
			if (options.arrows) {
				flickerEl.arrows = {
					left: flicker.insertBefore(html.arrow('left'), flickerUL),
					right: flicker.insertBefore(html.arrow('right'), flickerUL)
				}
			}
			if (options.dots) {
				flickerEl.dots = flicker.insertBefore(html.dots(flicksCount), flickerUL);
				Web.class.add(flickerEl.dots, '_' + options.dotAlignment);
			}
		}

		return {
			flicker: flicker,
			options: options,
			elements: flickerEl
		};
	};

	// Inner component
	var component = function (flickerObj) {
		if (!flickerObj) {
			return false;
		}
		// Variables
		var autoFlickWatch;
		var elements = flickerObj.elements;
		var flicker = flickerObj.flicker;
		var options = flickerObj.options;

		var endPosX = 0;
		var flickerWidth = 0;
		var lastPosXLeft = 0;
		var lastPosXPercent = 0;
		var panCSS = 'translate3d(0, 0, 0)';
		var panThreshold = 100;
		var posX = 0;

		// Functions
		var arrowNavigation = function () {
			if (options.animation === 'scroller-slide' || !options.arrows) {
				return false;
			}
			Web.event.add(elements.arrows.left, 'click', function () {
				move('previous');
			});
			Web.event.add(elements.arrows.right, 'click', function () {
				move('next');
			});
		};
		var autoStart = function () {
			autoFlickWatch = setTimeout(function () {
				move('next');
			}, Web.time.seconds(options.autoFlickDelay));
		};
		var autoStop = function () {
			clearTimeout(autoFlickWatch);
		};
		var checkPosX = function (posXFallback) {
			if (options.position === 1 && posX > 0) {
				posX = 0;
			} else if ((options.position === options.count) && (posX < posXFallback)) {
				posX = posXFallback;
			}
		};
		var dotNavigation = function () {
			if (options.animation === 'scroller-slide' || !options.dots) {
				return false;
			}
			Web.event.add(elements.dots, 'click', function (event) {
				if (Web.has.class(event.target, 'dot') && !Web.has.class(event.target, '_active')) {
					move(Web.get.index(event.target.parentNode) + 1);
				}
			});
		};
		var move = function (to) {
			// Auto flick
			if (options.autoFlick && options.autoFlickDelay) {
				autoStop();
				autoStart();
			}
			// Set the new position
			switch (to) {
				case 'next':
					if (options.position < options.count) {
						options.position++;
					} else if (!options.arrowsConstraint) {
						options.position = 1;
					}
					break;
				case 'previous':
					if (options.position > 1) {
						options.position--;
					} else if (!options.arrowsConstraint) {
						options.position = options.count;
					}
					break;
				default:
					if (typeof to === 'number') {
						if (to <= options.count && to >= 1) {
							options.position = to;
						} else if (to >= options.count) {
							options.position = options.count;
						} else if (to <= 1) {
							options.position = 1;
						}
					} else {
						return false;
					}
			}

			// Move it
			var movePosition = options.position - 1;
			switch (options.animation) {
				case 'transform-slide':
					var translate3D = 'translate3d(-' + movePosition + '00%, 0, 0)';
					elements.UL.setAttribute('style', '-webkit-transform:' + translate3D + ';-o-transform:' + translate3D + ';-moz-transform:' + translate3D + ';transform:' + translate3D);
					lastPosXPercent = -(movePosition) * 100;
					break;
				case 'transition-fade':
					Web.class.remove(elements.UL.querySelector('li._active'), '_active');
					Web.class.add(elements.UL.querySelector('li:nth-child(' + options.position + ')'), '_active');
					break;
				case 'transition-slide':
					elements.UL.style.left = '-' + movePosition + '00%';
					lastPosXLeft = -(movePosition + '00');
					break;
			}
			// Update dot navigation
			if (options.animation !== 'scroller-slide' && options.dots) {
				Web.class.remove(elements.dots.querySelector('._active'), '_active');
				Web.class.add(elements.dots.querySelector('li:nth-child(' + options.position + ') .dot'), '_active');
			}
		};
		var moveHammer = function () {
			if (typeof Hammer === 'function') {
				if (options.animation === 'transform-slide' || options.animation === 'transition-slide') {
					// Interaction
					var hammerTime = new Hammer(elements.UL);
					hammerTime.on('panstart', function(event) {
						movePanStart();
					});
					hammerTime.on('panleft panright', function(event) {
						movePan(event);
					});
					hammerTime.on('panend', function(event) {
						movePanEnd(event);
					});
				} else if (options.animation === 'transition-fade') {
					var hammerTime = new Hammer(elements.UL);
					hammerTime.on('swipeleft swiperight', function(event) {
						moveSwipe(event);
					});
				}
			}
		};
		var movePan = function (event) {
			switch (options.animation) {
				case 'transform-slide':
					posX = (Math.round((event.deltaX / flickerWidth) * 1000) / 10) + lastPosXPercent;
					checkPosX(-(options.count - 1) * 100);
					panCSS = 'translate3d(' + posX + '%, 0, 0)';
					elements.UL.setAttribute('style', '-webkit-transform:' + panCSS + ';-o-transform:' + panCSS + ';-moz-transform:' + panCSS + ';transform:' + panCSS);
					break;

				case 'transition-slide':
					posX = Math.round((event.deltaX / flickerWidth) * 100) + lastPosXLeft;
					checkPosX(-((options.count - 1) * 100));
					elements.UL.style.left = posX + '%';
					break;
			}
		};
		var movePanStart = function () {
			autoStop();
			flickerWidth = flicker.clientWidth;
			Web.class.remove(flicker, '_a-' + options.animation);
		};
		var movePanEnd = function (event) {
			endPosX = event.deltaX;
			Web.class.add(flicker, '_a-' + options.animation);
			if ((endPosX < -panThreshold) && (options.position < options.count)) {
				move('next');
			} else if ((endPosX > panThreshold) && (options.position > 1)) {
				move('previous');
			}
		};
		var moveSwipe = function (event) {
			if (event.type == 'swipeleft') {
				move('next');
			} else if (event.type == 'swiperight') {
				move('previous');
			}
		};
		var start = function (delay) {
			var delay = (typeof delay === 'number') ? delay : defaults.autoFlickDelay;
			clearTimeout(autoFlickWatch);
			options.autoFlick = true;
			options.autoFlickDelay = delay;
			autoFlickWatch = setTimeout(function () {
				move('next');
			}, Web.time.seconds(options.autoFlickDelay));
		};
		var stop = function () {
			if (options.autoFlick && options.autoFlickDelay) {
				clearTimeout(autoFlickWatch);
				options.autoFlick = false;
			}
		};

		// Execute and return
		arrowNavigation();
		dotNavigation();
		move(options.position);
		if (isTouch) {
			moveHammer();
		}
		return {
			flicker: flicker,
			move: move,
			start: start,
			stop: stop
		}
	};

	// Initialiser
	var init = function (uOptions) {
		// Options
		var uOptions = (typeof uOptions === 'object') ? uOptions : false; // User options
		var options = {
			selector: (typeof uOptions.selector === 'string') ? uOptions.selector : defaults.selector,
			animation: (typeof uOptions.animation === 'string') ? uOptions.animation : defaults.animation,
			arrows: (typeof uOptions.arrows === 'boolean') ? uOptions.arrows : defaults.arrows,
			arrowsConstraint: (typeof uOptions.arrowsConstraint === 'boolean') ? uOptions.arrowsConstraint : defaults.arrowsConstraint,
			autoFlick: (typeof uOptions.autoFlick === 'boolean') ? uOptions.autoFlick : defaults.autoFlick,
			autoFlickDelay: (typeof uOptions.autoFlickDelay === 'number') ? uOptions.autoFlickDelay : defaults.autoFlickDelay,
			dotAlignment: (typeof uOptions.dotAlignment === 'string') ? uOptions.dotAlignment : defaults.dotAlignment,
			dots: (typeof uOptions.dots === 'boolean') ? uOptions.dots : defaults.dots,
			position: (typeof uOptions.position === 'number') ? uOptions.position : defaults.position,
			theme: (typeof uOptions.theme === 'string') ? uOptions.theme : defaults.theme
		};
		var flickers = document.querySelectorAll(options.selector);
		if (flickers.length < 1) {
			return false;
		}

		// Initialise each component and return
		var objReturn = [];
		for (var i = 0, len = flickers.length; i < len; i++) {
		   objReturn.push(new component(setupFlicker(flickers[i], options)));
		}
		return objReturn;
	};

	// Execute and return
	setup();
	return {
		defaults: defaults,
		init: init
	};
})();
