# Flickerplate
A Javascript component that lets you flick through content.

## Getting Started
You can either download a copy of the source files or install Flickerplate via Bower.

```
bower install flickerplate
```

Start by including the necessary files.

```
<head>
    <link href="css/flickerplate.css" rel="stylesheet" type="text/css">
</head>
<body>
    /* Your content goes here */
    <script src="js/min/flickerplate.js"></script>
</body>
```

## Basic Example
See the setup of the HTML and Javascript call below.

```
<ul class="flicker-example">
   <li data-background="image-url.jpg">
      <div class="flick-title">Example Heading</div>
      <div class="flick-sub-text">Sub Text</div>
   </li>
   <li data-background="image-url.jpg">
      <div class="flick-title">Example Heading</div>
      <div class="flick-sub-text">Sub Text</div>
   </li>
</ul>
<script>
new flickerplate('.flicker-example');
</script>
```

## Javascript Options
See the different options you have available on component call.

Name | Default | Options | Description
---- | ---- | ---- | ----
animation | transform-slide | transform-slide, transform-slide, transition-fade, transition-slide | Choose the animation type you want.
arrows | true | true, false | Arrows are used to navigate back and forth between the flicks.
arrowsConstraint | false | true, false | When you get to the end of the flicks pressing the next arrow will navigate you to the beginning again should you have a false constraint. The same applies to the previous arrow.
autoFlick | true | true, false | Sets the flick to run automatically. A manual flick resets the delay.
autoFlickDelay | 10 | | Set the delay (in seconds) between each auto flick.
dotAlignment | center | center, left, right | Set the horizontal alignment of the dot navigation.
dots | true | true, false | Dot navigation is used to indicate and navigate between the flicks.
position | 1 | | Set the starting flick.
theme | light | light, dark | Currently two options, light and dark. This will set the font colour, block text colour, arrows and dots to either dark or light.

## Advanced Example
See an advanced example below with options as per the above.

```
new flickerplate('.flicker-example', {
   animation: 'transition-fade',
   autoFlick: false,
   dotAlignment: 'right',
   theme: 'dark'
});
```

## Make It Touch Enabled
To make your flicker touch enabled, just included the Hammer library (Flickerplate comes with a copy). For example.

```
<body>
   /* Your content goes here */
   <script src="js/min/hammer-v2.0.3.js"></script>
   <script src="js/min/flickerplate.js"></script>
</body>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Contributors
<a href="https://github.com/dsuket">dsuket</a>

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
