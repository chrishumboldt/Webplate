# Rocket Button
A lightweight, universal button component.

* [Getting Started](#getting-started)
* [CSS Implementation](#css-implementation)
* [SASS Implementation](#sass-implementation)
* [Javascript Initialization](#javascript-initialization)
	* [Defaults](#defaults)
* [Rocket Tools](#rocket-tools)
* [Buttonplate Deprecated](#buttonplate-deprecated)

## Getting Started
You can either download a copy of the source files or install via NPM.

```
npm install rocket-button
```

## CSS Implementation
Start by including the necessary files.

```html
<head>
	<link href="rocket-button/css/button.min.css" rel="stylesheet" type="text/css">
</head>
```

Now class your button with a modifier to gain the desired effect. For example:

```html
<button class="button _line-red _large">Example Button</button>
```

There are a variety of options for the CSS modifiers.

Class | Options | Description
---- |  ---- | ----
`_(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour of the button.
`_flat-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to flat.
`_gradient-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to gradient.
`_line-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to line.
`_(x)` | `small` `normal` `large` `x-large` | Set the size of the the button.
`_(x)` | `rounded` `pill` `square` | Set the shape of the the button.

If no modifiers are provided then the colour will default to grey, the style to flat, the size to normal and the shape to rounded.

## SASS Implementation
Instead of including the CSS file above, you can import the SASS file and create your own button styles. See an example below:

```scss
@import "rocket-button/build/sass/import";

.btn-primary,
.btn-secondary {
   @include button-setup();
   @include button-shape(rounded);
}
.btn-primary {
   @include button-style(line, black);
   @include button-size(large);
}
.btn-secondary {
   @include button-style(flat, white);
   @include button-size(normal);
}
```

There are a variety of options for the SASS builds.

SASS | Default | Options | Description
---- | ---- | ---- | ----
`button-setup()` | | | Apply to all buttons.
`button-shape(x)` | `rounded` | `pill` `rounded` `square` | Set the shape of the button.
`button-size(x)` | `normal` | `small` `normal` `large` `x-large` | Set the size of the button.
`button-style(x, y)` | `flat`, `white` | `flat` `gradient` `line` | Set `x` to the style of button.<br>Set `y` to the colour.
`rocket-button-css(x)` | `.button` | | Create styles for selector `x`.

## Javascript Initialization
If you want to enable button drop downs then you will need to execute the following Javascript. Start by including the necessary files. By default the selector option is set to **.button**.

```html
<body>
	<div id="btn-primary" class="button _blue">
		Drop Down Default<div class="arrow"></div>
		<ul>
			<li><a href>Link 1</a></li>
			<li><a href>Link 2</a></li>
			<li class="line-top"><a href>Link 3</a></li>
		</ul>
	</div>

	// Include the script
	<script src="rocket-button/js/button.min.js"></script>
	<script>
	Rocket.button({
	   selector: '#btn-primary'
	});
	</script>
</body>
```

Each initialization will return an array of component objects (An array will always be returned even if the selector is an id). This includes the button element itself as well as relevant methods. For example:

```javascript
// By default the selector option is set to '.button'
var buttons = Rocket.button();

// The buttons and all methods
for (var i = 0, len = buttons.length; i < len; i++) {
	console.log(buttons[i].button);
	myButton[i].open(); // Open the button drop down
	myButton[i].close(); // Close the button drop down
}
```

Alternatively if you know the button selector is unique you can reference the button right away with the 0 index. For example:

```javascript
var myButton = Rocket.button({
	selector: '#my-button'
})[0]; // Reference the first item in the array right away.
```

#### Defaults
You can also overwrite the component selector option globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.button.selector = '.new-button-class';
```

## Rocket Tools
If you are using this component in conjunction with [Rocket Tools](https://github.com/chrishumboldt/Rocket-Tools), then **always** load the Rocket Tools library first. This component extends that library when detected.

## Buttonplate Deprecated
The original library, Buttonplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Buttonplate will be maintained only with bug fixes under the **buttonplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

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
