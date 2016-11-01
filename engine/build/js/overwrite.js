/**
 * File: engine/build/js/src/overwrite.js
 * Type: Javascript component overwrite
 * Author: Chris Humboldt
**/

// Buttons
if (typeof Buttonplate !== undefined) {
	Buttonplate.defaults.selector = '.web-button';
}
// Flickers
if (typeof Flickerplate !== undefined) {
	Flickerplate.defaults.selector = '.web-flicker';
}
