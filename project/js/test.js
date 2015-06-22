/**
 * File: test.js
 * Type: Javascript test
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Basic test

// Basic test
// ---------------------------------------------------------------------------------------
var $testButtonStateActivate = document.getElementById('testButtonStateActivate');
var $testButtonStateDeactivate = document.getElementById('testButtonStateDeactivate');
var $testButtonStateToggle = document.getElementById('testButtonStateToggle');
var $testElement = document.getElementById('testElement');

$testButtonStateToggle.onclick = function() {
	web.stateToggle($testElement, 'visible');
};
$testButtonStateActivate.onclick = function() {
	web.stateSet($testElement, 'active');
};
$testButtonStateDeactivate.onclick = function() {
	web.stateSet($testElement, 'inactive');
};