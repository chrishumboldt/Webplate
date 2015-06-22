/**
 * File: tools.js
 * Type: Javascript tools file
 * Author: Chris Humboldt
 * Last Edited: 1 May 2015
 */


// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Basic checks
// Dates
// Development
// DOM
// Forms
// Objects
// Strings
// URL
// Webplate

// Variables
// ---------------------------------------------------------------------------------------
var $bodyElement = document.getElementsByTagName('body')[0];
var $htmlElement = document.getElementsByTagName('html')[0];
var $navEndPosition = 0;
var $navigationWidth;
var $navTrackPosition;
var $navigation = document.getElementById('navigation');
var $navigationTrigger = document.getElementById('navigation-trigger');

// Create web function object
// ---------------------------------------------------------------------------------------
var web = {
	// Basic checks
	exists: function($element) {
		if ($element === null || typeof($element) === undefined) {
			return false;
		} else {
			return true;
		}
	},
	hasWhiteSpace: function($check) {
		return /\s/.test($check);
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	isColor: function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	},
	isDate: function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	},
	isEmail: function($email) {
		return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
	},
	isExtension: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	isFullInteger: function($int) {
		return /^[0-9]+$/.test($int);
	},
	isImage: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	isInteger: function($int) {
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
	},
	isPassword: function($password) {
		return /^[A-Za-z0-9]{6,}$/.test($password);
	},
	isTouch: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	// Dates
	crtDBDate: function() {
		var $now = new Date();
		return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
	},
	// Development
	eventAdd: function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	},
	classAdd: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($selector.className.indexOf($class) === -1) {
			$selector.className = $selector.className === '' ? $class : $selector.className + ' ' + $class;
		}
	},
	classRemove: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($crtClass.indexOf($class) > -1) {
			$selector.className = $selector.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
			if ($selector.className === '') {
				$selector.removeAttribute('class');
			}
		}
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	idRemove: function($selector) {
		$selector.removeAttribute('id');
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	},
	// DOM
	getIndex: function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
	},
	remove: function($selector) {
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
	},
	snap: function($selector, $breakpoint) {
		var $elements = document.querySelectorAll($selector);
		var $breakpoint = $breakpoint || 0;
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			var $snapElement = $elements[$i];
			var $elementPositionTop = $snapElement.getBoundingClientRect().top;
			web.eventAdd(window, 'scroll', function() {
				var $doc = document.documentElement;
				var $scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);

				if ($scrollTop >= $elementPositionTop) {
					if (window.innerWidth >= $breakpoint) {
						web.classAdd($snapElement, 'pos-fixed');
						$snapElement.style.top = 0;
					}
				} else {
					web.classRemove($snapElement, 'pos-fixed');
					$snapElement.style.top = 'auto';
				}
			});
		}
	},
	square: function($selector, $multiplier) {
		var $elements = document.querySelectorAll($selector);
		if (typeof($multiplier) === 'undefined') {
			$multiplier = 1;
		}
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			$elements[$i].style.height = Math.floor($elements[$i].offsetWidth * $multiplier) + 'px';
		};
	},
	wallpaper: function($selector) {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			// Variables
			var $thisWallpaper = $elements[$i].getAttribute('data-wallpaper');

			// Set the dimensions
			if ($thisWallpaper !== null) {
				$elements[$i].style.backgroundImage = 'url("' + $thisWallpaper + '")';
			}
		}
	},
	wrap: function($element, $tag, $className) {
		var $wrapper = document.createElement($tag);
		var $tempElement = $element.cloneNode(true);
		$wrapper.className = $className;

		$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
		$element.parentNode.removeChild($element);
	},
	wrapInner: function($element, $tag, $className) {
		if (typeof $tag === "string") {
			$tag = document.createElement($tag);
		}
		if ($className !== undefined) {
			var $div = $element.appendChild($tag).setAttribute('class', $className);
		} else {
			var $div = $element.appendChild($tag);
		}
		while ($element.firstChild !== $tag) {
			$tag.appendChild($element.firstChild);
		}
	},
	// Forms
	lockSubmit: function($selector) {
		var $elements = document.querySelectorAll($selector);

		for ($i = 0; $i < $elements.length; $i++) {
			$elements[$i].onclick = function($ev) {
				if ($ev.keyCode == 13) {
					return false;
				}
			};
		}
	},
	// Objects
	// As per Leon Revill
	// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
	searchObjects: function($obj, $key, $val) {
		var $objects = [];

		for (var $i in $obj) {
			if (typeof $obj[$i] == 'object') {
				$objects = $objects.concat(searchObjects($obj[$i], $key, $val));
			} else if ($i == $key && $obj[$key] == $val) {
				$objects.push($obj);
			}
		}

		return $objects;
	},
	// Strings
	getExtension: function($file) {
		return $file.split('.').pop().toLowerCase();
	},
	getIntegers: function($string) {
		return $string.replace(/^\D+ /g, '').replace(/ /g, '');
	},
	randomString: function($stringLength) {
		var $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

		var $len = $stringLength || 5;
		var $randomString = '';

		for (var $i = 0; $i < $len; $i++) {
			$rNum = Math.floor(Math.random() * $chars.length);
			$randomString += $chars[$rNum];
		}

		return $randomString;
	},
	ucAll: function($string) {
		return $string.toUpperCase();
	},
	ucFirst: function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	},
	// URL
	getUrl: function() {
		var $windowLocation = window.location;
		var $fullPath = $windowLocation.href;
		var $arPath = $windowLocation.href.split('/');
		var $hashSplit = $windowLocation.href.split('#');
		var $protocol = $arPath[0];
		var $host = $arPath[2];
		var $baseUrl = $protocol + '//' + $host;
		var $hashUrl = $windowLocation.hash.substring(1);
		var $sitePath = $hashSplit[0];
		var $arReturn = [];

		// Set the return array
		$arReturn['hash'] = $hashUrl;
		$arReturn['host'] = $host;
		$arReturn['baseUrl'] = $baseUrl;
		$arReturn['sitePath'] = $sitePath;
		$arReturn['fullPath'] = $fullPath;
		$arReturn['segments'] = $fullPath.replace($sitePath, '').split('/');

		// Return
		return $arReturn;
	},
	// Webplate
	navHide: function() {
		var $webNavigation = document.getElementById('web-navigation');

		Velocity($webNavigation, {
			left: 0
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				web.classRemove($htmlElement, 'web-nav-shown');
				web.classAdd($htmlElement, 'web-nav-hidden');
			}
		});

		// Set nav end position
		$navEndPosition = 0;

		// Hide overlay
		web.overlayHide();
	},
	navShow: function() {
		// Variables
		var $webNavigation = document.getElementById('web-navigation');
		var $navigationWidth = $webNavigation.offsetWidth;

		Velocity($webNavigation, {
			left: $navigationWidth
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				web.classAdd($htmlElement, 'web-nav-shown');
				web.classRemove($htmlElement, 'web-nav-hidden');
			}
		});

		// Set nav end position
		$navEndPosition = 260;

		// Show overlay
		web.overlayShow();
	},
	navigation: function() {
		var $navigationEl = document.getElementById('navigation');
		var $navigationTriggerEl = document.getElementById('navigation-trigger');

		// Check
		if (web.exists($navigationEl)) {
			// Variables
			var $navigationClone = $navigationEl.cloneNode(true);

			// Duplicate navigation & change class name
			$navigationClone.setAttribute('id', 'web-navigation');
			$bodyElement.appendChild($navigationClone);

			// On click
			$navigationTriggerEl.onclick = function($ev) {
				$ev.preventDefault();

				// Check state
				if (web.hasClass($htmlElement, 'web-nav-shown')) {
					web.navHide();
				} else {
					web.navShow();
				}
			};

			// Close nav again
			var $webOverlay = document.getElementById('web-overlay');
			var $webNavigation = document.getElementById('web-navigation');
			var $webNavigationLinks = $webNavigation.getElementsByTagName('a');

			$webOverlay.onclick = function() {
				web.navHide();
			};

			for ($i = 0; $i < $webNavigationLinks.length; $i++) {
				$webNavigationLinks[$i].onclick = function($ev) {
					web.navHide();
				};
			};
		}
	},
	overlayHide: function() {
		var $webOverlay = document.getElementById('web-overlay');

		Velocity($webOverlay, {
			opacity: 0
		}, {
			display: 'none',
			duration: 200
		});
	},
	overlayShow: function() {
		var $webOverlay = document.getElementById('web-overlay');

		Velocity($webOverlay, {
			opacity: 0.4
		}, {
			display: 'block',
			duration: 200
		});
	},
	scroll: function() {
		// Some variables
		var $doc = document.documentElement;
		var $lastScroll = 0;
		var $scrollTop;

		// Setup
		this.classAdd($htmlElement, 'web-scroll-none');

		// On scroll event
		this.eventAdd(window, 'scroll', function() {
			// Remove scroll nonw class
			if (web.hasClass($htmlElement, 'web-scroll-none')) {
				web.classRemove($htmlElement, 'web-scroll-none');
			}

			// Sets the current scroll position
			$scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);

			// Determine direction of scroll
			if ($scrollTop > $lastScroll) {
				if (!web.hasClass($htmlElement, 'web-scroll-down')) {
					web.classRemove($htmlElement, 'web-scroll-up');
					web.classAdd($htmlElement, 'web-scroll-down');
				}
			} else {
				if (web.hasClass($htmlElement, 'web-scroll-down')) {
					web.classRemove($htmlElement, 'web-scroll-down');
					web.classAdd($htmlElement, 'web-scroll-up');
				}
			}

			// Updates scroll position
			$lastScroll = $scrollTop;
		});
	},
	scrollTo: function($selector, $offset, $offsetLarge) {
		// Variables
		var $elements = document.querySelectorAll($selector);
		var $offset = $offset || 0;
		var $offsetLarge = $offsetLarge || false;

		for (var $i = 0; $i < $elements.length; $i++) {
			$elements[$i].onclick = function($ev) {
				return function($ev) {
					$ev.preventDefault();

					// Check the screen size
					var $vOffset = $offset;
					if (($offsetLarge !== false) && (window.innerWidth > 700)) {
						$vOffset = $offsetLarge;
					}
					Velocity(document.getElementById(this.getAttribute('data-scroll-to')), "scroll", {
						duration: 1200,
						easing: "easeOutCubic",
						offset: $vOffset
					});
				};
			}($i);
		}
	},
	windowType: function() {
		this.windowTypeExecute();
		this.eventAdd(window, 'resize', function() {
			web.windowTypeExecute();
		});
	},
	windowTypeExecute: function() {
		// Some variables
		if (window.innerWidth <= 700) {
			// Set the class
			if (this.hasClass($htmlElement, 'web-view-large')) {
				this.classRemove($htmlElement, 'web-view-large');
			}
			if (this.hasClass($htmlElement, 'web-view-small') == false) {
				this.classAdd($htmlElement, 'web-view-small');
			}
		} else {
			// Set the class
			if (this.hasClass($htmlElement, 'web-view-small')) {
				this.classRemove($htmlElement, 'web-view-small');
			}
			if (this.hasClass($htmlElement, 'web-view-large') == false) {
				this.classAdd($htmlElement, 'web-view-large');
			}
			if (this.hasClass($htmlElement, 'web-nav-shown')) {
				this.navHide();
			}
		}
	}
};