/**
 * File: modalplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Options
// Tools
// Calls

var modalplate = function($userOptions) {
	// Variables
	var $self = this;
	var $overlayEl;
	var $thisModal;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		body: $userOptions.body || '',
		classAdd: $userOptions.classAdd || false,
		close: $userOptions.close || 'close',
		breakpoint: $userOptions.breakpoint || 700,
		heading: $userOptions.heading || false,
		overlay: ($userOptions.overlay === false) ? $userOptions.overlay : true,
		parseEvent: $userOptions.parseEvent || false,
		reveal: $userOptions.reveal || 'slide-from-top',
		revealLarge: $userOptions.revealLarge || false,
		trigger: $userOptions.trigger || 'always'
	};

	// Tools
	var tool = function(document, $options) {
		// HTML
		var $modal = document.createElement('div');
		var $modalHTML = '';
		if ($self.options.close !== false) {
			$modalHTML += '<a href class="modalplate-close">' + $options.close + '</a>';
		}
		if ($self.options.heading !== false) {
			$modalHTML += '<div class="modalplate-heading"><h6>' + $options.heading + '</h6></div>';
		}
		$modalHTML += '<div class="modalplate-body">' + $options.body + '</div>';
		$modal.id = 'modalplate';
		if ($options.classAdd !== false) {
			$modal.className = $options.classAdd;
		}
		$modal.innerHTML = $modalHTML;

		var $modalOverlay = document.createElement('div');
		$modalOverlay.id = 'web-overlay';

		// HTML
		var $toolHtml = {
			modal: $modal,
			modalOverlay: $modalOverlay
		};

		return {
			html: $toolHtml
		}
	}(document, $self.options);

	// Public functions
	$self.close = function() {
		web.classRemove(web.element.html, 'modalplate-reveal');
	};

	$self.reveal = function() {
		setTimeout(function() {
			web.classAdd(web.element.html, 'modalplate-reveal');
			web.classAdd($thisModal, 'reveal');
		}, 50);
	};

	// Internal functions
	function executeModal() {
		if ($self.options.parseEvent !== false) {
			$self.options.parseEvent.preventDefault();
		}
		setupModal();
		$self.reveal();
	};

	function basicSetup() {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'modalplate-no-touch');
		}
		web.remove('#modalplate');
		if ($self.options.overlay === true && !web.exists(document.getElementById('web-overlay'))) {
			web.element.body.appendChild(tool.html.modalOverlay);
		}
	};

	function setupModal() {
		web.remove('#modalplate');
		web.element.body.appendChild(tool.html.modal);
		$thisModal = document.getElementById('modalplate');
		if ($self.options.revealLarge !== false) {
			if (window.innerWidth < $self.options.breakpoint) {
				web.classAdd($thisModal, $self.options.reveal);
			} else {
				web.classAdd($thisModal, $self.options.revealLarge);
			}
		} else {
			web.classAdd($thisModal, $self.options.reveal);
		};

		$closeTriggers = document.querySelectorAll('#modalplate .modalplate-close, #web-overlay');
		for (var $i = $closeTriggers.length - 1; $i >= 0; $i--) {
			$closeTriggers[$i].onclick = function($ev) {
				return function($ev) {
					$ev.preventDefault();
					$self.close();
				};
			}($i);
		};
	};

	// Basic setup
	basicSetup();

	// Manage click
	if ($self.options.trigger === 'always') {
		executeModal();
	} else if ($self.options.trigger === 'large' && window.innerWidth >= $self.options.breakpoint) {
		executeModal();
	} else if ($self.options.trigger === 'small' && window.innerWidth <= $self.options.breakpoint) {
		executeModal();
	}
};