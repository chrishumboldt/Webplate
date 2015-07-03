/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Tools
// Variables

function formplate($selector) {
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
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};
		var wrap = function($element, $tag, $className) {
			var $wrapper = document.createElement($tag);
			var $tempElement = $element.cloneNode(true);
			$wrapper.className = $className;

			$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
			$element.parentNode.removeChild($element);
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			hasClass: hasClass,
			isTouch: isTouch,
			wrap: wrap
		}
	}(document);

	// Variables
	var $formColour = tool.element.body.getAttribute('data-formplate-colour');
	var $formCheckboxes = document.querySelectorAll('.formplate input[type="checkbox"]');
	var $formRadioButtons = document.querySelectorAll('.formplate input[type="radio"]');
	var $formSelects = document.querySelectorAll('.formplate select');
	var $formTogglerHTML = document.createElement('span');
	$formTogglerHTML.className = 'handle';

	if (!tool.isTouch() && !tool.hasClass(tool.element.html, 'formplate-no-touch')) {
		tool.classAdd(tool.element.html, 'formplate-no-touch');
	}

	// Set the colour
	tool.classAdd(tool.element.body, 'formplate-colour-' + $formColour);

	// Checkboxes
	for (var $i = 0; $i < $formCheckboxes.length; $i++) {
		var $classes = (tool.hasClass($formCheckboxes[$i], 'toggler') === true) ? 'formplate-toggler' : 'formplate-checkbox';
		$classes += ($formCheckboxes[$i].getAttribute('checked') === 'checked') ? ' checked' : '';

		if (!tool.hasClass($formCheckboxes[$i].parentNode, 'formplate-toggler') && !tool.hasClass($formCheckboxes[$i].parentNode, 'formplate-checkbox')) {
			tool.wrap($formCheckboxes[$i], 'span', $classes);
		}
	}

	// Add toggler handle
	var $formTogglers = document.querySelectorAll('.formplate-toggler');
	for (var $i = 0; $i < $formTogglers.length; $i++) {
		$formTogglers[$i].appendChild($formTogglerHTML.cloneNode());
	}

	// Radio buttons
	for (var $i = 0; $i < $formRadioButtons.length; $i++) {
		var $classes = ($formRadioButtons[$i].getAttribute('checked') === 'checked') ? 'formplate-radio checked' : 'formplate-radio';

		if (!tool.hasClass($formRadioButtons[$i].parentNode, 'formplate-radio')) {
			tool.wrap($formRadioButtons[$i], 'span', $classes);
		}
	}

	// Selects
	for (var $i = 0; $i < $formSelects.length; $i++) {
		if (!tool.hasClass($formSelects[$i].parentNode, 'formplate-select')) {
			tool.wrap($formSelects[$i], 'span', 'formplate-select');
		}
	}

	// Events
	var $formCheckboxesNew = document.querySelectorAll('.formplate-checkbox');
	for (var $i = 0; $i < $formCheckboxesNew.length; $i++)(function($i) {
		$formCheckboxesNew[$i].onclick = function() {
			if (tool.hasClass($formCheckboxesNew[$i], 'checked')) {
				tool.classRemove($formCheckboxesNew[$i], 'checked');
			} else {
				tool.classAdd($formCheckboxesNew[$i], 'checked');
			}
		};
	})($i);
	var $formRadioButtonsNew = document.querySelectorAll('.formplate-radio');
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
	var $formTogglersNew = document.querySelectorAll('.formplate-toggler');
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