/**
 * File: js/navplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Default setup
// Component
// Variables
// Options
// Tools

// Defaults
var $navplateDefault = {
	selector: '.navplate-trigger',
	active: 'small',
	clone: false,
	close: 'close',
	reveal: 'left',
	type: 'slide'
};

// Component
var navplate = function($userOptions) {
	// Variables
	var $self = this;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		selector: $userOptions.selector || $navplateDefault.selector,
		active: $userOptions.active || $navplateDefault.active,
		clone: $userOptions.clone || $navplateDefault.clone,
		close: $userOptions.close || $navplateDefault.close,
		type: $userOptions.type || $navplateDefault.type,
		reveal: $userOptions.reveal || $navplateDefault.reveal
	}

	// Tools
	var tool = function(document, $options) {
		// HTML
		var $navOverlay = document.createElement('div');
		$navOverlay.id = 'web-overlay';
		var $toolHtml = {
			navOverlay: $navOverlay
		};

		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
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
		var eventAdd = function($elem, $type, $eventHandle) {
			if ($elem == null || typeof($elem) == 'undefined') return;
			if ($elem.addEventListener) {
				$elem.addEventListener($type, $eventHandle, false);
			} else if ($elem.attachEvent) {
				$elem.attachEvent("on" + $type, $eventHandle);
			} else {
				$elem["on" + $type] = $eventHandle;
			}
		};
		var exists = function($element) {
			if ($element === null || typeof($element) === undefined) {
				return false;
			} else {
				return true;
			}
		};
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		// Return
		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			eventAdd: eventAdd,
			exists: exists,
			hasClass: hasClass,
			html: $toolHtml,
			isTouch: isTouch
		}
	}(document, $self.options);

	// Apply to element
	var $selectorType = $self.options.selector.charAt(0).toString();
	if ($selectorType === '#' && $self.options.selector.indexOf('.') < 0) {
		new navplateComponent(document.getElementById($self.options.selector.substring(1)), $self.options, tool);
	} else {
		var $elements = document.querySelectorAll($self.options.selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new navplateComponent($elements[$i], $self.options, tool);
		};
	}
};

var navplateComponent = function($this, $option, tool) {
	if (tool.exists($this)) {
		// Variables
		var $self = $this;
		var $link = $self.getAttribute('href');
		var $navElement = document.querySelector($link);

		// Functions
		function navSetup() {
			if (!tool.isTouch()) {
				tool.classAdd(tool.element.html, 'navplate-no-touch');
			}
			if (!tool.exists(document.getElementById('web-overlay'))) {
				tool.element.body.appendChild(tool.html.navOverlay);
			}
			tool.classAdd($self, 'navplate-trigger');

			// Clone
			if ($option.clone === true) {
				var $navClone = $navElement.cloneNode(true);
				tool.classAdd($navClone, 'navplate clone type-' + $option.type + ' reveal-' + $option.reveal + ' active-' + $option.active);
				tool.element.body.appendChild($navClone);
				$navElement = $navClone;
			} else {
				tool.classAdd($navElement, 'navplate type-' + $option.type + ' reveal-' + $option.reveal + ' active-' + $option.active);
				setTimeout(function() {
					tool.classAdd($navElement, 'navplate-ready');
				}, 400);
			}

			if ($option.type == 'fullscreen') {
				var $navClose = document.createElement('a');
				$navClose.className = 'navplate-close';
				$navClose.innerHTML = $option.close;
				$navElement.appendChild($navClose);
			}
		}

		function navReveal() {
			var $navLinks = $navElement.querySelectorAll('a');
			var $navLinkClose = $navElement.querySelectorAll('a.navplate-close');
			$self.onclick = function(event) {
				event.preventDefault();
				if (!tool.hasClass($navElement, 'nav-display')) {
					tool.classAdd($navElement, 'nav-display');
					tool.classAdd(tool.element.html, 'navplate-reveal navplate-type-' + $option.type);
				} else {
					navClose();
				}
			};
			document.getElementById('web-overlay').onclick = function() {
				navClose();
			};
			for (var $i = $navLinks.length - 1; $i >= 0; $i--) {
				$navLinks[$i].onclick = function() {
					navClose();
				};
			}
			for (var $i = $navLinkClose.length - 1; $i >= 0; $i--) {
				$navLinkClose[$i].onclick = function() {
					navClose();
				};
			}
		}

		function navClose() {
			tool.classRemove(document.querySelector('.navplate.nav-display'), 'nav-display');
			tool.classRemove(tool.element.html, 'navplate-reveal');
			tool.classRemove(tool.element.html, 'navplate-type-' + $option.type);
		}

		// Execute
		navSetup();
		navReveal();
	}
};