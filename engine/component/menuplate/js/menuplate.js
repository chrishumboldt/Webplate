/**
 * File: js/menuplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Variables
// Options

// Defaults
var $menuplateDefault = {
	selector: '.menuplate-trigger',
	clone: false,
	close: 'close',
	reveal: 'left',
	type: 'slide',
	position: 'on'
};

var menuplate = function($userOptions) {
	// Variables
	var $self = this;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		selector: $userOptions.selector || $menuplateDefault.selector,
		clone: $userOptions.clone || $menuplateDefault.clone,
		close: $userOptions.close || $menuplateDefault.close,
		type: $userOptions.type || $menuplateDefault.type,
		reveal: $userOptions.reveal || $menuplateDefault.reveal,
		position: $userOptions.position || $menuplateDefault.position
	}

	// Apply to element
	var $selectorType = $self.options.selector.charAt(0).toString();
	if ($selectorType === '#' && !web.hasWhiteSpace($self.options.selector)) {
		new menuplateComponent(document.getElementById($self.options.selector.substring(1)), $self.options);
	} else {
		var $elements = document.querySelectorAll($self.options.selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new menuplateComponent($elements[$i], $self.options);
		};
	}
};

var menuplateComponent = function($this, $option) {
	if (web.exists($this)) {
		// Variables
		var $self = $this;
		var $link = $self.getAttribute('href');
		var $menuElement = document.querySelector($link);

		// Functions
		function menuSetup() {
			if (!web.isTouch()) {
				web.classAdd(web.element.html, 'mnp-no-touch');
			}
			if (!web.exists(document.getElementById('web-overlay'))) {
				web.element.body.appendChild(web.html.menuOverlay);
			}
			web.classAdd($self, 'mnp-trigger');

			// Clone
			if ($option.clone === true) {
				var $menuClone = $menuElement.cloneNode(true);
				web.classAdd($menuClone, 'mnp clone _t-' + $option.type + ' _r-' + $option.reveal);
				web.element.body.appendChild($menuClone);
				$menuElement = $menuClone;
			} else {
				web.classAdd($menuElement, 'mnp _t-' + $option.type + ' _r-' + $option.reveal);
				setTimeout(function() {
					web.classAdd($menuElement, 'mnp-ready');
				}, 500);
			}

			// Fullscreen option
			if ($option.type == 'fullscreen') {
				var $menuClose = document.createElement('a');
				$menuClose.className = 'mnp-close';
				$menuClose.innerHTML = $option.close;
				$menuElement.appendChild($menuClose);
			}

			// Contextual option
			if ($option.type == 'contextual') {
				var $menuCloseUl = document.createElement('ul');
				var $menuCloseLi = document.createElement('li');
				var $menuClose = document.createElement('a');
				$menuClose.className = 'mnp-close';
				$menuClose.innerHTML = $option.close;
				$menuCloseUl.className = 'close-list';
				$menuCloseLi.appendChild($menuClose);
				$menuCloseUl.appendChild($menuCloseLi);
				if (!web.exists($menuElement.querySelector('.mnp-close'))) {
					$menuElement.appendChild($menuCloseUl);
				}
			}
		}

		function menuReveal() {
			var $menuLinks = $menuElement.querySelectorAll('a');
			var $menuLinkClose = $menuElement.querySelectorAll('a.mnp-close');
			$self.onclick = function(event) {
				event.preventDefault();
				if (!web.hasClass($menuElement, 'mnp-display')) {
					if ($option.position == 'on') {
						var $clickX = event.clientX;
						var $clickY = event.clientY + (web.element.body.scrollTop);
					}

					menuRemoveHTMLOptionClasses();
					var $openMenus = document.querySelectorAll('.mnp.mnp-display');
					for (var $i = 0, $len = $openMenus.length; $i < $len; $i++) {
						web.classRemove($openMenus[$i], 'mnp-display');
					}
					web.classAdd($menuElement, 'mnp-display');
					web.classAdd(web.element.html, 'mnp-reveal mnp-t-' + $option.type);
					if ($option.type == 'contextual' && (window.innerWidth >= 700) && ($option.position == 'on')) {
						$menuElement.style.top = $clickY + 20 + 'px';
						$menuElement.style.left = $clickX + 'px';
					}
					// window.addEventListener('resize', menuClose);
					web.eventAdd(window, 'resize', menuClose);
					document.getElementById('web-overlay').onclick = function() {
						menuClose();
					};
				} else {
					menuClose();
				}
			};
			for (var $i = $menuLinks.length - 1; $i >= 0; $i--) {
				$menuLinks[$i].onclick = function() {
					menuClose();
				};
			}
			for (var $i = $menuLinkClose.length - 1; $i >= 0; $i--) {
				$menuLinkClose[$i].onclick = function() {
					menuClose();
				};
			}
		}

		function menuClose() {
			web.eventRemove(window, 'resize', menuClose);
			web.classRemove(document.querySelector('.mnp.mnp-display'), 'mnp-display');
			web.classRemove(web.element.html, 'mnp-reveal');
			$menuElement.removeAttribute('style');
			menuRemoveHTMLOptionClasses();
		}

		function menuRemoveHTMLOptionClasses() {
			web.classRemove(web.element.html, 'mnp-t-slide');
			web.classRemove(web.element.html, 'mnp-t-fullscreen');
			web.classRemove(web.element.html, 'mnp-t-contextual');
		}

		// Execute
		menuSetup();
		menuReveal();
	}
};