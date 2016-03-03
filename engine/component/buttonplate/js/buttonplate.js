/**
 * File: buttonplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools
// Variables

// Defaults
var $buttonplateDefault = {
	selector: '.button'
};

var buttonplate = function($userOptions) {
	// Select elements
	var $selector = ($userOptions && $userOptions.selector) ? $userOptions.selector : $buttonplateDefault.selector;
	var $selectorType = $selector.charAt(0).toString();
	if ($selectorType === '#' && !web.hasWhiteSpace($self.options.selector)) {
		new buttonplateComponent(document.getElementById($selector.substring(1)));
	} else {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new buttonplateComponent($elements[$i]);
		}
	}
};

var buttonplateComponent = function($this) {
	// Variables
	var $self = $this;
	var $buttonDropDown = $self.getElementsByTagName('ul')[0];

	// Internal functions
	function basicSetup() {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'buttonplate-no-touch');
		}
	};

	function buttonDropDownSetup() {
		if ($buttonDropDown !== undefined) {
			web.classAdd($self, 'buttonplate-drop-down');
			buttonDropDownTrigger();
		}
	};

	function buttonDropDownTrigger() {
		// Hide existing
		document.onclick = function() {
			var $openDropDowns = document.querySelectorAll('.buttonplate-drop-down .open');
			for (var $i = $openDropDowns.length - 1; $i >= 0; $i--) {
				web.classRemove($openDropDowns[$i], 'open');
			};
		};
		$buttonDropDown.onclick = function() {
			setTimeout(function() {
				web.classRemove($buttonDropDown, 'open');
			}, 15);
		};

		// Show
		$self.onclick = function() {
			setTimeout(function() {
				var $buttonW = $self.clientWidth;
				$buttonDropDown.style.width = $buttonW + 'px';
				web.classAdd($buttonDropDown, 'open');
			});
		};
	}

	// Calls
	basicSetup();
	buttonDropDownSetup();
};