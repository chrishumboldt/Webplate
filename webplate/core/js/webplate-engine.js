/**
 * webplate-engine.js
 *
 * Author:        Chris Modem
 * Last Edited:   25 August 2013
 * Edited By:   	Chris Modem
 */

// ---------- Yepnope
(function(e,t,n){function L(e){return!e||e=="loaded"||e=="complete"||e=="uninitialized"}function A(e,n,r,o,u,a){var l=t.createElement("script"),c,h;o=o||k.errorTimeout;l.src=e;for(h in r)l.setAttribute(h,r[h]);n=a?M:n||f;l.onreadystatechange=l.onload=function(){if(!c&&L(l.readyState)){c=1;n();l.onload=l.onreadystatechange=null}};i(function(){if(!c){c=1;n(1)}},o);S();u?l.onload():s.parentNode.insertBefore(l,s)}function O(e,n,r,o,u,a){var l=t.createElement("link"),c,h;o=o||k.errorTimeout;n=a?M:n||f;l.href=e;l.rel="stylesheet";l.type="text/css";for(h in r)l.setAttribute(h,r[h]);if(!u){S();s.parentNode.insertBefore(l,s);i(n,0)}}function M(){var e=u.shift();a=1;if(e)if(e.t)i(function(){(e["t"]=="c"?k.injectCss:k.injectJs)(e.s,0,e.a,e.x,e.e,1)},0);else{e();M()}else a=0}function _(e,n,r,o,f,l,p){function y(t){if(!v&&L(d.readyState)){g.r=v=1;!a&&M();if(t){e!="img"&&i(function(){h.removeChild(d)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload();d.onload=d.onreadystatechange=null}}}p=p||k.errorTimeout;var d=t.createElement(e),v=0,m=0,g={t:r,s:n,e:f,a:l,x:p};if(T[n]===1){m=1;T[n]=[]}if(e=="object"){d.data=n;d.setAttribute("type","text/css")}else{d.src=n;d.type=e}d.width=d.height="0";d.onerror=d.onload=d.onreadystatechange=function(){y.call(this,m)};u.splice(o,0,g);if(e!="img")if(m||T[n]===2){S();h.insertBefore(d,c?null:s);i(y,p)}else T[n].push(d)}function D(e,t,n,r,i){a=0;t=t||"j";if(w(e))_(t=="c"?g:m,e,t,this.i++,n,r,i);else{u.splice(this.i++,0,e);u.length==1&&M()}return this}function P(){var e=k;e.loader={load:D,i:0};return e}var r=t.documentElement,i=e.setTimeout,s=t.getElementsByTagName("script")[0],o={}.toString,u=[],a=0,f=function(){},l="MozAppearance"in r.style,c=l&&!!t.createRange().compareNode,h=c?r:s.parentNode,p=e.opera&&o.call(e.opera)=="[object Opera]",d=!!t.attachEvent&&!p,v="webkitAppearance"in r.style&&!("async"in t.createElement("script")),m=l?"object":d||v?"script":"img",g=d?"script":v?"img":m,y=Array.isArray||function(e){return o.call(e)=="[object Array]"},b=function(e){return Object(e)===e},w=function(e){return typeof e=="string"},E=function(e){return o.call(e)=="[object Function]"},S=function(){if(!s||!s.parentNode)s=t.getElementsByTagName("script")[0]},x=[],T={},N={timeout:function(e,t){t.length&&(e.timeout=t[0]);return e}},C,k;k=function(e){function s(e){var t=e.split("!"),n=x.length,r=t.pop(),i=t.length,s={url:r,origUrl:r,prefixes:t},o,u,a;for(u=0;u<i;u++){a=t[u].split("=");o=N[a.shift()];o&&(s=o(s,a))}for(u=0;u<n;u++)s=x[u](s);return s}function o(e){var t=e.split("?")[0];return t.substr(t.lastIndexOf(".")+1)}function u(e,t,r,i,u){var a=s(e),f=a.autoCallback,l=o(a.url);if(a.bypass)return;t&&(t=E(t)?t:t[e]||t[i]||t[e.split("/").pop().split("?")[0]]);if(a.instead)return a.instead(e,t,r,i,u);T[a.url]&&a.reexecute!==!0?a.noexec=!0:T[a.url]=1;e&&r.load(a.url,a.forceCSS||!a.forceJS&&"css"==o(a["url"])?"c":n,a.noexec,a.attrs,a.timeout);(E(t)||E(f))&&r.load(function(){P();t&&t(a.origUrl,u,i);f&&f(a.origUrl,u,i);T[a.url]=2})}function a(e,t){function h(e,r){if(""!==e&&!e)!r&&a();else if(w(e)){r||(s=function(){var e=[].slice.call(arguments);o.apply(this,e);a()});u(e,s,t,0,n)}else if(b(e)){l=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}();for(c in e)if(e.hasOwnProperty(c)){!r&&!--l&&(E(s)?s=function(){var e=[].slice.call(arguments);o.apply(this,e);a()}:s[c]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t);a()}}(o[c]));u(e[c],s,t,c,n)}}}var n=!!e.test,r=n?e.yep:e.nope,i=e.load||e.both,s=e.callback||f,o=s,a=e.complete||f,l,c;h(r,!!i||!!e.complete);i&&h(i);!i&&!!e.complete&&h("")}var t,r,i=this.yepnope.loader;if(w(e))u(e,0,i,0);else if(y(e))for(t=0;t<e.length;t++){r=e[t];w(r)?u(r,0,i,0):y(r)?k(r):b(r)&&a(r,i)}else b(e)&&a(e,i)};k.addPrefix=function(e,t){N[e]=t};k.addFilter=function(e){x.push(e)};k.errorTimeout=1e4;if(t.readyState==null&&t.addEventListener){t.readyState="loading";t.addEventListener("DOMContentLoaded",C=function(){t.removeEventListener("DOMContentLoaded",C,0);t.readyState="complete"},0)}e.yepnope=P();e.yepnope.executeStack=M;e.yepnope.injectJs=A;e.yepnope.injectCss=O})(this,document);(function(e){e.addPrefix("css",function(e){e.forceCSS=!0;return e})})(this.yepnope);yepnope.addPrefix("less",function(e){e.forceCSS=!0;e.attrs={rel:"stylesheet",type:"text/less"};return e});(function(e,t,n){yepnope.injectCss=function(e,t,n,r,i,s){var o=document.createElement("link"),u=function(){if(!l){l=1;o.removeAttribute("id");setTimeout(t,0)}},a="yn"+ +(new Date),f,l,c;t=s?yepnope.executeStack:t||function(){};r=r||yepnope.errorTimeout;o.href=e;o.rel="stylesheet";o.type="text/css";o.id=a;for(c in n)o.setAttribute(c,n[c]);if(!i){f=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];f.parentNode.insertBefore(o,f);o.onload=u;function h(){try{var e=document.styleSheets;for(var t=0,n=e.length;t<n;t++)if(e[t].ownerNode.id==a&&e[t].cssRules.length)return u();throw new Error}catch(r){setTimeout(h,20)}}h()}}})(this,this.document);


// ---------- Some variables
var $ar_path 						= window.location.href.split('/');
var $protocol 						= $ar_path[0];
var $host 							= $ar_path[2];
var $base_url 						= $protocol + '//' + $host;
var $crt_script 					= document.getElementById('webplate-stack');
var $crt_script_src				= $crt_script.getAttribute('src').replace('webplate/stack.js', '');
var $root							= $crt_script_src;
var $js_path						= $root + 'webplate/core/js/';
var $css_path						= $root + 'webplate/core/css/';
var $less_path						= $root + 'webplate/core/less/';
var $icomoon_path					= $root + 'webplate/core/icomoon/';
var $js_extras_path				= $root + 'webplate/extras/js/';
var $css_extras_path				= $root + 'webplate/extras/css/';
var $less_extras_path			= $root + 'webplate/extras/less/';
var $is_less						= false;
var $ar_js_core					= [
	$js_path + 'min/webplate-jquery.min.js',
	$js_path + 'min/webplate-modernizr.min.js'
];
var $ar_js_extras					= [];
var $ar_css_core					= [
	$css_path + 'webplate.css',
	$icomoon_path +'style.css'
];
var $ar_css_extras				= [];


// ---------- Load the necessary files and execute
yepnope([{
	load								: $ar_js_core,
	complete							: function(){
		
		/**
		 * webplate-tools.js
		 *
		 * Author:        Chris Humboldt
		 * Last Edited:   26 September 2013
		 * Edited By:   	Chris Humboldt
		 */// ----- LOCK A FORM FROM SUBMITTING ON ENTER
		jQuery.web_lock_submit=function(e){$(e).live("keypress",function(e){if(e.keyCode==13)return!1})};jQuery.web_exists=function(e){return $(e).length>0?!0:!1};jQuery.web_get_extension=function(e){return e.split(".").pop().toLowerCase()};jQuery.web_crt_db_date=function(){$current_time=new Date;$year=$current_time.getFullYear();$month=$current_time.getMonth()+1;$month<10&&($month="0"+$month);$day=$current_time.getDate();$day<10&&($day="0"+$day);return $year+"-"+$month+"-"+$day};jQuery.web_check_date=function(e){return e.substr(4,1)=="-"&&e.substr(7,1)=="-"&&$.scrap_is_integer(e.substr(0,4))==1&&$.scrap_is_integer(e.substr(5,2))==1&&$.scrap_is_integer(e.substr(8,2))==1&&e.length==10?!0:!1};jQuery.web_is_time=function(e){if(e!=""){var t="0123456789.:",n=!0,r;for($i=0;$i<e.length&&n==1;$i++){r=e.charAt($i);t.indexOf(r)==-1&&(n=!1)}return n}return!1};jQuery.web_is_integer=function(e){if(e!=""){var t="0123456789.",n=!0,r;for($i=0;$i<e.length&&n==1;$i++){r=e.charAt($i);t.indexOf(r)==-1&&(n=!1)}return n}return!1};jQuery.web_is_full_integer=function(e){if(e!=""){var t="0123456789",n=!0,r;for($i=0;$i<e.length&&n==1;$i++){r=e.charAt($i);t.indexOf(r)==-1&&(n=!1)}return n}return!1};jQuery.web_has_white_space=function(e){return e.indexOf(" ")!=-1?!0:!1};jQuery.web_allowed_doc=function(e,t){t==null&&(t=["png","jpg","jpeg","gif","tif","tiff","bmp","doc","docx","xls","xlsx","pdf","txt","csv"]);$file_ext=e.split(".").pop().toLowerCase();return jQuery.inArray($file_ext,t)==-1?!1:!0};jQuery.web_input_mirror=function(e,t){$($selector).keyup(function(){$ref_input=$(this).val();$ref_value=$ref_input.replace(/ /g,"_").toLowerCase();$(t).text($ref_value)})};jQuery.web_is_email=function(e){return e.indexOf("@")!=-1&&e.indexOf(".")!=-1?!0:!1};jQuery.web_is_password=function(e){if(e.length>5){$num_check=/^[0-9]+$/;$letter_check=/^[a-zA-Z-]+$/;$error=!1;e.match($num_check)&&($error=!0);e.match($letter_check)&&($error=!0);return $error==1?!1:!0}return!1};jQuery.web_is_image=function(e,t){t==null&&(t=["jpg","jpeg","gif","tif","tiff","bmp","png"]);$file_ext=e.split(".").pop().toLowerCase();return jQuery.inArray($file_ext,t)==-1?!1:!0};jQuery.web_is_color=function(e){if(e.length!=7)return!1;if(e.substr(0,1)!="#")return!1};jQuery.web_random_string=function(e){$chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";e==null&&(e=5);$random_string="";for(var t=0;t<e;t++){$r_num=Math.floor(Math.random()*$chars.length);$random_string+=$chars.substring($r_num,$r_num+1)}return $random_string};jQuery.web_show_overlay=function(){$(".webplate-overlay").fadeIn()};jQuery.web_remove_overlay=function(){$(".webplate-overlay").fadeOut()};jQuery.web_show_modal=function(e){if($(e).is(":hidden")==1){e==""&&(e=".modal-basic");$modal_height=$(e).height();$(".webplate-overlay").fadeIn();$(e).css({top:-($modal_height+50)}).show();$(e).animate({top:0},"fast")}};jQuery.web_hide_modal=function(){$(".modal:visible .close").live("click",function(){$modal_height=$(".modal:visible").height();$(".webplate-overlay").fadeOut();$(".modal:visible").animate({top:-($modal_height+50)},"fast",function(){$(".modal:visible").hide()})})};jQuery.web_log=function(e){window.console&&console.log(e)};jQuery.web_navigation=function(){$("body").prepend($(".navigation").clone().addClass("webplate-navigation").removeClass("navigation"));$(".navigation-trigger").on("click",function(e){e.preventDefault();$("html").hasClass("show-nav")?$("html").removeClass("show-nav").addClass("hide-nav"):$("html").addClass("show-nav").removeClass("hide-nav")});$(".webplate").on("click",function(e){$("html").hasClass("nav-open")&&$("html").removeClass("show-nav").addClass("hide-nav")});$(".navigation-trigger").hasClass("small-show")==0&&$(".navigation-trigger").addClass("small-show");$(".webplate-navigation a").on("click",function(){$(".webplate-navigation a.active").removeClass("active");$(this).addClass("active");$("html").removeClass("show-nav").addClass("hide-nav")});$(".webplate").on("drag",function(e){$("html").hasClass("nav-open")&&e.preventDefault()})};jQuery.web_window_type=function(){$.web_window_type_execute();$(window).resize(function(){$.web_window_type_execute()})};jQuery.web_window_type_execute=function(){$("html.no-touch.show-nav").removeClass("show-nav").addClass("hide-nav");$(".webplate-shifter").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){$("html").hasClass("show-nav")==1?$("html").addClass("nav-open"):$("html").removeClass("nav-open")});if($(window).width()<=700){$("html").addClass("web-small-view");$("html").removeClass("web-large-view")}else{$("html").removeClass("web-small-view");$("html").addClass("web-large-view")}};jQuery.web_forms=function(){$(document).ready(function(){$form_colour="-blue";$data_form_colour=$("body").data("forms-colour");$ar_form_colours=["red","green","blue","aero","grey","orange","yellow","pink","purple"];$data_form_colour&&$data_form_colour.length>0&&jQuery.inArray($data_form_colour,$ar_form_colours)>-1&&($form_colour="-"+$data_form_colour);$("html").addClass("web-forms-colour"+$form_colour);$("input").iCheck({checkboxClass:"icheckbox_square"+$form_colour,radioClass:"iradio_square"+$form_colour,increaseArea:"20%",labelHover:!0});$("select").wrap('<span class="drop-down"></span>')})};
		
		/*
		 *  Project: Buttons
		 *  Description: A highly customizable CSS button library built with Sass and Compass
		 *  Author: Alex Wolfe
		 *  License: Apache License v2.0
		 */// the semi-colon before function invocation is a safety net against concatenated
		// scripts and/or other plugins which may not be closed properly.
		(function(e,t,n,r){"use strict";function u(t,n){this.options=e.extend({},o,n);this._defaults=o;this._name=i;this.$element=e(t);this.init()}var i="menuButton",s=".button-dropdown",o={propertyName:"value"};u.prototype={constructor:u,init:function(){this.toggle()},toggle:function(e,t){this.$element.data("dropdown")==="show"?this.hideMenu():this.showMenu()},showMenu:function(){this.$element.data("dropdown","show");this.$element.find("ul").show();if(this.$overlay)this.$overlay.show();else{this.$overlay=e('<div class="button-overlay"></div>');this.$element.append(this.$overlay)}},hideMenu:function(){this.$element.data("dropdown","hide");this.$element.find("ul").hide();this.$overlay.hide()}};e.fn[i]=function(t){return this.each(function(){e.data(this,"plugin_"+i)?e.data(this,"plugin_"+i).toggle():e.data(this,"plugin_"+i,new u(this,t))})};e(n).on("click","[data-buttons=dropdown]",function(t){var n=e(t.currentTarget);n.menuButton()});e(n).on("click","[data-buttons=dropdown] > a",function(e){e.preventDefault()})})(jQuery,window,document);

		/*!
		 * iCheck v0.9.1, http://git.io/uhUPMA
		 * =================================
		 * Powerful jQuery plugin for checkboxes and radio buttons customization
		 *
		 * (c) 2013 Damir Foy, http://damirfoy.com
		 * MIT Licensed
		 */
		(function(e){function w(e,t,n){var r=e[0];o=/er/.test(n)?f:/bl/.test(n)?u:s,active=n==l?{checked:r[s],disabled:r[u],indeterminate:e.attr(f)=="true"||e.attr(a)=="false"}:r[o];if(/^(ch|di|in)/.test(n)&&!active)E(e,o);else if(/^(un|en|de)/.test(n)&&active)S(e,o);else if(n==l)for(var o in active)active[o]?E(e,o,!0):S(e,o,!0);else if(!t||n=="toggle"){t||e[m]("ifClicked");active?r[c]!==i&&S(e,o):E(e,o)}}function E(r,l,h){var p=r[0],m=r.parent(),g=l==s,b=l==f,w=b?a:g?o:"enabled",E=T(p,w+N(p[c])),x=T(p,l+N(p[c]));if(p[l]!==!0){if(!h&&l==s&&p[c]==i&&p.name){var k=r.closest("form"),L='input[name="'+p.name+'"]';L=k.length?k.find(L):e(L);L.each(function(){this!==p&&e.data(this,t)&&S(e(this),l)})}if(b){p[l]=!0;p[s]&&S(r,s,"force")}else{h||(p[l]=!0);g&&p[f]&&S(r,f,!1)}C(r,g,l,h)}p[u]&&!!T(p,y,!0)&&m.find("."+n).css(y,"default");m[d](x||T(p,l));m[v](E||T(p,w)||"")}function S(e,t,r){var i=e[0],l=e.parent(),h=t==s,p=t==f,m=p?a:h?o:"enabled",g=T(i,m+N(i[c])),b=T(i,t+N(i[c]));if(i[t]!==!1){if(p||!r||r=="force")i[t]=!1;C(e,h,m,r)}!i[u]&&!!T(i,y,!0)&&l.find("."+n).css(y,"pointer");l[v](b||T(i,t)||"");l[d](g||T(i,m))}function x(n,r){if(e.data(n,t)){var i=e(n);i.parent().html(i.attr("style",e.data(n,t).s||"")[m](r||""));i.off(".i").unwrap();e(g+'[for="'+n.id+'"]').add(i.closest(g)).off(".i")}}function T(n,r,i){if(e.data(n,t))return e.data(n,t).o[r+(i?"":"Class")]}function N(e){return e.charAt(0).toUpperCase()+e.slice(1)}function C(e,t,n,r){if(!r){t&&e[m]("ifToggled");e[m]("ifChanged")[m]("if"+N(n))}}var t="iCheck",n=t+"-helper",r="checkbox",i="radio",s="checked",o="un"+s,u="disabled",a="determinate",f="in"+a,l="update",c="type",h="click",p="touchbegin.i touchend.i",d="addClass",v="removeClass",m="trigger",g="label",y="cursor",b=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini/i.test(navigator.userAgent);e.fn[t]=function(o,a){var y=":"+r+", :"+i,T=e(),N=function(t){t.each(function(){var t=e(this);t.is(y)?T=T.add(t):T=T.add(t.find(y))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(o)){o=o.toLowerCase();N(this);return T.each(function(){o=="destroy"?x(this,"ifDestroyed"):w(e(this),!0,o);e.isFunction(a)&&a()})}if(typeof o=="object"||!o){var C=e.extend({checkedClass:s,disabledClass:u,indeterminateClass:f,labelHover:!0},o),k=C.handle,L=C.hoverClass||"hover",A=C.focusClass||"focus",O=C.activeClass||"active",M=!!C.labelHover,_=C.labelHoverClass||"hover",D=(""+C.increaseArea).replace("%","")|0;if(k==r||k==i)y=":"+k;D<-50&&(D=-50);N(this);return T.each(function(){x(this);var o=e(this),a=this,f=a.id,y=-D+"%",T=100+D*2+"%",N={position:"absolute",top:y,left:y,display:"block",width:T,height:T,margin:0,padding:0,background:"#fff",border:0,opacity:0},k=b?{position:"absolute",visibility:"hidden"}:D?N:{position:"absolute",opacity:0},P=a[c]==r?C.checkboxClass||"i"+r:C.radioClass||"i"+i,H=e(g+'[for="'+f+'"]').add(o.closest(g)),B=o.wrap('<div class="'+P+'"/>')[m]("ifCreated").parent().append(C.insert),j=e('<ins class="'+n+'"/>').css(N).appendTo(B);o.data(t,{o:C,s:o.attr("style")}).css(k);!!C.inheritClass&&B[d](a.className);!!C.inheritID&&f&&B.attr("id",t+"-"+f);B.css("position")=="static";w(o,!0,l);H.length&&H.on(h+".i mouseenter.i mouseleave.i "+p,function(t){var n=t[c],r=e(this);if(!a[u]){if(n==h)w(o,!1,!0);else if(M)if(/ve|nd/.test(n)){B[v](L);r[v](_)}else{B[d](L);r[d](_)}if(!b)return!1;t.stopPropagation()}});o.on(h+".i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[c],n=e.keyCode;if(t==h)return!1;if(t=="keydown"&&n==32){if(a[c]!=i||!a[s])a[s]?S(o,s):E(o,s);return!1}t=="keyup"&&a[c]==i?!a[s]&&E(o,s):/us|ur/.test(t)&&B[t=="blur"?v:d](A)});j.on(h+" mousedown mouseup mouseover mouseout "+p,function(e){var t=e[c],n=/wn|up/.test(t)?O:L;if(!a[u]){if(t==h)w(o,!1,!0);else{/wn|er|in/.test(t)?B[d](n):B[v](n+" "+O);H.length&&M&&n==L&&H[/ut|nd/.test(t)?v:d](_)}if(!b)return!1;e.stopPropagation()}})})}return this}})(jQuery);
		
		// Webplate execute
      // ------------------------------------------------ DOM EDITS

      $('body').wrapInner('<div class="webplate" />');
      $('.webplate').wrapInner('<div class="webplate-shifter" />');
      $('.webplate-shifter').wrapInner('<div class="webplate-content" />');
      $('.webplate').prepend('<div class="webplate-overlay" />');
      $('.navigation').wrapInner('<div class="navigation-inner" />');
		$('.is-fixed').appendTo('body'); // Fixed elements fix


      // ------------------------------------------------ EXECUTE

      $.web_navigation();

      $.web_window_type();
		
		$.web_forms();

		if(Modernizr.touch){
			
			// Load CSS and LESS and show the body
			yepnope({load: $js_path + 'min/webplate-touch.min.js', complete: function(){
				
				// Activate fastclick
				FastClick.attach(document.body);
				
			}});
		}
	}
}, {
	load								: $ar_css_core,
	complete							: function(){
		
		// Load CSS extras
		$css_extras					= $('body').data('css-extras');

		// Check that CSS is needed
		if(($css_extras) && ($css_extras.length > 0)){

			// Split the js
			$split_css_extras               = $css_extras.split(',');

			// Loop through and load each CSS module
			$.each($split_css_extras, function($index, $file){

				// Trim the whitespace
				$file                       = jQuery.trim($file);

				// Get the extension
				$extension                  = $.web_get_extension($file);

				// Add to the arrays
				if($extension == 'css'){
					
					$ar_css_extras.push($css_extras_path + $file);
				}
				else if($extension == 'less'){

					$ar_css_extras.push('less!' + $less_extras_path + $file);
					$ar_css_extras.push($js_path + 'min/webplate-less.min.js');
				}
			});
			
			// Load CSS and LESS and show the body
			yepnope({ load: $ar_css_extras, complete: function(){
					
				// Show the body
				$('body').show();
			} });
		}
		else {
				
			// Show the body
			$('body').show();
		}
		
		// JS extras
      $js_extras                          = $('body').data('js-extras');

      // Check that js is needed
      if(($js_extras) && ($js_extras.length > 0)){

			// Split the js
			$split_js_extras                = $js_extras.split(',');

			// Loop through and load each js extra
			$.each($split_js_extras, function($index, $file){

				// Some variables
				$file                       = jQuery.trim($file);
				$extension                  = $.web_get_extension($file);

				// Load the JS
				if($extension == 'js'){
					
					$ar_js_extras.push($js_extras_path + $file);
				}
			});
			
			// Load it
			yepnope({ load: $ar_js_extras });
      }
	}
}]);