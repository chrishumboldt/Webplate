/**
 * File: buttonplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 * Last Edited: 1 May 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Touch check
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
	getIndex: function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
	},
	isTouch: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	},
	wrap: function($element, $tag, $className) {
		var $wrapper = document.createElement($tag);
		var $tempElement = $element.cloneNode(true);
		$wrapper.className = $className;

		$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
		$element.parentNode.removeChild($element);
	},
	wrapInner: function($element, $tag, $className) {
		if (typeof $tag === "string") {
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
	}
};

// Touch check
// ---------------------------------------------------------------------------------------
var $htmlElement = document.getElementsByTagName('html')[0];
if (!tool.isTouch() && !tool.hasClass($htmlElement, 'bp-no-touch')) {
	tool.classAdd($htmlElement, 'bp-no-touch');
}

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
				tool.classAdd($button, 'bp-drop-down');
				buttonTrigger();
			}
		};

		function buttonTrigger() {
			// Hide existing
			document.onclick = function() {
				var $openDropDowns = document.querySelectorAll('.bp-drop-down-open');
				for (var $i = 0; $i < $openDropDowns.length; $i++) {
					tool.classRemove($openDropDowns[$i], 'bp-drop-down-open');
				};
			};
			$buttonDropDown.onclick = function() {
				setTimeout(function() {
					tool.classRemove($buttonDropDown, 'bp-drop-down-open');
				}, 15);
			};

			// Show
			$button.onclick = function() {
				setTimeout(function() {
					var $buttonW = $button.clientWidth;
					$buttonDropDown.style.width = $buttonW + 'px';
					tool.classAdd($buttonDropDown, 'bp-drop-down-open');
				}, 10);
			};
		};
	}
};