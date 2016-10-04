/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component
var Buttonplate = function () {
	// Variables
	var buttonDropClassName = 'buttonplate-drop-down';
	var defaults = {
		selector: '.button'
	};
	var documentOnClick = false;
	// Functions
	var applyButtonDrop = function (options) {
		var buttonDrops = document.querySelectorAll(options.selector + ' ul');
		if (buttonDrops.length > 0) {
			for (var i = 0, len = buttonDrops.length; i < len; i++) {
				web.classAdd(buttonDrops[i].parentNode, buttonDropClassName);
				applyButtonDropEvent(buttonDrops[i].parentNode, buttonDrops[i]);
			}
		}
	};
	var applyButtonDropEvent = function (button, dropDown) {
		button.onclick = function () {
			closeAllOpenButtonDrops();
			dropDown.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				web.classAdd(dropDown, '_open');
			}, 50);
		};
	};
	var applyDocumentOnClick = function () {
		documentOnClick = true;
		document.onclick = function() {
			closeAllOpenButtonDrops();
		};
	};
	var closeAllOpenButtonDrops = function () {
		var openDropDowns = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (var i = 0, len = openDropDowns.length; i < len; i++) {
			web.classRemove(openDropDowns[i], '_open');
		}
	};
	var touchCheck = function () {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'buttonplate-no-touch');
		}
	};
	// Initialiser
	var init = function (userOptions) {
		var userOptions = userOptions || false;
		var options = {
			selector: userOptions.selector || defaults.selector
		};

		// Execute
		applyButtonDrop(options);
		if (!documentOnClick) {
			applyDocumentOnClick();
		}
	};
	// Return
	return {
		defaults: defaults,
		init: init,
		touchCheck: touchCheck
	};
}();

// Execute
Buttonplate.touchCheck();
