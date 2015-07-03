/**
 * File: messageplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Options
// Tools
// Calls
// Internal functions
// Public functions

var messageplate = function($userOptions) {
	// Variables
	var $self = this;
	var $messageBoxEl;
	var $overlayEl;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		buttonFalse: $userOptions.buttonFalse || false,
		buttonTrue: $userOptions.buttonTrue || false,
		close: $userOptions.close || 'close',
		parseEvent: $userOptions.parseEvent || false,
		heading: $userOptions.heading || false,
		body: $userOptions.body || false,
		onTrue: $userOptions.onTrue || false,
		overlay: ($userOptions.overlay === false) ? $userOptions.overlay : true,
		type: $userOptions.type || false
	};

	// Prevent event
	if ($self.options.parseEvent !== false) {
		$self.options.parseEvent.preventDefault();
	}

	// Tools
	var tool = function(document, $options) {
		// HTML
		var $messageBox = document.createElement('div');
		var $messageBoxHTML = '';
		$messageBoxHTML += '<a class="messageplate-close"></a>';
		$messageBoxHTML += '<div class="messageplate-type"></div>';
		$messageBoxHTML += '<div class="messageplate-heading"></div>';
		$messageBoxHTML += '<div class="messageplate-body"></div>';
		$messageBoxHTML += '<div class="messageplate-buttons"></div>';
		$messageBox.id = 'messageplate';
		$messageBox.innerHTML = $messageBoxHTML;

		var $messageOverlay = document.createElement('div');
		$messageOverlay.id = 'web-overlay';

		var $buttonsBoth = document.createElement('div');
		var $buttonsBothHtml = '';
		$buttonsBothHtml += '<div class="left"><button class="btn-true">' + $options.buttonTrue + '</div>';
		$buttonsBothHtml += '<div class="right"><button class="btn-false">' + $options.buttonFalse + '</div>';
		$buttonsBoth.className = 'btn-col-2';
		$buttonsBoth.innerHTML = $buttonsBothHtml;

		var $buttonTrue = document.createElement('div');
		var $buttonTrueHtml = '';
		$buttonTrueHtml += '<button class="btn-true">' + $options.buttonTrue + '</button>';
		$buttonTrue.className = 'btn-col-1';
		$buttonTrue.innerHTML = $buttonTrueHtml;

		var $buttonFalse = document.createElement('div');
		var $buttonFalseHtml = '';
		$buttonFalseHtml += '<button class="btn-false">' + $options.buttonFalse + '</button>';
		$buttonFalse.className = 'btn-col-1';
		$buttonFalse.innerHTML = $buttonFalseHtml;

		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};
		// HTML
		var $toolHtml = {
			buttonFalse: $buttonFalse,
			buttonsBoth: $buttonsBoth,
			buttonTrue: $buttonTrue,
			messageBox: $messageBox,
			messageOverlay: $messageOverlay
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
		var exists = function($element) {
			if ($element === null || typeof($element) === undefined) {
				return false;
			} else {
				return true;
			}
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};
		var remove = function($selector) {
			if ($selector.charAt(0) === '#') {
				var $element = document.getElementById($selector.substring(1));
				if ($element !== null) {
					$element.parentNode.removeChild($element);
				}
			} else if ($selector.charAt(0) === '.') {
				var $elements = document.querySelectorAll($selector);
				for (var $i = $elements.length - 1; $i >= 0; $i--) {
					if ($elements[$i] !== null) {
						$elements[$i].parentNode.removeChild($element);
					}
				}
			}
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			exists: exists,
			html: $toolHtml,
			isTouch: isTouch,
			remove: remove
		}
	}(document, $self.options);

	// Public functions
	$self.close = function() {
		tool.classRemove(tool.element.html, 'messageplate-reveal');
		setTimeout(function() {
			tool.remove('#messageplate');
		}, 300);
	};

	$self.reveal = function() {
		setTimeout(function() {
			tool.classAdd(tool.element.html, 'messageplate-reveal');
		}, 50);
	};

	// Internal functions
	function basicSetup() {
		if (!tool.isTouch()) {
			tool.classAdd(tool.element.html, 'messageplate-no-touch');
		}
		tool.remove('#messageplate');
		tool.element.body.appendChild(tool.html.messageBox);
		if ($self.options.overlay === true && !tool.exists(document.getElementById('web-overlay'))) {
			tool.element.body.appendChild(tool.html.messageOverlay);
		}

		$messageBoxEl = document.getElementById('messageplate');
		$overlayEl = document.getElementById('web-overlay');

		$messageBoxEl.querySelector('.messageplate-close').innerHTML = ($self.options.close !== false) ? $self.options.close : '';
		$messageBoxEl.querySelector('.messageplate-type').innerHTML = ($self.options.type === false || $self.options.type === 'none') ? '' : '<div class="type-' + $self.options.type + '"><div class="line-one"></div><div class="line-two"></div></div>';
		$messageBoxEl.querySelector('.messageplate-heading').innerHTML = $self.options.heading !== false ? '<h6>' + $self.options.heading + '</h6>' : '';
		$messageBoxEl.querySelector('.messageplate-body').innerHTML = $self.options.body !== false ? $self.options.body : '';

		if ($self.options.buttonFalse !== false && $self.options.buttonTrue !== false) {
			$messageBoxEl.querySelector('.messageplate-buttons').appendChild(tool.html.buttonsBoth);
		} else if ($self.options.buttonTrue) {
			$messageBoxEl.querySelector('.messageplate-buttons').appendChild(tool.html.buttonTrue);
		} else if ($self.options.buttonFalse) {
			$messageBoxEl.querySelector('.messageplate-buttons').appendChild(tool.html.buttonFalse);
		}
	};

	function callbackOnTrue() {
		if ($self.options.onTrue !== false) {
			$messageBoxEl.querySelector('.btn-true').onclick = function() {
				$self.options.onTrue.call(window);
			};
		}
	};

	function messageHideBinding() {
		if ($self.options.buttonFalse !== false) {
			$messageBoxEl.querySelector('.btn-false').onclick = function() {
				$self.close();
			};
		}
		$messageBoxEl.querySelector('.messageplate-close').onclick = function() {
			$self.close();
		};
		$overlayEl.onclick = function() {
			$self.close();
		};
	};

	// Calls
	basicSetup();
	callbackOnTrue();
	messageHideBinding();
	$self.reveal();
};