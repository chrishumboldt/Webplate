Webplate Framework
========

An awesome front-end framework that lets you stay focused on building your site or app all the while remaining really easy to use.


Getting Started
========

This is a simple process that requires you dropping a copy of the Webplate directory you just got into your project and including the <b>stack.js</b> file in your head tag. Below is a basic example and note that the <b>id</b> of <b>webplate-stack</b> is required.

```
<head>
<<<<<<< HEAD
    <script id="webplate-stack" src="webplate/stack.js" type="text/javascript"></script>
=======
    <script id="webplate-stack" src="[webplate-directory]/stack.js"></script>
>>>>>>> dev-chris
</head>
```

This will load all the neccessary files required as well as give you the option to load your own "project" specific JS or CSS files. To load project files add a data attribute to your "body" like the example below.

```
<body style="display: none;" data-project-css="welcome.css" data-project-js="welcome.js">
```

Note that the <b>style="display: none;"</b> attribute is used to prevent style snapping so that the page will only show once the files have been loaded. It is not required but recommended.

All files are loaded asynchronously. From here on out you have access to all Webplate plugins, including the <a href="http://getwebplate.com/plugins/blueplate">Blueplate</a> responsive CSS layout engine, the <a href="http://getwebplate.com/plugins/flickerplate">Flickerplate</a> plugin and all other libraries like, <a href="http://jquery.com/">jQuery</a>, <a href="http://modernizr.com/">Modernizr</a>, <a href="http://typeplate.com/">Typeplate</a>, <a href="http://icomoon.io/">IcoMoon</a> and <a href="http://hammerjs.github.io/">Hammer.js</a>.

<b>Browser Support:</b> IE9+, Chrome, Firefox, Safari, Opera


Documentation
========

Webplate has many aspects to it so for more information view the comprehensive online documentation at http://getwebplate.com/documentation.


Contributors
=========

<a href="https://github.com/chrishumboldt">Chris Humboldt</a><br>
<a href="https://github.com/V1RTUOZ">Oleg Kalandarashvili</a>


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
