/**
 * File: build/js/form.js
 * Type: Javascript component
 * Author: Chris Humboldt
**/

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
