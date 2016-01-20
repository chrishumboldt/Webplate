#Modalplate
A Javascript modal component.

## Getting Started
You can either download a copy of the source files or install Modalplate via Bower.

```
bower install modalplate
```

Start by including the necessary files.

```
<head>
   <link href="css/modalplate.css" rel="stylesheet" type="text/css">
</head>
<body>
   <script src="js/min/modalplate.js"></script>
</body>
```

## Basic Example
See a basic example of how to use the component.

```
<a href id="example">Open Modal</a>
<script>
document.getElementById('example').onclick = function(event) {
   new modalplate({
      heading: 'Example Modal',
      body: 'Here is the body text.',
      parseEvent: event
   });
};
</script>
```

## Javascript Options
See the different options you have available on component call.

Name | Default | Options | Description
---- | ---- | ---- | ----
body | false | | You can make the body whatever you would like to display.
breakpoint | 700 | | Set the breakpoint of the modal (in pixels) to change from a fullscreen modal to a standard content modal.
classAdd | false | | Set a class to the containing modal.
close | close | | Set the text or inner HTML of the close link.
heading | false | | You can make the heading whatever you would like.
overlay | true | true, false | Set whether or not you want the overlay to display on modal open.
parseEvent | false | true, false | Parse the event of a click to prevent the default link behavior.
reveal | slide-from-top | appear, appear-scale, slide-from-bottom, slide-from-left, slide-from-right, slide-from-top | Set the reveal animation.
revealLarge | false | appear, appear-scale, slide-from-bottom, slide-from-left, slide-from-right, slide-from-top | Set the reveal animation after the breakpoint has been reached. **NOTE** that false means the already existing reveal animation will be used.
trigger | always | always, small, large | Set when you want the modal trigger to fire. Small is below the breakpoint, large above the breakpoint and always is always.

## Advanced Example
See an advanced example below with options as per the above.

```
<a href id="example">Open Modal</a>
<script>
document.getElementById('example').onclick = function(event) {
   new modalplate({
      heading: 'Advanced Modal',
      body: 'Here is the body text.',
      close: '<i class="icon-close"></i>',
      breakpoint: 320,
      reveal: 'slide-from-right',
      revealLarge: 'slide-from-top',
      parseEvent: event
   });
};
</script>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

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
