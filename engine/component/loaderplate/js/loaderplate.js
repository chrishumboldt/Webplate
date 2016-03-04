/**
 * File: js/loaderplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Variables
// Options
// Tools
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
		body: $userOptions.body || $loaderplateDefault.body,
		colour: $userOptions.colour || $loaderplateDefault.colour,
		delay: ($userOptions.delay >= 0) ? $userOptions.delay : $loaderplateDefault.delay,
		path: $userOptions.path || $loaderplateDefault.path,
		selector: $userOptions.selector || $loaderplateDefault.selector,
		size: $userOptions.size || $loaderplateDefault.size,
		type: $userOptions.type || $loaderplateDefault.type
	}

	// Make the loader
	var $loaderHTML = document.createElement('div');
	var $loaderImg = document.createElement('img');
	$loaderHTML.className = 'loaderplate ' + $self.options.colour + ' ' + $self.options.size;
	$loaderImg.setAttribute('src', $self.options.path + 'svg-loaders-' + $self.options.colour + '/' + $self.options.type + '.svg');
	$loaderHTML.appendChild($loaderImg);
	if ($self.options.body !== false) {
		var $loaderBody = document.createElement('div');
		$loaderBody.innerHTML = $self.options.body;
		$loaderHTML.appendChild($loaderBody);
	}

	// Public functions
	$self.add = function() {
		if ($self.options.selector !== false) {
			$element = document.querySelector($self.options.selector);
			if (web.exists($element)) {
				$loaderTimeout = setTimeout(function() {
					web.classRemove($element, 'loaderplate-element-show');
					web.classAdd($element, 'loaderplate-element-hide');
					$element.parentNode.insertBefore($loaderHTML, $element);
				}, $self.options.delay);
			}
		}
	};
	$self.remove = function() {
		web.classAdd($element, 'loaderplate-element-show');
		if (web.exists($loaderHTML.parentNode)) {
			$loader.parentNode.removeChild($loaderHTML);
			web.classRemove($element, 'loaderplate-element-hide');
		} else {
			clearTimeout($loaderTimeout);
		}
	};

	// Calls
	$self.add();
};