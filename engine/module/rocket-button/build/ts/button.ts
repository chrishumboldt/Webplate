/**
* File: build/ts/button.ts
* Type: Typescript file
* Author: Chris Humboldt
**/

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
	Rocket.defaults = {};
}
Rocket.defaults.button = {
	dropdown: {
		selector: '.button'
	}
};
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

// Module container
module RockMod_Button {
	// Variables
	const buttonDropClassName = 'rb-drop-down';
	let documentOnClick = false;

	// Functions
	function classAdd (element:any, className:string) {
		let listClassNames = element.className.split(' ');
		listClassNames.push(className);
		listClassNames = listClassNames.filter(function (value, index, self) {
			return self.indexOf(value) === index && value !== '';
		});
		// Apply the class again
		classApply(element, listClassNames);
	};
	function classApply (element:any, listClassNames:string[]) {
		if (listClassNames.length === 0) {
			element.removeAttribute('class');
		}
		else if (listClassNames.length === 1) {
			element.className = listClassNames[0];
		}
		else {
			element.className = listClassNames.join(' ');
		}
	};
	function classRemove (element:any, className:any) {
		let listClassNames = element.className.split(' ');
		listClassNames = listClassNames.filter(function (value, index, self) {
			return value !== className;
		});
		// Apply the class again
		classApply(element, listClassNames);
	};
	function closeAll () {
		let openDropDowns:any = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (let dropDown of openDropDowns) {
			classRemove(dropDown, '_open');
		}
	};
	function setup () {
		if (('ontouchstart' in window || 'onmsgesturechange' in window) === false) {
			classAdd(document.getElementsByTagName('html')[0], 'rocket-no-touch');
		}
		if (!documentOnClick) {
			documentOnClick = true;
			Rocket.event.add(document, 'click', function () {
				closeAll();
			});
		}
	};
	function buttonDropApply (button:any) {
		// Variables
		const buttonUL = button.querySelector('ul');
		// Check
		if (!buttonUL) {
			return false;
		}
		// Functions
		function applyDrop () {
			classAdd(button, buttonDropClassName);
			button.onclick = function () {
				buttonOpen();
			};
		};
		function buttonClose () {
			classRemove(buttonUL, '_open');
		};
		function buttonOpen () {
			closeAll();
			buttonUL.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				classAdd(buttonUL, '_open');
			});
		};
		// Execute and return
		applyDrop();
		return {
			button: button,
			close: buttonClose,
			open: buttonOpen
		};
	};
	function buttonDropDownInit (userOptions) {
		// Options
		if (typeof userOptions !== 'object') {
			userOptions = false;
		}
		const options = {
			selector: (typeof userOptions.selector === 'string') ? userOptions.selector : Rocket.defaults.button.selector
		};
		// Initialise drop down
		let buttons:any = document.querySelectorAll(options.selector);
		let objReturn = [];
		// Catch
		if (buttons.length < 1) {
			return false;
		}
		// Continue
		for (let button of buttons) {
			objReturn.push(buttonDropApply(button));
		}
		return objReturn;
	}
	// Execute
	setup();
	// Exports
	export let dropdown = buttonDropDownInit;
}

// Bind to Rocket
Rocket.button = RockMod_Button;
