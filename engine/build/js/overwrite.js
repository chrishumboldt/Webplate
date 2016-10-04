/**
 * File: engine/js/src/overwrite.js
 * Type: Javascript Component Overwrite
 * Author: Chris Humboldt
**/

if (typeof $flickerplateDefault !== 'undefined') {
	$flickerplateDefault.selector = '.web-flicker';
}
if (typeof $formplateDefault !== 'undefined') {
	$formplateDefault.selector = '.web-form';
	$formplateDefault.style = 'flat';
}
if (typeof $loaderplateDefault !== 'undefined') {
	$loaderplateDefault.path = web.url('baseUrl') + '/webplate/engine/component/loaderplate/loaders/';
}
if (typeof $menuplateDefault !== 'undefined') {
	$menuplateDefault.selector = '.web-menu-trigger';
}
