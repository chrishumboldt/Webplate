/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Rocket Tools module extension
var Rocket = (function (Rocket) {
	// Defaults
	if (!Rocket.defaults) {
		Rocket.defaults = {};
	}
	Rocket.defaults.button = {
		selector: '.button'
	}
	// Basic checks
	if (!Rocket.exists) {
		var exists = function (check) {
			return (typeof check === 'undefined' || check === null || check === false) ? false : true;
		};
		Rocket.exists = exists;
	}
	if (!Rocket.has) {
		var has = {
			spaces: function (check) {
				return /\s/.test(check);
			},
			class: function (element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		};
		Rocket.has = has;
	}
	if (!Rocket.is) {
		var is = {
			array: function (array) {
				return (typeof array === 'object' && array instanceof Array) ? true : false;
			},
			color: function (color) {
				is.colour(color);
			},
			colour: function (colour) {
				return defaults.regexp.colour.test(colour);
			},
			date: function (date, regExp) {
				var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.date;
				return regExp.test(date);
			},
			element: function (element) {
				return (element.nodeType && element.nodeType === 1) ? true : false;
			},
			email: function (email, regExp) {
				var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.email;
				return regExp.test(email);
			},
			float: function (int) {
				return defaults.regexp.float.test(int);
			},
			integer: function (int) {
				return defaults.regexp.integer.test(int);
			},
			image: function (file, arAllowedTypes) {
				var allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.images;
				return allowedTypes[file.split('.').pop().toLowerCase()];
			},
			json: function (json) {
				if (typeof json !== 'object') {
					try {
						JSON.parse(json);
					} catch (e) {
						return false;
					}
				}
				return true;
			},
			password: function (password, regExp) {
				var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.password;
				return regExp.test(password);
			},
			time: function (time, regExp) {
				var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.time;
				return regExp.test(time);
			},
			touch: function () {
				return 'ontouchstart' in window || 'onmsgesturechange' in window;
			},
			url: function (url, regExp) {
				var regExp = (regExp instanceof RegExp) ? regExp : defaults.regexp.url;
				return regExp.test(url);
			}
		};
		Rocket.is = is;
	}
	// Classes
	if (!Rocket.class) {
		var classMethods = {
			add: function (elements, classNames) {
				classMethods.executeClasses(elements, classNames, false);
			},
			clear: function (element) {
				if (exists(element)) {
					element.removeAttribute('class');
				}
			},
			executeAdd: function (element, classes) {
				element.className = element.className.split(' ').concat(classes).filter(function (val, i, ar) {
					return (ar.indexOf(val) === i) && (val !== '');
				}).toString().replace(/,/g, ' ');
			},
			executeClasses: function (elements, classesAdd, classesRemove) {
				// Catch
				if (!exists(elements)) {
					return false;
				}
				// Create elements array
				var arElements = [];
				if (is.element(elements)) {
					arElements.push(elements);
				} else if (is.array(elements)) {
					arElements = elements;
				}
				// Catch
				if (arElements.length < 1) {
					return false;
				}
				// Create classes array
				var arClassesAdd = helper.makeArray(classesAdd, true);
				var arClassesRemove = helper.makeArray(classesRemove, true);
				var actionAdd = (arClassesAdd.length > 0) ? true : false;
				var actionRemove = (arClassesRemove.length > 0) ? true : false;

				// Execute
				for (var i = 0, len = arElements.length; i < len; i++) {
					if (actionAdd) {
						classMethods.executeAdd(arElements[i], arClassesAdd)
					}
					if (actionRemove) {
						classMethods.executeRemove(arElements[i], arClassesRemove)
					}
				}
			},
			executeRemove: function (element, classes) {
				element.className = element.className.split(' ').filter(function (val) {
					return classes.indexOf(val) < 0;
				}).toString().replace(/,/g, ' ');
				if (element.className === '') {
					classMethods.clear(element);
				}
			},
			remove: function (elements, classNames) {
				classMethods.executeClasses(elements, false, classNames);
			},
			replace: function (elements, classesRemove, classesAdd) {
				classMethods.executeClasses(elements, classesAdd, classesRemove);
			},
			toggle: function (elements, className) {
				// Catch
				if (!exists(elements) || typeof className !== 'string' || has.spaces(className)) {
					return false;
				}
				// Create elements array
				var arElements = [];
				if (is.element(elements)) {
					arElements.push(elements);
				} else if (is.array(elements)) {
					arElements = elements;
				}
				// Catch
				if (arElements.length < 1) {
					return false;
				}
				// Execute
				for (var i = 0, len = elements.length; i < len; i++) {
					if (!has.class(elements[i], className)) {
						classMethods.executeAdd(elements[i], [className]);
					} else {
						classMethods.executeRemove(elements[i], [className]);
					}
				}
			}
		};
		Rocket.class = classMethods;
	}
	// Development
	if (!Rocket.log) {
		var log = function (text) {
			if (window && window.console) {
				console.log(text);
			}
		};
		Rocket.log = log;
	}
	// DOM
	if (!Rocket.dom) {
		Rocket.dom = {};
	}
	if (!Rocket.dom.html) {
		Rocket.dom.html = document.getElementsByTagName('html')[0];
	}
	// Events
	if (!Rocket.event) {
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
		Rocket.event = eventMethods;
	}

	// Helpers
	if (!Rocket.helper) {
		var helper = {
			makeArray: function (arValue, unique) {
				var returnArray = [];
				// Catch
				if (!arValue) {
					return returnArray;
				}
				// Continue
				var unique = (typeof unique === 'boolean') ? unique : false;
				if (is.array(arValue)) {
					// Already an array
					if (unique) {
						returnArray = arValue.filter(function (val) {
							return returnArray.indexOf(val) < 0;
						});
					} else {
						returnArray = arValue;
					}
				} else if (is.element(arValue)) {
					// Element
					returnArray.push(arValue);
				} else if (typeof arValue === 'string') {
					// String
					if (has.spaces(arValue)) {
						if (unique) {
							returnArray = arValue.split(' ').filter(function (val) {
								return returnArray.indexOf(val) < 0;
							});
						} else {
							returnArray = arValue.split(' ');
						}
					} else {
						returnArray.push(arValue);
					}
				}

				return returnArray;
			},
			parse: {
				json: function (json) {
					if (is.json(json)) {
						return JSON.parse(json);
					}
					return json;
				}
			},
			setDefault: function (setValue, defaultValue) {
				if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
					return false;
				} else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
					return setValue;
				} else if (typeof setValue === typeof defaultValue) {
					return setValue;
				} else {
					return defaultValue;
				}
			}
		};
	}

	return Rocket;
})(Rocket || {});

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
