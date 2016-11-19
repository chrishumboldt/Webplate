/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component container
var RocketButtonComponent = (function () {
	// Variables
	var buttonDropClassName = 'rb-drop-down';
	var documentOnClick = false;

	// Functions
	var closeAll = function () {
		var openDropDowns = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (var i = 0, len = openDropDowns.length; i < len; i++) {
			Rocket.class.remove(openDropDowns[i], '_open');
		}
	};
	var setup = function () {
		if (!Rocket.is.touch()) {
			Rocket.class.add(Rocket.dom.html, 'rocket-no-touch');
		}
		if (!documentOnClick) {
			documentOnClick = true;
			Rocket.event.add(document, 'click', function () {
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
			Rocket.class.add(button, buttonDropClassName);
			button.onclick = function () {
				buttonOpen();
			};
		};
		var buttonClose = function () {
			Rocket.class.remove(buttonUL, '_open');
		};
		var buttonOpen = function () {
			closeAll();
			buttonUL.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				Rocket.class.add(buttonUL, '_open');
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
	var init = function (uOptions) {
		var uOptions = (typeof uOptions === 'object') ? uOptions : false;
		var options = {
			selector: (typeof uOptions.selector === 'string') ? uOptions.selector : Rocket.defaults.button.selector
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
		closeAll: closeAll,
		init: init
	}
})();

// Bind to Rocket object
Rocket.button = function (uOptions) {
	return RocketButtonComponent.init(uOptions);
};
