/*
 *  Project: Buttons
 *  Description: A highly customizable CSS button library built with Sass and Compass
 *  Author: Alex Wolfe
 *  License: Apache License v2.0
 */// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
(function(e,t,n,r){"use strict";function u(t,n){this.options=e.extend({},o,n);this._defaults=o;this._name=i;this.$element=e(t);this.init()}var i="menuButton",s=".button-dropdown",o={propertyName:"value"};u.prototype={constructor:u,init:function(){this.toggle()},toggle:function(e,t){this.$element.data("dropdown")==="show"?this.hideMenu():this.showMenu()},showMenu:function(){this.$element.data("dropdown","show");this.$element.find("ul").show();if(this.$overlay)this.$overlay.show();else{this.$overlay=e('<div class="button-overlay"></div>');this.$element.append(this.$overlay)}},hideMenu:function(){this.$element.data("dropdown","hide");this.$element.find("ul").hide();this.$overlay.hide()}};e.fn[i]=function(t){return this.each(function(){e.data(this,"plugin_"+i)?e.data(this,"plugin_"+i).toggle():e.data(this,"plugin_"+i,new u(this,t))})};e(n).on("click","[data-buttons=dropdown]",function(t){var n=e(t.currentTarget);n.menuButton()});e(n).on("click","[data-buttons=dropdown] > a",function(e){e.preventDefault()})})(jQuery,window,document);