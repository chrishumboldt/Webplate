/**
 * jQuery File: 	web-tools.js
 * Type: 			tools
 * Author:        	Chris Humboldt
 * Last Edited:   	23 March 2014
 */


// Lock an element from enter key.
// ---------------------------------------------------------------------------------------
jQuery.web_lock_submit 				= function($element)
{
	$($element).live('keypress', function($e)
	{
		if($e.keyCode == 13)
		{	  
			return false;
		}
	});
};


// Check that something exists.
// ---------------------------------------------------------------------------------------
jQuery.web_exists 					= function($element)
{
	return (($element) && ($element.length > 0));
};


// Get the file extension.
// ---------------------------------------------------------------------------------------
jQuery.web_get_ext 					= function($file)
{
	return $file.split('.').pop().toLowerCase();
};


// Get the current time in database format.
// ---------------------------------------------------------------------------------------
jQuery.web_crt_db_date 				= function()
{
	var $now		 			    = new Date();
	return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
};


// Check that something is in a database date format.
// ---------------------------------------------------------------------------------------
jQuery.web_check_date 				= function($date)
{
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};


// Check that a string is an integer, including decimals.
// ---------------------------------------------------------------------------------------
jQuery.web_is_integer 				= function($int)
{
	return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
};


// Check that a string is a full integer, not including decimals.
// ---------------------------------------------------------------------------------------
jQuery.web_is_full_integer 			= function($int)
{
	return /^[0-9]+$/.test($int);
};


// Check for white space.
// ---------------------------------------------------------------------------------------
jQuery.web_has_white_space 			= function($check)
{
	return /\s/.test($check);
};


// Check that the extension is allowed.
// ---------------------------------------------------------------------------------------
jQuery.web_check_ext 				= function($file, $ar_allowed_types)
{
	var $allowed_types			    = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

	var $file_ext					= $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};


// Input mirror.
// ---------------------------------------------------------------------------------------
jQuery.web_input_mirror 			= function($input, $output)
{
	$($selector).keyup(function()
	{
		var $ref_input					= $(this).val();
		var $ref_value					= $ref_input.replace(/ /g,"_").toLowerCase();

		// Output the mirror
		$($output).text($ref_value);
	});
};


// Check that the string is an email address.
// ---------------------------------------------------------------------------------------
jQuery.web_is_email 				= function($email)
{
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
};


// Check that the string is a password.
// ---------------------------------------------------------------------------------------
jQuery.web_is_password 				= function($password)
{
	return /^[A-Za-z0-9]{6,}$/.test($password);
};


// Check that a string has an image extension.
// ---------------------------------------------------------------------------------------
jQuery.web_is_image 				= function($file, $ar_allowed_types)
{
	var $allowed_types	    		= $ar_allowed_types || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];

	var $file_ext					= $file.split('.').pop().toLowerCase();

	return (jQuery.inArray($file_ext, $allowed_types) != -1);
};


// Check that a string is a hex colour code.
// ---------------------------------------------------------------------------------------
jQuery.web_is_color 				= function($color)
{
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
};


// Create a random string.
// ---------------------------------------------------------------------------------------
jQuery.web_random_string 			= function($string_length)
{
	var $chars 						= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

	var $len                        = $string_length || 5;
	var $random_string 				= '';

	for(var i = 0; i < $len; i++)
	{
		$r_num 						= Math.floor(Math.random() * $chars.length);
		$random_string 				+= $chars[$r_num];
	}

	return $random_string;
};


// Log something in the console.
// ---------------------------------------------------------------------------------------
jQuery.web_log 						= function($text)
{
	if(window.console)
	{
		console.log($text);
	}
};


// Set the Webplate navigation.
// ---------------------------------------------------------------------------------------
jQuery.web_navigation 				= function(){

	// Duplicate navigation
	$('.webplate-shifter').prepend($('.navigation').clone().addClass('webplate-navigation').removeClass('navigation'));
	$('.webplate-navigation').wrapInner('<div class="navigation-inner" />');

	// On click
	$('.navigation-trigger').on('click', function($e)
	{
		// $e.preventDefault();

		if($('html').hasClass('show-nav'))
		{
			$('html').removeClass('show-nav').addClass('hide-nav');
			StatusBar.styleDefault();
		}
		else
		{
			$('html').addClass('show-nav').removeClass('hide-nav');
			StatusBar.styleLightContent();
		}
	});
	
	// Close nav again
	$('.webplate-content').on('click', function($e)
	{
		if($('html').hasClass('nav-open'))
		{
			$('html').removeClass('show-nav').removeClass('nav-open').addClass('hide-nav');
		}
	});

	// Show on mobile
	if($('.navigation-trigger').hasClass('small-show') == false)
	{
	   $('.navigation-trigger').addClass('small-show');
	}

	// Change active state and close menu
	$('.webplate-navigation a').on('click', function()
	{
		$('.webplate-navigation a.active').removeClass('active');
		$(this).addClass('active');
		$('html').removeClass('show-nav').addClass('hide-nav');
	});

	if(Modernizr.touch)
	{
		$('.webplate-content').on('drag', function()
		{
			if($('html').hasClass('show-nav'))
			{
				$('html').removeClass('show-nav').addClass('hide-nav');
			}
		});
	}
	else{
		$('.webplate-content').on('scroll', function()
		{
			if($('html').hasClass('show-nav'))
			{
				$('html').removeClass('show-nav').addClass('hide-nav');
			}
		});
	}

	// Change position type / add nav open class
	$('html.no-touch.show-nav').removeClass('show-nav').addClass('hide-nav');
	$('.webplate-shifter').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function()
	{
		if($('html').hasClass('show-nav') == true)
		{		
			$('html').addClass('nav-open');
		}
		else
		{	
			$('html').removeClass('nav-open');
		}
	});
	
	// Prevent scroll on page open
	$(document).on('touchmove',function($e)
	{
		if($('html').hasClass('show-nav'))
		{
			$e.preventDefault();
		}
	});
	$('body').on('touchstart','.webplate-navigation',function($e)
	{
		if($e.currentTarget.scrollTop === 0)
		{
			$e.currentTarget.scrollTop = 1;
		}
		else if($e.currentTarget.scrollHeight === $e.currentTarget.scrollTop + $e.currentTarget.offsetHeight)
		{
			$e.currentTarget.scrollTop -= 1;
		}
	});
	$('body').on('touchmove','.webplate-navigation',function($e)
	{
		$e.stopPropagation();
	});
};


// Set the window type.
// ---------------------------------------------------------------------------------------
jQuery.web_window_type 				= function()
{
	$.web_window_type_execute();
	$(window).resize(function()
	{
		$.web_window_type_execute();
	});
};


// Window type execution.
// ---------------------------------------------------------------------------------------
jQuery.web_window_type_execute 		= function()
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
		if($('html').hasClass('show-nav'))
		{
			$('html').removeClass('show-nav').addClass('hide-nav');
		}
	}
};


// Execute Webplate forms.
// ---------------------------------------------------------------------------------------
jQuery.web_forms 					= function()
{
	// Execute forms
	$(document).ready(function()
	{
		// Some variables
		$form_colour				= '-blue';
		$data_form_colour			= $('body').data('forms-colour');
		$ar_form_colours			= ['red', 'green', 'blue', 'aero', 'grey', 'orange', 'yellow', 'pink', 'purple'];

		// Check that CSS is needed
		if(($data_form_colour) && ($data_form_colour.length > 0))
		{
			if(jQuery.inArray($data_form_colour, $ar_form_colours) > -1)
			{
				$form_colour		= '-' + $data_form_colour;
			}	
		}

		// Set the html variable
		$('html').addClass('web-forms-colour' + $form_colour);

		// Execute iCheck
		$('input').iCheck(
		{
			checkboxClass: 'icheckbox_square' + $form_colour,
			radioClass: 'iradio_square' + $form_colour,
			increaseArea: '20%',
			labelHover: true
		});

		// Wrap all selects
		$('select').wrap('<span class="drop-down"></span>');
	});
};


// Execute Webplate buttons.
// ---------------------------------------------------------------------------------------
jQuery.web_buttons 					= function()
{
	// Execute buttons
	$(document).ready(function()
	{
		$('.button').buttonplate();
	});
};


// Load Webplate plugins.
// ---------------------------------------------------------------------------------------
jQuery.web_load_plugins 			= function(js_path)
{	
	// Load plugins array
	var $ar_js_plugins				= [];
	var $check_flicker				= false;
	var $check_fastclick			= false; 

	// Flickerplate check
	var $flickerplate_check			= $('.flickerplate:first');
	if($.web_exists($flickerplate_check))
	{
		$ar_js_plugins.push($js_path + 'min/web-flickerplate.min.js');
		$check_flicker				= true;
	}

	// FastClick
	if(Modernizr.touch)
	{
		$ar_js_plugins.push($js_path + 'min/web-touch.min.js');
		$check_fastclick			= true;
	}

	// Load plugins js
	yepnope({load: $ar_js_plugins, complete: function()
	{
		// Execute the flicker
		if($check_flicker == true)
		{
			if(Modernizr.touch)
			{
				$('.flickerplate').flicker({ flick_animation: 'transform-slide' });
			}
			else
			{
				$('.flickerplate').flicker();
			}
		}

		// Activate fastclick
		if($check_fastclick == true)
		{
			FastClick.attach(document.body);
		}

	}});
}


// Set the scroll direction class.
// ---------------------------------------------------------------------------------------
jQuery.web_scroll 					= function()
{	
	// Some variables
	var $last_scroll 				= 0;

	// On scroll or drag event
	if(Modernizr.touch)
	{
		$('.webplate-content').on('drag', function($e)
		{
			if($e.orientation == 'vertical')
			{
				if($e.direction == -1)
				{
					if($('html').hasClass('scroll-down') == false)
					{
						$('html').addClass('scroll-down');
					}
				}
				else
				{
					if($('html').hasClass('scroll-down') == true)
					{
						$('html').removeClass('scroll-down');
					}
				}
			}
		});
	}
	else
	{
		$($('.webplate-content')).scroll(function($e)
		{
			// Sets the current scroll position
			$scroll_top 			= $(this).scrollTop();

			// Determine direction of scroll
			if($scroll_top > $last_scroll)
			{
				if($('html').hasClass('scroll-down') == false)
				{
					$('html').addClass('scroll-down');
				}
			} 
			else 
			{
				if($('html').hasClass('scroll-down') == true)
				{
					$('html').removeClass('scroll-down');
				}
			}

			//Updates scroll position
			$last_scroll 			= $scroll_top;
		});
	}
}


// Get the URL elements.
// ---------------------------------------------------------------------------------------
jQuery.web_get_url					= function()
{	
	var $window_location			= window.location;
	var $full_path					= $window_location.href;
	var $ar_path 					= $window_location.href.split('/');
	var $hash_split					= $window_location.href.split('#');
	var $protocol 					= $ar_path[0];
	var $host 						= $ar_path[2];
	var $base_url 					= $protocol + '//' + $host;
	var $hash_url					= $window_location.hash.substring(1);
	var $site_path					= $hash_split[0];
	var $ar_return					= [];
	
	// Set the return array
	$ar_return['hash']				= $hash_url;
	$ar_return['host']				= $host;
	$ar_return['base_url']			= $base_url;
	$ar_return['site_path']			= $site_path;
	$ar_return['full_path']			= $full_path;
	
	// Return
	return $ar_return;
}
