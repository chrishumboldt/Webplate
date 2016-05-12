/**
 * File: demo.js
 * Type: Javascript demo
 * Author: Chris Humboldt
 */

// Demo stuff
// ---------------------------------------------------------------------------------------
setTimeout(function() {
	web.snap('.snap');
	web.snap('.snap-large', 700);
}, 400);

document.querySelector('.modal-basic').onclick = function() {
	new modalplate({
		heading: 'Basic Modal',
		body: 'This is a test'
	});
};
document.querySelector('.modal-form').onclick = function() {
	new modalplate({
		heading: 'Form Modal',
		body: 'Some Cool Stuff'
	});
};
