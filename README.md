# Rocket Framework
Rocket is an configuration based front-end framework that lets you stay focused on building.

* [Getting Rocket](#getting-rocket)
* [Launching](#launching)
   * [Cockpit File Loading](#cockpit-file-loading)
   * [Page Loader](#page-loader)
* [Go Into Orbit](#go-into-orbit)
* [Command-line Tool](#command-line-tool)
* [Webplate Migration](#webplate-migration)
* [Documentation](#documentation)

## Getting Rocket
You can either [download](https://github.com/chrishumboldt/Rocket/archive/master.zip) a copy of the rocket framework right here from GitHub, else install the framework via npm. See an example below.

```
npm install rocket-framework
```

## Launching
Simply drop the Rocket directory into your project and include the launch.js file before your ending body tag. Below is an example of this and note that an id of **rocket** is required.

```html
<body style="display: none;">
    /* Your content goes here */
    <script id="rocket" src="rocket/launch.js"></script>
</body>
```

The body tag style attribute is used to prevent CSS style snapping on load and is highly recommended.

#### Cockpit File Loading
All projects include a combination of CSS and Javascript and Rocket makes it super easy to load these using a simple configuration file. You can find this file at <b>rocket/cockpit.json</b>. Below is a basic example.

```json
{
   "css": ["welcome.css", "theme.css"],
   "js": ["welcome.js"]
}
```

You will notice that the array allows you to load more than one file and that the Rocket path is not required. This is because Rocket automatically knows where to look within the directory. You can also load different files on different pages.

#### Page Loader
If you would like a page loader to display while your project files load, simply wrap your content in a div with id **rocket-content**. See an example below.

```html
<body>
   <div id="rocket-content" style="display: none;">
      /* Your content goes here */
   </div>

   <script id="rocket" src="rocket/launch.js"></script>
</body>
```

**Browser Support:** IE9+, Chrome, Firefox, Safari, Opera

## Go Into Orbit
Before you have even started, Rocket has already loaded up [Modernizr](https://modernizr.com/), [Normalize.css](https://necolas.github.io/normalize.css/), [Typeplate](http://typeplate.com/), [Anime.js](http://anime-js.com/), [Rocket Tools](https://github.com/chrishumboldt/Rocket-Tools), [Rocket Require](https://github.com/chrishumboldt/Rocket-Require) and icon font support at a minimal size. This takes away most of the set up time and acts like a kind of advanced boilerplate.

This will get you up and running for most projects but if you want to delve into Rocket's automatic NPM and SASS integration then just read over some of the [online documentation](http://rocketrocks.io/documentation) and become a bonafide pro.

## Command-line Tool
One of the best features of Rocket is the command-line tool. It will make building your project so much easier and helps with SASS building, Javascript minification and module development. While it is an advanced feature it has tons of uses like watching for file changes and updating your browser automatically.

https://rocketrocks.io/documentation/command-line

## Webplate Migration
While Webplate has many of the same core features as Rocket, it is not recommended that you try and migrate. Rocket has many philosophical and developmental differences, from the the altered Rocket namespace to the build tools. Webplate will however be branched and maintained for bug fixes.

If you wish to attempt a migration do so only for smaller projects as for larger projects it would be not be wise, even though it is technically possible.

## Documentation
Rocket has many aspects to it so for more information view the comprehensive [online documentation](http://rocketrocks.io/documentation).

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
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
