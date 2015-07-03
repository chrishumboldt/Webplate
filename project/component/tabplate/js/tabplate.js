/**
 * File: tabplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Options
// Tools
// Calls

var tabplate = function($selector, $userOptions) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new tabplateComponent($elements[$i], $userOptions);
		};
	} else if ($selectorType === '#') {
		new tabplateComponent(document.getElementById($selector.substring(1)), $userOptions);
	}
};

var tabplateComponent = function($this, $userOptions) {
	//Variables
	var $self = $this;
	var $tabContent;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		animate: $self.getAttribute('data-tabplate-animate') || $userOptions.animate || false,
		theme: false,
		tabs: $self.getAttribute('data-tabplate-tabs') || $userOptions.tabs || '.tabplate-tabs'
	};

	// Tools
	var tool = function(document, $options) {
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

		// Return
		return {
			classAdd: classAdd,
			classRemove: classRemove,
			element: $toolEl
		};
	}(document, $self.options);

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