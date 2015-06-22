/**
 * File: tabplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
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
			if ($selector.className === '') {
				$selector.removeAttribute('class');
			}
		}
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	isTouch: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	getIndex: function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
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
	}
};

// Component call
// ---------------------------------------------------------------------------------------
function Tabplate($selector, $userOptions) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new TabplateComponent($elements[$i], $userOptions);
		};
	} else if ($selectorType === '#') {
		new TabplateComponent(document.getElementById($selector.substring(1)), $userOptions);
	}
};

// Component
// ---------------------------------------------------------------------------------------
function TabplateComponent($this, $userOptions) {
	// Setup
	this.element = $this;
	this.options = {
		animate: false,
		theme: false,
		triggers: '.tabplate-triggers'
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
}

// Prototype component
// ---------------------------------------------------------------------------------------
TabplateComponent.prototype = {
	// Initialize
	init: function() {
		// Variables
		var $element = this.element;
		var $options = this.options;

		var $htmlElement = document.getElementsByTagName('html')[0];
		var $tabAnimate = ($element.getAttribute('data-tab-animate') || $options.animate).toString();
		var $tabTheme = ($element.getAttribute('data-tab-theme') || $options.theme).toString();
		var $tabTriggers = $element.getAttribute('data-tab-triggers') || $options.triggers;
		var $triggerCheck = $tabTriggers.charAt(0).toString();

		// Setup
		if (!tool.hasClass($htmlElement, 'tp-animate') && $tabAnimate === 'true') {
			tool.classAdd($htmlElement, 'tp-animate');
		}
		setupTabContent();
		setupTabTriggers();

		function setupTabContent() {
			tool.classAdd($element, 'tabplate-content');
			tool.classAdd($element.querySelector('li:first-child'), 'active');
			if ($tabAnimate === 'true') {
				$element.style.height = $element.querySelector('li.active').clientHeight + 'px';
			}
			if ($tabTheme !== 'false') {
				tool.classAdd($element, $tabTheme);
			}
		};

		function setupTabTriggers() {
			if ($triggerCheck === '.') {
				var $triggers = document.querySelectorAll($tabTriggers);
				for (var $i = $triggers.length - 1; $i >= 0; $i--) {
					var $triggerLinks = $triggers[$i].querySelectorAll('li a');
					tool.classAdd($triggers[$i].querySelector('li:first-child'), 'active');
					tool.classAdd($triggers[$i], 'tabplate-triggers');
					tool.classAdd($triggers[$i], 'tab-count-' + $triggerLinks.length);
					tabEvents($triggerLinks);
					if ($tabTheme !== 'false') {
						tool.classAdd($triggers[$i], $tabTheme);
					}
				}
			} else if ($triggerCheck === '#') {
				var $triggers = document.getElementById($triggerCheck.substring(1));
				tool.classAdd($triggers, 'tabplate-triggers');
				tabEvents($triggers.querySelectorAll('li a'));
				if ($tabTheme !== 'false') {
					tool.classAdd($triggers, $tabTheme);
				}
			}
		};

		function tabEvents($triggerLinks) {
			for (var $i = $triggerLinks.length - 1; $i >= 0; $i--)(function($i) {
				$triggerLinks[$i].onclick = function($ev) {
					$ev.preventDefault();
					var $triggerIndex = tool.getIndex(this.parentNode);
					var $newActiveTab = $element.querySelector('li:nth-child(' + ($triggerIndex + 1) + ')');
					tool.classRemove(document.querySelector($tabTriggers + ' li.active'), 'active');
					tool.classRemove($element.querySelector('li.active'), 'active');
					tool.classAdd(this.parentNode, 'active');
					tool.classAdd($newActiveTab, 'active');
					if ($tabAnimate === 'true') {
						$element.style.height = $newActiveTab.clientHeight + 'px';
					}
				};
			})($i);
		}
	}
};