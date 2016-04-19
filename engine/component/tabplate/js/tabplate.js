/**
 * File: tabplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools

var $tabplateDefault = {
	selector: '#tab-triggers',
	tabs: '#tab-content',
	animate: true
}

var tabplate = function($userOptions) {
	// Setup
	var $self = this;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		selector: $userOptions.selector || $tabplateDefault.selector,
		tabs: $userOptions.tabs || $tabplateDefault.tabs,
		animate: (typeof $userOptions.animate != 'undefined') ? $userOptions.animate : $tabplateDefault.animate
	}

	// Variables
	var $tabContainer = document.querySelector($self.options.tabs);
	var $triggersContainer = document.querySelector($self.options.selector);

	// Functions
	var tabTriggers = function() {
		var $triggers = $triggersContainer.querySelectorAll('a');
		for (var $i = 0, $len = $triggers.length; $i < $len; $i++) {
		   $triggers[$i].onclick = function(event) {
				event.preventDefault();
				if (this.getAttribute('href') !== null) {
					web.classRemove($triggersContainer.querySelector('._active'), '_active');
					web.classAdd(this.parentNode, '_active');
					tabShow(this.getAttribute('href').substring(1));
				}
			};
		}
	};
	var tabsSetup = function() {
		// Triggers
		if (web.exists($triggersContainer)) {
			web.classAdd($triggersContainer, 'tp-triggers');
			web.classAdd($triggersContainer.querySelector('li:first-child'), '_active');
			tabTriggers();
		}
		// Tabs
		if (web.exists($tabContainer)) {
			web.classAdd($tabContainer, 'tp-tabs');
			web.classAdd($tabContainer.querySelector('li:first-child'), '_active');
		}
		// Animate
		if ($self.options.animate === true) {
			web.classAdd(web.element.html, 'tp-animate');
		}
	};
	var tabShow = function($id) {
		web.classRemove($tabContainer.querySelector('._active'), '_active');
		web.classAdd(document.getElementById($id), '_active');
	};

	// Execute
	tabsSetup();
};
