/**
 * File: tools.js
 * Type: Javascript engine
 * Author: Chris Humboldt
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

var web = function() {

	// Variables
	var $webEl = {
		body: document.getElementsByTagName('body')[0],
		html: document.getElementsByTagName('html')[0],
		webplateScript: document.getElementById('webplate')
	};
	var $webPrefix = {
		basic: 'web-',
		navigation: 'web-nav-',
		position: 'web-pos-',
		scroll: 'web-scroll-',
		state: 'web-state-'
	};
	var $webState = {
		alts: {
			active: 'inactive',
			closed: 'open',
			hidden: 'visible',
			inactive: 'active',
			open: 'closed',
			visible: 'hidden'
		},
		list: ['active', 'closed', 'hidden', 'inactive', 'open', 'selected', 'toggled', 'visible']
	};
	var $webTypes = {
		extensions: ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
		images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
	};

	// Basic checks
	var exists = function($element) {
		if ($element === null || typeof($element) === undefined) {
			return false;
		} else {
			return true;
		}
	};
	var hasWhiteSpace = function($check) {
		return /\s/.test($check);
	};
	var hasClass = function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	};
	var isColor = function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	};
	var isDate = function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	};
	var isEmail = function($email) {
		return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
	};
	var isExtension = function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.extensions;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	};
	var isFullInteger = function($int) {
		return /^[0-9]+$/.test($int);
	};
	var isImage = function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.images;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	};
	var isInteger = function($int) {
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
	};
	var isPassword = function($password) {
		return /^[A-Za-z0-9]{6,}$/.test($password);
	};
	var isTouch = function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	};

	// Dates
	var crtDBDate = function() {
		var $now = new Date();
		return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
	};

	// Development
	var log = function($text) {
		if (window.console) {
			console.log($text);
		}
	};

	// DOM
	var append = function($html, $parent) {
		var $div = document.createElement('div');
		$div.innerHTML = $html;
		document.querySelector($parent || 'body').appendChild($div.firstChild);
	};
	var eventAdd = function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	};
	var classAdd = function($element, $class) {
		if (typeof $class === 'object') {
			for (var $i = 0, $len = $class.length; $i < $len; $i++) {
				classAddExecute($element, $class[$i]);
			}
		} else {
			classAddExecute($element, $class);
		}
	};
	var classAddExecute = function($element, $class) {
		var $crtClass = $element.className;
		if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
			$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
		}
	};
	var classClear = function($element) {
		$element.removeAttribute('class');
	};
	var classRemove = function($element, $class) {
		if (typeof $class === 'object') {
			for (var $i = $class.length - 1; $i >= 0; $i--) {
				classRemoveExecute($element, $class[$i]);
			}
		} else {
			classRemoveExecute($element, $class);
		}
	};
	var classRemoveExecute = function($element, $class) {
		if ($element.className.indexOf($class) > -1) {
			$element.className = $element.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
			if ($element.className === '') {
				classClear($element);
			}
		}
	};
	var classReplace = function($element, $removeClass, $addClass) {
		classAdd($element, $addClass);
		classRemove($element, $removeClass);
	};
	var idAdd = function($element, $id) {
		$element.setAttribute('id', $id);
	};
	var idRemove = function($element) {
		$element.removeAttribute('id');
	};
	var getIndex = function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
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
	var snap = function($selector, $breakpoint) {
		var $breakpoint = $breakpoint || 0;
		var $doc = document.documentElement;
		var $elements = document.querySelectorAll($selector);
		var $scrollTop = 0;
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			var $snapElement = $elements[$i];
			var $elementPositionTop = $snapElement.getBoundingClientRect().top;
			eventAdd(window, 'scroll', function() {
				$scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);

				if ($scrollTop >= $elementPositionTop) {
					if (window.innerWidth >= $breakpoint) {
						classAdd($snapElement, 'pos-fixed');
						$snapElement.style.top = 0;
					}
				} else {
					classRemove($snapElement, 'pos-fixed');
					$snapElement.style.top = 'auto';
				}
			});
			if ($breakpoint > 0) {
				eventAdd(window, 'resize', function() {
					if (window.innerWidth < $breakpoint) {
						classRemove($snapElement, 'pos-fixed');
						$snapElement.style.top = 'auto';
					} else {
						if ($scrollTop >= $elementPositionTop) {
							classAdd($snapElement, 'pos-fixed');
							$snapElement.style.top = 0;
						}
					}
				});
			}
		}
	};
	var square = function($selector, $multiplier) {
		var $elements = document.querySelectorAll($selector);
		if (typeof($multiplier) === 'undefined') {
			$multiplier = 1;
		}
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			$elements[$i].style.height = Math.floor($elements[$i].offsetWidth * $multiplier) + 'px';
		};
	};
	var stateClear = function($element) {
		var $newWebStates = $webState.list.slice().map(function($newState) {
			return $webPrefix.state + $newState;
		});
		classRemove($element, $newWebStates);
	};
	var stateSet = function($element, $state) {
		var $newWebStates = $webState.list.slice().map(function($newState) {
			return $webPrefix.state + $newState;
		});
		var $stateClass = $newWebStates.splice($newWebStates.indexOf($webPrefix.state + $state), 1);
		classReplace($element, $newWebStates, $stateClass);
	};
	var stateToggle = function($element, $state, $clear) {
		if ($webState.list.indexOf($state) > 1) {
			var $altState = $webState.alts[$state] || false;
			var $clear = $clear || false;
			var $stateClass = $webPrefix.state + $state;

			if (hasClass($element, $stateClass)) {
				if ($clear || $altState === false) {
					stateClear($element);
				} else {
					stateSet($element, $altState);
				}
			} else {
				stateSet($element, $state);
			}
		}
	};
	var wallpaper = function($selector) {
		var $elements = document.querySelectorAll($selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			var $thisWallpaper = $elements[$i].getAttribute('data-wallpaper');
			if ($thisWallpaper !== null) {
				$elements[$i].style.backgroundImage = 'url("' + $thisWallpaper + '")';
			}
		}
	};
	var wrap = function($element, $tag, $className) {
		var $wrapper = document.createElement($tag);
		var $tempElement = $element.cloneNode(true);
		$wrapper.className = $className;

		$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
		$element.parentNode.removeChild($element);
	};
	var wrapInner = function($element, $tag, $className) {
		if (typeof $tag === 'string') {
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
	};

	// Forms
	var lockSubmit = function($selector) {
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
	// As per Leon Revill
	// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
	var searchObjects = function($obj, $key, $val) {
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
	var getExtension = function($file) {
		return $file.split('.').pop().toLowerCase();
	};
	var getIntegers = function($string) {
		return $string.replace(/^\D+ /g, '').replace(/ /g, '');
	};
	var randomString = function($stringLength) {
		var $chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var $len = $stringLength || 5;
		var $randomString = '';

		for (var $i = 0; $i < $len; $i++) {
			$rNum = Math.floor(Math.random() * $chars.length);
			$randomString += $chars[$rNum];
		}

		return $randomString;
	};
	var ucAll = function($string) {
		return $string.toUpperCase();
	};
	var ucFirst = function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	};

	// URL
	var getUrl = function() {
		var $crtScriptSrc = $webEl.webplateScript.getAttribute('src').replace('start.js', '');
		var $crtScriptSrcCount = $crtScriptSrc.split('/').length;
		var $windowLocation = window.location;
		var $fullPath = $windowLocation.href;
		var $arPath = $windowLocation.href.split('/');
		var $hashSplit = $windowLocation.href.split('#');
		var $protocol = $arPath[0];
		var $host = $arPath[2];
		var $baseUrl = $protocol + '//' + $host;
		var $hashUrl = $windowLocation.hash.substring(1);
		var $scriptPath = '';
		var $sitePath = $hashSplit[0];
		for (var $i = 0, $len = ($arPath.length - $crtScriptSrcCount); $i < $len; $i++) {
			if ($arPath[$i] != undefined) {
				$scriptPath += $arPath[$i] + '/';
			}
		}
		var $objReturn = {
			baseUrl: $baseUrl,
			fullPath: $fullPath,
			hash: $hashUrl,
			host: $host,
			postScriptPath: $fullPath.replace($scriptPath, ''),
			postScriptSegments: $fullPath.replace($scriptPath, '').split('/'),
			scriptPath: $scriptPath,
			sitePath: $sitePath,
			segments: $fullPath.replace($sitePath, '').split('/')
		};
		return $objReturn;
	};

	// Webplate
	var navHide = function() {
		var $webNavigation = document.getElementById($webPrefix.basic + 'navigation');
		Velocity($webNavigation, {
			left: 0
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				classReplace($webEl.html, $webPrefix.navigation + 'shown', $webPrefix.navigation + 'hidden');
			}
		});
		overlayHide();
	};
	var navShow = function() {
		// Variables
		var $webNavigation = document.getElementById($webPrefix.basic + 'navigation');
		var $navigationWidth = $webNavigation.offsetWidth;

		Velocity($webNavigation, {
			left: $navigationWidth
		}, {
			duration: 200,
			easing: 'ease-out',
			complete: function() {
				classReplace($webEl.html, $webPrefix.navigation + 'hidden', $webPrefix.navigation + 'shown');
			}
		});
		overlayShow();
	};
	var navigation = function() {
		var $navigation = document.getElementById('navigation');
		var $navigationTrigger = document.getElementById('navigation-trigger');
		if (exists($navigation)) {
			var $navigationClone = $navigation.cloneNode(true);

			$navigationClone.setAttribute('id', $webPrefix.basic + 'navigation');
			$webEl.body.appendChild($navigationClone);

			// On click
			if (exists($navigationTrigger)) {
				$navigationTrigger.onclick = function(event) {
					event.preventDefault();
					if (hasClass($webEl.html, $webPrefix.navigation + 'shown')) {
						navHide();
					} else {
						navShow();
					}
				};
			}

			// Close nav again
			var $webOverlay = document.getElementById($webPrefix.basic + 'overlay');
			var $webNavigation = document.getElementById($webPrefix.basic + 'navigation');
			var $webNavigationLinks = $webNavigation.getElementsByTagName('a');

			if (exists($webOverlay)) {
				$webOverlay.onclick = function() {
					navHide();
				};
			}

			for (var $i = $webNavigationLinks.length - 1; $i >= 0; $i--) {
				$webNavigationLinks[$i].onclick = function($ev) {
					navHide();
				};
			};
		}
	};
	var overlayAdd = function() {
		var $webplateOverlay = document.createElement('div');
		idAdd($webplateOverlay, $webPrefix.basic + 'overlay');
		if (!exists(document.getElementById($webPrefix.basic + 'overlay'))) {
			$webEl.body.appendChild($webplateOverlay);
		}
	};
	var overlayHide = function() {
		classRemove($webEl.html, 'web-overlay-reveal');
	};
	var overlayShow = function() {
		setTimeout(function() {
			classAdd($webEl.html, 'web-overlay-reveal');
		}, 50);
	};
	var scrollTo = function($selector, $offset, $offsetLarge) {
		var $elements = document.querySelectorAll($selector);
		var $offset = $offset || 0;
		var $offsetLarge = $offsetLarge || false;

		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			$elements[$i].onclick = function($ev) {
				return function($ev) {
					$ev.preventDefault();

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
	var scrollWatch = function() {
		var $doc = document.documentElement;
		var $lastScroll = 0;
		var $scrollTop;

		classAdd($webEl.html, $webPrefix.scroll + 'none');
		eventAdd(window, 'scroll', function() {
			if (hasClass($webEl.html, $webPrefix.scroll + 'none')) {
				classRemove($webEl.html, $webPrefix.scroll + 'none');
			}
			$scrollTop = (window.pageYOffset || $doc.scrollTop) - ($doc.clientTop || 0);
			if ($scrollTop > $lastScroll) {
				if (!hasClass($webEl.html, $webPrefix.scroll + 'down')) {
					classRemove($webEl.html, $webPrefix.scroll + 'up');
					classAdd($webEl.html, $webPrefix.scroll + 'down');
				}
			} else {
				if (hasClass($webEl.html, $webPrefix.scroll + 'down')) {
					classRemove($webEl.html, $webPrefix.scroll + 'down');
					classAdd($webEl.html, $webPrefix.scroll + 'up');
				}
			}
			$lastScroll = $scrollTop;
		});
	};
	var windowWatch = function() {
		windowTypeExecute();
		eventAdd(window, 'resize', function() {
			windowTypeExecute();
		});
	};
	var windowTypeExecute = function() {
		if (window.innerWidth <= 700) {
			if (hasClass($webEl.html, 'web-view-large')) {
				classRemove($webEl.html, 'web-view-large');
				classAdd($webEl.html, 'web-view-small');
			} else {
				classAdd($webEl.html, 'web-view-small');
			}
		} else {
			if (hasClass($webEl.html, 'web-view-small')) {
				classRemove($webEl.html, 'web-view-small');
				classAdd($webEl.html, 'web-view-large');
			} else {
				classAdd($webEl.html, 'web-view-large');
			}
			if (hasClass($webEl.html, 'web-nav-shown')) {
				navHide();
			}
		}
	};

	// Return
	return {
		element: $webEl,
		prefix: $webPrefix,
		exists: exists,
		hasWhiteSpace: hasWhiteSpace,
		hasClass: hasClass,
		isColor: isColor,
		isDate: isDate,
		isEmail: isEmail,
		isExtension: isExtension,
		isFullInteger: isFullInteger,
		isImage: isImage,
		isInteger: isInteger,
		isPassword: isPassword,
		isTouch: isTouch,
		crtDBDate: crtDBDate,
		log: log,
		append: append,
		eventAdd: eventAdd,
		classAdd: classAdd,
		classClear: classClear,
		classRemove: classRemove,
		classReplace: classReplace,
		idAdd: idAdd,
		idRemove: idRemove,
		getIndex: getIndex,
		remove: remove,
		snap: snap,
		square: square,
		stateClear: stateClear,
		stateSet: stateSet,
		stateToggle: stateToggle,
		wallpaper: wallpaper,
		wrap: wrap,
		wrapInner: wrapInner,
		lockSubmit: lockSubmit,
		searchObjects: searchObjects,
		getExtension: getExtension,
		getIntegers: getIntegers,
		randomString: randomString,
		ucAll: ucAll,
		ucFirst: ucFirst,
		getUrl: getUrl,
		navHide: navHide,
		navShow: navShow,
		navigation: navigation,
		overlayAdd: overlayAdd,
		overlayHide: overlayHide,
		overlayShow: overlayShow,
		scrollWatch: scrollWatch,
		scrollTo: scrollTo,
		windowWatch: windowWatch,
		windowTypeExecute: windowTypeExecute
	};
}();