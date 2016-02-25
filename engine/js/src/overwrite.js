/**
 * File: overwrite.js
 * Type: Javascript Component Overwrite
 * Author: Chris Humboldt
 */

// Formplate
if (typeof $formplateDefault !== 'undefined') {
   $formplateDefault.selector = '.web-form';
   $formplateDefault.style = 'flat';
}
// Loaderplate
if (typeof $loaderplateDefault !== 'undefined') {
   $loaderplateDefault.path = web.url('baseUrl') + '/webplate/engine/component/loaderplate/loaders/';
}