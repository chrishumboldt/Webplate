Buttonplate
===========

A global button library.


Getting Started
=========

This plugin requires jQuery for the drop-down options and is included.

See an example below of a basic include.

```
<head>
	<!--Required javascript-->
	<script src="js/min/jquery-v1.10.2.min.js"></script>
	<script src="js/min/modernizr-custom-v2.8.3.min.js"></script>
	
	<!--Buttonplate-->
	<script src="js/min/buttonplate.min.js"></script>
	<link href="css/buttonplate.css" rel="stylesheet" type="text/css">
</head>
```

From here on out you can class your link or button elements accordingly with the class <b>button</b> and a colour of your choice or use the mixins to assign to another class name. Call the javascript function below to execute.

Javascript call:

```
$(document).ready(function(){
  $('.button').buttons();
});
```

Basic HTML:

```
<a href="#" class="button">Button Default</a>
<a href="#" class="button blue">Blue Button</a>
<div class="button red">
  Drop-Down 
  <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li class="line-top"><a href="#">Link 3</a></li>
  </ul>
</div>
```


Documentation
=========

For a more detailed explanation read the online documentation at http://getwebplate.com/plugins/buttonplate.


Author
=========

Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>


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
