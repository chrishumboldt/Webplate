/**
 * File: buttonplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

var buttonplate = function($selector) {
	// Tools
	var tool = function(document) {
		// Variables
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
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			isTouch: isTouch
		}
	}(document);

	// Select elements
	var $selectorType = $selector.charAt(0).toString();
	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new buttonplateComponent($elements[$i], tool);
		};
	} else if ($selectorType === '#') {
		new buttonplateComponent(document.getElementById($selector.substring(1)), tool);
	}
};

var buttonplateComponent = function($this, tool) {
	// Variables
	var $self = $this;
	var $buttonDropDown = $self.getElementsByTagName('ul')[0];

	// Internal functions
	function basicSetup() {
		if (!tool.isTouch()) {
			tool.classAdd(tool.element.html, 'buttonplate-no-touch');
		}
	};

	function buttonDropDownSetup() {
		if ($buttonDropDown !== undefined) {
			tool.classAdd($self, 'buttonplate-drop-down');
			buttonDropDownTrigger();
		}
	};

	function buttonDropDownTrigger() {
		// Hide existing
		document.onclick = function() {
			var $openDropDowns = document.querySelectorAll('.buttonplate-drop-down .open');
			for (var $i = $openDropDowns.length - 1; $i >= 0; $i--) {
				tool.classRemove($openDropDowns[$i], 'open');
			};
		};
		$buttonDropDown.onclick = function() {
			setTimeout(function() {
				tool.classRemove($buttonDropDown, 'open');
			}, 15);
		};

		// Show
		$self.onclick = function() {
			setTimeout(function() {
				var $buttonW = $self.clientWidth;
				$buttonDropDown.style.width = $buttonW + 'px';
				tool.classAdd($buttonDropDown, 'open');
			});
		};
	}

	// Calls
	basicSetup();
	buttonDropDownSetup();
};
