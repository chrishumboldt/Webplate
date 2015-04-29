/**
 * File: buttonplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 * Last Edited: 29 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Component call
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
function Buttonplate($selector) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new ButtonplateComponent($elements[$i]);
		};
	} else if ($selectorType === '#') {
		new ButtonplateComponent(document.getElementById($selector.substring(1)));
	};
};

// Component
// ---------------------------------------------------------------------------------------
function ButtonplateComponent($this) {
	this.element = $this;
	this.init();
};

// Prototype component
// ---------------------------------------------------------------------------------------
ButtonplateComponent.prototype = {
	init: function() {
		var $button = this.element;
		var $buttonDropDown = $button.getElementsByTagName('ul')[0];

		// Setup
		buttonSetup();

		// Functions
		function buttonSetup() {
			if ($buttonDropDown !== undefined) {
				tool.classAdd($button, 'button-drop-down');
				buttonTrigger();
			}
		};

		function buttonTrigger() {
			// Hide existing
			document.onclick = function() {
				var $openDropDowns = document.querySelectorAll('.button-drop-down-open');
				for (var $i = 0; $i < $openDropDowns.length; $i++) {
					tool.classRemove($openDropDowns[$i], 'button-drop-down-open');
				};
			};
			$buttonDropDown.onclick = function() {
				setTimeout(function() {
					tool.classRemove($buttonDropDown, 'button-drop-down-open');
				}, 15);
			};

			// Show
			$button.onclick = function() {
				setTimeout(function() {
					var $buttonW = $button.clientWidth;
					$buttonDropDown.style.width = $buttonW + 'px';
					tool.classAdd($buttonDropDown, 'button-drop-down-open');
				}, 10);
			};
		};
	}
};