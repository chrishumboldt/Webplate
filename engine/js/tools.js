/**
 * File: tools.js
 * Type: Javascript tools file
 * Author: Chris Humboldt
 * Last Edited: 22 April 2015
 */


// Table of contents
// ---------------------------------------------------------------------------------------
// Basic checks
// Dates
// Development
// DOM
// Forms
// Objects
// Strings
// URL
// Webplate


// Basic checks
// ---------------------------------------------------------------------------------------
var webExists = function($element) {
	if ($element == null || typeof($element) == 'undefined') {
		return false;
	} else {
		return true;
	}
};

var webHasWhiteSpace = function($check) {
	return /\s/.test($check);
};

var webIsColor = function($color) {
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
};

var webIsDate = function($date) {
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};

var webIsEmail = function($email) {
	return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
};

var webIsExt = function($file, $arAllowedTypes) {
	var $allowedTypes = $arAllowedTypes || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

	var $fileExt = $file.split('.').pop().toLowerCase();

	return $allowedTypes[$fileExt];
};

var webIsFullInteger = function($int) {
	return /^[0-9]+$/.test($int);
};

var webIsImage = function($file, $arAllowedTypes) {
	var $allowedTypes = $arAllowedTypes || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];

	var $fileExt = $file.split('.').pop().toLowerCase();

	return $allowedTypes[$fileExt];
};

var webIsInteger = function($int) {
	return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
};

var webIsPassword = function($password) {
	return /^[A-Za-z0-9]{6,}$/.test($password);
};


// Dates
// ---------------------------------------------------------------------------------------
var webCrtDBDate = function() {
	var $now = new Date();
	return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
};


// Development
// ---------------------------------------------------------------------------------------
var webAddEvent = function($elem, $type, $eventHandle) {
	// Check element
	if ($elem == null || typeof($elem) == 'undefined') return;

	if ($elem.addEventListener) {
		$elem.addEventListener($type, $eventHandle, false);
	} else if ($elem.attachEvent) {
		$elem.attachEvent("on" + $type, $eventHandle);
	} else {
		$elem["on" + $type] = $eventHandle;
	}
};
var webClassAdd = function($selector, $class) {
	var $crtClass = $selector.getAttribute('class');

	// Set the class
	$selector.setAttribute('class', $crtClass + ' ' + $class);
};

var webClassRemove = function($selector, $class) {
	// Remove the class
	var $newClass = $selector.className.replace($class + ' ', '');
	$newClass = $newClass.replace(' ' + $class, '');
	$newClass = $newClass.replace($class, '');
	$selector.className = $newClass;
};

var webHasClass = function($element, $class) {
	return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
};

var webIdAdd = function($selector, $id) {
	// Set the id
	$selector.setAttribute('id', $id);
};

var webLog = function($text) {
	if (window.console) {
		console.log($text);
	}
};


// DOM
// ---------------------------------------------------------------------------------------
var webSquare = function($selector, $multiplier) {
	// Variables
	var $elements = document.querySelectorAll($selector);
	if (typeof($multiplier) === 'undefined') {
		$multiplier = 1;
	}

	// Loop through elements
	for (var $i = 0; $i < $elements.length; $i++) {
		// Width
		var $squareDim = Math.floor($elements[$i].offsetWidth * $multiplier);

		// Set the dimensions
		$elements[$i].style.height = $squareDim + 'px';
	}
};

var webWallpaper = function($selector) {
	// Variables
	var $elements = document.querySelectorAll($selector);

	// Loop through elements
	for (var $i = 0; $i < $elements.length; $i++) {
		// Variables
		var $thisWallpaper = $elements[$i].getAttribute('data-wallpaper');

		// Set the dimensions
		if ($thisWallpaper !== null) {
			$elements[$i].style.backgroundImage = 'url("' + $thisWallpaper + '")';
		}
	}
};


// Forms
// ---------------------------------------------------------------------------------------
var webLockSubmit = function($selector) {
	var $elements = document.querySelectorAll($selector);

	for ($i = 0; $i < $elements.length; $i++) {
		$elements[$i].onclick = function($ev) {
			if ($ev.keyCode == 13) {
				return false;
			}
		};
	}
};


// Objects
// ---------------------------------------------------------------------------------------
// As per Leon Revill
// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
webSearchObjects = function($obj, $key, $val) {
	var $objects = [];

	for (var $i in $obj) {
		if (typeof $obj[$i] == 'object') {
			$objects = $objects.concat(searchObjects($obj[$i], $key, $val));
		} else if ($i == $key && $obj[$key] == $val) {
			$objects.push($obj);
		}
	}

	return $objects;
};


// Strings
// ---------------------------------------------------------------------------------------
var webGetExt = function($file) {
	return $file.split('.').pop().toLowerCase();
};

var webRandomString = function($stringLength) {
	var $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	var $len = $stringLength || 5;
	var $randomString = '';

	for (var $i = 0; $i < $len; $i++) {
		$rNum = Math.floor(Math.random() * $chars.length);
		$randomString += $chars[$rNum];
	}

	return $randomString;
};

var webUCAll = function($string) {
	return $string.toUpperCase();
};

var webUCFirst = function($string) {
	return $string.charAt(0).toUpperCase() + $string.slice(1);
};


// URL
// ---------------------------------------------------------------------------------------
var webGetUrl = function() {
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

	// Return
	return $arReturn;
}


// Webplate
// ---------------------------------------------------------------------------------------
// Variables
var $bodyElement = document.getElementsByTagName('body')[0];
var $htmlElement = document.getElementsByTagName('html')[0];
var $navEndPosition = 0;
var $navigationWidth;
var $navTrackPosition;
var $navigation = document.getElementById('navigation');
var $navigationTrigger = document.getElementById('navigation-trigger');

var webNavHide = function() {
	var $webNavigation = document.getElementById('web-navigation');

	Velocity($webNavigation, {
		left: 0
	}, {
		duration: 200,
		easing: 'ease-out',
		complete: function() {
			webClassRemove($htmlElement, 'web-nav-shown');
			webClassAdd($htmlElement, 'web-nav-hidden');
		}
	});

	// Set nav end position
	$navEndPosition = 0;

	// Hide overlay
	webOverlayHide();
};

var webNavShow = function() {
	// Variables
	var $webNavigation = document.getElementById('web-navigation');
	var $navigationWidth = $webNavigation.offsetWidth;

	Velocity($webNavigation, {
		left: $navigationWidth
	}, {
		duration: 200,
		easing: 'ease-out',
		complete: function() {
			webClassAdd($htmlElement, 'web-nav-shown');
			webClassRemove($htmlElement, 'web-nav-hidden');
		}
	});

	// Set nav end position
	$navEndPosition = 260;

	// Show overlay
	webOverlayShow();
};

var webNavigation = function() {
	// Check
	if (webExists($navigation)) {
		// Variables
		var $navigationClone = $navigation.cloneNode(true);

		// Duplicate navigation & change class name
		$navigationClone.setAttribute('id', 'web-navigation');
		$bodyElement.appendChild($navigationClone);

		// On click
		$navigationTrigger.onclick = function($ev) {
			$ev.preventDefault();

			// Check state
			if (webHasClass($htmlElement, 'web-nav-shown')) {
				webNavHide();
			} else {
				webNavShow();
			}
		};

		// Close nav again
		var $webOverlay = document.getElementById('web-overlay');
		var $webNavigation = document.getElementById('web-navigation');
		var $webNavigationLinks = $webNavigation.getElementsByTagName('a');

		$webOverlay.onclick = function() {
			webNavHide();
		};

		for ($i = 0; $i < $webNavigationLinks.length; $i++) {
			$webNavigationLinks[$i].onclick = function($ev) {
				webNavHide();
			};
		};
	}
};

var webOverlayHide = function() {
	var $webOverlay = document.getElementById('web-overlay');

	Velocity($webOverlay, {
		opacity: 0
	}, {
		display: 'none',
		duration: 200
	});
};

var webOverlayShow = function() {
	var $webOverlay = document.getElementById('web-overlay');

	Velocity($webOverlay, {
		opacity: 0.4
	}, {
		display: 'block',
		duration: 200
	});
};

var webScroll = function() {
	// Some variables
	var $doc = document.documentElement;
	var $lastScroll = 0;
	var $scrollTop;

	// Setup
	webClassAdd($htmlElement, 'web-scroll-none');

	// On scroll event
	webAddEvent(window, 'scroll', function() {
		// Remove scroll nonw class
		if (webHasClass($htmlElement, 'web-scroll-none')) {
			webClassRemove($htmlElement, 'web-scroll-none');
		}

		// Sets the current scroll position
		$scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);

		// Determine direction of scroll
		if ($scrollTop > $lastScroll) {
			if (!webHasClass($htmlElement, 'web-scroll-down')) {
				webClassRemove($htmlElement, 'web-scroll-up');
				webClassAdd($htmlElement, 'web-scroll-down');
			}
		} else {
			if (webHasClass($htmlElement, 'web-scroll-down')) {
				webClassRemove($htmlElement, 'web-scroll-down');
				webClassAdd($htmlElement, 'web-scroll-up');
			}
		}

		// Updates scroll position
		$lastScroll = $scrollTop;
	});
}

var webScrollTo = function($selector, $offset, $offsetLarge) {
	// Variables
	var $elements = document.querySelectorAll($selector);
	var $offset = $offset || 0;
	var $offsetLarge = $offsetLarge || false;

	for ($i = 0; $i < $elements.length; $i++) {
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
};

var webWindowType = function() {
	webWindowTypeExecute();
	webAddEvent(window, 'resize', function() {
		webWindowTypeExecute();
	});
};

var webWindowTypeExecute = function() {
	// Some variables
	if (window.innerWidth <= 700) {
		// Set the class
		if (webHasClass($htmlElement, 'web-view-large')) {
			webClassRemove($htmlElement, 'web-view-large');
		}
		if (webHasClass($htmlElement, 'web-view-small') == false) {
			webClassAdd($htmlElement, 'web-view-small');
		}
	} else {
		// Set the class
		if (webHasClass($htmlElement, 'web-view-small')) {
			webClassRemove($htmlElement, 'web-view-small');
		}
		if (webHasClass($htmlElement, 'web-view-large') == false) {
			webClassAdd($htmlElement, 'web-view-large');
		}
		if (webHasClass($htmlElement, 'web-nav-shown')) {
			webNavHide();
		}
	}
};