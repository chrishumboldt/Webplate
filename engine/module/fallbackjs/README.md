<img alt="Fallback JS" height="128" src="http://fallback.io/img/logo.png" />
Fallback JS
========
**WORKS IN LEGACY AND MODERN BROWSERS!**
*Tested and working in Chrome, Firefox, Safari and IE 6 - 10!*

**Fallback JS** is a tiny library that allows you to load both your JavaScript and CSS libraries after your page has already loaded. The library also allows you to specify **"failovers"** or **"fallbacks"** for each of your libraries, this way in case one of those external libraries you're using happens to fail, you won't be leaving your users with a dysfunctional website. Just because someone else's website breaks, it doesn't mean that yours should!

######<a class="button1" href="http://fallback.io/" title="The official Fallback JS homepage!" target="_blank">Official Homepage</a>
######<a class="button1" href="https://github.com/dolox/fallback/" title="Fallback JS on GitHub" target="_blank">GitHub Repository</a>

#Downloads
######<a class="button2" href="https://raw.github.com/dolox/fallback/v1.1.7/fallback.min.js" title="Production version of Fallback JS" target="_blank">Production (v1.1.7)</a> *Compressed 3.58 KB*
######<a class="button2" href="https://raw.github.com/dolox/fallback/v1.1.7/fallback.js" title="Development version of Fallback JS" target="_blank">Development (v1.1.7)</a> *Uncompressed 12.47 KB*

**SEE WORKING DEMOS WITH SOURCE CODE AT <a href="http://plnkr.co/tags/fallbackjs">http://plnkr.co/tags/fallbackjs</a>**

#Introduction
##Getting Started
###Quick and easy demonstration.

To let you dive right in, we're going to provide you with a sample of code below. If you want to learn more you can read through the rest of this page for all of the technical details. This quick and easy demonstration should be enough for you to understand how to use the library and implement it in your code.

```html
// Include the Fallback JS library.
<script src="fallback.min.js"></script>

// Script block to execute Fallback JS
<script>

	// Here we actually invoke Fallback JS to retrieve the following libraries for the page.
	fallback.load({
		// Include your stylesheets, this can be an array of stylesheets or a string!
		page_css: 'index.css',
		global_css: ['public.css', 'members.css'],

		// JavaScript library. THE KEY MUST BE THE LIBRARIES WINDOW VARIABLE!
		JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

		// Here goes a failover example. The first will fail, therefore Fallback JS will load the second!
		jQuery: [
			'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.FAIL_ON_PURPOSE.min.js',
			'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js'
		],

		'jQuery.ui': [
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
			'//js/loader.js?i=vendor/jquery-ui.min.js'
		]
	}, {
		// Shim jQuery UI so that it will only load after jQuery has completed!
		shim: {
			'jQuery.ui': ['jQuery']
		},

		callback: function(success, failed) {
			// success - object containing all libraries that loaded successfully.
			// failed - object containing all libraries that failed to load.

			// All of my libraries have finished loading!

			// Execute my code that applies to all of my libraries here!
		}
	});

	fallback.ready(['jQuery'], function() {
		// jQuery Finished Loading

		// Execute my jQuery dependent code here!
	});

	fallback.ready(['jQuery', 'JSON'], function() {
		// jQuery and JSON Finished Loading

		// Execute my jQuery + JSON dependent code here!
	});

	fallback.ready(function() {
		// All of my libraries have finished loading!

		// Execute my code that applies to all of my libraries here!
	});
</script>
```

##Why Fallback JS?
###Unlimited failovers, and size that does matter!
The sole purpose of Fallback JS is to make it extremely easy for you as a developer to load as many external JavaScript and/or CSS libraries that you want with the ability to have as many failovers as you want without you having to write custom code or run through extra loops to achieve this goal.

Along with this premise, the filesize the extremely small, the main purpose of loading JavaScript files after your website has already loaded is to decrease your page load time (see below). You want your users to load as little as possible so you website can load as fast as it possibly can. Think outside the box. All of your users won't always be on high speed internet connections, and we all know how slow surfing the web can sometimes be on mobile devices.

##Improving Page Load Times
###Speed is important!
An extremely common way of coding websites throughout the internet for years has been to put your javascript and stylesheet references in the &lt;head&gt; of your HTML. By doing this you're forcing the browser to wait for those libraries to load before it actually displays the page to the user.
Alternatively there are a few ways around this. First you can put your references at the bottom of the page before closing the <body> tag. This alone will boost the speed of your page loads.
To boost the page load speed even further, you simply don't reference those libraries at all in the HTML and instead you can let JavaScript load those libraries for you after the page load. This is exactly what Fallback JS does for you!

##Failovers For Your Libraries
###So that your website doesn't break!
So you found all of these great CDNs that host popular libraries such as jQuery, Dojo and Underscore.js just to name a few. You don't want to waste bandwidth on libraries that you can include for free on your website, that's understandable. But what happens when one of those CDNs you're using goes down for maintenance? Or mysteriously stops working out of the blue? Your website breaks! That's what happens!

Don't get stuck leaving your users with a dysfunctional website because of someone else's mistakes. You should always have multiple failovers for any external library you decide to bundle for your website.
Fallback JS makes this extremely easy for you to integrate into your website. Not only can you have as many failovers as you want for each of your libraries, but you can also implement shimming as well. Shimming for example is the ability to load certain libraries if other libraries have finished loading. Case by example jQuery UI depends on jQuery. You simply cannot load jQuery UI before jQuery has finished loading. In this instance you would shim jQuery UI to load after jQuery has completed.

##What is shimming?
```
shim
verb (used with object)

	"to fill out or bring to a level by inserting a shim or shims."
	
	"to modify a load, clearance, or magnetic field by the use of shims"

	Source: http://dictionary.reference.com/browse/shim/
```

When we refer to **shims** or **shimming** we are referring to modifying the load context of your libraries that you specify. For instance there will be cases where you cannot load certain libraries until other libraries have first loaded. One of the main cases by example that is pointed out is jQuery UI. jQuery UI cannot be loaded until jQuery has loaded, therefore jQuery must load first, and we must **shim** jQuery UI to load only after jQuery has finished.

#API
##ready
###fallback.ready([libraries], callback)
`[libraries]` **array** *optional*

`callback` **function** *optional*

Executes your function provided to the `callback` as soon as your libraries have finished loading. The `[libraries]` array parameter is **optional**, if an array is not passed in the code will assume that the first parameter passed is the `callback` and in turn will only execute once all of your libraries have finished loading. If you provide the `[libraries]` array, the `callback` will only trigger your callback when those libraries provided have finished loading. You may define the `ready` function multiple times throughout your code.

```javascript
fallback.ready(function() {
	// All of my libraries are loaded. Execute my code here!
});

fallback.ready(['jQuery', 'jQuery.ui'], function() {
	// jQuery and jQuery UI are finished. Spin up my animation code here!
});
```

##load
###fallback.load({libraries}, {options})
`{libraries}` **object** *optional*

Expects to be an *object* containing a key value pair where the **key** is the library's window variable, and the value is the **url** to fetch the library from. The **keys** must be the window variable name of the library you're loading if it's a JavaScript library. This is only relevant for JavaScript libraries and **not StyleSheets**, for StyleSheets you can name them however you please. For example jQuery's key would be **jQuery** since **window.jQuery** exists after jQuery has finished loading. This is required to provide support for legacy browsers.

The values of your keys can be either a **string** or **array**. If you happen to pass an **array** as the **value** Fallback JS will iterate through each of items in the **order provided** until one of them has loaded successfully. This provides the *failover functionality* so that if your first request *fails*, it will try the next item in the array to load for the library in question.

```javascript
{
	// The key for stylesheets **doesn't matter**, name them however you like.
	css: 'index.css',

	// You have the option to pass a string as your value
	JSON: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min.js',

	// You have the option to pass an array as your value
	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.**FAILONPURPOSE** .min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js',
		'//localhost/js/jquery.min.js'
	],

	// Note that the **key** correlates to jQuery UI's window variable.
	'jQuery.ui': [
		'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js',
		'//js/loader.js?i=vendor/jquery-ui.min.js',
		'//localhost/js/jquery-ui.min.js'
	]
}
```

`options` **object** *optional*

Expects to be an *object* containing a key value pair where the **key** is either `shim` or `callback`.

`>` `shim` **object** *optional*

Expects its value to be an **object** containing a key value pair where the **key** is the library you want to **shim**, and the **value** is an **array** of libraries you want to finish loading first before attempting to actually load the library specified as the **key**.

`>` `callback` **function** *optional*

Expects to be a function and will accept 2 parameters `success` and `failed` which will be returned as objects. The first parameter will be `success` which is an **object** of all the libraries that were successfully loaded. The second parameter will be `failed` which is an **object** of all the libraries that failed to load.

```javascript
{
	// Shimming example. We only want to load jQuery UI after jQuery has loaded!
	// Otherwise if jQuery UI loads before jQuery we will get JavaScript errors.
	shim: {
		'jQuery.ui': ['jQuery']
	},

	// Here you have the ability to place callback within the object.
	// This is the equivalent of calling fallback.ready()
	callback: function(success, failed) {
		// Inline Callback
	}
}
```

#About
##License
###The MIT License (MIT)
Copyright (c) 2013 Dolox Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Support
###We use GitHub!
Any questions, suggestions or bugs should all be submitted to the issues section of the project's GitHub repository.
