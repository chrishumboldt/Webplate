/**
 * File: tools.js
 * Type: Javascript engine
 * Author: Chris Humboldt
 */

// Table of contents
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
		title: document.getElementsByTagName('title')[0],
		webplateScript: document.getElementById('webplate')
	};
	var $webPrefix = {
		basic: 'web-',
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
		return ($element === null || typeof($element) === undefined) ? false : true;
	};
	var hasWhiteSpace = function($check) {
		return /\s/.test($check);
	};
	var hasClass = function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	};
	var hasExtension = function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.extensions;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	};
	var isColor = function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	};
	var isColour = function($colour) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($colour);
	};
	var isDate = function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	};
	var isEmail = function($email, $regExp) {
		var $regExp = $regExp || /([\w\.]+)@([\w\.]+)\.(\w+)/i;
		return $regExp.test($email);
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
	var isPassword = function($password, $regExp) {
		var $regExp = $regExp || /^(?=.*\d).{6,}$/;
		return $regExp.test($password);
	};
	var isTime = function($time, $regExp) {
		var $regExp = $regExp || /([01]\d|2[0-3]):([0-5]\d)/;
		return $regExp.test($time);
	};
	var isTouch = function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	};
	var isURL = function($url, $regExp) {
		var $regExp = $regExp || /(https?:\/\/[^\s]+)/g;
		return $regExp.test($url);
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
	var classAdd = function($element, $class) {
		if ($element !== null) {
			if (typeof $class === 'object') {
				for (var $i = 0, $len = $class.length; $i < $len; $i++) {
					classAddExecute($element, $class[$i]);
				}
			} else {
				classAddExecute($element, $class);
			}
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
		if ($element !== null) {
			if (typeof $class === 'object') {
				for (var $i = $class.length - 1; $i >= 0; $i--) {
					classRemoveExecute($element, $class[$i]);
				}
			} else {
				classRemoveExecute($element, $class);
			}
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
	var getIndex = function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
	};
	var idAdd = function($element, $id) {
		$element.setAttribute('id', $id);
	};
	var idRemove = function($element) {
		$element.removeAttribute('id');
	};
	var inputDisable = function($selector) {
		var $inputElements = inputGet($selector);
		for (var $i = $inputElements.length - 1; $i >= 0; $i--) {
			$inputElements[$i].disabled = true;
		}
	}
	var inputEnable = function($selector) {
		var $inputElements = inputGet($selector);
		for (var $i = $inputElements.length - 1; $i >= 0; $i--) {
			$inputElements[$i].disabled = false;
		}
	}
	var inputGet = function($selector) {
		var $inputElements;
		var $type = $selector.charAt(0);
		if ($type === '#' || $type === '.') {
			$inputElements = document.querySelectorAll($selector);
		} else {
			$inputElements = document.getElementsByTagName($selector);
		}
		return $inputElements;
	}
	var remove = function($selector) {
		if ($selector.charAt(0) === '#' && !hasWhiteSpace($selector)) {
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
	var setRatio = function($selector, $multiplier) {
		var $elements = document.querySelectorAll($selector);
		if (typeof($multiplier) === 'undefined') {
			$multiplier = 1;
		}
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			$elements[$i].style.height = Math.floor($elements[$i].offsetWidth * $multiplier) + 'px';
		};
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

	// File
	var fileLoad = function($file, $callback) {
		var $xmlhttp = new XMLHttpRequest();
		$xmlhttp.onreadystatechange = $callback;
		$xmlhttp.open('GET', $file, true);
		$xmlhttp.send();
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
	// http://www.revillweb.com/tutorials/super-useful-javascript-functions/
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
	var removeFirst = function($string) {
		return $string.substring(1);
	};
	var removeFirstLast = function($string) {
		return $string.substring(1, $string.length - 1);
	};
	var removeLast = function($string) {
		return $string.substring(0, $string.length - 1);
	};
	var removeWhiteSpace = function($string) {
		return $string.replace(/ /g, '');
	};
	var ucAll = function($string) {
		return $string.toUpperCase();
	};
	var ucFirst = function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	};

	// URL
	var url = function($ret) {
		var $ret = $ret || 'all';
		var $crtScriptSrc = $webEl.webplateScript.getAttribute('src').replace('start.js', '');
		var $windowLocation = window.location;
		var $fullUrl = $windowLocation.href;

		var $currentUrl = $fullUrl.split('#')[0];
		var $hash = $windowLocation.hash.substring(1);
		var $host = $windowLocation.host;
		var $protocol = $windowLocation.protocol + '//';

		var $baseUrl = '';
		if (document.getElementsByTagName('base').length > 0) {
			$baseUrl = document.getElementsByTagName('base')[0].href;
		} else {
			$baseUrl = $protocol + $host;
		}
		var $pathname = $windowLocation.pathname;
		var $segments = [];
		var $pathnameSplit = $pathname.split('/');
		for (var $i = 0, $len = $pathnameSplit.length; $i < $len; $i++) {
			if ($pathnameSplit[$i].indexOf('.') < 0 && $pathnameSplit[$i] != '') {
				$segments.push($pathnameSplit[$i]);
			}
		}

		var $objUrl = {
			baseUrl: $baseUrl,
			currentUrl: $currentUrl,
			fullUrl: $fullUrl,
			hash: $hash,
			host: $host,
			pathname: $pathname,
			protocol: $protocol,
			segments: $segments
		};

		if ($ret === 'all') {
			return $objUrl;
		} else {
			return $objUrl[$ret];
		}
	};

	// Webplate
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
	var scrollTo = function($options) {
		var $self = this;

		$options = $options || false;
		$self.options = {
			selector: $options.selector || '.scroll-to',
			duration: 1000,
			offset: $options.offset || 0,
			offsetLarge: $options.offsetLarge || false
		};

		var $elements = document.querySelectorAll($self.options.selector);

		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			scrollToExecute($elements[$i], $self.options);
		}
	};
	var scrollToExecute = function($element, $options) {
		$element.onclick = function(event) {
			var $vOffset = $options.offset;
			if (($options.offsetLarge !== false) && (window.innerWidth > 700)) {
				$vOffset = $options.offsetLarge;
			}
			var $scrollToElement = document.getElementById(this.getAttribute('href').substring(1));
			if ($scrollToElement != null) {
				event.preventDefault();
				Velocity($scrollToElement, 'scroll', {
					duration: $options.duration,
					easing: 'easeout',
					offset: $vOffset
				});
			}
		};
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
		}
	};

	// Return
	return {
		element: $webEl,
		prefix: $webPrefix,
		exists: exists,
		hasWhiteSpace: hasWhiteSpace,
		hasClass: hasClass,
		hasExtension: hasExtension,
		isColor: isColor,
		isColour: isColour,
		isDate: isDate,
		isEmail: isEmail,
		isFullInteger: isFullInteger,
		isImage: isImage,
		isInteger: isInteger,
		isPassword: isPassword,
		isTime: isTime,
		isTouch: isTouch,
		isURL: isURL,
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
		inputDisable: inputDisable,
		inputEnable: inputEnable,
		getIndex: getIndex,
		remove: remove,
		setRatio: setRatio,
		snap: snap,
		stateClear: stateClear,
		stateSet: stateSet,
		stateToggle: stateToggle,
		wallpaper: wallpaper,
		wrap: wrap,
		wrapInner: wrapInner,
		fileLoad: fileLoad,
		lockSubmit: lockSubmit,
		searchObjects: searchObjects,
		getExtension: getExtension,
		getIntegers: getIntegers,
		randomString: randomString,
		removeFirst: removeFirst,
		removeFirstLast: removeFirstLast,
		removeLast: removeLast,
		removeWhiteSpace: removeWhiteSpace,
		ucAll: ucAll,
		ucFirst: ucFirst,
		url: url,
		overlayAdd: overlayAdd,
		overlayHide: overlayHide,
		overlayShow: overlayShow,
		scrollWatch: scrollWatch,
		scrollTo: scrollTo,
		windowWatch: windowWatch,
		windowTypeExecute: windowTypeExecute
	};
}();