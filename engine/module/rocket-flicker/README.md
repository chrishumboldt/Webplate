# Rocket Flicker
A component that lets you flick through content.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialization](#initialization)
	* [Options](#options)
	* [Defaults](#defaults)
* [Advanced Example](#advanced-example)
* [Make It Touch Enabled](#make-it-touch-enabled)
* [Rocket Tools](#rocket-tools)
* [Flickerplate Deprecated](#flickerplate-deprecated)

## Getting Started
You can either download a copy of the [source files](https://github.com/chrishumboldt/Rocket-Flicker/archive/master.zip) or install via NPM.

```
npm install rocket-flicker
```

Start by including the necessary files.

```html
<head>
	<link href="rocket-flicker/css/flicker.min.css" rel="stylesheet" type="text/css">
</head>
<body>
	/* Your content goes here */
	<script src="rocket-flicker/js/flicker.min.js"></script>
</body>
```

## Basic Example
See the setup of the HTML and Javascript call below.

```html
<div class="flicker-example">
	<ul>
		<li data-background="image-url.jpg">
			<div class="flick-title">Example Heading</div>
			<div class="flick-sub-text">Sub Text</div>
		</li>
		<li data-background="image-url.jpg">
			<div class="flick-title">Example Heading</div>
			<div class="flick-sub-text">Sub Text</div>
		</li>
	</ul>
</div>
<script>
Rocket.flicker({
	selector: '.flicker-example'
});
</script>
```

## Initialization
Each initialization will return an array of component objects (An array will always be returned even if the selector is an id). This includes the flicker element itself as well as relevant methods. For example:

```Javascript
var flickers = Rocket.flicker({
	selector: '.flickers'
});

// The flickers and all methods
for (var i = 0, len = flickers.length; i < len; i++) {
	console.log(flickers[i].flicker);
	flickers[i].move(3); // Move this flicker to position 3
	flickers[i].start(); // Start the auto flicker
	flickers[i].stop(); // Stop the auto flicker
}
```

Alternatively if you know the selector is unique you can reference the flicker right away with the 0 index. For example:

```javascript
var myFlicker = Rocket.flicker({
	selector: '#flicker'
})[0]; // Reference the first item in the array right away.

myFlicker.stop();
```

#### Options
See the different options you have available on initialization.

Name | Default | Options | Description
---- | ---- | ---- | ----
`animation` | `transform-slide` | `transform-slide`, `transition-fade`, `transition-slide` | Choose the animation type you want.
`arrows` | `true` | `true`, `false` | Arrows are used to navigate back and forth between the flicks.
`arrowsConstraint` | `false` | `true`, `false` | When you get to the end of the flicks pressing the next arrow will navigate you to the beginning again should you have a false constraint. The same applies to the previous arrow.
`autoFlick` | `true` | `true`, `false` | Sets the flick to run automatically. A manual flick resets the delay.
`autoFlickDelay` | `10` | | Set the delay (in seconds) between each auto flick.
`dotAlignment` | `center` | `center`, `left`, `right` | Set the horizontal alignment of the dot navigation.
`dots` | `true` | `true`, `false` | Dot navigation is used to indicate and navigate between the flicks.
`position` | `1` | | Set the starting flick.
`selector` | `.flicker` | | Set the flicker selector.

#### Defaults
You can also overwrite the component options globally by altering the defaults. To do so reference the defaults object property. For example:

```javascript
Rocket.defaults.flicker.autoFlickDelay = 20;
Rocket.defaults.flicker.dots = false;
```

## Advanced Example
See an advanced example below with options as per the above.

```javascript
var myFlicker = Rocket.flicker({
	selector: '.flicker-example',
	animation: 'transition-fade',
	autoFlick: false,
	dotAlignment: 'right'
});
```

## Make It Touch Enabled
To make your flicker touch enabled, just included the Hammer library (Rocket Flicker comes with a copy). For example.

```html
<body>
	/* Your content goes here */
	<script src="rocket-flicker/js/hammer-v2.0.3.min.js"></script>
	<script src="rocket-flicker/js/flicker.min.js"></script>
</body>
```

## Rocket Tools
If you are using this component in conjunction with [Rocket Tools](https://github.com/chrishumboldt/Rocket-Tools), then **always** load the Rocket Tools library first. This component extends that library when detected.

## Flickerplate Deprecated
The original library, Flickerplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Flickerplate will be maintained only with bug fixes under the **flickerplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Contributors
<a href="https://github.com/dsuket">dsuket</a>

## Copyright and License
Copyright 2016 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
