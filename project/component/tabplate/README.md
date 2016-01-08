# Tabplate
A tabulation component.

## Getting Started
You can either download a copy of the source files or install Tabplate via Bower.

```
bower install tabplate
```

Start by including the necessary files.

```
<head>
	<link href="css/tabplate.css" rel="stylesheet" type="text/css">
</head>
<body>
	/* Your content goes here */
	<script src="js/min/tabplate.js"></script>
</body>
```

## HTML Example
The Tabplate component uses two unordered lists to change between what content is viewed. See a basic HTML example below.

```
<ul id="tabplate-triggers">
	<li><a>Create</a></li>
	<li><a>Images</a></li>
	<li><a>Order</a></li>
</ul>
<ul id="tabplate-tabs">
	<li><p>Your content goes here.</p></li>
	<li><p>Your content goes here.</p></li>
	<li><p>Your content goes here.</p></li>
</ul>

```

## Execute Via Javascript
Use the following example to trigger the Tabplate component.

```
<script>
new tabplate({
	selector: '#tabplate-triggers',
	tabs: '#tabplate-tabs',
	animate: true
});
</script>
```

## Javascript Options

| Name | Default | Options | Description |
| ---- | ---- | ---- | ---- |
| selector | #tabplate-triggers | | Set the HTML selector. |
| animate | false | true, false | Set the tabulation change to animate or not. |
| tabs | #tabplate-tabs | | Set the tabulation content selector. |

#### Defaults
You can also set or overwrite the above options globally by altering the Tabplate defaults. To do so reference the **$tabplateDefault** object. For example:

```
<script>
// Default change
$tabplateDefault.selector = '.tab-links';
$tabplateDefault.tabs = '#tab-content';
$tabplateDefault.animate = true;

// Execute
new tabplate();
</script>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

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
