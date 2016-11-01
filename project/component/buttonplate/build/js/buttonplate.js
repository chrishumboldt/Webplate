/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Webplate tools module extension
var Web = (function (Web) {
	// Basic checks
	if (!Web.exists) {
		var exists = function (check) {
			return (check === null || check === false || typeof (check) == 'undefined') ? false : true;
		};
		Web.exists = exists;
	}
	if (!Web.has) {
		var has = {
			spaces: function (check) {
				return /\s/.test(check);
			},
			class: function (element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		};
		Web.has = has;
	}
	if (!Web.is) {
		Web.is = {};
	}
	if (!Web.is.touch) {
		Web.is.touch = function () {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};
	}
	// Classes
	if (!Web.class) {
		var classMethods = {
			add: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = 0, len = className.length; i < len; i++) {
							classMethods.addExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.addExecute(element, classes[i]);
						}
					} else {
						classMethods.addExecute(element, className);
					}
				}
			},
			addExecute: function (element, className) {
				var crtClass = element.className;
				if (crtClass.match(new RegExp('\\b' + className + '\\b', 'g')) === null) {
					element.className = crtClass === '' ? className : crtClass + ' ' + className;
				}
			},
			clear: function (element) {
				if (exists(element)) {
					element.removeAttribute('class');
				}
			},
			remove: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = className.length - 1; i >= 0; i--) {
							classMethods.removeExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.removeExecute(element, classes[i]);
						}
					} else {
						classMethods.removeExecute(element, className);
					}
				}
			},
			removeExecute: function (element, className) {
				if (element.className.indexOf(className) > -1) {
					element.className = element.className.split(' ').filter(function (val) {
						return val != className;
					}).toString().replace(/,/g, ' ');
					if (element.className === '') {
						classMethods.clear(element);
					}
				}
			}
		};
		Web.class = classMethods;
	}
	// Development
	if (!Web.log) {
		var log = function (text) {
			if (window && window.console) {
				console.log(text);
			}
		};
		Web.log = log;
	}
	// DOM
	if (!Web.dom) {
		Web.dom = {};
	}
	if (!Web.dom.html) {
		Web.dom.html = document.getElementsByTagName('html')[0];
	}
	// Events
	if (!Web.event) {
		var eventMethods = {
			add: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.addEventListener) {
					elem.addEventListener(type, eventHandle, false);
				} else if (elem.attachEvent) {
					elem.attachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			},
			remove: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.removeEventListener) {
					elem.removeEventListener(type, eventHandle, false);
				} else if (elem.detachEvent) {
					elem.detachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			}
		};
		Web.event = eventMethods;
	}

	return Web;
})(Web || {});

// Component container
var Buttonplate = (function () {
	// Variables
	var defaults = {
		selector: '.button'
	};
	var buttonDropClassName = 'bp-drop-down';
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
