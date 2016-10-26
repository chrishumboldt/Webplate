/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component container
var Buttonplate = (function () {
	// Variables
	var defaults = {
		selector: '.button'
	};
	var buttonDropClassName = 'buttonplate-drop-down';
	var documentOnClick = false;

	// Functions
	var closeAll = function () {
		var openDropDowns = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (var i = 0, len = openDropDowns.length; i < len; i++) {
			Web.class.remove(openDropDowns[i], '_open');
		}
	};
	var setup = function () {
		if (!Web.is.touch()) {
			Web.class.add(Web.dom.html, 'bp-no-touch');
		}
		if (!documentOnClick) {
			documentOnClick = true;
			Web.event.add(document, 'click', function () {
				closeAll();
			});
		}
	};

	// Inner component
	var component = function (button) {
		// Variables
		var buttonUL = button.querySelector('ul');
		// Check
		if (!buttonUL) {
			return false;
		}
		// Functions
		var applyButtonDrop = function () {
			Web.class.add(button, buttonDropClassName);
			button.onclick = function () {
				buttonOpen();
			};
		};
		var buttonClose = function () {
			Web.class.remove(buttonUL, '_open');
		};
		var buttonOpen = function () {
			closeAll();
			buttonUL.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				Web.class.add(buttonUL, '_open');
			});
		};
		// Execute and return
		applyButtonDrop();
		return {
			button: button,
			close: buttonClose,
			open: buttonOpen
		};
	};

	// Initialiser
	var init = function (userOptions) {
		var userOptions = (typeof userOptions === 'object') ? userOptions : false;
		var options = {
			selector: userOptions.selector || defaults.selector
		};
		var buttons = document.querySelectorAll(options.selector);
		if (buttons.length < 1) {
			return false;
		}
		// Initialise each and return
		var objReturn = [];
		for (var i = 0, len = buttons.length; i < len; i++) {
		   objReturn.push(new component(buttons[i]));
		}
		return objReturn;
	};

	// Execute and return
	setup();
	return {
		defaults: defaults,
		closeAll: closeAll,
		init: init
	}
})();
