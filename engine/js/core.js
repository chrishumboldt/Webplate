/**
 * jQuery File: 	core.js
 * Type: 			execute
 * Author:        	Chris Humboldt
 * Last Edited:   	6 April 2015
 */


// Yepnope
// ---------------------------------------------------------------------------------------
/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);


// Some variables
// ---------------------------------------------------------------------------------------
var $crt_script 							= document.getElementById('webplate');
var $body_element 							= document.getElementsByTagName('body')[0];
var $html_element 							= document.getElementsByTagName('html')[0];
var $crt_script_src							= $crt_script.getAttribute('src').replace('start.js', '');
var $root									= $crt_script_src;
var $config_file 							= $root + 'project/config.json';
var $js_path								= $root + 'engine/js/';
var $css_path								= $root + 'engine/css/';
var $component_path							= $root + 'project/component/';
var $component_json 						= [];
var $icon_font_path							= $root + 'project/icon-font/';
var $js_project_path						= $root + 'project/js/';
var $css_project_path						= $root + 'project/css/';
var $ui_project_path						= $root + 'project/ui/';
var $ar_engine_files						= [$js_path + 'min/scripts.min.js', $css_path + 'styles.css'];
var $ar_component_files						= [];
var $ar_component_execute					= [];
var $ar_extra_css							= [];
var $ar_extra_js							= [];



// Some functions
// ---------------------------------------------------------------------------------------
// Load JSON
function load_json($file, $callback)
{
	var $xmlhttp					= new XMLHttpRequest();
	$xmlhttp.onreadystatechange 	= $callback;
	$xmlhttp.open('GET', $file, true);
	$xmlhttp.send();
}

// Load project files
function load_project_files($project_css, $project_js)
{
	// Add in project files
	for($i = 0; $i < $project_css.length; $i++)
	{
		var $val 					= $project_css[$i];
		var $file 					= $val.trim();
		var $extension				= web_get_ext($file);

		// Add to the array
		if($extension == 'css')
		{
			$ar_extra_css.push($css_project_path + $file);
		}
	};
	for($i = 0; $i < $project_js.length; $i++)
	{
		var $val 					= $project_js[$i];
		var $file 					= $val.trim();
		var $extension				= web_get_ext($file);

		// Add to the array
		if($extension == 'js')
		{
			$ar_extra_js.push($js_project_path + $file);
		}
	};

    // Load
	if($ar_extra_css.length > 0)
	{
		yepnope({ load: $ar_extra_css, complete: function()
		{
			setTimeout(function()
			{
				yepnope({ load: $ar_extra_js });
				$body_element.removeAttribute('style');
			}, 
			20);
		}});
	}
	else if($ar_extra_js.length > 0)
	{
		setTimeout(function()
		{
			yepnope({ load: $ar_extra_js });
			$body_element.removeAttribute('style');
		}, 
		20);
	}
	else
	{
		$body_element.removeAttribute('style');
	}
}


// Load the necessary files and execute
// ---------------------------------------------------------------------------------------
yepnope([
{
	load									: $ar_engine_files,
	complete								: function()
	{
		// Touch check
		if(Modernizr.touch)
		{
			// Load the library
			yepnope({ load: $js_path + 'min/touch.min.js', complete: function()
			{
				FastClick.attach(document.body);
			}});
		}

		// Add Webplate class
		web_id_add($html_element, 'web-html');

		// Add webplate overlay
		var $webplate_overlay 				= document.createElement('div');
		web_id_add($webplate_overlay, 'web-overlay');
		$body_element.appendChild($webplate_overlay);

		// Call Webplate functions
		web_navigation();
		web_window_type();
		web_scroll();

		// Load the config file
		$config_json 						= load_json($config_file, function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				var $json 					= JSON.parse(this.responseText);

				// Variables
				$url_data 					= web_get_url();

				// Root config
				$state 							= $json.project['state'] || 'production';
				$body_class						= $json.project['body-class'] || false;
				$component 						= $json.project['component'] || [];
				$form_colour 					= $json.project['form-colour'] || 'blue';
				$icon_font 						= $json.project['icon-font'] || false;
				$navigation 					= $json.project['navigation'] || false;
				$project_css 					= $json.project['css'] || [];
				$project_js 					= $json.project['js'] || [];
				$ui 							= $json.project['ui'] || false;

				// Url base
				$url_site 						= $url_data['site_path'];
				$url_check 						= false;
				$url_page_check 				= false;

				if(($root == '') || ($root.substr(0, 3) == '../'))
				{
					$ex_root 					= $root.split('/');
					$ex_url 					= $url_site.split('/');
					$url_base					= '';

					// Pop based on the root
					for($i = 0; $i < $ex_root.length; $i++)
					{
						$ex_url.pop();
					};

					// Build new URL
					for($i = 0; $i < $ex_url.length; $i++)
					{
						$url_base 			+= $ex_url[$i] + '/';
					};
				}
				else
				{
					$url_base 					= $root;
				}

				// Url segments
				$url_segments 					= [];
				$ex_segments 					= $url_site.replace($url_base, '').split('/');
				for($i = 0; $i < $ex_segments.length; $i++)
				{
					var $val 					= $ex_segments[$i];
					if(web_exists($ex_segments[$val]))
					{
						$url_segments.push($val);
					}
				}

				// Page check
				if($json.project.page)
				{
					for($i = 0; $i < $json.project.page.length; $i++)
					{
						// Variables
						$page 						= $json.project.page[$i];

						// Url page
						$url_page_segments 			= [];
						$ex_page_segments 			= $page['url'].split('/');
						$page_match 				= true;

						// Add to the segments object
						for($i = 0; $i < $ex_page_segments.length; $i++)
						{
							var $val 				= $ex_page_segments[$i];
							if(web_exists($val))
							{
								$url_page_segments.push($val);
							}
						}

						// Wildcard check
						if($page['url'].indexOf('*') == -1)
						{
							$url_page_segments_length 	= $url_page_segments.length;
						}
						else
						{
							$url_page_segments_length 	= $url_page_segments.length - 1;
						}

						// Perform the page match
						if($url_segments.length >= $url_page_segments_length)
						{
							for($i = 0; $i < $url_segments.length; $i++)
							{
								var $val 			= $url_segments[$i];

								if(($url_page_segments[$i] === '*'))
								{
									return false;
								}
								else
								{
									if($val != $url_page_segments[$i])
									{
										$page_match 	= false;
									}
								}
							};
						}
						else
						{
							$page_match 				= false;
						}

						// Apply the config
						if($page_match === true)
						{
							// Page overwrite
							$page_overwrite 			= $page.overwrite || false;

							if($page_overwrite === true)
							{
								// Overwrites
								$body_class						= $page['body-class'] || $body_class;
								$component 						= $page['component'] || $component;
								$form_colour 					= $page['form-colour'] || $form_colour;
								$icon_font 						= $page['icon-font'] || $icon_font;
								$navivation 					= $page['navigation'] || false;
								$project_css 					= $page['css'] || $project_css;
								$project_js 					= $page['js'] || $project_js;
								$ui 							= $page['ui'] || $ui;
							}
							else
							{
								// Basic additions (some have to be overwritten by design)
								$body_class 					= $body_class + ' ' + $page['body-class'];
								$form_colour 					= $form_colour + ' ' + $page['form-colour'];
								$icon_font 						= $page['icon-font'] || $icon_font;
								$navivation 					= $page['navigation'] || $navigation;
								$ui 							= $page['ui'] || $ui;

								// Component add
								if($page['component'])
								{
									for($i = 0; $i < $page['component'].length; $i++)
									{
										var $add_component 		= $page['component'][$i];

										if($component.indexOf($add_component) == -1)
										{
											$component.push($add_component);
										}
									};
								}

								// Project CSS
								if($page['css'])
								{
									for($i; $i < $page['css'].length; $i++)
									{
										var $add_project_css 	= $page['css'][$i];
										if($project_css.indexOf($add_project_css) == -1)
										{
											$project_css.push($add_project_css);
										}
									};
								}

								// Project JS
								if($page['js'])
								{
									for($i = 0; $i < $page['js'].length; $i++)
									{
										var $add_project_js 	= $page['js'][$i];
										if($project_js.indexOf($add_project_js) == -1)
										{
											$project_js.push($add_project_js);
										}
									};
								}
							}

							// Break loop
							return false;
						}
					};
				}

				// Set the body class
				if($body_class != false)
				{
					$body_element.setAttribute('class', $body_class);
				}

				// Set the navigation type
				if($navigation === false)
				{
					$navigation 			= 'web-nav-slide-from-left';
				}	
				else
				{
					$navigation 			= 'web-nav-' + $navigation;
				}
				web_class_add($html_element, $navigation);

				// Set the form colour
				$body_element.setAttribute('data-formplate-colour', $form_colour);

				// Icon fonts
				if($icon_font != false)
				{
					if($icon_font == 'icomoon')
					{
						yepnope({ load: [$icon_font_path + 'icomoon/style.css'] });
					}
					else if($icon_font == 'font-awesome')
					{
						yepnope({ load: [$icon_font_path + 'font-awesome/css/font-awesome.min.css'] });
					}
				}

				// Load UI
				if($ui != false)
				{
					$ar_extra_css.push($ui_project_path + $ui + '/style.css');
					$ar_extra_js.push($ui_project_path + $ui + '/script.min.js');
				}

				// Load the components & project files
				$component_length 			= $component.length;
				if($component_length > 0)
				{
					for($i = 0; $i < $component_length; $i++)
					{
						// Get Webplate config
						(function($i_2)
						{
							var $val 					= $component[$i_2++];

							$component_json 			= load_json($component_path + $val + '/.bower.json', function()
							{
								if(this.readyState == 4 && this.status == 200)
								{
									var $json 		= JSON.parse(this.responseText);

									if(typeof $json.main == 'object')
									{
										for($i = 0; $i < $json.main.length; $i++)
										{
											$ar_component_files.push($component_path + $val + '/' + $json.main[$i]);
										}
									}
									else
									{
										$ar_component_files.push($component_path + $val + '/' + $json.main);
									}

									// Load the project file
									if($i_2 == $component_length)
									{
										yepnope({ load: $ar_component_files, complete: function()
										{
											load_project_files($project_css, $project_js);
										}});
									}
								}
							});
						}($i));
					};
				}
				else
				{
					load_project_files($project_css, $project_js);
				}
			}
		});
	}
}]);