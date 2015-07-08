/**
 * File: injectplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Components

// Components
// ---------------------------------------------------------------------------------------
var injectplate = function() {
	// HTML
	var $componentList = {};

	// Functions
	var append = function($html, $element, $overwrite, $onDone) {
		// var $container = document.createElement($containerType);
		// $container.innerHTML = $html;
		// $element.appendChild($container.firstChild);
		if ($overwrite === true) {
			$element.innerHTML = $html;
		} else {
			$element.innerHTML += $html;
		}
		$element.setAttribute('data-inject', 'true');
		if ($onDone !== undefined) {
			setTimeout(function() {
				$onDone.call(window);
			});
		}
	};
	var bind = function($objBind) {
		// Binding element
		var $selectorType = ($objBind.to) ? $objBind.to.charAt(0) : false;
		var $element = false;
		if ($selectorType === false) {
			$element = document.getElementById('inject-' + $objBind.component);
		} else {
			if ($selectorType === '#') {
				$element = document.getElementById($objBind.to.substring(1));
			} else if ($selectorType === '.') {
				$element = document.querySelector($objBind.to);
			} else {
				$element = document.getElementsByTagName($objBind.to)[0];
			}
		}

		// Flatten HTML
		if (exists($element)) {
			var $flatHTML = flattenHTML($componentList[$objBind.component].html, $objBind.data);
			if ($objBind.className || $componentList[$objBind.component].className) {
				$element.className = ($objBind.className || $componentList[$objBind.component].className);
			}
			append($flatHTML, $element, $objBind.overwrite || $componentList[$objBind.component].overwrite, $objBind.onDone);
		}
	};
	var component = function($objComponent) {
		$componentList[$objComponent.name] = {
			className: $objComponent.className || false,
			html: $objComponent.html,
			onDone: $objComponent.onDone || false,
			overwrite: $objComponent.overwrite || false
		};
	};
	var exists = function($element) {
		if ($element === undefined || $element === null || typeof($element) === undefined) {
			return false;
		} else {
			return true;
		}
	};
	var flattenHTML = function($componentHTML, $bindData) {
		var $flatHTML = '';
		var $bracketRegExp = new RegExp('{{([^}]+)}}', 'g');

		// Manage data
		var $topLevelBinding = [];
		var $nestedBinding = [];
		for (var $dataKey in $bindData) {
			if (!$bindData.hasOwnProperty($dataKey)) {
				continue;
			}
			if (typeof $bindData[$dataKey] === 'object') {
				$nestedBinding[$dataKey] = $bindData[$dataKey];
			} else {
				$topLevelBinding[$dataKey] = $bindData[$dataKey];
			}
		}

		// Flatten HTML
		for (var $i = 0, $len = $componentHTML.length; $i < $len; $i++) {
			if (typeof $componentHTML[$i] === 'object') {
				for (var $componentHTMLKey in $componentHTML[$i]) {
					// Inner HTML flat
					var $innerFlatHTML = '';
					var $arInnerHTML = $componentHTML[$i][$componentHTMLKey];
					for (var $r = $arInnerHTML.length - 1; $r >= 0; $r--) {
						$innerFlatHTML += $arInnerHTML[$r];
					}

					// Bind data
					var $componentData = $nestedBinding[$componentHTMLKey];
					for (var $componentDataKey in $componentData) {
						$flatHTML += $innerFlatHTML;
						$innerData = $componentData[$componentDataKey];
						if ($innerFlatHTML.indexOf('{{') > -1) {
							var $htmlMatch = $innerFlatHTML.match($bracketRegExp);
							if ($htmlMatch !== null) {
								for (var $i2 = $htmlMatch.length - 1; $i2 >= 0; $i2--) {
									var $replaceValue = stringToRef($innerData, $htmlMatch[$i2].substring(2, $htmlMatch[$i2].length - 2)) || '';
									$flatHTML = $flatHTML.replace(new RegExp($htmlMatch[$i2], 'g'), $replaceValue);
								}
							}
						}
					}
				}
			} else {
				// Check to see if there are any binding options
				$flatHTML += $componentHTML[$i];
				if ($componentHTML[$i].indexOf('{{') > -1) {
					var $htmlMatch = $componentHTML[$i].match($bracketRegExp);
					for (var $i2 = $htmlMatch.length - 1; $i2 >= 0; $i2--) {
						var $replaceValue = $topLevelBinding[$htmlMatch[$i2].substring(2, $htmlMatch[$i2].length - 2)] || '';
						$flatHTML = $flatHTML.replace(new RegExp($htmlMatch[$i2], 'g'), $replaceValue);
					}
				}
			}
		}

		return $flatHTML;
	};
	var log = function($text) {
		if (window.console) {
			console.log($text);
		}
	};
	// As per: http://scott.donnel.ly/javascript-function-to-convert-a-string-in-dot-andor-array-notation-into-a-reference/
	var stringToRef = function(object, reference) {
		function arr_deref(o, ref, i) {
			return !ref ? o : (o[ref.slice(0, i ? -1 : ref.length)]);
		}

		function dot_deref(o, ref) {
			return !ref ? o : ref.split('[').reduce(arr_deref, o);
		}
		return reference.split('.').reduce(dot_deref, object);
	};

	// Return
	return {
		bind: bind,
		component: component,
		componentList: $componentList,
		log: log
	};
};
