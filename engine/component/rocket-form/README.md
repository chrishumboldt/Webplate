# Rocket Form
A universal form component.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialization](#initialization)
	* [Options](#options)
	* [Defaults](#defaults)
* [HTML Examples](#html-examples)
* [Rocket Tools](#rocket-tools)
* [Formplate Deprecated](#formplate-deprecated)

## Getting Started
You can either download a copy of the [source files](https://github.com/chrishumboldt/Rocket-Form/archive/master.zip) or install via NPM.

```
npm install rocket-form
```

Start by including the necessary files.

```html
<head>
	<link href="rocket-form/css/form.min.css" rel="stylesheet" type="text/css">
</head>
<body>
    /* Your content goes here */
    <script src="rocket-form/js/form.min.js"></script>
</body>
```

## Basic Example
You will need to wrap your form elements with an identifier of your choice. Below is an example of executing the component complete with required HTML and Javascript.

```html
<div class="form">
   <label for="input-example">Example Label<label>
   <input id="input-example" type="text" placeholder="Example Input">
</div>
<script>
Rocket.form({
	selector: '.form-elements',
	style: 'raised'
});
</script>
```

## Initialization
Each initialization will return an array of component objects (An array will always be returned even if the selector is an id). This includes the form element itself as well as relevant methods. For example:

```javascript
var forms = Rocket.form();

// The form elements and all methods
for (var i = 0, len = forms.length; i < len; i++) {
	console.log(forms[i].form);
	forms[i].clear(); // Clear the value. Works on text inputs and textareas.
	forms[i].toggle('on'); // Toggle the form element to "on". Works on radio and checkboxes.
	forms[i].toggle('off');
}
```

Alternatively if you know the selector is unique you can reference the form element right away with the 0 index. For example:

```javascript
var form = Rocket.form({
    selector: '#form-element'
})[0]; // Reference the first item in the array right away.
```

#### Options
See the different options you have available on initialization.

Name | Default | Options | Description
---- | ---- | ---- | ----
`selector` | `.form` | | Set the HTML selector.
`colour` | `blue` | `grey` `black` `white` `aqua` `blue` `green` `orange` `pink` `purple` `red` `grey-blue` | Set the colour of the form elements.
`label` | `normal` | `normal` `shift` | Set an animation on the form label.
`style` | `line` | `flat` `line` `raised` | Set the style of the form elements.

#### Defaults
You can also overwrite the component selector option globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.form.selector = '.new-form-class';
Rocket.defaults.form.colour = 'green';
```

## HTML Examples
```html
<div class="form">
   <label for="text-1">Text Label</label>
   <input type="text" id="text-1" placeholder="Text input">
</div>
<div class="form">
   <label for="password-1">Password Label</label>
   <input type="password" id="password-1" placeholder="Password input">
</div>
<div class="form">
   <label for="textarea-1">Textarea Label</label>
   <textarea id="textarea-1" placeholder="Textarea"></textarea>
</div>
<div class="form">
   <label for="text-2">Input Icon</label>
   <div class="input-icon">
      <i class="fa fa-cog"></i>
      <input type="text" id="text-2" placeholder="Text input">
   </div>
</div>

<!-- Drop-down -->
<div class="form">
   <select>
      <option value="1">Select Option 1</option>
      <option value="2">Select Option 2</option>
      <option value="3">Select Option 3</option>
   </select>
</div>

<!-- Checkboxes -->
<div class="form">
   <input type="checkbox" id="checkbox-1" checked="checked">
   <label for="checkbox-1">Checkbox 1</label>
</div>
<div class="form">
   <input type="checkbox" id="checkbox-2">
   <label for="checkbox-2">Checkbox 2</label>
</div>
<div class="form">
   <input type="checkbox" id="checkbox-3">
   <label for="checkbox-3">Checkbox 3</label>
</div>

<!-- Toggler -->
<div class="form">
   <input type="checkbox" class="toggler">
	<span class="handle"></span>
</div>

<!-- Radio Inputs -->
<div class="form">
   <input type="radio" id="radio-1" name="radio-selection" value="1" checked="checked">
   <label for="radio-1">Radio Selection</label>
</div>
<div class="form">
   <input type="radio" id="radio-2" name="radio-selection" value="2">
   <label for="radio-2">Radio Selection</label>
</div>
<div class="form">
   <input type="radio" id="radio-3" name="radio-selection" value="3">
   <label for="radio-3">Radio Selection</label>
</div>

<!-- Input Group -->
<div class="form">
   <label for="text-3">Two</label>
   <div class="input-group-two">
      <input type="text" id="text-3" placeholder="Text input">
      <input type="text" id="text-4" placeholder="Text input">
   </div>
</div>
<div class="form">
   <label for="text-5">Three</label>
   <div class="input-group-three">
      <input type="text" id="text-5" placeholder="Text input">
      <input type="text" id="text-6" placeholder="Text input">
      <input type="text" id="text-7" placeholder="Text input">
   </div>
</div>
<div class="form">
   <label for="text-8">Two With Icon</label>
   <div class="input-group-two">
      <div class="input-icon">
         <i class="fa fa-cog"></i>
         <input type="text" id="text-8" placeholder="Text input">
      </div>
      <div class="input-icon">
         <i class="fa fa-cog"></i>
         <input type="text" id="text-9" placeholder="Text input">
      </div>
   </div>
</div>
```

## Rocket Tools
If you are using this component in conjunction with [Rocket Tools](https://github.com/chrishumboldt/Rocket-Tools), then **always** load the Rocket Tools library first. This component extends that library when detected.

## Formplate Deprecated
The original library, Formplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Formplate will be maintained only with bug fixes under the **formplate** branch.

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
