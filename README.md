Webplate Framework
========

An awesome front-end javascript bootstrap that lets you stay focused on building your site or app all the while remaining really easy to use.


Getting Started
========

To use Webplate include the following javascript file "webplate/stack.js" in your head tag with the id "webplate-stack".

For example:
```
<head>
    <script id="webplate-stack" src="webplate/stack.js" type="text/javascript"></script>
</head>
```

This will load all the neccessary files required and give you the option to load your own extras. To load extras add a data object to your "body" tag for both javascript and css files.

For example:
```
<body data-css-extras="welcome.css" data-js-extras="welcome.js">
```

All files are load asynchronously. From here on out you have access to all Webplate plugins, including the Blueplate responsive CSS engine, the Flickerplate jQuery plugin and all other libraries like, Jquery itself, Modernizr, Typeplate and jQuery Touch.


Documentation
========

Webplate has many aspects to it so for more information view the comprehensive online documentation at http://getwebplate.com/documentation.


Copyright and License
========

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
