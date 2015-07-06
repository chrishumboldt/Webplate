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
	var applyHTML = function($element, $generatedHTML, $className, $onDone) {
		if ($className !== false) {
			$element.className = $className;
		}
		$element.innerHTML = $generatedHTML;
		if ($onDone.length > 0) {
			setTimeout(function() {
				$onDone.reverse();
				for (var $i = 0, $len = $onDone.length; $i < $len; $i++) {
					if ($onDone[$i] !== undefined) {
						$onDone[$i].call(window);
					}
				}
			});
		}
	};
	var bind = function($bindObj) {
		var $generatedHTML;
		var $className = $bindObj.className || false;
		var $componentHTML = ($bindObj.html) ? $bindObj.html : $componentList[$bindObj.component].html;
		var $data = $bindObj.data || false;
		var $returnHTML = $bindObj.returnHTML || false;
		var $selector = $bindObj.selector || '#inject-' + $bindObj.component;
		var $selectorType = $selector.charAt(0);
		var $onDone = [];

		// Return functions
		if ($bindObj.onDone) {
			$onDone.push($bindObj.onDone);
		} else if ($componentList[$bindObj.component].onDone !== false) {
			$onDone.push($componentList[$bindObj.component].onDone);
		};

		if ($returnHTML === true) {
			$generatedHTML = generateHTML($componentHTML, $data)
			return {
				html: $generatedHTML.flatHTML,
				onDone: $onDone
			};
		} else {
			if ($selectorType === '.') {
				var $elements = document.querySelectorAll($selector);
				$generatedHTML = generateHTML($componentHTML, $data);
				for (var $i = $generatedHTML.onDone.length - 1; $i >= 0; $i--) {
					$onDone.push($generatedHTML.onDone[$i][0]);
				}
				for (var $i = $elements.length - 1; $i >= 0; $i--) {
					applyHTML($elements[$i].innerHTML, $generatedHTML.flatHTML, $className, $onDone);
				}
			} else if ($selectorType === '#') {
				var $idElement = document.getElementById($selector.substring(1));
				if (exists($idElement)) {
					$generatedHTML = generateHTML($componentHTML, $data);
					for (var $i = $generatedHTML.onDone.length - 1; $i >= 0; $i--) {
						$onDone.push($generatedHTML.onDone[$i][0]);
					}
					applyHTML($idElement, $generatedHTML.flatHTML, $className, $onDone);
				}
			}
		}
	};
	var component = function($objComponent) {
		$componentList[$objComponent.name] = {
			html: $objComponent.html,
			onDone: $objComponent.onDone || false
		};
	};
	var exists = function($element) {
		if ($element === null || typeof($element) === undefined) {
			return false;
		} else {
			return true;
		}
	};
	var generateHTML = function($html, $data) {
		var $flatHTML = '';
		var $onDone = [];
		if ($html !== undefined) {
			for (var $i = 0, $len = $html.length; $i < $len; $i++) {
				if (typeof $html[$i] === 'object') {
					for (var $key in $html[$i]) {
						if ($key === 'inject') {
							var $innerBinding = bind({
								component: $html[$i][$key],
								data: $data,
								returnHTML: true
							});
							$flatHTML += $innerBinding.html;
							$onDone.push($innerBinding.onDone);
						} else {
							$flatHTML += generateObjHTML($data[$key], $html[$i][$key]);
						}
					}
				} else {
					$flatHTML += $html[$i];
				}
			}
		};
		return {
			flatHTML: $flatHTML,
			onDone: $onDone
		};
	};
	var generateObjHTML = function($data, $keyHTML) {
		var $returnHTML = '';
		var $flatKeyHTML = '';
		for (var $i = 0, $len = $keyHTML.length; $i < $len; $i++) {
			$flatKeyHTML += $keyHTML[$i];
		}
		if ($data !== undefined) {
			if ($data.length !== undefined) {
				for (var $i = 0, $len = $data.length; $i < $len; $i++) {
					var $newKeyHTML = $flatKeyHTML;
					for (var $key in $data[$i]) {
						$newKeyHTML = $newKeyHTML.replace(new RegExp('{{' + $key + '}}', 'g'), $data[$i][$key]);
					}
					$returnHTML += $newKeyHTML;
				}
			} else {
				var $newKeyHTML = $flatKeyHTML;
				for (var $key in $data) {
					$newKeyHTML = $newKeyHTML.replace(new RegExp('{{' + $key + '}}', 'g'), $data[$key]);
				}
				$returnHTML += $newKeyHTML;
			}
		}
		return $returnHTML;
	};

	// Return
	return {
		bind: bind,
		component: component,
		componentList: $componentList
	};
};