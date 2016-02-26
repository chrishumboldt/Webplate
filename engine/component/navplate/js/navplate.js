/**
 * File: js/navplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Variables
// Options
// Tools

// Defaults
var $navplateDefault = {
	selector: '.navplate-trigger',
	clone: false,
	close: 'close',
	reveal: 'left',
	type: 'slide'
};

var navplate = function($userOptions) {
	// Variables
	var $self = this;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		selector: $userOptions.selector || $navplateDefault.selector,
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
		var eventRemove = function($elem, $type, $eventHandle) {
			if ($elem == null || typeof($elem) == 'undefined') return;
			if ($elem.removeEventListener) {
				$elem.removeEventListener($type, $eventHandle, false);
			} else if ($elem.detachEvent) {
				$elem.detachEvent("on" + $type, $eventHandle);
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
			eventRemove: eventRemove,
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
				tool.classAdd(tool.element.html, 'np-no-touch');
			}
			if (!tool.exists(document.getElementById('web-overlay'))) {
				tool.element.body.appendChild(tool.html.navOverlay);
			}
			tool.classAdd($self, 'np-trigger');

			// Clone
			if ($option.clone === true) {
				var $navClone = $navElement.cloneNode(true);
				tool.classAdd($navClone, 'np clone _t-' + $option.type + ' _r-' + $option.reveal);
				tool.element.body.appendChild($navClone);
				$navElement = $navClone;
			} else {
				tool.classAdd($navElement, 'np _t-' + $option.type + ' _r-' + $option.reveal);
				setTimeout(function() {
					tool.classAdd($navElement, 'np-ready');
				}, 500);
			}

			// Fullscreen option
			if ($option.type == 'fullscreen') {
				var $navClose = document.createElement('a');
				$navClose.className = 'np-close';
				$navClose.innerHTML = $option.close;
				$navElement.appendChild($navClose);
			}

			// Contextual option
			if ($option.type == 'contextual') {
				var $navCloseUl = document.createElement('ul');
				var $navCloseLi = document.createElement('li');
				var $navClose = document.createElement('a');
				$navClose.className = 'np-close';
				$navClose.innerHTML = $option.close;
				$navCloseUl.className = 'close-list';
				$navCloseLi.appendChild($navClose);
				$navCloseUl.appendChild($navCloseLi);
				if (!tool.exists($navElement.querySelector('.np-close'))) {
					$navElement.appendChild($navCloseUl);
				}
			}
		}

		function navReveal() {
			var $navLinks = $navElement.querySelectorAll('a');
			var $navLinkClose = $navElement.querySelectorAll('a.np-close');
			$self.onclick = function(event) {
				event.preventDefault();
				if (!tool.hasClass($navElement, 'np-display')) {
					var $clickX = event.clientX;
					var $clickY = event.clientY + (tool.element.body.scrollTop);

					navRemoveHTMLOptionClasses();
					var $openNavs = document.querySelectorAll('.np.np-display');
					for (var $i = 0, $len = $openNavs.length; $i < $len; $i++) {
						tool.classRemove($openNavs[$i], 'np-display');
					}
					tool.classAdd($navElement, 'np-display');
					tool.classAdd(tool.element.html, 'np-reveal np-t-' + $option.type);
					if ($option.type == 'contextual' && (window.innerWidth >= 700)) {
						$navElement.style.top = $clickY + 20 + 'px';
						$navElement.style.left = $clickX + 'px';
					}
					// window.addEventListener('resize', navClose);
					tool.eventAdd(window, 'resize', navClose);
					document.getElementById('web-overlay').onclick = function() {
						navClose();
					};
				} else {
					navClose();
				}
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
			tool.eventRemove(window, 'resize', navClose);
			tool.classRemove(document.querySelector('.np.np-display'), 'np-display');
			tool.classRemove(tool.element.html, 'np-reveal');
			$navElement.removeAttribute('style');
			navRemoveHTMLOptionClasses();
		}

		function navRemoveHTMLOptionClasses() {
			tool.classRemove(tool.element.html, 'np-t-slide');
			tool.classRemove(tool.element.html, 'np-t-fullscreen');
			tool.classRemove(tool.element.html, 'np-t-contextual');
		}

		// Execute
		navSetup();
		navReveal();
	}
};