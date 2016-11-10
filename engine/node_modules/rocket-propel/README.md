# Propel
A lightweight SASS mixin library and responsive CSS layout engine.

## Table of Contents

* [Getting Started](#getting-started)
* [SASS Implementation](#sass-implementation)
   * [Variables](#variables)
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
   * [Interaction](#interaction)
   * [iOS](#ios)
   * [Layout](#layout)
	* [Layout Flex](#layout-flex)
   * [Layout Floats](#layout-floats)
   * [Layout Responsive](#layout-responsive)
   * [List](#list)
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
	* [Layout Responsive](#layout-responsive-1)
   * [Position](#position-1)
   * [Sizing](#sizing)
   * [Spacing](#spacing)
   * [Text](#text-1)
* [Blueplate Deprecated](#blueplate-deprecated)

## Getting Started
You can either download a copy of the [source files](https://github.com/chrishumboldt/Rocket-Propel/archive/master.zip) or install via NPM.

```
npm install rocket-propel
```

## SASS Implementation
Start by importing the necessary file into your own SASS file and include the required mixins.

**SASS**
```sass
@import "rocket-propel/build/sass/import";

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
```html
<div class="example">
   <div class="left"></div>
   <div class="middle"></div>
   <div class="right"></div>
</div>
```

#### Browser Prefixes
Propel will apply all the necessary browser prefixes where needed but no longer supports the **-o-** prefix for older versions of Opera. Opera now uses the Blink engine from Chromium (<a href="http://www.opera.com/blogs/desktop/2015/10/opera-33-our-contribution-to-chromium/">Read More</a>).

Find the other available mixins below:

#### Variables
Propel comes pre-packaged with a host of SASS variables. They are all listed below.

Variable | Default
---- | ----
`$column-limit` | 12
`$font-family` | 'Open Sans', Helvetica, Arial, sans-serif
`$images-root` | ''
`$limit-width` | 68.750em

##### Breakpoints
Variable | Value | Evaluates To
---- | ---- | ----
`$bp-x3-small` | 12.500em | 200px
`$bp-x2-small` | 18.750em | 300px
`$bp-x-small` | 21.875em | 350px
`$bp-small` | 28.125em | 450px
`$bp-medium` | 34.375em | 550px
`$bp-large` | 43.750em | 700px
`$bp-x-large` | 56.250em | 900px
`$bp-x2-large` | 68.750em | 1100px
`$bp-x3-large` | 78.125em | 1250px
`$bp-huge` | 87.500em | 1400px
`$bp-gargantuan` | 125.000em | 2000px

##### Colours
Type | Variables
---- | ----
Mono | `$black` `$black-base` `$grey-x2-light` `$grey-x-light` `$grey-light` `$grey` `$grey-dark` `$grey-x-dark` `$grey-x2-dark`
Primary | `$aqua` `$blue` `$green` `$orange` `$pink` `$purple` `$red` `$yellow`
Secondary | `$asbestos` `$asphalt` `$bondi-blue` `$cloud` `$concrete` `$grey-blue-x-light` `$grey-blue-light` `$grey-blue` `$grey-blue-dark` `$grey-blue-x-dark` `$midnight` `$off-white` `$off-white-dark` `$river-bed` `$silver`

##### Spacing
Variable | Value
---- | ----
`$space-base` | 24px
`$space-x2-small` | 4px
`$space-x-small` | 6px
`$space-small` | 12px
`$space-minor` | 16px
`$space-slight` | 36px
`$space-medium` | 48px
`$space-large` | 72px
`$space-x-large` | 120px
`$space-x2-large` | 144px

##### Text
Variable | Value
---- | ----
`$georgia` | Georgia, Cambria, "Times New Roman", Times, serif
`$helvetica` | "Helvetica Neue", Helvetica, Arial, sans-serif
`$impact` | Impact, Charcoal, sans-serif
`$lato` | 'Lato', sans-serif
`$lucinda-grande` | "Lucida Grande", Tahoma, Verdana, Arial, sans-serif
`$monospace` | Menlo, "Bitstream Vera Sans Mono", "DejaVu Sans Mono", Monaco, Consolas, monospace
`$open-sans` | 'Open Sans', Helvetica, Arial, sans-serif
`$roboto` | 'Roboto', 'Helvetic Neue', Helvetica, Arial
`$tahoma` | Tahoma, Geneva, sans-serif
`$times-new-roman` | "Times New Roman", Times, serif
`$trebuchet` | "Trebuchet MS", Helvetica, sans-serif
`$verdana` | Verdana, Geneva, sans-serif

##### Text Size
The size evaluates to an em value and then down to a pixel value.

Variable | Evaluates To
---- | ----
`$size-x2-small` | 8px
`$size-x-small` | 10px
`$size-small` | 12px
`$size-minor` | 14px
`$size-base` | 16px
`$size-slight` | 18px
`$size-medium` | 20px
`$size-large` | 24px
`$size-x-large` | 36px
`$size-x2-large` | 48px

##### Text Weight
Variable | Value
---- | ----
`$weight-thin` | 100
`$weight-light` | 300
`$weight-base` | 400
`$weight-bold` | 700
`$weight-heavy` | 900

#### Animation
Mixin | Defaults | Description
---- | ---- | ----
`animate(attr, speed)` | `speed`: `0.2s` | Set the transition style of attribute `attr`.
`animate-no()` | | Remove all transition styles for an element.
`animate-timing-function(timing)` | | Set the transition `timing` function for an element.
`animation(n, dur, i, dir, f)` | `dur`: `0.4s`<br>`i`: `false`<br>`dir`: `false`<br>`f`: `false` | Set all the animation properties.<br>`n` = name<br>`dur` = duration<br>`i` = iteration<br>`dir` = direction<br>`f` = fill mode
`animation-delay(x)` | | Set the animation delay property to `x`.
`animation-direction(x)` | `x`: `normal` | Set the animation direction property.
`animation-duration(x)` | | Set the animation duration property to `x`.
`animation-fill-mode(x)` | `x`: `forwards` | Set the animation fill mode property.
`animation-iteration(x)` | | Set the animation iteration `x` property.
`animation-name(x)` | | Set the animation name property.
`animation-timing-function(x)` | `x`: `ease-out` | Set the animation timing function property.
`keyframes(x)` | | Generate the animation keyframes with name `x`.

```sass
// Animate block on hover
.block {
	@include position(absolute, top 10px left 10px);
	@include height(50px);
	@include width(50px);
	@include background-colour($red);
	@include animate('all', 1s); // Here we attach the animation styles

	&:hover {
		@include position-set(top 20px left 20px)
	}
}
```

#### Arrow
Mixin | Defaults | Description
---- | ---- | ----
`arrow(pos, clr, size)` | `pos`: `bottom`<br>`clr`: `$white`<br>`size`: `20px` | Attach a CSS arrow to an element.
`arrow-colour(pos, clr)` | `pos`: `bottom`<br>`clr`: `$white` | Change the colour of an elements CSS arrow.
`arrow-no(clr)` | `clr`: `$white` | Remove an elements CSS arrow<br>Reset the background colour.

#### Background
Mixin | Defaults | Description
---- | ---- | ----
`background-attachment(x)` | `x`: `scroll` | Set the background attachment property to `x`.
`background-clip(x)` | `x`: `border-box` | Set the background clip property to `x`.
`background-colour(x)` | | Set the background colour to `x`.
`background-contain()` | | Set the background size to contain and center position.
`background-cover()` | | Set the background size to cover and center position.
`background-origin(x)` | `x`: `padding-box` | Set the background origin property to `x`.
`background-position(x)` | `x`: `center` | Set the background position property to `x`.
`background-repeat(x)` | `x`: `repeat` | Set the background repeat property to `x`.
`background-size(x)` | `x`: `auto` | Set the background size property to `x`.
`background-single()` | | Set the background position to center<br>Stop the background from repeating.

#### Background Images
**Note** that all the image urls already include the relative image path as per `$images-root` settings variable.

Mixin | Defaults | Description
---- | ---- | ----
`background-image(url, pos)` | `pos`: `top left` | Set the background image on an element.
`background-image-contain(url, pos)` | `pos`: `center` | Set a contained background image on an element.
`background-image-cover(url, pos)` | `pos`: `center` | Set a covered background image on an element.
`background-image-parallax(url)` | | Set a parallax style background image on an element.
`background-image-single(url, pos)` | `pos`: `center` | Set a single background image on an element.

```sass
// Change the images root if you want to.
$images-root: "assets/img/";

// Set the background
.my-element {
	@include background-image-cover("global/background.png");
}
```

#### Borders
Set the border property of an element.

Mixin | Defaults
---- | ----
`border(clr, size, type)` | `clr`: `$grey`<br>`size`: `1px`<br>`type`: `solid`
`border-[s](clr, size, type)` | `[s]`: `top` `right` `bottom` `left`<br>`clr`: `$grey`<br>`size`: `1px`<br>`type`: `solid`
`border-h(clr, size, type)` | `clr`: `$grey`<br>`size`: `1px`<br>`type`: `solid`
`border-v(clr, size, type)` | `clr`: `$grey`<br>`size`: `1px`<br>`type`: `solid`
`border-no()` |

```sass
.my-element {
	@include border-left($red, 2px);
}
```

#### Border Radius
Set the border radius property on an element.

Mixin | Options & Defaults |
---- | ---- |
`border-radius(x)` | `x`: `2px` |
`border-radius-[s](x)` | `[s]`: `top` `right` `bottom` `left` `top-left` `top-right` `bottom-left` `bottom-right`<br>`x`: `2px` |
`border-radius-no()` | |

```sass
.my-element {
	@include border-radius-top-right(4px);
}
```

#### Display
Mixin | Defaults | Description
---- | ---- | ----
`hide()` | | Hide an element.
`hide-visually()` | | Hide an element but still make it accessible to the DOM.<br>Used for instances where accessibility is needed.
`show(x)` | `x`: `block` | Show an element with display type of `x`.
`opacity(int)` | `int`: `0.60` | Set the opacity of an element.
`overflow(x, direction)` | `x`: `visible`<br>`direction`: `false` | Set the overflow of an element.<br>`direction` is optional and can be `vertical` or `horizontal`.
`perspective(x)` | `x`: `0px` | Set the perspective of an element.
`transparency(int)` | `int`: `0.60` | Set the transparency of an element.<br>You can also use the **opacity** mixin as an alternative.
`visibility(x)` | `x`: `visible` | Set the visibility property of an element.

#### Drop Shadow
Mixin | Defaults | Description
---- | ---- | ----
`drop-shadow(clr, size, v, h)` | `clr`: `fade-out(#000, 0.6)`<br>`size`: `3px`<br>`v`: `0px`<br>`h`: `0px` | Set the drop shadow of an element.<br>`v` is the vertical offset.<br>`h` is the horizontal offset.
`drop-shadow-inset(clr, size, v, h)` | `clr`: `fade-out(#000, 0.6)`<br>`size`: `3px`<br>`v`: `0px`<br>`h`: `0px` | Set an inset drop shadow of an element.<br>`v` is the vertical offset.<br>`h` is the horizontal offset.
`drop-shadow-no()` | | Remove any drop shadow.

```sass
.my-element {
	@include drop-shadow($green);
}
```

#### Global Setup
Mixin | Description
---- | ----
`global-setup()` | Apply the border-box property to all elements to contain dimensions. Set the default colour to a lighter, more readable black, the background colour to white and the default font to Open Sans with an Arial and Helvetica fallback. Note that this setup is automatically called by Rocket already.

#### Gradient
**Note** that the arguments `x` and `y` are the starting and ending gradient colours.

Mixin | Defaults | Description
---- | ---- | ----
`gradient-animate(x, y, angle)` | `angle`: `135deg` | Apply animated background gradient.
`gradient-animate-h(x, y)` | | Apply animated background gradient from left to right.
`gradient-animate-v(x, y)` | | Apply animated background gradient from top to bottom.
`gradient-animate-no()` | | Remove any animated background gradient.
`gradient-angle(x, y, angle)` | `angle`: `-45deg` | Apply background gradient.
`gradient-h(x, y)` | | Apply background gradient from left to right.
`gradient-v(x, y)` | | Apply background gradient from top to bottom.
`gradient-no()` | | Remove any background gradient.

#### Interaction
Mixin | Defaults | Description
---- | ---- | ----
`cursor(x)` | `x`: `auto` | Set the cursor to `x`.

#### iOS
Mixin | Description
---- | ----
`ios-render()` | Set some special properties like Webkit's backface visibility and perspective property to help with rendering elements like images.

#### Layout
Mixin | Defaults | Description
---- | ---- | ----
`box-sizing(x)` | `x`: `content-box` | Set the box sizing style of an element.
`center()` | | Center an element within its container.
`center-v()` | | Center an element vertically within its container.
`clearfix()` | | Clear the zoom and set the clear style to both for the element.
`level(int)` | `int`: `1` | Set the z-index of an element to `int`.<br>You can also use the z-index mixin as an alternative.
`vertical-align(x)` | | Set the vertical alignment of an element to `x`.
`z-index(int)` | `x`: `1` | Set the z-index of an element to `x`.

#### Layout Flex
For information on flex visit <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">CSS-Tricks: A Guide to Flexbox</a>

Mixin | Defaults | Description
---- | ---- | ----
`align-content(x)` | `x`: `flex-start` | Set the align content property of a flex element.<br> `x` can be `flex-start`, `flex-end`, `center`,<br>`space-between`, `space-around` or `stretch`.
`align-items(x)` | `x`: `flex-start` | Set the align items property of a flex element.<br> `x` can be `flex-start`, `flex-end`, `center`,<br>`space-between`, `space-around` or `stretch`.
`align-self(x)` | `x`: `auto` | Set the align self property of a flex element.<br> `x` can be `flex-start`, `flex-end`, `center`,<br>`space-between`, `space-around` or `stretch`.
`flex(grow, shrink, basis)` | `grow`: `0`<br>`shrink`: `1`<br>`basis`: `auto` | Set the all the flex properties for a flex item.
`flex-basis(x)` | `basis`: `auto` | Set the flex basis property for a flex item.
`flex-direction(x)` | `x`: `row` | Set the flex direction property of a flex element.<br>`x` can be `row`, `row-reverse`, `column` or `column-reverse`.
`flex-display(x)` | `x`: `normal` | Set the flex display property of a flex element.
`flex-flow(x, y)` | | Set the flex direction and wrap properties of a flex element.<br>`x` is direction.<br>`y` is wrap.
`flex-grow(x)` | `x`: `0` | Set the flex grow property of a flex element.
`flex-shrink(x)` | `x`: `1` | Set the flex shrink property of a flex element.
`flex-wrap(x)` | `x`: `nowrap` | Set the flex wrap property of a flex element.<br>`x` can be `nowrap`, `wrap` or `wrap-reverse`.
`justify-content(x)` | `x`: `flex-start` | Set the justify content property of a flex element.<br>`x` can be `flex-start`, `flex-end`, `center`,<br>`space-between` or `space-around`.
`order(int)` | `int`: `0` | Set the flex order property for a flex item.

#### Layout Floats
Mixin | Description
---- | ----
`float(x)` | Set the float of an element to `x`.
`float-clear()` | Clear the float of an element.
`float-no()` | Set the float of an element to none.

#### Layout Responsive
Mixin | Defaults | Description
---- | ---- | ----
`breakpoint(x, y, z)` | `y`: `false`<br>`z`: `false` | Generate a media query based on a Rocket preset or a value.<br>`x`: `large`, `small` or an `em/px` value.<br>`y`: Breakpoint type of `min` or `max`<br>`z`: breakpoint orientation.
`breakpoint-v(x, y, z)` | `y`: `false`<br>`z`: `false` | The same as breakpoint except it activates vertically.
`limit(x)` | `x`: `$limit-width` | Assigns a maximum width to an element and centers it.<br>Anything below the limit will become fluid.<br>Used mainly to contain row elements.
`offset(x, y)` | `y`: `$column-limit` | Push an element out `x` amount of columns from the left.
`offset-r(x, y)` | `y`: `$column-limit` | Push an element `x` amount of columns from the right.
`row()` | | Turns an element into a row.<br>Row is needed to wrap any **span** elements.<br>A row element will default to a 100% width of its container.
`span(x, y)` | `y`: `$column-limit` | Span an element `x` amount of columns within the `z` total.<br>See and example below.
`span-new(x, y)` | `y`: `$column-limit` | Apply a new span amount of `x` to an element.

```html
<div class="container">
	<div class="left">Left Column</div>
	<div class="right">Right Column</div>
</div>
```

```sass
.container {
	@include row();

	.left,
	.right {
		@include span(12); // Span of 12 is a width of 100% (12/12).
	}

	// Change the layout at the large breakpoint
	@include breakpoint (large) {
		.left {
			@include span-new(3); // Span of 3 is a width of 25% (3/12).
		}
		.right {
			@include span-new(9); // Span of 9 is a width of 75% (9/12).
		}
	}
}
```

#### List
Mixin | Defaults | Description
---- | ---- | ----
`list-style(x)` | `x`: `disc outside none` | Set the list style.
`list-style-image(url)` | | Set the list style image.
`list-style-position(x)` | `x`: `outside` | Set the list style position.
`list-style-type(x)` | `x`: `disc` | Set the list style type.

#### Position
Mixin | Defaults | Description
---- | ---- | ----
`position(x, opt)` | `x`: `relative` | Set the position of an element to `x`.<br>`opt` is optional.<br>`opt` can include `top`, `right`, `bottom`, `left`,<br>`margin-top`, `margin-right`, `margin-bottom` and `margin-left`.
`position-set(opt)` | | `opt` can include `top`, `right`, `bottom`, `left`,<br>`margin-top`, `margin-right`, `margin-bottom` and `margin-left`.

```sass
.my-element {
	@include position(relative, left 10px margin-top 10px)
}
```

#### Size
Mixin | Defaults | Description
---- | ---- | ----
`height(x, y, z)` | `x`: `0px`<br>`y`: `false`<br>`z`: `false` | Set the height of an element.<br>`y` is the height max.<br>`z` is the height min.
`height-max(x)` | `x`: `0px` | Set the maximum height of an element.
`height-min(x)` | `x`: `0px` | Set the minimum height of an element.
`size(x, y)` | `x`: `0px`<br>`y`: `0px` | Set the width `x` and height `y` of an element.
`square(x)` | | Set the width, height and line-height of an element to `x`.<br>Center the text.
`width(x, y, z)` | `x`: `0px`<br>`y`: `false`<br>`z`: `false` | Set the width of an element.<br>`y` is the width max.<br>`z` is the width min.
`width-max(x)` | `x`: `0px` | Set the maximum width of an element.
`width-min(x)` | `x`: `0px` | Set the minimum width of an element.

#### Spacing Margins
Mixin | Defaults | Description
---- | ---- | ----
`margin(x)` | `x`: `24px` | Set all the margins of an element.
`margin-[s](x)` | <br>`x`: `24px` | Set the margin side of `s` of an element.<br>`s` can be `top`, `right`, `bottom`, `left`, `horizontal`, `vertical`.
`margin-no()` | | Set the margin of an element to 0.

```sass
.my-element {
   @include margin-bottom(12px);
}
```

#### Spacing Padding
Mixin | Defaults | Description
---- | ---- | ----
`padding(x)` | `x`: `24px` | Set all the padding of an element.
`padding-[s](x)` | <br>`x`: `24px` | Set the padding side of `s` of an element.<br>`s` can be `top`, `right`, `bottom`, `left`, `horizontal`, `vertical`.
`padding-no()` | | Set the padding of an element to 0.

```sass
.my-element {
   @include padding-right(20px);
}
```

#### Spacing Remove
Mixin | Description
---- | ----
`spacing-no()` | Remove all margins and padding from an element.

#### Text
Mixin | Defaults | Description
---- | ---- | ----
`text-align(x)` | `x`: `left` | Set the text alignment of an element.
`text-colour(x)` | `x`: `$white` | Set the text colour of an element.
`text-decoration(x)` | `x`: `none` | Set the text decoration of an element.
`text-ellipsis()` | | Set text overflow to ellipsis and prevent word wrapping.
`text-font(x)` | `x`: `$helvetica` | Set the text font family of an element.
`text-hide()` | | Hide the text within an element.
`text-letter-spacing(x)` | `x`: `normal` | Set the text letter spacing of an element.
`text-line-height(x)` | `x`: `16px` |  Set the line height of an element in pixels.<br>Calculates an additional rem overwrite.
`text-size(x)` | `x`: `16px` | Set the font size of an element in pixels.<br>Calculates an additional rem overwrite.
`text-style()` | `x`: `normal` | Set the text style of an element to $style.
`text-transform(x)` | `x`: `none` | Set the text transform property of an element to `x`.<br>`x` can be `none`, `capitalize`, `uppercase`,<br>`lowercase` or `initial`.
`text-weight(x)` | `x`: `normal` | Set the text weight of an element to `x`.

#### Transform
Mixin | Defaults | Description
---- | ---- | ----
`transform(x)` | | Set the transform of property `x` for an element.
`transform-origin(x, y, z)` | `x`: `50%`<br>`y`: `50%`<br>`z`: `0` | Set the transform origin of an element.
`transform-rotate(x)` | `x`: `0deg` | Set the transform rotate style of an element.
`transform-rotate-x(x)` | `x`: `0deg` | Set the transform rotate `X` style of an element.
`transform-rotate-y(x)` | `x`: `0deg` | Set the transform rotate `Y` style of an element.
`transform-rotate-z(x)` | `x`: `0deg` | Set the transform rotate `Z` style of an element.
`transform-scale(x, y)` | `x`: `1`<br>`y`: `1` | Set the transform scale style of an element.
`transform-scale-3d(x, y, z)` | `x`: `1`<br>`y`: `1`<br>`z`: `1` | Set the transform scale3D style of an element.
`transform-translate-3d(x, y, z)` | `x`: `0px`<br>`y`: `0px`<br>`z`: `0px` | Set the transform translate3d style of an element.
`transform-translate-x(x)` | `x`: `1` | Set the transform translateX style of an element.
`transform-translate-y(x)` | `x`: `1` | Set the transform translateY style of an element.
`transform-translate-z(x)` | `x`: `1` | Set the transform translateZ style of an element.
`transform-easing(x, y, z, s)` | `x`: `0px`<br>`y`: `0px`<br>`z`: `0px`<br>`s`: `0.2s` | Animate the translate3d transform style (ease-out).

## CSS Implementation
Start by including the necessary files.

```html
<head>
   <link href="rocket-propel/css/propel.min.css" rel="stylesheet" type="text/css">
</head>
```

Now class your HTML to manage your layout. For example:

```html
<div class="_row">
   <div class="_span-2">Span 2</div>
   <div class="_span-2">Span 2</div>
   <div class="_span-2">Span 2</div>
   <div class="_span-2">Span 2</div>
   <div class="_span-2">Span 2</div>
   <div class="_span-2">Span 2</div>
</div>
```

#### Classes as Modifiers
Because all classes are declared on the DOM elements themselves, Propel sees them as modifiers and such uses the **_** prefix to reflect this.

Find the other available classes below:

#### Background
Class | Options | Description
---- | ---- | ----
`._back-pos-[x]` | `[x]`: `t` `r` `b` `l` `c` | Set the background position of an element.<br>`[x]` is for `top`, `right`, `bottom`, `left` or `center`.
`._back-repeat-[x]` | `[x]`: `no` `y` `x` | Set the background repeat of an element.<br>`[x]` is for repeat no, along the Y axis or along the X axis.
`._back-single` | | Set the background of element to no repeat and centered.
`._back-contain` | | Set the background of element to no repeat and contain.
`._back-cover` | | Set the background of element to no repeat and cover.
`._back-black` | | Set the background colour to black.
`._back-grey` | | Set the background colour to medium grey.
`._back-grey-light` | | Set the background colour to light grey.
`._back-white` | | Set the background colour to white.

#### Display
Class | Options | Description
---- | ---- | ----
`._hide` | | Hide an element.
`._hide-visually` | | Hide an element visually.<br>It will still register as on the page.
`._hide-large` | | Hide an element in large view only.
`._hide-small` | | Hide an element in small view only.
`._show` | | Show an element.
`._show-large` | | Show an element in large view only.
`._show-small` | | Show an element in small view only.
`._transparency-[x]` | `[x]`: `100` `75` `50` `25` `0` | Set the opacity of an element.<br>`[x]` is for `100%`, `75%`, `50%`, `25%` or `0%`.

#### Global
Class | Options
---- | ----
`._propel` | Apply some global styles to the HTML element of your page.

#### Layout
Class | Options | Description
---- | ---- | ----
`._center` | | Center an element.
`._float-[x]` | `[x]`: `l` `r` | Set the float property of an element to `left` or `right`.
`._float-no` | | Remove the float property from an element.
`._float-clear` | | Stop all floating elements from affecting any element following.
`._valign-[x]` | `[x]`: `t` `m` `b` | Set the vertical alignment of an element to `top`, `middle` or `bottom`.

```html
<div class="_center">
	<div class="_float-r">One</div>
	<div class="_float-r">Two</div>
</div>
```

#### Layout Responsive
Class | Options | Description
---- | ---- | ----
`._row` | | Set the element to a row. Used on responsive containers
`._span-[i]` | `[i]`: `1` to `12` | Set width of an element within a row. The spans are base 12.
`._span-large-[i]` | `[i]`: `1` to `12` | Set width of an element within a row at the large breakpoint.
`._span-small-[i]` | `[i]`: `1` to `12` | Set width of an element within a row at the small breakpoint.
`._limit` | | Limit an elements width to 68.750em (default) and center.
`._offset-[i]` | `[i]`: `1` to `12` | Offset from the left by span `[i]`. The spans are base 12.
`._offset-r-[i]` | `[i]`: `1` to `12` | Offset from the right by span `[i]`.
`._offset-large-[i]` | `[i]`: `1` to `12` | Offset from the left by span `[i]` at the large breakpoint.
`._offset-large-r-[i]` | `[i]`: `1` to `12` | Offset from the right by span `[i]` at the large breakpoint.
`._offset-small-[i]` | `[i]`: `1` to `12` | Offset from the left by span of `[i]` at the small breakpoint.
`._offset-small-r-[i]` | `[i]`: `1` to `12` | Offset from the right by span of `[i]` at the small breakpoint.

```html
<div class="_row">
	<div class="_span-12 _span-large-3">Left Column</div>
	<div class="_span-12 _span-large-9">Right Column</div>
</div>
```

#### Position
Class | Description
---- | ----
`._pos-absolute` | Set the position of an element to absolute.
`._pos-relative` | Set the position of an element to relative.
`._pos-static` | Set the position of an element to static.
`._pos-fixed` | Set the position of an element to fixed.

#### Sizing
Class | Options | Description
---- | ---- | ----
`._block-h-[x]` | `[x]`: `10` `20` `50` `100` `200` `500` `1000` | Set the height of an element.<br>`[x]` results in px value.
`._block-w-[x]` | `[x]`: `10` `20` `50` `100` `200` `500` `1000` | Set the width of an element.<br>`[x]` results in px value.

```html
<div class="_block-w-10 _block-h-20">Block</div>
```

#### Spacing
Class | Options | Description
---- | ---- | ----
`._mgn-[x]` | `[x]`: `1` to `10` | Add `[x]` amount of margin all around.
`._mgn-[s]-[x]` | `[s]`: `t` `r` `b` `l`<br>`[x]`: `1` to `10` | Add `[x]` amount of margin to the `[s]` side of an element.
`._mgn-no` | | Remove all margins from an element.
`._pad-[x]` | `[x]`: `1` to `10` | Add `[x]` amount of padding all around.
`._pad-[s]-[x]` | `[s]`: `t` `r` `b` `l`<br>`[x]`: `1` to `10` | Add `[x]` amount of padding to the `[s]` side of an element.
`._pad-no` | | Remove all padding from an element.
`._spacing-no` | | Remove all padding and margins from an element.

```html
<div class="_pad-t-10">Padding top of 10 pixels</div>
<div class="_mgn-r-10">Margin right of 8 pixels</div>
```

#### Text
Class | Options | Description
---- | ---- | ----
`._hide-text` | | Hide the text within an element.
`._txt-[x]` | `[x]`: `l` `c` `r` | Set the text alignment to `[x]`.<br>`[x]` is for `left`, `center`, `right`.
`._txt-size-[x]` | `[x]`: `x2s` `xs` `s` `m` `n` `l` `xl` `x2l` | Set the font size to `[x]`.
`._txt-weight-[x]` | `[x]`: `xl` `l` `n` `b` `xb` | Set the font weight to `[x]`.
`._txt-light` | | Set the font weight to light.
`._txt-bold` | | Set the font weight to bold.
`._txt-normal` | | Set the font weight and style to normal.
`._txt-italics` | | Set the font style to italics.
`._txt-oblique` | | Set the font style to oblique.
`._txt-white` | | Set the font colour to white.
`._txt-grey` | | Set the font colour to medium grey.

```html
<div class="_txt-weight-xl">Very light text.</div>
<div class="_txt-r">Text aligned right.</div>
```

## Blueplate Deprecated
The original library, Blueplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Blueplate will be maintained only with bug fixes under the **blueplate** branch.

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
