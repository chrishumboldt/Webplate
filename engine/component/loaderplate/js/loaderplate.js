/**
 * File: js/loaderplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Variables
// Options
// Check

// Defaults
var $loaderplateDefault = {
	body: false,
	colour: 'grey-blue',
	delay: 400,
	path: './loaders/',
	selector: false,
	size: 'large',
	type: 'puff'
};

var loaderplate = function($userOptions) {
	// Variables
	var $self = this;
	var $loader, $element, $loaderTimeout;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		body: (typeof $userOptions.body !== 'undefined') ? $userOptions.body : $loaderplateDefault.body,
		colour: $userOptions.colour || $loaderplateDefault.colour,
		delay: ($userOptions.delay >= 0) ? $userOptions.delay : $loaderplateDefault.delay,
		path: $userOptions.path || $loaderplateDefault.path,
		selector: $userOptions.selector || $loaderplateDefault.selector,
		size: $userOptions.size || $loaderplateDefault.size,
		type: $userOptions.type || $loaderplateDefault.type
	}

	// Tools
	var tool = function(document, $options) {
		// HTML
		var $loaderHTML = document.createElement('div');
		var $loaderImg = document.createElement('img');
		$loaderHTML.className = 'loaderplate ' + $options.colour + ' ' + $options.size;
		$loaderImg.setAttribute('src', $options.path + 'svg-loaders-' + $options.colour + '/' + $options.type + '.svg');
		$loaderHTML.appendChild($loaderImg);
		if ($options.body !== false) {
			var $loaderBody = document.createElement('div');
			$loaderBody.innerHTML = $options.body;
			$loaderHTML.appendChild($loaderBody);
		}

		var $toolHtml = {
			loader: $loaderHTML
		};

		// Return
		return {
			html: $toolHtml
		}
	}(document, $self.options);

	// Public functions
	$self.add = function() {
		if ($self.options.selector !== false) {
			$element = document.querySelector($self.options.selector);
			$loader = tool.html.loader;
			if (web.exists($element)) {
				$loaderTimeout = setTimeout(function() {
					web.classRemove($element, 'loaderplate-element-show');
					web.classAdd($element, 'loaderplate-element-hide');
					if (!web.exists($element.parentNode.querySelector('.loaderplate'))) {
						$element.parentNode.insertBefore($loader, $element);
					}
				}, $self.options.delay);
			}
		}
	};
	$self.remove = function() {
		web.classAdd($element, 'loaderplate-element-show');
		web.classRemove($element, 'loaderplate-element-hide');
		if (web.exists($loader.parentNode)) {
			if (web.exists($loader)) {
				$loader.parentNode.removeChild($loader);
			}
		} else {
			clearTimeout($loaderTimeout);
		}
	};

	// Calls
	$self.add();
};
