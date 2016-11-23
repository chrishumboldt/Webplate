/**
 * File: build/js/inject-wrapper.js
 * Type: Javascript wrapper
 * Author: Chris Humboldt
**/

/*
This file will modularise Rocket inject and declare Mustache as a dependancy.
It's really the easiet way to get it working.
*/

define(['mustache'], function () {
	require(['injector']);
});
