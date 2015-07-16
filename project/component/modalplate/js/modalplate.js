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

		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};
		// HTML
		var $toolHtml = {
			modal: $modal,
			modalOverlay: $modalOverlay
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
		tool.classRemove(tool.element.html, 'modalplate-reveal');
	};

	$self.reveal = function() {
		setTimeout(function() {
			tool.classAdd(tool.element.html, 'modalplate-reveal');
			tool.classAdd($thisModal, 'reveal');
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
		if (!tool.isTouch()) {
			tool.classAdd(tool.element.html, 'modalplate-no-touch');
		}
		tool.remove('#modalplate');
		if ($self.options.overlay === true && !tool.exists(document.getElementById('web-overlay'))) {
			tool.element.body.appendChild(tool.html.modalOverlay);
		}
	};

	function setupModal() {
		tool.remove('#modalplate');
		tool.element.body.appendChild(tool.html.modal);
		$thisModal = document.getElementById('modalplate');
		if ($self.options.revealLarge !== false) {
			if (window.innerWidth < $self.options.breakpoint) {
				tool.classAdd($thisModal, $self.options.reveal);
			} else {
				tool.classAdd($thisModal, $self.options.revealLarge);
			}
		} else {
			tool.classAdd($thisModal, $self.options.reveal);
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
