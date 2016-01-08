# Loaderplate
A simple Javascript loading icon component using <a href="http://samherbert.net/svg-loaders/">SVG Loaders</a> created by <a href="https://twitter.com/sherb">Sam Herbert</a>.

## Getting Started
You can either download a copy of the source files or install Loaderplate via Bower.
```
bower install loaderplate
```

Start by including the necessary files.
```
<head>
   <link href="css/loaderplate.css" rel="stylesheet" type="text/css">
</head>
<body>
   /* Your content goes here */
   <script src="js/min/loaderplate.js"></script>
</body>
```

## Basic Example
Below is an example of executing the component complete with required HTML and Javascript.
```
<div id="example"></div>
<a href id="example-remove">Remove Loader</a>
<script>
var $loaderExample = new loaderplate({
   selector: '#example',
   body: 'Loader Works!',
   type: 'puff'
});
document.getElementById('example-remove').onclick = function() {
   $loaderExample.remove();
};
</script>
```

## Javascript Options
See the different options you have available on component call.

| Name | Default | Options | Description |
| ---- | ---- | ---- | ---- |
| selector | false | | Set the HTML selector. |
| body | false | | **NOTE** that the false value will display no text. |
| colour | grey-blue | aqua, black, blue, green, grey-blue, grey-blue-dark, orange, pink, purple, red, white, yellow | Set the loader colour. |
| delay | 400 | | Set a delay on the loader showing. |
| path | ./loaders/ | | Set the path to the loaders folder relative to your project. |
| size | large | x-small, small, minor, normal, slight, medium, large, x-large | Set the size of the loader and its padding. |
| type | puff | audio, ball-triangle, bars, circles, grid, hearts, oval, puff, rings, spinning-circles, tail-spin and three-dots | Set the loader type. |

#### Defaults
You can also set or overwrite the above options globally by altering the Loaderplate defaults. To do so reference the **$loaderplateDefault** object. For example:

```
<script>
// Default change
$loaderplateDefault.body = 'Loading';
$loaderplateDefault.colour = 'blue';
$loaderplateDefault.type = 'rings';

// Execute
var $loaderExample = new loaderplate({
   selector: '#example'
});
</script>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>
SVG Loaders: <a href="https://twitter.com/sherb">Sam Herbert</a><br>

## Copyright and License
Copyright 2016 Webplate Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
