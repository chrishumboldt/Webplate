/**
 * File: flickerplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// 
// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Touch check
// Component call
// Component
// Prototype component

function flickerplate($selector, $userOptions) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new flickerplateComponent($elements[$i], $userOptions);
		}
	} else if ($selectorType === '#') {
		new flickerplateComponent(document.getElementById($selector.substring(1)), $userOptions);
	}
};

function flickerplateComponent($element, $userOptions) {
	// Tools
	var tool = function(document) {
		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};
		// HTML
		var $toolHtml = {
			test: false
		};

		// Functions
		var classAdd = function($element, $class) {
			var $crtClass = $element.className;
			if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
				$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
			}
		};
		var classClear = function($element) {
			$element.removeAttribute('class');
		};
		var classRemove = function($element, $class) {
			if ($element.className.indexOf($class) > -1) {
				$element.className = $element.className.split(' ').filter(function($val) {
					return $val != $class;
				}).toString().replace(/,/g, ' ');
				if ($element.className === '') {
					classClear($element);
				}
			}
		};
		var exists = function($element) {
			if ($element === null || typeof($element) === undefined) {
				return false;
			} else {
				return true;
			}
		};
		var getIndex = function($node) {
			return [].indexOf.call($node.parentNode.children, $node);
		};
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};
		var remove = function($selector) {
			if ($selector.charAt(0) === '#') {
				var $element = document.getElementById($selector.substring(1));
				if ($element !== null) {
					$element.parentNode.removeChild($element);
				}
			} else if ($selector.charAt(0) === '.') {
				var $elements = document.querySelectorAll($selector);
				for (var $i = $elements.length - 1; $i >= 0; $i--) {
					if ($elements[$i] !== null) {
						$elements[$i].parentNode.removeChild($element);
					}
				}
			}
		};
		var wrapInner = function($element, $tag, $className) {
			if (typeof $tag === 'string') {
				$tag = document.createElement($tag);
			}
			if ($className !== undefined) {
				var $div = $element.appendChild($tag).setAttribute('class', $className);
			} else {
				var $div = $element.appendChild($tag);
			}
			while ($element.firstChild !== $tag) {
				$tag.appendChild($element.firstChild);
			}
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			exists: exists,
			getIndex: getIndex,
			hasClass: hasClass,
			html: $toolHtml,
			isTouch: isTouch,
			remove: remove,
			wrapInner: wrapInner
		}
	}(document);

	// Touch check
	console.log(tool.isTouch());
	console.log(tool.hasClass(tool.element.html, 'flickerplate-no-touch'));
	if (!tool.isTouch() && !tool.hasClass(tool.element.html, 'flickerplate-no-touch')) {
		console.log('woot');
		tool.classAdd(tool.element.html, 'flickerplate-no-touch');
	}

	// Variables
	var $self = this;
	var $autoFlickWatch;
	var $flickCount = 0;
	var $flickerMoving = false;
	var $transitionEventListner = "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd";

	var $lastPosXLeft = 0;
	var $lastPosXPercent = 0;
	var $panCSS = 'translate3d(0, 0, 0)';
	var $panThreshold = 100;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		animation: $userOptions.animation || 'transform-slide',
		arrows: ($userOptions.arrows) ? $userOptions.arrows : true,
		arrowsConstraint: ($userOptions.arrowsConstraint) ? $userOptions.arrowsConstraint : false,
		autoFlick: ($userOptions.autoFlick) ? $userOptions.autoFlick : true,
		autoFlickDelay: $userOptions.autoFlickDelay || 10,
		dotAlignment: $userOptions.dotAlignment || 'center',
		dots: ($userOptions.dots) ? $userOptions.dots : true,
		position: $userOptions.position || 1,
		theme: $userOptions.theme || 'light'
	};

	// Internal functions
	function flickerAttachArrows() {
		if ($self.options.animation != 'scroller-slide' && $self.options.arrows == true) {
			var $arrowLeft = document.createElement('div');
			var $arrowRight = document.createElement('div');

			$arrowLeft.className = 'arrow-navigation left';
			$arrowRight.className = 'arrow-navigation right';

			$element.insertBefore($arrowLeft, $element.querySelector('.flicks'));
			$element.insertBefore($arrowRight, $element.querySelector('.flicks'));

			// Click event
			var $arrowNavigationElements = $element.querySelectorAll('.arrow-navigation');
			$arrowLeft.onclick = function() {
				if (--$self.options.position < 1) {
					$self.options.position = $self.options.arrowsConstraint ? 1 : $flickCount;
				}
				flickerMove();
				flickerAutoReset();
			};
			$arrowRight.onclick = function() {
				if (++$self.options.position > $flickCount) {
					$self.options.position = $self.options.arrowsConstraint ? $flickCount : 1;
				}
				flickerMove();
				flickerAutoReset();
			};
		}
	};

	function flickerAttachDots() {
		if ($self.options.animation !== 'scroller-slide' && $self.options.dots === true) {
			var $dots = document.createElement('div');
			var $dotsUL = document.createElement('ul');
			$dots.className = 'dot-navigation ' + $self.options.dotAlignment;

			for (var $i = $flickCount - 1; $i >= 0; $i--) {
				var $dotLI = document.createElement('li');
				var $dot = document.createElement('div');
				$dot.className = ($i === $flickCount - 1) ? 'dot active' : 'dot';

				$dotLI.appendChild($dot);
				$dotsUL.appendChild($dotLI);
			};

			$dots.appendChild($dotsUL);
			$element.insertBefore($dots, $element.querySelectorAll('.flicks')[0]);

			// Events
			var $dotElements = $element.querySelectorAll('.dot-navigation li');
			for (var $i = $dotElements.length - 1; $i >= 0; $i--) {
				$dotElements[$i].onclick = function() {
					$self.options.position = tool.getIndex(this) + 1;
					tool.classRemove($element.querySelector('.dot.active'), 'active');
					tool.classAdd(this.querySelector('.dot'), 'active');
					flickerMove();
				};
			};
		}
	};

	function flickerAutoFlick() {
		if (++$self.options.position > $flickCount) {
			$self.options.position = 1;
		}
		flickerMove();
	};

	function flickerAutoReset() {
		flickerAutoStop();
		flickerAutoStart();
	};

	function flickerAutoStart() {
		if ($self.options.autoFlick === true) {
			$autoFlickWatch = setInterval(flickerAutoFlick, $self.options.autoFlickDelay * 1000);
		}
	};

	function flickerAutoStop() {
		if ($self.options.autoFlick === true) {
			$autoFlickWatch = clearInterval($autoFlickWatch);
		}
	};

	function flickerMove($firstCheck) {
		$firstCheck = $firstCheck || false;
		var $flicks = $element.querySelector('ul.flicks');
		var $movePosition = $self.options.position - 1;
		$element.setAttribute('data-flickerplate-position', $self.options.position);

		switch ($self.options.animation) {
			case 'transform-slide':
				var $translate3D = 'translate3d(-' + $movePosition + '%, 0, 0)';
				$flicks.setAttribute('style', '-webkit-transform:' + $translate3D + ';-o-transform:' + $translate3D + ';-moz-transform:' + $translate3D + ';transform:' + $translate3D);
				$lastPosXPercent = -($movePosition);
				break;
			case 'transition-fade':
				var $allFlicks = $element.querySelectorAll('li');
				for (var $i = $allFlicks.length - 1; $i >= 0; $i--)(function($i) {
					tool.classRemove($allFlicks[$i], 'active');
				})($i);
				tool.classAdd($flicks.querySelector('li:nth-child(' + $self.options.position + ')'), 'active');
				break;
			case 'transition-slide':
				$flicks.style.left = '-' + $movePosition + '00%';
				$lastPosXLeft = -($movePosition + '00');
				break;
		}

		if ($self.options.dots === true && $firstCheck === false) {
			tool.classRemove($element.querySelector('.dot.active'), 'active');
			tool.classAdd($element.querySelector('.dot-navigation li:nth-child(' + $self.options.position + ') .dot'), 'active');
		}
	};

	function flickerHammer() {
		if (typeof Hammer === 'function') {
			if ($self.options.animation === 'transform-slide' || $self.options.animation === 'transition-slide') {
				// Interaction
				var $hammerTime = new Hammer($element.querySelector('ul.flicks'));
				$hammerTime.on('panleft panright', function(event) {
					flickerPan(event);
				});
				$hammerTime.on('panend', function(event) {
					flickerPanEnd(event);
				});
			} else if ($self.options.animation === 'transition-fade') {
				var $hammerTime = new Hammer($element.querySelector('ul.flicks'));
				$hammerTime.on('swipeleft swiperight', function(event) {
					flickerSwipe(event);
				});
			}
		}
	};

	function flickerPan(event) {
		flickerAutoStop();
		var $flickerWidth = $element.clientWidth;
		var $flicks = $element.querySelector('ul.flicks');
		tool.classRemove($element, 'animate-' + $self.options.animation);

		switch ($self.options.animation) {
			case 'transform-slide':
				if (tool.isTouch()) {
					$posX = (Math.round((event.deltaX / $flickerWidth) * 1000) / 1000) + $lastPosXPercent;
				} else {
					$posX = (Math.round((event.deltaX / $flickerWidth) * 10) / 10) + $lastPosXPercent;
				}

				// Check constraints
				if ($self.options.position == 1 && $posX > 0) {
					$posX = 0;
				} else if (($self.options.position == $flickCount) && ($posX < -($flickCount - 1))) {
					$posX = -($flickCount - 1)
				}

				// Move
				$panCSS = 'translate3d(' + $posX + '%, 0, 0)';
				$flicks.setAttribute('style', '-webkit-transform:' + $panCSS + ';-o-transform:' + $panCSS + ';-moz-transform:' + $panCSS + ';transform:' + $panCSS);
				break;
			case 'transition-slide':
				$posX = Math.round((event.deltaX / $flickerWidth) * 100) + $lastPosXLeft;

				// Check constraint
				if ($self.options.position == 1 && $posX > 0) {
					$posX = 0;
				} else if (($self.options.position == $flickCount) && ($posX < -($flickCount - 1) * 100)) {
					$posX = -(($flickCount - 1) * 100);
				}

				// Move
				$flicks.style.left = $posX + '%';
				break;
		}
	};

	function flickerPanEnd(event) {
		var $endPosX = event.deltaX;
		tool.classAdd($element, 'animate-' + $self.options.animation);

		if (($endPosX < -$panThreshold) && ($self.options.position < $flickCount)) {
			$self.options.position++;
		} else if (($endPosX > $panThreshold) && ($self.options.position > 1)) {
			$self.options.position--;
		}

		setTimeout(function() {
			flickerMove();
		}, 10);
		flickerAutoStart();
	};

	function flickerSetup() {
		tool.classAdd($element, 'flickerplate theme-' + $self.options.theme + ' animate-' + $self.options.animation);
		tool.classAdd($element.getElementsByTagName('ul')[0], 'flicks');
		$element.setAttribute('data-flickerplate-position', $self.options.position);

		flickerMove(true);

		// Each flick
		var $flicks = $element.querySelectorAll('ul.flicks > li');
		for (var $i = $flicks.length - 1; $i >= 0; $i--) {
			$flickCount++;
			tool.wrapInner($flicks[$i], 'div', 'flick-inner');
			tool.wrapInner($flicks[$i].querySelectorAll('.flick-inner')[0], 'div', 'flick-content');

			var $background = $flicks[$i].getAttribute('data-background') || false;
			if ($background !== false) {
				$flicks[$i].style.backgroundImage = 'url(' + $background + ')';
			}
		}

		// Kill the animation
		if ($self.options.animation != 'scroller-slide' && $self.options.animation != 'jquery-slide' && $self.options.animation != 'jquery-fade') {
			$element.addEventListener($transitionEventListner, function() {
				$flickerMoving = false;
			});
		}
	};

	function flickerSwipe(event) {
		if (event.type == 'swipeleft') {
			if (++$self.options.position > $flickCount) {
				$self.options.position = $self.options.arrowsConstraint ? $flickCount : 1;
			}
		} else if (event.type == 'swiperight') {
			if (--$self.options.position < 1) {
				$self.options.position = $self.options.arrowsConstraint ? 1 : $flickCount;
			}
		}
		flickerMove();
		flickerAutoReset();
	};

	// Execute
	flickerSetup();
	flickerAttachArrows();
	flickerAttachDots();
	flickerAutoStart();
	if (tool.isTouch()) {
		flickerHammer();
	}
}