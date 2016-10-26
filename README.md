# Webplate Framework
Webplate is an configuration based front-end framework that lets you stay focused on building your site or app all the while remaining really easy to use.

* [Getting Started](#getting-started)
   * [Simple Page Loader](#simple-page-loader)
* [Load Project Files](#load-project-files)
* [Go To The Next Level](#go-to-the-next-level)
* [Documentation](#documentation)
* [Command-line Tool](#command-line-tool)
* [Migration](#migration)

## Getting Started
Simply drop the Webplate directory into your web project and include the start.js file before your ending body tag. Below is an example of this and note that an id of **webplate** is required.
```
<body style="display:none;">
    /* Your content goes here */
    <script id="webplate" src="webplate/start.js"></script>
</body>
```
The body tag style attribute is used to prevent CSS style snapping on load and is highly recommended.

#### Simple Page Loader
If you would like a page loader to display while your project files load, simply wrap your content in a div with id **webplate-content**. See an example below.
```
<body>
    <div id="webplate-content" style="display:none;">
        /* Your content goes here */
    </div>
    <script id="webplate" src="webplate/start.js"></script>
</body>
```

**Browser Support:** IE9+, Chrome, Firefox, Safari, Opera

## Load Project Files
All web projects include a combination of CSS and Javascript and Webplate makes it incredibly easy to load these using a simple configuration file. You can find this file at <b>webplate/project/config.json</b>. Below is an example of what you might typically see.

```
{
    "project": {
        "css": ["welcome.css", "theme.css"],
        "js": ["min/welcome.min.js"],
    }
}
```

You will notice that a comma delimited list allows you to load more than one file and that the Webplate path is not required. This is because Webplate automatically knows where to look inside the project directory. You can also load different files on different pages.

## Go To The Next Level
Before you have even started, Webplate has already loaded up Modernizr, Normalize.css, Typeplate, Velocity.js and icon font support at a minimal size. This takes away most of the set up time and acts like a kind of advanced boilerplate.

This will get you up and running for most projects but if you want to delve into Webplate's automatic Bower and SASS integration then just read over some of the [online documentation](http://getwebplate.com/documentation) and become a bonafide pro.

## Documentation
Webplate has many aspects to it so for more information view the comprehensive [online documentation](http://getwebplate.com/documentation).

## Command-line Tool
One of the best features of Webplate is the command-line tool. It will make building your project so much easier and helps with SASS building, Javascript minification and component development. While it is an advanced feature it has tons of uses like watching for file changes and updating your browser automatically.

https://github.com/chrishumboldt/Webplate-Command

## Migration
While version 4 has many of the same core features as version 3, it is not recommended that you try and migrate. Version 4 has had many philosophical and technical changes to it, from the the altered Web namespace to the different build tools. Version 3 will be branched and maintained for bug fixes.

If you wish to attempt a migration do so for smaller projects as for larger projects it would be not be wise albeit possible.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Contributors
<a href="https://github.com/simeydotme">Simon Goellner</a><br>
<a href="https://github.com/V1RTUOZ">Oleg Kalandarashvili</a><br>
<a href="https://github.com/digiltd">digiltd</a>

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
