# Blueplate
A lightweight SASS mixin library and responsive CSS layout engine.

## Table of Contents

* [Getting Started](#getting-started)
* [SASS Implementation](#sass-implementation)
   * [Animation](#animation)
   * [Arrow](#arrow)
   * [Background](#background)
   * [Background Images](#background-images)
   * [Borders](#borders)
   * [Border Radius](#border-radius)
   * [Border Shades](#border-shades)
   * [Display](#display)
   * [Drop Shadow](#drop-shadow)
   * [Global Setup](#global-setup)
   * [Gradient](#gradient)
   * [iOS](#ios)
   * [Layout](#layout)
   * [Layout Floats](#layout-floats)
   * [Layout Responsive](#layout-responsive)
   * [Position](#position)
   * [Size](#size)
   * [Spacing Margins](#spacing-margins)
   * [Spacing Padding](#spacing-padding)
   * [Spacing Remove](#spacing-remove)
   * [Text](#text)
   * [Transform](#transform)
* [CSS Implementation](#css-implementation)
   * [Background](#background-1)
   * [Display](#display-1)
   * [Layout](#layout-1)
   * [Position](#position-1)
   * [Sizing](#sizing)
   * [Spacing](#spacing)
   * [Text](#text-1)

## Getting Started
You can either download a copy of the source files or install Blueplate via Bower.

```
bower install blueplate
```

## SASS Implementation
Start by importing the necessary file into your own SASS file and include the required mixins.

**SASS**
```
@import "blueplate/sass/import";

.example {
   @include row();
}
.left, .middle, .right {
   @include span(12); // 100% width
}
@include breakpoint(large) {
   .left {
      @include span-new(6); // 50% width
   }
   .middle {
      @include span-new(4); // 33.33% width
   }
   .right {
      @include span-new(2); // 16.66% width
   }
}
```

**HTML**
```
<div class="example">
   <div class="left"></div>
   <div class="middle"></div>
   <div class="right"></div>
</div>
```

Find the other available mixins below:

### Animation
##### animate($attribute, $transition-speed: 0.2s)
Set the transition animation style of $attribute with all the neccessary prefixes for all the browser types.

### Arrow
##### arrow($position: bottom, $colour: $red, $size: 20px)
Attach a CSS arrow to an element via the after pseudo element.

##### arrow-colour($position: bottom, $colour: $white)
Change the colour of an elements CSS arrow. Note that the arrow position is required.

##### arrow-no($colour: $white)
Remove an elements CSS arrow and reset the background colour. Note that the background colour is required.

### Background

##### background-attachment($attachment: scroll)
Set the background attachment property to $attachment.

##### background-clip($clip: border-box)
Set the background clip property to $clip.

##### background-colour($colour: grey)
Set the background colour to $colour.

##### background-contain()
Set the background size to contain, the position to center and stop it from repeating.

##### background-cover()
Set the background size to cover, the position to center and stop it from repeating.

##### background-origin($origin: padding-box)
Set the background origin property to $origin.

##### background-position($position: center)
Set the background position property to $position.

##### background-repeat($repeat: repeat)
Set the background repeat property to $repeat.

##### background-size($size: auto)
Set the background size property to $size.

##### background-single()
Set the background position to center and stop it from repeating.

### Background Images
**Note** that all the image urls already include the relative image path as per $images-root settings variable.

##### background-image($image-url, $position: center)
Set the background image URL of an element with an optional position property.

##### background-image-contain($image-url, $position: center)
Set the background image URL to be contained within the element with an optional position property.

##### background-image-cover($image-url, $position: center)
Set the background image URL to cover the element with an optional position property.

##### background-image-parallax($image-url)
Set the background image URL of an element with a fixed position property. Used mainly for a parallax style effect.

##### background-image-single($image-url, $position: center)
Set the background image URL of an element with no-repeat and an optional position property.

### Borders

##### border($colour: grey, $size: 1px, $type: solid)
Set the border property of an element.

##### border-x($colour: grey, $size: 1px, $type: solid)
Set the border **x** property of an element where x is top, right, bottom, left, horizontal or vertical.

##### border-no()
Remove all borders from an element.

### Border Radius

##### border-radius($radius: 2px)
Set the border radius property around an element with all the necessary prefixes for all the browser types.

##### border-radius-x($radius: 2px)
Set the **x** border radius property of an element with all the necessary prefixes for all the browser types. The options for x are top, right, bottom, left, top-left, top-right, bottom-left, bottom-right.

##### border-radius-no()
Set the border radius of an element to 0.

### Border Shades

##### border-light($highlight: 0.8, $colour: #fff)
Set a light border all around an element. The border is faded out.

##### border-light-x($highlight: 0.8, $colour: #fff)
Set a light **x** border on an element where x is top, right, bottom or left. The border is faded out.

##### border-dark($lowlight: 0.8, $colour: #000)
Set a dark border all around an element. The border is faded out.

##### border-dark-x($lowlight: 0.8, $colour: #000)
Set a dark **x** border on an element where x is top, right, bottom or left. The border is faded out.

### Display

##### hide()
Hide an element.

##### hide-visually()
Hide an element but still make it accessible to the DOM. Used for instances where accessibility is needed.

##### show($type: block)
Show an element with an optional display type.

##### opacity($opacity: 0.60)
Set the opacity of an element.

##### overflow($overflow: visible)
Set the overflow of an element.

##### transparency($transparency: 0.60)
Set the transparency of an element. You can also use the opacity mixin as an alternative.

### Drop Shadow

##### drop-shadow($color: fade-out(#000, 0.6), $size: 3px, $vertical-offset: 0px, $horizontal-offset: 0px)
Set the drop shadow of an element with options for colour, size, vertical and horizontal offsets.

##### drop-shadow-inset($color: fade-out(#000, 0.6), $size: 3px, $vertical-offset: 0px, $horizontal-offset: 0px)
Set an inset drop shadow of an element with options for colour, size, vertical and horizontal offsets.

##### drop-shadow-no()
Remove any drop shadow from an element.

### Global Setup

##### global-setup()
Apply the border-box property to all elements to contain dimensions. Set the default colour to a lighter, more readable black, the background colour to white and the default font to Open Sans with an Arial and Helvetica fallback. Note that this setup is automatically called by Webplate already.

### Gradient

##### gradient-horizontal($left-colour, $right-colour)
Apply a linear gradient to the background with the appropriate left to right colours.

##### gradient-vertical($top-colour, $bottom-colour)
Apply a linear gradient to the background with the appropriate top to bottom colours.

##### gradient-no()
Remove the gradient styling.

### iOS

##### ios-render()
Set some special properties like Webkit's backface visibility and perspective property to help with rendering elements like images.

### Layout

##### box-sizing($option: content-box)
Set the box sizing style of an element with all the necessary prefixes for all the browser types.

##### center()
Center an element within its container.

##### center-vertical()
Center an element vertically within its container.

##### clearfix()
Clear the zoom and set the clear style to both for the element. No elements will be allowed to float to the left and right of this element.

##### level($index: 1)
Set the z-index of an element to $index. You can also use the z-index mixin as an alternative.

##### vertical-align($align)
Set the vertical alignment of an element to $align.

##### z-index($index: 1)
Set the z-index of an element to $index.

### Layout Floats

##### float($float)
Set the float of an element to $float.

##### float-clear()
Clear the float of an element.

##### float-no()
Clear the float of an element.

### Layout Responsive

##### limit()
Assigns a maximum width to an element based on the $limit-width variable and centers it. Once the screen size is below the limit the element will become fluid and adjust its width to a 100%. Used mainly to contain row elements.

##### offset($x)
If you offset an element then you push it out $x amount of columns from the left (applied to span elements).

##### offset-r($x)
This mixin will push anything to the right of the element by $x amount of columns (applied to span elements).

##### respond-to($x, $y)
A mixin to generate media queries based on the preset Webplate view types or a custom value. The options for $x are large, fluid, small or an em/px value example respond-to(50em). Option $y can be min or max to set the min/max-width of the query.

##### row()
Turns an element into a row which is the basic building block of Blueplate and is needed to wrap any span elements. A row element will default to a 100% width of its container.

##### span($x)
Turns an element into a span which can occupy $x amount of columns within the $column-limit. For example @include span(6) will occupy 6 columns within the default 12 which equates to 50% of a containing row.

##### span-new($x)
Change the span to occupy $x amount of columns within the $column-limit. Apply to already spanned elements.

##### span-reset()
Reset the spanned element to the the $column-limit and remove all offsets.

### Position

##### position($position: relative, $options)
Set the position of an element to $position. $options refers to the positional options and can top, right, bottom, left, margin-top, margin-right, margin-bottom and margin-left.

For example: @include position(relative, top 10 margin-top 10px).

### Size

##### height($height: 0px, $max: false, $min: false)
Set the height of an element with optional max and min properties.

##### height-max($height: 0px)
Set the maximum height of an element.

##### height-min($height: 0px)
Set the minimum height of an element.

##### size($width: 0px, $height: 0px)
Set the width and height of an element.

##### width($width: 0px, $max: false, $min: false)
Set the width of an element with optional max and min properties.

##### width-max($width: 0px)
Set the maximum width of an element.

##### width-min($width: 0px)
Set the minimum width of an element.

### Spacing Margins

##### margin($margin: 24px)
Set all the margins of an element.

##### margin-x($margin: 24px)
Set the **x** margin of an element where is x is top, right, bottom, left, horizontal, vertical.

##### margin-no()
Set the margin of an element to 0.

### Spacing Padding

##### padding($padding: 24px)
Set the padding of an element in all directions.

##### padding-x($padding: 24px)
Set the **x** padding of an element where is x is top, right, bottom, left, horizontal, vertical.

##### padding-no()
Set the padding of an element to 0.

### Spacing Remove

##### spacing-no()
Remove all padding and margins from an element.

### Text

##### text-align($align: left)
Set the text alignment of an element.

##### text-colour($colour: $white)
Set the text colour of an element.

##### text-decoration($decoration: none)
Set the text decoration of an element.

##### text-ellipsis()
Set an elements text overflow to ellipsis and prevent word wrapping.

##### text-font($font: $helvetica)
Set the text font family of an element.

##### text-hide()
Hide the text within an element.

##### text-letter-spacing($spacing: normal)
Set the text letter spacing of an element.

##### text-line-height($height: 16px)
Set the line height of an element in pixels. Calculates an additional rem overwrite should the browser support it.

##### text-size($size: 16px)
Set the font size of an element in pixels. Calculates an additional rem overwrite should the browser support it.

##### text-squared($size)
Create a square element with height and width of $size. The inner text will be centered vertically and horizontally.

##### text-style($style: normal)
Set the text style of an element to $style.

##### text-weight($weight: normal)
Set the text weight of an element to $weight.

### Transform

##### transform-rotate($rotate: 0deg)
Set the transform rotate style of an element with all the necessary prefixes for all the browser types.

##### transform-scale($x: 1, $y: 1)
Set the transform scale style of an element with all the necessary prefixes for all the browser types.

##### transform-scale-3d($x: 1, $y: 1, $z: 1)
Set the transform scale3D style of an element with all the necessary prefixes for all the browser types.

##### transform-translate-3d($x: 0px, $y: 0px, $z: 0px)
Set the transform translate3d style of an element with all the necessary prefixes for all the browser types.

##### transform-translate-x($x: 1)
Set the transform translateX style of an element with all the necessary prefixes for all the browser types.

##### transform-translate-y($y: 1)
Set the transform translateY style of an element with all the necessary prefixes for all the browser types.

##### transform-translate-z($z: 1)
Set the transform translateZ style of an element with all the necessary prefixes for all the browser types.

##### transform-easing($x: 0px, $y: 0px, $z: 0px, $transition-speed: 0.2s)
Animate the translate3d transform style (ease-out) with all the necessary prefixes for all the browser types.

## CSS Implementation
Start by including the necessary files.

```
<head>
   <link href="blueplate/css/blueplate.css" rel="stylesheet" type="text/css">
</head>
```

Now class your HTML to manage your layout. For example:

```
<div class="row">
   <div class="span-2">Span 2</div>
   <div class="span-2">Span 2</div>
   <div class="span-2">Span 2</div>
   <div class="span-2">Span 2</div>
   <div class="span-2">Span 2</div>
   <div class="span-2">Span 2</div>
</div>
```

Find the other available classes below:

### Background
| Class | Options | Description |
| ---- | ---- | ---- |
| .back-pos-[p] | [p] = t, r, b, l, c | Set the background position of an element to [p] for top, right, bottom, left or center. |
| .back-repeat-[r] | [r] = no, y, x | Set the background repeat of an element to [r] for no repeating, repeat along y axis or repeat along x axis. |
| .back-single | | Set the background of an element to not repeat and to be centered. |
| .back-contain | | Set the background of an element to not repeat and to contain within the element. |
| .back-cover | | Set the background of an element to not repeat and to cover the element completely. |
| .back-black | | Set the background colour to black. |
| .back-grey | | Set the background colour to medium grey. |
| .back-grey-light | | Set the background colour to light grey. |
| .back-white | | Set the background colour to white. |

### Display
Class | Options | Description
---- | ---- | ----
.hide | | Hide an element.
.hide-large | | Hide an element in large view only.
.hide-small | | Hide an element in small view only.
.show | | Show an element.
.show-large | | Show an element in large view only.
.show-small | | Show an element in small view only.
.transparency-[o] | [o] = 100, 75, 50, 25, 0 | Set the opacity of an element to [o] for 100%, 75%, 50%, 25% or 0%.

### Layout
Class | Options | Description
---- | ---- | ----
.center | | Center an element.
.float-[p] | [p] = l, r | Set the float property of an element to [p] for left or right.
.float-no | | Remove the float property from an element.
.float-clear | | Stop all floating elements from affecting any element following.
.valign-[p] | [p] = t, m, b | Set the vertical alignment of an element to [p] for top, middle or bottom.

### Position
Class | Description
---- | ----
.pos-absolute | Set the position of an element to absolute.
.pos-relative | Set the position of an element to relative.
.pos-static | Set the position of an element to static.
.pos-fixed | Set the position of an element to fixed.

### Sizing
Class | Options | Description
---- | ---- | ----
.block-h-[h] | [h] = 10, 20, 50, 100, 200, 500, 1000 | Set the height of an element to [h] for 10px, 20px, 50px, 100px, 200px, 500px, 1000px.
.block-w-[w] | [w] = 10, 20, 50, 100, 200, 500, 1000 | Set the width of an element to [w] for 10px, 20px, 50px, 100px, 200px, 500px, 1000px.

### Spacing
Class | Options | Description
---- | ---- | ----
.spacing-no | | Remove all padding and margins from an element.
.pad-no | | Remove all padding from an element.
.mgn-no | | Remove all margins from an element.
.pad-[x] | [x] = [integer] | Add [x] amount of padding all around. For example pad-6 will add 6 pixels of padding to the top, right, bottom and left of an element.
.pad-[p]-[x] | [p] = t, r, b, l [x] = [integer] | Add [x] amount of padding to the [p] side of the element for top, right, bottom or left.
.mgn-[x] | [x] = [integer] | Add [x] amount of margin to the top, right, bottom and left of an element.
.mgn-[p]-[x] | [p] = t, r, b, l [x] = [integer] | Add [x] amount of margin to the [p] side of the element for top, right, bottom or left.

### Text
Class | Options | Description
---- | ---- | ----
.hide-text | | Hide the text within an element.
.txt-[a] | [a] = l, c, r | Set the text alignment to [a] for left, center, right.
.txt-size-[s] | [s] = x2s, xs, s, m, n, l, xl, x2l | Set the font size to [s] for extra small, small, medium, normal, large, extra large, extra extra large.
.txt-weight-[w] | [w] = xl, l, n, b, xb | Set the font weight to [b] for extra light, light, normal, bold, extra bold.
.txt-light | | Set the font weight to light.
.txt-bold | | Set the font weight to bold.
.txt-normal | | Set the font weight and style to normal.
.txt-italics | | Set the font style to italics.
.txt-oblique | | Set the font style to oblique.
.txt-white | | Set the font colour to white.
.txt-grey | | Set the font colour to medium grey.

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
