/**
 * jQuery File:     tools.js
 * Type:            tools
 * Author:          Chris Humboldt
 * Last Edited:     7 April 2015
 */


// Table of contents
// ---------------------------------------------------------------------------------------
// Basic checks
// Dates
// Development
// DOM
// Forms
// Objects
// Strings
// URL
// Webplate


// Basic checks
// ---------------------------------------------------------------------------------------
var web_exists						= function($element)
{
	if($element == null || typeof($element) == 'undefined')
	{
		return false;
	}
	else
	{
		return true;
	}
};

var web_has_white_space				= function($check)
{
	return /\s/.test($check);
};

var web_is_color					= function($color)
{
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
};

var web_is_date						= function($date)
{
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};

var web_is_email					= function($email)
{
	return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
};

var web_is_ext						= function($file, $ar_allowed_types)
{
	var $allowed_types              = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

	var $file_ext                   = $file.split('.').pop().toLowerCase();

	return $allowed_types[$file_ext];
};

var web_is_full_integer				= function($int)
{
	return /^[0-9]+$/.test($int);
};

var web_is_image					= function($file, $ar_allowed_types)
{
	var $allowed_types              = $ar_allowed_types || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];

	var $file_ext                   = $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};

var web_is_integer 					= function($int)
{
	return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
};

var web_is_password					= function($password)
{
	return /^[A-Za-z0-9]{6,}$/.test($password);
};


// Dates
// ---------------------------------------------------------------------------------------
var web_crt_db_date					= function()
{
	var $now                        = new Date();
	return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
};


// Development
// ---------------------------------------------------------------------------------------
var web_add_event 					= function(elem, type, eventHandle)
{
	// Check element
    if(elem == null || typeof(elem) == 'undefined') return;

    if(elem.addEventListener)
    {
        elem.addEventListener(type, eventHandle, false);
    }
    else if(elem.attachEvent)
    {
        elem.attachEvent("on" + type, eventHandle);
    } 
    else
    {
        elem["on" + type] 			= eventHandle;
    }
};
var web_class_add 					= function($selector, $class) 
{
	var $crt_class 					= $selector.getAttribute('class');

	// Set the class
	$selector.setAttribute('class', $crt_class + ' ' + $class);
};

var web_class_remove				= function($selector, $class) 
{
	// Remove the class
	var $new_class 					= $selector.className.replace($class + ' ', '');
	$new_class 						= $new_class.replace(' ' + $class, '');
	$new_class 						= $new_class.replace($class, '');
	$selector.className 			= $new_class;
};

var web_has_class 					= function($element, $class)
{
    return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
};

var web_id_add 						= function($selector, $id) 
{
	// Set the id
	$selector.setAttribute('id', $id);
};

var web_log							= function($text)
{
	if(window.console)
	{
		console.log($text);
	}
};


// DOM
// ---------------------------------------------------------------------------------------
var web_square 						= function($selector, $multiplier)
{
	// Variables
	var $elements 					= document.querySelectorAll($selector);
	if(typeof($multiplier) === 'undefined')
	{
		$multiplier 				= 1;
	}

	// Loop through elements
	for(var $i = 0; $i < $elements.length; $i++)
	{
		// Width
		var $square_dim 			= Math.floor($elements[$i].offsetWidth * $multiplier);

		// Set the dimensions
		$elements[$i].style.height 	= $square_dim + 'px';
	}
};

var web_wallpaper					= function($selector) 
{
	// Variables
	var $elements 					= document.querySelectorAll($selector);

	// Loop through elements
	for(var $i = 0; $i < $elements.length; $i++)
	{
		// Variables
		var $this_wallpaper 		= $elements[$i].getAttribute('data-wallpaper');

		// Set the dimensions
		if($this_wallpaper !== null)
		{
			$elements[$i].style.backgroundImage 	= 'url("' + $this_wallpaper + '")';	
		}
	}
};


// Forms
// ---------------------------------------------------------------------------------------
var web_lock_submit					= function($selector)
{
	var $elements 					= document.querySelectorAll($selector);

	for($i = 0; $i < $elements.length; $i++)
	{
		$elements[$i].onclick 		= function($ev)
		{
			if($ev.keyCode == 13)
			{
				return false;
			}
		};
	}
};


// Objects
// ---------------------------------------------------------------------------------------
// As per Leon Revill
// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
web_search_objects					= function($obj, $key, $val)
{
	var $objects 					= [];

	for(var $i in $obj)
	{
		if(typeof $obj[$i] == 'object')
		{
			objects = objects.concat(searchObjects($obj[$i], $key, $val));
		} 
		else if($i == $key && $obj[$key] == $val)
		{
			objects.push($obj);
		}
	}

	return objects;
};


// Strings
// ---------------------------------------------------------------------------------------
var web_get_ext					= function($file)
{
	return $file.split('.').pop().toLowerCase();
};

var web_random_string			= function($string_length)
{
	var $chars					= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	var $len 					= $string_length || 5;
	var $random_string			= '';

	for(var i = 0; i < $len; i++)
	{
		$r_num 					= Math.floor(Math.random() * $chars.length);
		$random_string 			+= $chars[$r_num];
	}

	return $random_string;
};

var web_uc_all					= function($string)
{
	return $string.toUpperCase();
};

var web_uc_first				= function($string)
{
	return $string.charAt(0).toUpperCase() + $string.slice(1);
};


// URL
// ---------------------------------------------------------------------------------------
var web_get_url 					= function()
{
	var $window_location            = window.location;
	var $full_path                  = $window_location.href;
	var $ar_path                    = $window_location.href.split('/');
	var $hash_split                 = $window_location.href.split('#');
	var $protocol                   = $ar_path[0];
	var $host                       = $ar_path[2];
	var $base_url                   = $protocol + '//' + $host;
	var $hash_url                   = $window_location.hash.substring(1);
	var $site_path                  = $hash_split[0];
	var $ar_return                  = [];
	
	// Set the return array
	$ar_return['hash']              = $hash_url;
	$ar_return['host']              = $host;
	$ar_return['base_url']          = $base_url;
	$ar_return['site_path']         = $site_path;
	$ar_return['full_path']         = $full_path;
	
	// Return
	return $ar_return;
}


// Webplate
// ---------------------------------------------------------------------------------------
// Variables
var $body_element 					= document.getElementsByTagName('body')[0];
var $html_element 					= document.getElementsByTagName('html')[0];
var $nav_end_position               = 0;
var $navigation_width;
var $nav_track_position;
var $navigation 					= document.getElementById('navigation');
var $navigation_trigger 			= document.getElementById('navigation-trigger');

var web_nav_hide					= function()
{
	var $web_navigation 			= document.getElementById('web-navigation');

	Velocity($web_navigation,
	{ 
		left 						: 0
	}, 
	{
		duration					: 200,
		easing						: 'ease-out',
		complete					: function()
		{
			web_class_remove($html_element, 'web-nav-shown');
			web_class_add($html_element, 'web-nav-hidden');
		}
	});
	
	// Set nav end position
	$nav_end_position				= 0;

	// Hide overlay
	web_overlay_hide();
};

var web_nav_show					= function()
{
	// Variables
	var $web_navigation 			= document.getElementById('web-navigation');
	var $navigation_width 			= $web_navigation.offsetWidth;

	Velocity($web_navigation,
	{ 
		left                    	: $navigation_width
	}, 
	{
		duration               		: 200,
		easing                  	: 'ease-out',
		complete                	: function()
		{
			web_class_add($html_element, 'web-nav-shown');
			web_class_remove($html_element, 'web-nav-hidden');
		}
	});

	// Set nav end position
	$nav_end_position               = 260;

	// Show overlay
	web_overlay_show();
};

var web_navigation					= function()
{
	// Check
	if(web_exists($navigation))
	{
		// Variables
		var $navigation_clone 			= $navigation.cloneNode(true);

		// Duplicate navigation & change class name
		$navigation_clone.setAttribute('id', 'web-navigation');
		$body_element.appendChild($navigation_clone);

		// On click
		$navigation_trigger.onclick 	= function($ev)
		{
			$ev.preventDefault();

			// Check state
			if(web_has_class($html_element, 'web-nav-shown'))
			{
				web_nav_hide();
			}
			else
			{
				web_nav_show();
			}
		};
		
		// Close nav again
		var $web_overlay 				= document.getElementById('web-overlay');
		var $web_navigation 			= document.getElementById('web-navigation');
		var $web_navigation_links 		= $web_navigation.getElementsByTagName('a');

		$web_overlay.onclick 			= function()
		{
			web_nav_hide();
		};

		for($i = 0; $i < $web_navigation_links.length; $i++)
		{
			$web_navigation_links[$i].onclick 		= function($ev)
			{
				web_nav_hide();
			};
		};
	}
};

var web_overlay_hide 					= function()
{
	var $web_overlay 					= document.getElementById('web-overlay');

	Velocity($web_overlay,
	{
		opacity         : 0
	}, 
	{ 
		display         : 'none',
		duration        : 200
	});
};

var web_overlay_show					= function()
{
	var $web_overlay 					= document.getElementById('web-overlay');

	Velocity($web_overlay,
	{
		opacity         : 0.4
	}, 
	{ 
		display         : 'block',
		duration        : 200
	});
};

var web_scroll							= function()
{
	// Some variables
	var $doc 							= document.documentElement;
	var $last_scroll					= 0;
	var $scroll_top;

	// Setup
	web_class_add($html_element, 'web-scroll-none');

	// On scroll event
	web_add_event(window, 'scroll', function()
	{
		// Remove scroll nonw class
		if(web_has_class($html_element, 'web-scroll-none'))
		{
			web_class_remove($html_element, 'web-scroll-none');
		}

		// Sets the current scroll position
		$scroll_top 					= (window.pageYOffset || $doc.scrollTop)  - ($doc.clientTop || 0);

		// Determine direction of scroll
		if($scroll_top > $last_scroll)
		{
			if(!web_has_class($html_element, 'web-scroll-down'))
			{
				web_class_remove($html_element, 'web-scroll-up');
				web_class_add($html_element, 'web-scroll-down');
			}
		} 
		else 
		{
			if(web_has_class($html_element, 'web-scroll-down'))
			{
				web_class_remove($html_element, 'web-scroll-down');
				web_class_add($html_element, 'web-scroll-up');
			}
		}

		// Updates scroll position
		$last_scroll				= $scroll_top;
	});
}

var web_scroll_to 					= function($selector, $offset, $offset_large)
{
	// Variables
	var $elements 					= document.querySelectorAll($selector);
	var $offset 					= $offset || 0;
	var $offset_large 				= $offset_large || false;

	for($i = 0; $i < $elements.length; $i++)
	{
		$elements[$i].onclick 		= function($ev)
		{
			return function($ev)
			{
				$ev.preventDefault();

				// Check the screen size
				var $v_offset 		= $offset;
				if(($offset_large !== false) && (window.innerWidth > 700))
				{
					$v_offset 		= $offset_large;
				}
				Velocity(document.getElementById(this.getAttribute('data-scroll-to')), "scroll",
				{ 
					duration: 1200,
					easing: "easeOutCubic",
					offset: $v_offset
				});
			};
		}($i);
	}
};

var web_window_type 				= function()
{
	web_window_type_execute();
	web_add_event(window, 'resize', function()
	{
		web_window_type_execute();
	});
};

var web_window_type_execute 		= function()
{
	// Some variables
	if(window.innerWidth <= 700)
	{
		// Set the class
		if(web_has_class($html_element, 'web-view-large'))
		{
			web_class_remove($html_element, 'web-view-large');
		}
		if(web_has_class($html_element, 'web-view-small') == false)
		{
			web_class_add($html_element, 'web-view-small');
		}
	}
	else
	{
		// Set the class
		if(web_has_class($html_element, 'web-view-small'))
		{
			web_class_remove($html_element, 'web-view-small');
		}
		if(web_has_class($html_element, 'web-view-large') == false)
		{
			web_class_add($html_element, 'web-view-large');
		}
		if(web_has_class($html_element, 'web-nav-shown'))
		{
			web_nav_hide();
		}
	}
};


