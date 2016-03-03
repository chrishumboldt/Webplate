/**
 * File: js/essageplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
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
		$messageBoxHTML += '<a class="mp-close"></a>';
		$messageBoxHTML += '<div class="mp-type"></div>';
		$messageBoxHTML += '<div class="mp-heading"></div>';
		$messageBoxHTML += '<div class="mp-body"></div>';
		$messageBoxHTML += '<div class="mp-buttons"></div>';
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

		// HTML
		var $toolHtml = {
			buttonFalse: $buttonFalse,
			buttonsBoth: $buttonsBoth,
			buttonTrue: $buttonTrue,
			messageBox: $messageBox,
			messageOverlay: $messageOverlay
		};

		return {
			html: $toolHtml
		}
	}(document, $self.options);

	// Public functions
	$self.close = function() {
		web.classRemove(web.element.html, 'mp-reveal');
		setTimeout(function() {
			web.remove('#messageplate');
		}, 300);
	};

	$self.reveal = function() {
		setTimeout(function() {
			web.classAdd(web.element.html, 'mp-reveal');
		}, 50);
	};

	// Internal functions
	function basicSetup() {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'mp-no-touch');
		}
		web.remove('#messageplate');
		web.element.body.appendChild(tool.html.messageBox);
		if ($self.options.overlay === true && !web.exists(document.getElementById('web-overlay'))) {
			web.element.body.appendChild(tool.html.messageOverlay);
		}

		$messageBoxEl = document.getElementById('messageplate');
		$overlayEl = document.getElementById('web-overlay');

		$messageBoxEl.querySelector('.mp-close').innerHTML = ($self.options.close !== false) ? $self.options.close : '';
		$messageBoxEl.querySelector('.mp-type').innerHTML = ($self.options.type === false || $self.options.type === 'none') ? '' : '<div class="t-' + $self.options.type + '"><div class="l-1"></div><div class="l-2"></div></div>';
		$messageBoxEl.querySelector('.mp-heading').innerHTML = $self.options.heading !== false ? '<h6>' + $self.options.heading + '</h6>' : '';
		$messageBoxEl.querySelector('.mp-body').innerHTML = $self.options.body !== false ? $self.options.body : '';

		if ($self.options.buttonFalse !== false && $self.options.buttonTrue !== false) {
			$messageBoxEl.querySelector('.mp-buttons').appendChild(tool.html.buttonsBoth);
		} else if ($self.options.buttonTrue) {
			$messageBoxEl.querySelector('.mp-buttons').appendChild(tool.html.buttonTrue);
		} else if ($self.options.buttonFalse) {
			$messageBoxEl.querySelector('.mp-buttons').appendChild(tool.html.buttonFalse);
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
		$messageBoxEl.querySelector('.mp-close').onclick = function() {
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