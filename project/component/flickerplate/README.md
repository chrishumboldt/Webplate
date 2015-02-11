Flickerplate
=========

A cool jQuery plugin that lets you flick through content.


Getting Started
=========

This plugin is by definition a jQuery plugin and so is required. It also requires Modernizr for touch detection and the Hammer.js library for touch events. Both jQuery and a custom build of Modernizr are supplied.

See an example below of a basic include.

```
<head>
	<!--Required javascript-->
	<script src="js/min/jquery-v1.10.2.min.js"></script>
	<script src="js/min/modernizr-custom-v2.7.1.min.js"></script>
	<script src="js/min/hammer-v2.0.3.min.js"></script>
	
	<!--Flickerplate-->
	<script src="js/min/flickerplate.min.js"></script>
	<link href="css/flickerplate.css" rel="stylesheet" type="text/css">
</head>
```

Once included, create the neccessary HTML and call Flickerplate by referencing the containing class in your javascript file.

Javascript call:

```
$(document).ready(function()
{
	$('.flicker-example').flickerplate();
});
```

Basic HTML:

```
<div class="flicker-example">
	<ul>
		<li>
			<div class="flick-title">Title 1</div>
			<div class="flick-sub-text">Description text 1</div>
		</li>
		<li>
			<div class="flick-title">Title 2</div>
			<div class="flick-sub-text">Description text 2</div>
		</li>
		<li>
			<div class="flick-title">Title 3</div>
			<div class="flick-sub-text">Description text 3</div>
		</li>
	</ul>
</div>
```


Documentation
=========

For a more detailed explanation read the online documentation at http://getwebplate.com/plugins/flickerplate.


Author
=========

Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>


Contributors
=========

<a href="https://github.com/dsuket">dsuket</a>


Copyright and License
=========

Copyright 2014 Savedge Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
