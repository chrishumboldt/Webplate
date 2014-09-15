/**
 * jQuery File: 	script.js
 * Type: 			execute
 * Author:        	Chris Humboldt
 * Last Edited:   	14 September 2014
 */


$(document).ready(function()
{
// ------------------------------------------------ Variables

	var $window_h 						= $(window).height();
	var $scroll_top 					= $(this).scrollTop();


// ------------------------------------------------ Functions

	// Header adjustment
	function fc_header_adjustment()
	{
		$window_h						= Math.ceil($(window).height()) + 1;
		$scroll_down_top 				= $window_h - 100;

		$('header.full').height($window_h);
		$('header.full .scroll-down').css({ marginTop: $scroll_down_top })
	}

	// Scroll
	function fc_scroll()
	{
		// Scroll setup
		if($scroll_top > 5)
		{
			$('.webplate a.navigation-trigger').addClass('scroll-position');
		}
		else
		{
			$('.webplate a.navigation-trigger').removeClass('scroll-position');	
		}

		// On scroll event
		$(window).on('scroll', function($ev)
		{
			// Variables
			$scroll_top 			= $(this).scrollTop();

			// Background scroll
			if(Modernizr.touch === false)
			{
				// Sets the current scroll position
				var $new_position 			= 'translate3d(0px, ' + ($scroll_top / 3) + 'px, 0px)';

				$('header .bg-image').css(
				{ 
					'-webkit-transform' 	: $new_position,
					'-o-transform' 			: $new_position,
					'-moz-transform' 		: $new_position,
					'transform' 			: $new_position
				});
			}

			// Navigation trigger
			if($scroll_top > 5)
			{
				$('.webplate a.navigation-trigger').addClass('scroll-position');
			}
			else
			{
				$('.webplate a.navigation-trigger').removeClass('scroll-position');	
			}
		});
	}

	// Window resize
	function fc_window_resize()
	{
		$(window).resize(function()
		{	
			fc_header_adjustment();
		});
	}


// ------------------------------------------------ Execute

	fc_header_adjustment();

	fc_scroll();

	fc_window_resize();


});