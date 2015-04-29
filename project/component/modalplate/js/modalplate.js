/**
 * File: modalplate.js
 * Type: Javacript component file
 * Author: Chris Humboldt
 * Last Edited: 24 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Component call
// Component
// Prototype component

// Tools
// ---------------------------------------------------------------------------------------
var tool = {
	addEvent: function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	},
	classAdd: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($selector.className.indexOf($class) === -1) {
			$selector.className = $selector.className === '' ? $class : $selector.className + ' ' + $class;
		}
	},
	classRemove: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($crtClass.indexOf($class) > -1) {
			$selector.className = $selector.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
		}
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	}
};

// Component call
// ---------------------------------------------------------------------------------------
function Modalplate($selector, $userOptions) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new ModalplateComponent($elements[$i], $userOptions);
		};
	} else {
		new ModalplateComponent(document.getElementById($selector.substring(1)), $userOptions);
	};
};

// Component
// ---------------------------------------------------------------------------------------
function ModalplateComponent($this, $userOptions) {

	// Setup
	this.element = $this;
	this.options = {
		reveal: 'slide-from-top',
		revealLarge: false,
		trigger: '.modal-trigger',
		triggerMax: false,
		triggerMin: false
	};

	// User options
	if (typeof $userOptions === 'object') {
		for (var $optionKey in $userOptions) {
			if ($userOptions.hasOwnProperty($optionKey)) {
				this.options[$optionKey] = $userOptions[$optionKey];
			}
		}
	}

	// Initialise
	this.init();
};

// Prototype component
// ---------------------------------------------------------------------------------------
ModalplateComponent.prototype = {
	// Initialize
	init: function() {
		// Variables
		var $element = this.element;
		var $options = this.options;

		var $htmlElement = document.getElementsByTagName('html')[0];
		var $modalTrigger = $element.getAttribute('data-modal-trigger') || $options.trigger;
		var $modalReveal = $element.getAttribute('data-modal-reveal') || $options.reveal;
		var $modalRevealLarge = $element.getAttribute('data-modal-reveal-large') || $options.revealLarge;
		var $modalTriggerMax = $element.getAttribute('data-modal-trigger-max') || $options.triggerMax;
		var $modalTriggerMin = $element.getAttribute('data-modal-trigger-min') || $options.triggerMin;

		// Setup
		tool.classAdd($element, 'modalplate');
		setupOverlay();
		setupReveal();
		tool.addEvent(window, 'resize', function() {
			setupReveal();
		});

		// Show & hide
		triggerReveal();
		triggerClose();

		// Functions
		function modalClose() {
			if (tool.hasClass($htmlElement, 'modalplate-reveal')) {
				tool.classRemove($element, 'reveal');
				tool.classRemove($htmlElement, 'modalplate-reveal');
			}
		}

		function modalReveal($ev) {
			if (triggerCheck() && !tool.hasClass($htmlElement, 'modalplate-reveal')) {
				$ev.preventDefault();
				tool.classAdd($element, 'reveal');
				tool.classAdd($htmlElement, 'modalplate-reveal');
			}
		};

		function setupOverlay() {
			if (document.getElementById('modalplate-overlay') === null) {
				var $overlay = document.createElement('div');
				tool.idAdd($overlay, 'modalplate-overlay');
				document.getElementsByTagName('body')[0].appendChild($overlay);
			};
		}

		function setupReveal($resizeCheck) {
			if ($modalRevealLarge !== false) {
				if (window.innerWidth <= 700) {
					tool.classRemove($element, $modalRevealLarge);
					tool.classAdd($element, $modalReveal);
				} else {
					tool.classRemove($element, $modalReveal);
					tool.classAdd($element, $modalRevealLarge);
				}
			} else {
				tool.classAdd($element, $modalReveal);
			}
		};

		function triggerCheck() {
			if ($modalTriggerMax !== false && window.innerWidth < $modalTriggerMax) {
				return true;
			} else if ($modalTriggerMin !== false && window.innerWidth >= $modalTriggerMin) {
				return true;
			} else if ($modalTriggerMax === false && $modalTriggerMin === false) {
				return true;
			} else {
				return false;
			};
		}

		function triggerClose() {
			var $closeTriggers = document.querySelectorAll('#modalplate-overlay, .modalplate .close');
			for (var $i = 0; $i < $closeTriggers.length; $i++) {
				$closeTriggers[$i].onclick = function($ev) {
					return function($ev) {
						$ev.preventDefault();
						modalClose();
					};
				}($i);
			};
		};

		function triggerReveal() {
			if ($modalTrigger.charAt(0) === '.') {
				var $classTriggers = document.querySelectorAll($modalTrigger);
				for (var $i = 0; $i < $classTriggers.length; $i++) {
					$classTriggers[$i].onclick = function($ev) {
						return function($ev) {
							modalReveal($ev);
						};
					}($i);
				}
			} else if ($modalTrigger.charAt(0) === '#') {
				document.getElementById($modalTrigger.substring(1)).onclick = function($ev) {
					modalReveal($ev);
				};
			}
		};
	}
};