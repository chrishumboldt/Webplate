/**
 * File: build/js/modalplate.js
 * Type: Javascript Component File
 * Author: Chris Humboldt
**/

// Component
var Modalplate = function () {
	// Variables
	var defaults = {
		body: false,
		classAdd: false,
		close: 'close',
		breakpoint: 700,
		heading: false,
		onDone: false,
		parseEvent: false,
		reveal: 'slide-from-top',
		revealLarge: false,
		targetModal: false,
		trigger: 'always'
	};
	var reveals = [
		'_appear',
		'_appear-scale',
		'_slide-from-right',
		'_slide-from-top',
		'_slide-from-left',
		'_slide-from-bottom'
	];
	// HTML
	var html = {
		modal: function (options) {
			var modal = document.createElement('div');
			var modalHTML = '';
			if (options.heading !== false) {
				modalHTML += '<div class="modalplate-heading"><h6>' + options.heading + '</h6></div>';
			}
			modalHTML += '<div class="modalplate-body">' + ((options.body) ? options.body : '') + '</div>';
			modal.className = 'modalplate _reveal _new';
			if (options.classAdd !== false) {
				modal.className = options.classAdd;
			}
			modal.innerHTML = modalHTML;
			if (options.close !== false) {
				modal.insertBefore(this.modalClose(options.close), modal.firstChild);
			}
			return modal;
		},
		modalClose: function (text) {
			var modalClose = document.createElement('a');
			modalClose.className = 'modalplate-close';
			modalClose.innerHTML = text;
			return modalClose;
		},
		overlay: function () {
			var modalOverlay = document.createElement('div');
			modalOverlay.id = 'web-overlay';
			return modalOverlay;
		}
	};
	// Functions
	var init = function (userOptions) {
		var userOptions = userOptions || false;
		var options = {
			body: userOptions.body || defaults.body,
			classAdd: userOptions.classAdd || defaults.classAdd,
			close: userOptions.close || defaults.close,
			breakpoint: userOptions.breakpoint || defaults.breakpoint,
			heading: userOptions.heading || defaults.heading,
			onDone: (typeof userOptions.onDone === 'function') ? userOptions.onDone : defaults.onDone,
			parseEvent: userOptions.parseEvent || defaults.parseEvent,
			reveal: (userOptions.reveal && reveals.indexOf('_' + userOptions.reveal) > -1) ? userOptions.reveal : defaults.reveal,
			revealLarge: (userOptions.revealLarge && reveals.indexOf('_' + userOptions.revealLarge) > -1) ? userOptions.revealLarge : defaults.revealLarge,
			targetModal: userOptions.targetModal || defaults.targetModal,
			trigger: userOptions.trigger || defaults.trigger
		};

		// Execute
		if (options.parseEvent !== false) {
			options.parseEvent.preventDefault();
		}
		if (options.trigger === 'always') {
			modalShow(options);
		} else if (options.trigger === 'large' && window.innerWidth >= options.breakpoint) {
			modalShow(options);
		} else if (options.trigger === 'small' && window.innerWidth <= options.breakpoint) {
			modalShow(options);
		}
	};
	var modalClose = function () {
		closeTriggers = document.querySelectorAll('.modalplate .modalplate-close, #web-overlay');
		for (var i = closeTriggers.length - 1; i >= 0; i--) {
			closeTriggers[i].onclick = function (ev) {
				return function (ev) {
					ev.preventDefault();
					web.classRemove(web.element.html, 'modalplate-reveal');
				};
			}(i);
		}
	};
	var modalShow = function (options) {
		// Remove the old modal
		if (web.exists(document.querySelector('.modalplate._reveal'))) {
			var oldModal = document.querySelector('.modalplate._reveal');
			if (!web.hasClass(oldModal, '_new')) {
				web.classRemove(oldModal, '_reveal');
				web.classRemove(oldModal, reveals);
			} else {
				oldModal.parentNode.removeChild(oldModal);
			}
		}
		// New modal
		if (!options.targetModal) {
			// Create new modal
			web.element.body.appendChild(html.modal(options));
			var thisModal = document.querySelector('.modalplate._reveal');
		} else {
			// Show targeted modal
			var thisModal = document.querySelector(options.targetModal);
			if (options.heading) {
				thisModal.querySelector('.modalplate-heading h6').innerHTML = options.heading;
			}
			if (options.body) {
				thisModal.querySelector('.modalplate-body').innerHTML = options.body;
			}
			if (options.close && !web.exists(thisModal.querySelector('.modalplate-close'))) {
				thisModal.insertBefore(html.modalClose(options.close), thisModal.firstChild);
			}
		}
		// Reveal
		if (web.exists(thisModal)) {
			if (options.revealLarge !== false) {
				if (window.innerWidth < options.breakpoint) {
					web.classAdd(thisModal, '_' + options.reveal);
				} else {
					web.classAdd(thisModal, '_' + options.revealLarge);
				}
			} else {
				web.classAdd(thisModal, '_' + options.reveal);
			}
		}
		setTimeout(function () {
			if (web.exists(thisModal)) {
				modalClose();
				web.classAdd(web.element.html, 'modalplate-reveal');
				web.classAdd(thisModal, '_reveal');
				if (typeof options.onDone === 'function') {
					options.onDone(thisModal);
				}
			}
		}, 50);
	};
	var setup = function () {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'modalplate-no-touch');
		}
		web.overlayAdd();
	};

	return {
		defaults: defaults,
		init: init,
		setup: setup
	};
}();

Modalplate.setup();
