/**
 * File: build/js/form.js
 * Type: Javascript component
 * Author: Chris Humboldt
**/

// Rocket Tools module extension
var Rocket = (function (Rocket) {
	// Defaults
	if (!Rocket.defaults) {
		Rocket.defaults = {};
	}
	Rocket.defaults.form = {
		selector: '.form',
		colour: 'blue',
		label: 'normal',
		size: 'normal',
		style: 'line'
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
	// Gets
	if (!Rocket.get) {
		var get = {
			extension: function (file) {
				return file.split('.').pop().toLowerCase();
			},
			index: function (node) {
				return [].indexOf.call(node.parentNode.children, node);
			}
		};
		Rocket.get = get;
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
		Rocket.helper = helper;
	}

	return Rocket;
})(Rocket || {});

// Component container
var RocketFormComponent = (function () {
	// Functions
	var setup = function () {
		if (!Rocket.is.touch()) {
			Rocket.class.add(Rocket.dom.html, 'rocket-no-touch');
		}
	};
	var setupFormElement = function (formContainer, options) {
		// Variables
		var element = false;
		var classes = ['_c-' + options.colour, '_s-' + options.style, '_sz-' + options.size];
		var type = false;

		// Set type
		if (formContainer.querySelector('input')) {
			// Inputs
			element = formContainer.querySelector('input');
			type = element.getAttribute('type');
		} else if (formContainer.querySelector('textarea')) {
			// Textarea
			element = formContainer.querySelector('textarea');
			type = 'textarea';
		} else if (formContainer.querySelector('select')) {
			// Selects
			element = formContainer.querySelector('select');
			type = 'select';
		}

		// Apply styles
		switch (type) {
			case 'checkbox':
			case 'radio':
				// Checked
				if (element.checked) {
					classes.push('_checked');
				} else {
					Rocket.class.remove(element, '_checked');
				}
				// Toggler?
				if (Rocket.has.class(element, 'toggler')) {
					classes.push('rf-tog');
				} else {
					classes.push('rf-check');
					if (type === 'radio') {
						classes.push('_t-radio');
					}
				}
				break;

			case 'text':
			case 'password':
				classes.push('rf-inp');
				if (type === 'password') {
					classes.push('_t-password');
				}
				if (options.label.length > 0 && options.label !== 'normal') {
					classes.push('_l-' + options.label);
				}
				if (element.value.length > 0) {
					classes.push('_valued');
				}
				break;

			case 'textarea':
				classes.push('rf-text');
				if (options.label.length > 0 && options.label !== 'normal') {
					classes.push('_l-' + options.label);
				}
				if (element.value.length > 0) {
					classes.push('_valued');
				}
				break;

			case 'select':
				classes.push('rf-sel');
				break;

		}
		Rocket.class.add(formContainer, classes);

		// Return
		return {
			container: formContainer,
			element: element,
			type: type
		}
	};

	// Inner component
	var component = function (form) {
		// Functions
		var check = {
			off: function () {
				form.element.checked = false;
				Rocket.class.remove(form.container, '_checked');
			},
			on: function () {
				form.element.checked = true;
				Rocket.class.add(form.container, '_checked');
			}
		};
		var checkSelect = function (option) {
			// Catch
			if (form.type !== 'checkbox') {
				return false;
			}
			// Continue
			var option = (typeof option === 'string') ? option : false;
			if (option === 'on') {
				check.on();
			} else if (option === 'off') {
				check.off();
			} else {
				if (Rocket.has.class(form.container, '_checked')) {
					check.off();
				} else {
					check.on();
				}
			}
		};
		var clearValue = function () {
			Rocket.log(form.type);
			if (form.type === 'text' || form.type === 'textarea') {
				form.element.value = '';
				Rocket.class.remove(form.container, ['_focused'].concat((form.element.value.length < 1) ? ['_valued'] : []));
			}
		};
		var radioSelect = function (option) {
			// Catch
			if (form.type !== 'radio') {
				return false;
			}
			// Continue
			var option = (typeof option === 'string') ? option : false;
			if (option === 'off') {
				check.off();
			} else {
				var radioGroup = document.getElementsByName(form.element.getAttribute('name'));
				for (var i = 0, len = radioGroup.length; i < len; i++) {
				   radioGroup[i].checked = false;
					Rocket.class.remove(radioGroup[i].parentNode, '_checked');
				}
				check.on();
			}
		};
		var toggle = function (option) {
			switch (form.type) {
				case 'checkbox':
					checkSelect(option);
					break;
				case 'radio':
					radioSelect(option);
					break;
			};
		};

		// Bind events
		switch (form.type) {
			case 'checkbox':
				Rocket.event.add(form.element, 'click', function () {
					checkSelect();
				});
				break;

			case 'radio':
				Rocket.event.add(form.element, 'click', function () {
					radioSelect();
				});
				break;

			default:
				Rocket.event.add(form.element, 'focus', function () {
					Rocket.class.add(form.container, ['_focused', '_valued']);
				});
				Rocket.event.add(form.element, 'blur', function () {
					Rocket.class.remove(form.container, ['_focused'].concat((form.element.value.length < 1) ? ['_valued'] : []));
				});
				break;
		};

		// Return
		return {
			toggle: toggle,
			clear: clearValue,
			form: form.element
		}
	};

	// Initialiser
	var init = function (uOptions) {
		// Options
		var uOptions = (typeof uOptions === 'object') ? uOptions : false; // User options
		var options = {
			selector: Rocket.helper.setDefault(uOptions.selector, Rocket.defaults.form.selector),
			colour: Rocket.helper.setDefault(uOptions.colour, Rocket.defaults.form.colour),
			label: Rocket.helper.setDefault(uOptions.label, Rocket.defaults.form.label),
			size: Rocket.helper.setDefault(uOptions.size, Rocket.defaults.form.size),
			style: Rocket.helper.setDefault(uOptions.style, Rocket.defaults.form.style)
		};
		var formElements = document.querySelectorAll(options.selector);
		// Catch
		if (formElements.length < 1) {
			return false;
		}
		// Initialise each component and return
		var objReturn = [];
		for (var i = 0, len = formElements.length; i < len; i++) {
		   objReturn.push(new component(setupFormElement(formElements[i], options)));
		}
		return objReturn;
	};

	// Execute and return
	setup();
	return {
		init: init
	}
})();

// Bind to Rocket object
Rocket.form = function (uOptions) {
	return RocketFormComponent.init(uOptions);
};
