# Messageplate
A message component.

## Getting Started
You can either download a copy of the source files or install Messageplate via Bower.

```
bower install messageplate
```

Start by including the necessary files.

```
<head>
   <link href="css/messageplate.css" rel="stylesheet" type="text/css">
</head>
<body>
   <script src="js/min/messageplate.js"></script>
</body>
```

## Basic Example
Below is an example of executing the component complete with required HTML and Javascript.

```
<a href id="example">Show Message</a>
<script>
document.getElementById('example').onclick = function(event) {
   new messageplate({
      body: 'This is an example message.',
      parseEvent: event
   });
};
</script>
```

## Javascript Options
See the different options you have available on component call.

Name | Default | Options | Description
---- | ---- | ---- | ----
type | false | error, false, success, warning | **NOTE** that the false value is equivalent to no type.
heading | false | | You can make the heading whatever you would like. A false value will not display the heading.
body | false | | You can make the body whatever you would like. A false value will not display the body.
buttonFalse | false | | Set the button false text. A false value will not display this button.
buttonTrue | false | | Set the button true text. A false value will not display this button.
close | close | | Set the text or inner HTML of the close link.
onTrue | false | | Assign a callback when the buttonTrue is selected.
overlay | true | true, false | Set whether or not you want the overlay to display on message open.

## Advanced Example
See an advanced example below with options as per the above.

```
<a href id="example">Show Message</a>
<script>
document.getElementById('example').onclick = function(event) {
   new messageplate({
      type: 'warning',
      heading: 'Test Message'
      body: 'Are you testing this component?',
      buttonTrue: 'Yes',
      buttonFalse: 'No',
      onTrue: function() {
         alert('This is awesome.');
      },
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
