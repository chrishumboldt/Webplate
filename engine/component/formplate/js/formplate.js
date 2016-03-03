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
	// Variables
	var $self = this;
	$self.options = {
		selector: ($userOptions && $userOptions.selector) ? $userOptions.selector : $formplateDefault.selector,
		colour: ($userOptions && $userOptions.colour) ? $userOptions.colour : $formplateDefault.colour,
		style: ($userOptions && $userOptions.style) ? $userOptions.style : $formplateDefault.style
	}

	var $formplateEls = document.querySelectorAll($self.options.selector);

	if (!web.isTouch() && !web.hasClass(web.element.html, 'fp-no-touch')) {
		web.classAdd(web.element.html, 'fp-no-touch');
	}

	// Functions
	var checkToggle = function($element) {
		$element.onclick = function() {
			if (web.hasClass($element.parentNode, '_checked')) {
				$element.checked = false;
				web.classRemove($element.parentNode, '_checked');
			} else {
				$element.checked = true;
				web.classAdd($element.parentNode, '_checked');
			}
		};
	};
	var inputFocus = function($thisFormEl) {
		var $inputs = $thisFormEl.querySelectorAll('input');
		for (var $i = 0, $len = $inputs.length; $i < $len; $i++) {
			var $thisInput = $inputs[$i];
			$thisInput.onfocus = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				web.classAdd($parent, '_focused');
			};
			$thisInput.onblur = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				web.classRemove($parent, '_focused');
			};
		}
	};
	var radioToggle = function($element) {
		$element.onclick = function() {
			var $inputRadioGroup = document.getElementsByName($element.getAttribute('name'));
			for (var $i = 0, $len = $inputRadioGroup.length; $i < $len; $i++) {
				$inputRadioGroup[$i].checked = false;
				web.classRemove($inputRadioGroup[$i].parentNode, '_checked');
			}
			$element.checked = true;
			web.classAdd($element.parentNode, '_checked');
		};
	};
	var textareaFocus = function($textarea) {
		$textarea.onfocus = function() {
			web.classAdd($textarea.parentNode, '_focused');
		};
		$textarea.onblur = function() {
			web.classRemove($textarea.parentNode, '_focused');
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
				$baseClasses += ($input.checked === true) ? ' _checked' : '';
				if (web.hasClass($input, 'toggler')) {
					web.classAdd($thisFormEl, 'fp-tog' + $baseClasses);
				} else {
					web.classAdd($thisFormEl, 'fp-check' + $baseClasses);
				}
				checkToggle($input);
			} else if ($inputType === 'radio') {
				$baseClasses += ($input.checked === true) ? ' _checked' : '';
				web.classAdd($thisFormEl, 'fp-check _t-radio' + $baseClasses);
				radioToggle($input);
			} else if ($inputType === 'password') {
				web.classAdd($thisFormEl, 'fp-inp _t-password' + $baseClasses);
				inputFocus($thisFormEl);
			} else {
				web.classAdd($thisFormEl, 'fp-inp' + $baseClasses);
				inputFocus($thisFormEl);
			}
		} else if ($thisFormEl.querySelector('textarea')) {
			var $textarea = $thisFormEl.querySelector('textarea');
			web.classAdd($thisFormEl, 'fp-text' + $baseClasses);
			textareaFocus($textarea);
		} else if ($thisFormEl.querySelector('select')) {
			var $select = $thisFormEl.querySelector('select');
			if ($select != null) {
				web.classAdd($thisFormEl, 'fp-sel' + $baseClasses);
			}
		}
	}
};