# Formplate
A global form plugin.

## Getting Started
You can either download a copy of the source files or install Formplate via Bower.

```
bower install formplate
```

Start by including the necessary files. **NOTE** to include the formplate data attribute (data-formplate-colour) on the **body** tag else it will default to a blue fallback.

```
<head>
	<link href="css/formplate.css" rel="stylesheet" type="text/css">
</head>
<body>
    /* Your content goes here */
    <script src="js/min/formplate.js"></script>
</body>
```

## Basic Example
You will need to wrap your form elements with an identifier of your choice. Below is an example of executing the component complete with required HTML and Javascript.
```
<div class="form-el">
   <label for="input-example">Example Label<label>
   <input id="input-example" type="text" placeholder="Example Input">
</div>
<script>
new formplate({
   selector: '.form-el'
});
</script>
```

## Javascript Options
See the different options you have available on component call.

| Name | Default | Options | Description |
| ---- | ---- | ---- | ---- |
| selector | false | | Set the HTML selector. |
| colour | blue | grey, black, white, aqua, blue, green, orange, pink, purple, red, grey-blue | Set the colour of the form elements. |
| style | line | flat, line, raised | Set the style of the form elements. |

#### Defaults
You can also set or overwrite the above options globally by altering the Formplate defaults. To do so reference the **$formplateDefault** object. For example:

```
<script>
// Default change
$formplateDefault.selector = '.form-element';
$formplateDefault.colour = 'red';
$formplateDefault.style = 'flat';

// Execute
new formplate();
</script>
```

## HTML Examples
```
<div class="form-el">
   <label for="text-1">Text Label</label>
   <input type="text" id="text-1" placeholder="Text input">
</div>
<div class="form-el">
   <label for="password-1">Password Label</label>
   <input type="password" id="password-1" placeholder="Password input">
</div>
<div class="form-el">
   <label for="textarea-1">Textarea Label</label>
   <textarea id="textarea-1" placeholder="Textarea"></textarea>
</div>
<div class="form-el">
   <label for="text-2">Input Icon</label>
   <div class="input-icon">
      <i class="fa fa-cog"></i>
      <input type="text" id="text-2" placeholder="Text input">
   </div>
</div>

// Drop-down
<div class="form-el">
   <select>
      <option value="1">Select Option 1</option>
      <option value="2">Select Option 2</option>
      <option value="3">Select Option 3</option>
   </select>
</div>

// Checkboxes
<div class="form-el">
   <input type="checkbox" id="checkbox-1" checked="checked">
   <label for="checkbox-1">Checkbox 1</label>
</div>
<div class="form-el">
   <input type="checkbox" id="checkbox-2">
   <label for="checkbox-2">Checkbox 2</label>
</div>
<div class="form-el">
   <input type="checkbox" id="checkbox-3">
   <label for="checkbox-3">Checkbox 3</label>
</div>

// Toggler
<div class="form-el">
   <input type="checkbox" class="toggler">
	<span class="handle"></span>
</div>

// Radio Inputs
<div class="form-el">
   <input type="radio" id="radio-1" name="radio-selection" value="1" checked="checked">
   <label for="radio-1">Radio Selection</label>
</div>
<div class="form-el">
   <input type="radio" id="radio-2" name="radio-selection" value="2">
   <label for="radio-2">Radio Selection</label>
</div>
<div class="form-el">
   <input type="radio" id="radio-3" name="radio-selection" value="2">
   <label for="radio-3">Radio Selection</label>
</div>

// Input Group
<div class="form-el">
   <label for="text-3">Two</label>
   <div class="input-group-two">
      <input type="text" id="text-3" placeholder="Text input">
      <input type="text" id="text-4" placeholder="Text input">
   </div>
</div>
<div class="form-el">
   <label for="text-5">Three</label>
   <div class="input-group-three">
      <input type="text" id="text-5" placeholder="Text input">
      <input type="text" id="text-6" placeholder="Text input">
      <input type="text" id="text-7" placeholder="Text input">
   </div>
</div>
<div class="form-el">
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

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Contributors
[mozisan](https://github.com/mozisan)

## Copyright and License
Copyright 2015 Webplate Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
