/**
 * File: overwrite.js
 * Type: Javascript Component Overwrite
 * Author: Chris Humboldt
 */


// Flickerplate
if (typeof $flickerplateDefault !== 'undefined') {
	$flickerplateDefault.selector = '.web-flicker';
}

// Formplate
if (typeof $formplateDefault !== 'undefined') {
	$formplateDefault.selector = '.web-form';
	$formplateDefault.style = 'flat';
}

// Loaderplate
if (typeof $loaderplateDefault !== 'undefined') {
	$loaderplateDefault.path = web.url('currentUrl') + 'webplate/engine/component/loaderplate/loaders/';
}

// Navplate
if (typeof $navplateDefault !== 'undefined') {
	$navplateDefault.selector = '#web-nav-trigger';
	$navplateDefault.active = 'always';
}