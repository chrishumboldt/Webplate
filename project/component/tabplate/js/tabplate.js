/**
 * File: tabplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools

var $tabplateDefault = {
	selector: '#tabplate-triggers',
	animate: false,
	tabs: '#tabplate-tabs'
}

var tabplate = function($userOptions) {
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
		var exists = function($element) {
			return ($element === null || typeof($element) === undefined) ? false : true;
		};

		// Return
		return {
			classAdd: classAdd,
			classRemove: classRemove,
			element: $toolEl,
			exists: exists
		};
	}(document);

	var $selector = ($userOptions && $userOptions.selector) ? $userOptions.selector : $flickerplateDefault.selector;
	var $selectorType = $selector.charAt(0).toString();
	if ($selectorType === '#' && $selector.indexOf('.') < 0) {
		new tabplateComponent(document.getElementById($selector.substring(1)), $userOptions, tool);
	} else {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new tabplateComponent($elements[$i], $userOptions, tool);
		}
	}
};

var tabplateComponent = function($this, $userOptions, tool) {
	// Variables
	var $self = $this;
	var $tabContent;
	var $tabs;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		animate: (typeof $userOptions.animate !== 'undefined') ? $userOptions.animate : $tabplateDefault.animate,
		tabs: $userOptions.tabs || $tabplateDefault.tabs,
	};

	// Public functions
	$self.changeTab = function($index) {
		tool.classRemove($self.querySelector('li.active'), 'active');
		tool.classAdd($self.querySelector('li:nth-child(' + ($index + 1) + ')'), 'active');
		tool.classRemove($tabs.querySelector('li.active'), 'active');
		tool.classAdd($tabs.querySelector('li:nth-child(' + ($index + 1) + ')'), 'active');
		if ($self.options.animate.toString() == 'true') {
			$tabs.style.height = $tabs.querySelector('li.active').clientHeight + 'px';
		}
	};

	// Internal functions
	function tabSetup() {
		if ($self.options.tabs.charAt(0) === '#') {
			$tabs = document.getElementById($self.options.tabs.substring(1));
		} else {
			$tabs = document.querySelector($self.options.tabs);
		}

		if (tool.exists($tabs)) {
			tool.classAdd($tabs, 'tabplate-tabs');
			tool.classAdd($tabs.querySelector('li:first-child'), 'active');

			if ($self.options.animate.toString() == 'true') {
				$tabs.style.height = $tabs.querySelector('li.active').clientHeight + 'px';
			}

			// Animiate class
			if ($self.options.animate.toString() == 'true') {
				tool.classAdd(tool.element.html, 'tp-animate');
			}
		}
	}

	function triggerSetup() {
		var $triggerLinks = $self.querySelectorAll('li a');
		var $triggerLength = $triggerLinks.length;
		tool.classAdd($self, 'tabplate-triggers');
		tool.classAdd($self, 'tabplate-count-' + $triggerLength);
		tool.classAdd($self.querySelector('li:first-child'), 'active');
		for (var $i = $triggerLength - 1; $i >= 0; $i--) {
			$triggerLinks[$i].onclick = (function() {
				var $selfI = $i;
				return function($ev) {
					$ev.preventDefault();
					$self.changeTab($selfI);
				}
			})();
		}
	}

	// Calls
	tabSetup();
	triggerSetup();
};