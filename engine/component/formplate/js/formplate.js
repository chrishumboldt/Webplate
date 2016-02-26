/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools
// Variables

// Defaults
// Defaults
var $formplateDefault = {
	selector: '.formplate',
	colour: 'blue',
	style: 'line'
};

function formplate($userOptions) {
	// Tools
	var tool = function(document) {
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
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			eventAdd: eventAdd,
			hasClass: hasClass,
			isTouch: isTouch
		}
	}(document);

	// Variables
	var $self = this;
	$self.options = {
		selector: ($userOptions && $userOptions.selector) ? $userOptions.selector : $formplateDefault.selector,
		colour: ($userOptions && $userOptions.colour) ? $userOptions.colour : $formplateDefault.colour,
		style: ($userOptions && $userOptions.style) ? $userOptions.style : $formplateDefault.style
	}

	var $formplateEls = document.querySelectorAll($self.options.selector);

	if (!tool.isTouch() && !tool.hasClass(tool.element.html, 'fp-no-touch')) {
		tool.classAdd(tool.element.html, 'fp-no-touch');
	}

	// Functions
	var checkToggle = function($element) {
		$element.onclick = function() {
			if (tool.hasClass($element.parentNode, '_checked')) {
				tool.classRemove($element.parentNode, '_checked');
			} else {
				tool.classAdd($element.parentNode, '_checked');
			}
		};
	};
	var inputFocus = function($thisFormEl) {
		var $inputs = $thisFormEl.querySelectorAll('input');
		for (var $i = 0, $len = $inputs.length; $i < $len; $i++) {
			var $thisInput = $inputs[$i];
			$thisInput.onfocus = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				tool.classAdd($parent, '_focused');
			};
			$thisInput.onblur = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				tool.classRemove($parent, '_focused');
			};
		}
	};
	var radioToggle = function($element) {
		$element.onclick = function() {
			var $inputRadioGroup = document.getElementsByName($element.getAttribute('name'));
			for (var $i = 0, $len = $inputRadioGroup.length; $i < $len; $i++) {
				tool.classRemove($inputRadioGroup[$i].parentNode, '_checked');
			}
			tool.classAdd($element.parentNode, '_checked');
		};
	};
	var textareaFocus = function($textarea) {
		$textarea.onfocus = function() {
			tool.classAdd($textarea.parentNode, '_focused');
		};
		$textarea.onblur = function() {
			tool.classRemove($textarea.parentNode, '_focused');
		};
	};

	// Loop over all elements and apply
	for (var $i = 0, $len = $formplateEls.length; $i < $len; $i++) {
		var $thisFormEl = $formplateEls[$i];
		var $baseClasses = ' _c-' + $self.options.colour + ' _s-' + $self.options.style;

		// Set the input classes
		if ($thisFormEl.querySelector('input')) {
			var $input = $thisFormEl.querySelector('input');
			var $inputType = $input.getAttribute('type');

			if ($inputType === 'checkbox') {
				$baseClasses += ($input.getAttribute('checked') === 'checked') ? ' _checked' : '';
				if (tool.hasClass($input, 'toggler')) {
					tool.classAdd($thisFormEl, 'fp-tog' + $baseClasses);
				} else {
					tool.classAdd($thisFormEl, 'fp-check' + $baseClasses);
				}
				checkToggle($input);
			} else if ($inputType === 'radio') {
				$baseClasses += ($input.getAttribute('checked') === 'checked') ? ' _checked' : '';
				tool.classAdd($thisFormEl, 'fp-check _t-radio' + $baseClasses);
				radioToggle($input);
			} else if ($inputType === 'password') {
				tool.classAdd($thisFormEl, 'fp-inp _t-password' + $baseClasses);
				inputFocus($thisFormEl);
			} else {
				tool.classAdd($thisFormEl, 'fp-inp' + $baseClasses);
				inputFocus($thisFormEl);
			}
		} else if ($thisFormEl.querySelector('textarea')) {
			var $textarea = $thisFormEl.querySelector('textarea');
			tool.classAdd($thisFormEl, 'fp-text' + $baseClasses);
			textareaFocus($textarea);
		} else if ($thisFormEl.querySelector('select')) {
			var $select = $thisFormEl.querySelector('select');
			if ($select != null) {
				tool.classAdd($thisFormEl, 'fp-sel' + $baseClasses);
			}
		}
	}
};