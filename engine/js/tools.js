/**
 * jQuery File:     tools.js
 * Type:            tools
 * Author:          Chris Humboldt
 * Last Edited:     5 April 2015
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
$.web_exists						= function($element)
{
	return (($element) && ($element.length > 0));
};

$.web_has_white_space				= function($check)
{
	return /\s/.test($check);
};

$.web_is_color						= function($color)
{
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
};

$.web_is_date						= function($date)
{
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};
// -- Depreciated -- Will soon be removed
$.web_check_date					= function($date)
{
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};
// -- Depreciated --

$.web_is_email						= function($email)
{
	return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
};

$.web_is_ext						= function($file, $ar_allowed_types)
{
	var $allowed_types              = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

	var $file_ext                   = $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};
// -- Depreciated -- Will soon be removed
$.web_check_ext						= function($file, $ar_allowed_types)
{
	var $allowed_types              = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

	var $file_ext                   = $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};
// -- Depreciated --

$.web_is_full_integer				= function($int)
{
	return /^[0-9]+$/.test($int);
};

$.web_is_image						= function($file, $ar_allowed_types)
{
	var $allowed_types              = $ar_allowed_types || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];

	var $file_ext                   = $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};

$.web_is_integer 					= function($int)
{
	return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
};

$.web_is_password					= function($password)
{
	return /^[A-Za-z0-9]{6,}$/.test($password);
};


// Dates
// ---------------------------------------------------------------------------------------
$.web_crt_db_date					= function()
{
	var $now                        = new Date();
	return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
};


// Development
// ---------------------------------------------------------------------------------------
$.web_log							= function($text)
{
	if(window.console)
	{
		console.log($text);
	}
};


// DOM
// ---------------------------------------------------------------------------------------
$.web_square						= function($selector, $multiplier)
{
	// Variables
	if(typeof($multiplier) === 'undefined')
	{
		$multiplier                 = 1;
	}

	// 
	$($selector).each(function()
	{
		// Width
		var $square_dim				= Math.floor($(this).width() * $multiplier);

		// Set the dimensions
		$(this).height($square_dim);
	});
};

$.web_wallpaper						= function($selector) 
{
	$($selector).each(function()
	{
		// Image
		var $this_wallpaper         = $(this);
		var $wallpaper_image        = $this_wallpaper.data('wallpaper');

		// Set the bacgkround image
		if ($wallpaper_image != undefined)
		{
			$this_wallpaper.addClass('wallpaper');
			$this_wallpaper.css(
			{
				'background-image': 'url(' + $wallpaper_image + ')'
			});
		}
	});
};


// Forms
// ---------------------------------------------------------------------------------------
$.web_input_mirror					= function($input, $output)
{
	$($selector).keyup(function()
	{
		var $ref_input              = $(this).val();
		var $ref_value              = $ref_input.replace(/ /g,"_").toLowerCase();

		// Output the mirror
		$($output).text($ref_value);
	});
};

$.web_lock_submit					= function($element)
{
	$($element).live('keypress', function($e)
	{
		if($e.keyCode == 13)
		{     
			return false;
		}
	});
};


// Objects
// ---------------------------------------------------------------------------------------
// As per Leon Revill
// URL: http://www.revillweb.com/tutorials/super-useful-javascript-functions/
$.web_search_objects				= function($obj, $key, $val)
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
$.web_get_ext						= function($file)
{
	return $file.split('.').pop().toLowerCase();
};

$.web_random_string					= function($string_length)
{
	var $chars                      = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	var $len                        = $string_length || 5;
	var $random_string              = '';

	for(var i = 0; i < $len; i++)
	{
		$r_num                      = Math.floor(Math.random() * $chars.length);
		$random_string              += $chars[$r_num];
	}

	return $random_string;
};

$.web_uc_all						= function($string)
{
	return $string.toUpperCase();
};

$.web_uc_first						= function($string)
{
	return $string.charAt(0).toUpperCase() + $string.slice(1);
};


// URL
// ---------------------------------------------------------------------------------------
$.web_get_url 						= function()
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
var $nav_end_position               = 0;
var $navigation_width;
var $nav_track_position;

// Hash link
$.web_hash_link 					= function()
{
	// Based on: http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*=#]:not([href=#])').click(function()
	{
		if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
		{
			var $target             = $(this.hash);
			$target                 = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
			var $selector           = $target.selector;
			var $scroll_top;

			if($target.length)
			{
				$scroll_top         = Math.ceil($($selector).offset().top);
				$(window).scrollTop($scroll_top);
				window.location     = $selector;

				return false;
			}
		}
	});
};

$.web_hash_link_setup 				= function()
{
	setTimeout(function()
	{
		var $crt_url                = $.web_get_url();
		var $crt_hash               = $crt_url['hash'];
		var $scroll_top;

		if($crt_hash.length)
		{
			$scroll_top             = Math.ceil($('#' + $crt_hash).offset().top);
			$(window).scrollTop($scroll_top);
		}
	}, 
	10);
};

$.web_nav_hide						= function()
{
	$('.web-navigation').velocity(
	{ 
		left 						: 0
	}, 
	{
		duration					: 200,
		easing						: 'ease-out',
		complete					: function()
		{
			$('html').removeClass('web-nav-shown').addClass('web-nav-hidden');
		}
	});
	
	// Set nav end position
	$nav_end_position				= 0;

	// Hide overlay
	$.web_overlay_hide();
};

$.web_nav_show						= function()
{
// alert('woot');
	// Variables
	$navigation_width               = $('.web-navigation').width();

	$('.web-navigation').velocity(
	{ 
		left                    	: $navigation_width
	}, 
	{
		duration               		: 200,
		easing                  	: 'ease-out',
		complete                	: function()
		{
			$('html').addClass('web-nav-shown').removeClass('web-nav-hidden');
		}
	});

	// Set nav end position
	$nav_end_position               = 260;

	// Show overlay
	$.web_overlay_show();
};

$.web_navigation					= function()
{
	// Duplicate navigation
	$('body').append($('.navigation').clone().addClass('web-navigation').removeClass('navigation'));
	$('.web-navigation').wrapInner('<div class="navigation-inner" />');

	// On click
	$('.navigation-trigger').on('click', function($ev)
	{
		$ev.preventDefault();

		if($('html').hasClass('web-nav-shown'))
		{
			$.web_nav_hide();
		}
		else
		{
			$.web_nav_show();
		}
	});
	
	// Close nav again
	$('.web-overlay, .web-navigation a').on('click', function($e)
	{
		if($('html').hasClass('web-nav-shown'))
		{
			$.web_nav_hide();
		}
	});

	// Show on mobile
	if($('.navigation-trigger').hasClass('small-show') == false)
	{
		$('.navigation-trigger').addClass('small-show');
	}

	$(window).on('touchstart', '.web-navigation',function($ev)
	{
		if($ev.currentTarget.scrollTop === 0)
		{
			$ev.currentTarget.scrollTop = 1;
		}
		else if($ev.currentTarget.scrollHeight === $ev.currentTarget.scrollTop + $ev.currentTarget.offsetHeight)
		{
			$ev.currentTarget.scrollTop -= 1;
		}
	});
	$(window).on('touchmove','.web-navigation',function($ev)
	{
		$ev.stopPropagation();
	});
};

$.web_overlay_hide 					= function()
{
	$('.web-overlay').velocity(
	{
		opacity         : 0
	}, 
	{ 
		display         : 'none',
		duration        : 200
	});
};

$.web_overlay_show					= function()
{
	$('.web-overlay').velocity(
	{
		opacity         : 0.4
	}, 
	{ 
		display         : 'block',
		duration        : 200
	});
};

$.web_scroll						= function()
{
	// Some variables
	var $last_scroll                = 0;

	// Setup
	$('html').addClass('web-scroll-none');

	// On scroll or drag event
	if(Modernizr.touch)
	{
		$(window).on('drag', function($e)
		{
			if($e.orientation == 'vertical')
			{
				// Remove scroll none
				if($('html').hasClass('web-scroll-none') == true)
				{
					$('html').removeClass('web-scroll-none');
				}

				// Check direction and apply class
				if($e.direction == -1)
				{
					if($('html').hasClass('web-scroll-down') == false)
					{
						$('html').addClass('web-scroll-down');
						$('html').removeClass('web-scroll-up');
					}
				}
				else
				{
					if($('html').hasClass('web-scroll-down') == true)
					{
						$('html').removeClass('web-scroll-down');
						$('html').addClass('web-scroll-up');
					}
				}
			}
		});
	}
	else
	{
		$(window).scroll(function($e)
		{
			// Remove scroll nonw class
			if($('html').hasClass('web-scroll-none') == true)
			{
				$('html').removeClass('web-scroll-none');
			}

			// Sets the current scroll position
			var $scroll_top         = $(this).scrollTop();

			// Determine direction of scroll
			if($scroll_top > $last_scroll)
			{
				if($('html').hasClass('web-scroll-down') == false)
				{
					$('html').addClass('web-scroll-down');
					$('html').removeClass('web-scroll-up');
				}
			} 
			else 
			{
				if($('html').hasClass('web-scroll-down') == true)
				{
					$('html').removeClass('web-scroll-down');
					$('html').addClass('web-scroll-up');
				}
			}

			// Updates scroll position
			$last_scroll            = $scroll_top;
		});
	}
}

$.web_scroll_to 					= function()
{
	$('.scroll-to').on('click', function($ev)
	{
		$ev.preventDefault();

		// Variables
		var $scroll_to 			= $(this).data('scroll-to');
		var $scroll_element		= $('[data-scroll-id='+ $scroll_to +']');

		// Scroll
		if($(window).width() < 700)
		{
			$scroll_element.velocity("scroll", { duration: 1200, easing: "easeOutCubic", offset: -75 });
		}
		else
		{
			$scroll_element.velocity("scroll", { duration: 1200, easing: "easeOutCubic", offset: -91 });
		}
	});	
};

$.web_window_type 					= function()
{
	$.web_window_type_execute();
	$(window).resize(function()
	{
		$.web_window_type_execute();
	});
};

$.web_window_type_execute 			= function()
{
	// Some variables
	if($(window).width() <= 700)
	{
		// Set the type variable
		$('html').addClass('web-small-view');
		$('html').removeClass('web-large-view');
	}
	else
	{
		// Set the type variable
		$('html').removeClass('web-small-view');
		$('html').addClass('web-large-view');
		if($('html').hasClass('web-show-nav'))
		{
			$.web_hide_nav();
		}
	}
};
