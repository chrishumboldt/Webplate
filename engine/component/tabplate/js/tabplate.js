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
	var $selector = ($userOptions && $userOptions.selector) ? $userOptions.selector : $tabplateDefault.selector;
	var $selectorType = $selector.charAt(0).toString();
	if ($selectorType === '#' && $selector.indexOf('.') < 0) {
		new tabplateComponent(document.getElementById($selector.substring(1)), $userOptions);
	} else {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new tabplateComponent($elements[$i], $userOptions);
		}
	}
};

var tabplateComponent = function($this, $userOptions) {
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
		web.classRemove($self.querySelector('li.active'), 'active');
		web.classAdd($self.querySelector('li:nth-child(' + ($index + 1) + ')'), 'active');
		web.classRemove($tabs.querySelector('li.active'), 'active');
		web.classAdd($tabs.querySelector('li:nth-child(' + ($index + 1) + ')'), 'active');
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

		if (web.exists($tabs)) {
			web.classAdd($tabs, 'tabplate-tabs');
			web.classAdd($tabs.querySelector('li:first-child'), 'active');

			if ($self.options.animate.toString() == 'true') {
				$tabs.style.height = $tabs.querySelector('li.active').clientHeight + 'px';
			}

			// Animiate class
			if ($self.options.animate.toString() == 'true') {
				web.classAdd(web.element.html, 'tp-animate');
			}
		}
	}

	function triggerSetup() {
		var $triggerLinks = $self.querySelectorAll('li a');
		var $triggerLength = $triggerLinks.length;
		web.classAdd($self, 'tabplate-triggers');
		web.classAdd($self, 'tabplate-count-' + $triggerLength);
		web.classAdd($self.querySelector('li:first-child'), 'active');
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