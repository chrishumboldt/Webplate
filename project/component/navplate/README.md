# Navplate
A navigation component.

## Getting Started
You can either download a copy of the source files or install Navplate via Bower.

```
bower install navplate
```

Start by including the necessary files.

```
<head>
   <link href="css/navplate.css" rel="stylesheet" type="text/css">
</head>
<body>
   <script src="js/min/navplate.js"></script>
</body>
```

## HTML Example
There are two different navigations types (more to come), but both use the same basic HTML. You require the trigger that will open the navigation and the actual navigation list. See an example below.

```
<a href id="nav-trigger" data-nav-link="#nav-example">Open Navigation</a>
<div id="nav-example">
   <ul>
      <li><h6>Navigation</h6></li>
      <li><a href="#">Link One</a></li>
      <li><a href="#">Link Two</a></li>
      <li><a href="#">Link Three</a></li>
      <li><a href="#">Link Four</a></li>
      <li><a href="#">Link Five</a></li>
   </ul>
</div>
```

## Execute Via Javascript
Use the following example to trigger the navigation component.

```
<script>
new navplate('#nav-trigger');
</script>
```

## Javascript Options
There are a few options that allow changing the navigation type and your desired reveal. They can be assigned to the second argument of the Navplate component call.

```
<script>
new navplate('#nav-trigger', {
   type: 'fullscreen'
});
</script>
```

Name | Default | Options | Description
---- | ---- | ---- | ----
type | slide | slide, fullscreen | This determines the type of navigation you want to use.
active | small | small, large, always | Determine when you want the navigation to be active.
clone | false | true, false | Clone the navigation HTML and use that for the component or if false use the designated HTML.
close | close | | You can decide what you want the close text to say.
reveal | left | left, right, top, bottom | Set the direction from which the navigation appears. **NOTE** that the bottom and top option only applies to the fullscreen navigation type.

## Advanced Example
See an advanced example below with options as per the above.

```
<body>
   <a href id="nav-trigger" data-nav-link="#nav-example">Open Navigation</a>
   <div id="nav-example">
      <ul>
         <li><h6>Navigation</h6></li>
         <li><a href="#">Link One</a></li>
         <li><a href="#">Link Two</a></li>
         <li><a href="#">Link Three</a></li>
         <li><a href="#">Link Four</a></li>
         <li><a href="#">Link Five</a></li>
      </ul>
   </div>

   <script src="js/min/navplate.js"></script>
   <script>
   new navplate('#nav-trigger', {
      type: 'fullscreen',
      active: 'always',
      reveal: 'right'
   });
   </script>
</body>
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
