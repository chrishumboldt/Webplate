/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 * Last Edited: 29 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Component call

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
function Formplate($selector) {
	// Variables
	var $bodyElement = document.getElementsByTagName('body')[0];
	var $formColour = $bodyElement.getAttribute('data-formplate-colour');
	var $formCheckboxes = document.querySelectorAll('.formplate input[type="checkbox"]');
	var $formRadioButtons = document.querySelectorAll('.formplate input[type="radio"]');
	var $formSelects = document.querySelectorAll('.formplate select');
	var $formTogglerHTML = document.createElement('span');
	$formTogglerHTML.className = 'handle';

	// Set the colour
	tool.classAdd($bodyElement, 'fp-colour-' + $formColour);

	// Checkboxes
	for (var $i = 0; $i < $formCheckboxes.length; $i++) {
		var $classes = (tool.hasClass($formCheckboxes[$i], 'toggler') === true) ? 'fp-toggler' : 'fp-checkbox';
		$classes += ($formCheckboxes[$i].getAttribute('checked') === 'checked') ? ' checked' : '';

		if (!tool.hasClass($formCheckboxes[$i].parentNode, 'fp-toggler') && !tool.hasClass($formCheckboxes[$i].parentNode, 'fp-checkbox')) {
			tool.wrap($formCheckboxes[$i], 'span', $classes);
		}
	}

	// Add toggler handle
	var $formTogglers = document.querySelectorAll('.fp-toggler');
	for (var $i = 0; $i < $formTogglers.length; $i++) {
		$formTogglers[$i].appendChild($formTogglerHTML.cloneNode());
	}

	// Radio buttons
	for (var $i = 0; $i < $formRadioButtons.length; $i++) {
		var $classes = ($formRadioButtons[$i].getAttribute('checked') === 'checked') ? 'fp-radio checked' : 'fp-radio';

		if (!tool.hasClass($formRadioButtons[$i].parentNode, 'fp-radio')) {
			tool.wrap($formRadioButtons[$i], 'span', $classes);
		}
	}

	// Selects
	for (var $i = 0; $i < $formSelects.length; $i++) {
		if (!tool.hasClass($formSelects[$i].parentNode, 'fp-select')) {
			tool.wrap($formSelects[$i], 'span', 'fp-select');
		}
	}

	// Events
	var $formCheckboxesNew = document.querySelectorAll('.fp-checkbox');
	for (var $i = 0; $i < $formCheckboxesNew.length; $i++)(function($i) {
		$formCheckboxesNew[$i].onclick = function() {
			if (tool.hasClass($formCheckboxesNew[$i], 'checked')) {
				tool.classRemove($formCheckboxesNew[$i], 'checked');
			} else {
				tool.classAdd($formCheckboxesNew[$i], 'checked');
			}
		};
	})($i);
	var $formRadioButtonsNew = document.querySelectorAll('.fp-radio');
	for (var $i = 0; $i < $formRadioButtonsNew.length; $i++)(function($i) {
		$formRadioButtonsNew[$i].onclick = function() {
			var $formRadioButtonInputName = $formRadioButtonsNew[$i].getElementsByTagName('input')[0].getAttribute('name');
			var $formRadioButtonsByName = document.querySelectorAll('input[name="' + $formRadioButtonInputName + '"]');

			for (var $i2 = 0; $i2 < $formRadioButtonsByName.length; $i2++) {
				tool.classRemove($formRadioButtonsByName[$i2].parentNode, 'checked');
			}

			tool.classAdd($formRadioButtonsNew[$i], 'checked');
		};
	})($i);
	var $formTogglersNew = document.querySelectorAll('.fp-toggler');
	for (var $i = 0; $i < $formTogglersNew.length; $i++)(function($i) {
		$formTogglersNew[$i].onclick = function() {
			if (tool.hasClass($formTogglersNew[$i], 'checked')) {
				tool.classRemove($formTogglersNew[$i], 'checked');
			} else {
				tool.classAdd($formTogglersNew[$i], 'checked');
			}
		};
	})($i);
};