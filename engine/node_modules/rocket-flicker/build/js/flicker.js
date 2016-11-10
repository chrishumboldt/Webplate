/**
 * File: buil/js/rocket-flicker.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component container
var RocketFlickerComponent = (function () {
	// Variables
	var isTouch = true;

	// HTML
	var html = {
		arrow: function (direction) {
			var direction = direction || 'left';
			var elmArrow = document.createElement('div');
			elmArrow.className = 'rocket-flicker-arrow _' + direction;
			return elmArrow;
		},
		dots: function (count) {
			var dots = document.createElement('div');
			var dotsUl = document.createElement('ul');

			dots.className = 'rocket-flicker-dots';
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
		if (!Rocket.is.touch()) {
			Rocket.class.add(Rocket.dom.html, 'rocket-no-touch');
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

		Rocket.class.add(flicker, ['rocket-flicker', '_a-' + options.animation]);
		Rocket.class.add(flickerUL, 'flicks');

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
				Rocket.class.add(flickerEl.dots, '_' + options.dotAlignment);
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
			Rocket.event.add(elements.arrows.left, 'click', function () {
				move('previous');
			});
			Rocket.event.add(elements.arrows.right, 'click', function () {
				move('next');
			});
		};
		var autoStart = function () {
			autoFlickWatch = setTimeout(function () {
				move('next');
			}, Rocket.time.seconds(options.autoFlickDelay));
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
			Rocket.event.add(elements.dots, 'click', function (event) {
				if (Rocket.has.class(event.target, 'dot') && !Rocket.has.class(event.target, '_active')) {
					move(Rocket.get.index(event.target.parentNode) + 1);
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
					Rocket.class.remove(elements.UL.querySelector('li._active'), '_active');
					Rocket.class.add(elements.UL.querySelector('li:nth-child(' + options.position + ')'), '_active');
					break;
				case 'transition-slide':
					elements.UL.style.left = '-' + movePosition + '00%';
					lastPosXLeft = -(movePosition + '00');
					break;
			}
			// Update dot navigation
			if (options.animation !== 'scroller-slide' && options.dots) {
				Rocket.class.remove(elements.dots.querySelector('._active'), '_active');
				Rocket.class.add(elements.dots.querySelector('li:nth-child(' + options.position + ') .dot'), '_active');
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
			Rocket.class.remove(flicker, '_a-' + options.animation);
		};
		var movePanEnd = function (event) {
			endPosX = event.deltaX;
			Rocket.class.add(flicker, '_a-' + options.animation);
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
			var delay = (typeof delay === 'number') ? delay : Rocket.defaults.flicker.autoFlickDelay;
			clearTimeout(autoFlickWatch);
			options.autoFlick = true;
			options.autoFlickDelay = delay;
			autoFlickWatch = setTimeout(function () {
				move('next');
			}, Rocket.time.seconds(options.autoFlickDelay));
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
			selector: (typeof uOptions.selector === 'string') ? uOptions.selector : Rocket.defaults.flicker.selector,
			animation: (typeof uOptions.animation === 'string') ? uOptions.animation : Rocket.defaults.flicker.animation,
			arrows: (typeof uOptions.arrows === 'boolean') ? uOptions.arrows : Rocket.defaults.flicker.arrows,
			arrowsConstraint: (typeof uOptions.arrowsConstraint === 'boolean') ? uOptions.arrowsConstraint : Rocket.defaults.flicker.arrowsConstraint,
			autoFlick: (typeof uOptions.autoFlick === 'boolean') ? uOptions.autoFlick : Rocket.defaults.flicker.autoFlick,
			autoFlickDelay: (typeof uOptions.autoFlickDelay === 'number') ? uOptions.autoFlickDelay : Rocket.defaults.flicker.autoFlickDelay,
			dotAlignment: (typeof uOptions.dotAlignment === 'string') ? uOptions.dotAlignment : Rocket.defaults.flicker.dotAlignment,
			dots: (typeof uOptions.dots === 'boolean') ? uOptions.dots : Rocket.defaults.flicker.dots,
			position: (typeof uOptions.position === 'number') ? uOptions.position : Rocket.defaults.flicker.position
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
		init: init
	};
})();

// Bind to Rocket object
Rocket.flicker = function (uOptions) {
	return RocketFlickerComponent.init(uOptions);
};
