/**
 * flickerplate.js
 *
 * Author:        	Chris Humboldt
 * Last Edited:   	9 July 2014
 * Edited By:   	dsuket
 */

(function($){

	var $flickerplate						= function() {
		
		// ----- Setup
		var $object 						= this;
		var $flick_position					= 0;
		var $flicker						= false;
		var $flicker_outer_width			= false;
		var $flick_width					= false;
		var $flick_speed					= false;
		var $flick_count					= 0;
		var $dot_count						= 0;
		var $flicker_moving					= false;

		// Settings
		$object.settings 					= {
			arrows							: true,
			arrows_constraint				: false,
			auto_flick						: true,
			auto_flick_delay				: 10,
			block_text						: true,
			dot_navigation					: true,
			dot_alignment					: 'center',
			flick_animation					: 'transition-slide',
			flick_position 					: 1,
			inner_width						: false,
			theme							: 'light'
		};

		// ----- Initilize
		$object.init = function($element, settings) {
			
			// Check if the settings are being edited via the call
			$object.settings = $.extend($object.settings, settings);
			
			// Some variables
			$flicker							= $element;
		
			// Set some classes
			$flicker.addClass('flickerplate');
			$flicker.find('ul:first').addClass('flicks');
			$flicker.find('li:first').addClass('first-flick');
			
			// Set the flick position
			$flick_position 					= ($object.settings.flick_position - 1);
			$data_flick_position				= $flicker.data('flick-position');
			if($data_flick_position != undefined)
			{
				$flick_position 				= ($data_flick_position - 1);
			}
			$flicker.attr('data-flick-position', $flick_position);
			
			// Animation type
			var $flick_animation				= $flicker.data('flick-animation');
			$object.settings.flick_animation	= $object.settings.flick_animation || $flick_animation;
			$flicker.addClass('animate-' + $object.settings.flick_animation);
			
			// Get theme
			var $theme							= $flicker.data('theme');
			var $first_flick_theme				= $flicker.find('.first-flick').data('theme');
			if(($theme) && ($theme.length > 0)) {
				
				$object.settings.theme		= $theme;
				if(($first_flick_theme) && ($first_flick_theme.length > 0)) {
					
					$flicker.addClass('flicker-theme-' + $first_flick_theme);
				}
				else {
					
					$flicker.addClass('flicker-theme-' + $theme);
				}
			}
			else{
				
				$flicker.addClass('flicker-theme-' + $object.settings.theme);
			}
			
			// Block text
			var $block_text						= $flicker.data('block-text');
			if($block_text != undefined) {
				
				if($block_text == false) {
					
					$object.settings.block_text = false;
				}
			}
		
			// Settings for each flick
			$flicker.find('ul.flicks > li').each(function() {
			
				// Increase the count
				$flick_count++;
				
				// Wrap each li tag
				$(this).wrapInner('<div class="flick-inner"><div class="flick-content"></div></div>');
				
				// Block text overwrite
				$flick_block_text					= $(this).data('block-text');
				if($flick_block_text != undefined) {
				
					if($flick_block_text == true) {
			
						$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
						$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
					}
				}
				else if($object.settings.block_text == true) {
					
					$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
					$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
				}
			
				// Set any backgrounds
				var $background					= $(this).data('background');
				if(($background) && ($background.length > 0)) {
				
					$(this).css('background-image', 'url(' + $background + ')');
				} 
				
				// Class an theme overwrites
				$flick_theme					= $(this).data('theme');
				if(($flick_theme) && ($flick_theme.length > 0)) {
					
					$(this).addClass('flick-theme-' + $flick_theme);
				}
			});
			
			// Arrows and dot navigation
			if($object.settings.flick_animation != 'scroller-slide') {
				
				// Create arrows
				$data_arrow_navigation				= $flicker.data('arrows');
				
				if($data_arrow_navigation != undefined) {
				
					if($data_arrow_navigation != false) {
				
						$object.create_arrow_navigation();
					}
				}
				else if($object.settings.arrows == true) {
				
					$object.create_arrow_navigation();
				}
			
				// Create navigation dots
				$data_dot_navigation				= $flicker.data('dot-navigation');
				$data_dot_alignment					= $flicker.data('dot-alignment');
				var $dot_alignment					= $object.settings.dot_alignment;
			
				if($data_dot_alignment != undefined) {
				
					if($data_dot_alignment == 'left' || $data_dot_alignment == 'right') {
				
						$dot_alignment = $data_dot_alignment;
					}
				}
			
				if($data_dot_navigation != undefined) {
				
					if($data_dot_navigation != false) {
				
						$object.create_dot_navigation($dot_alignment);
					}
				}
				else if($object.settings.dot_navigation == true) {
				
					$object.create_dot_navigation($dot_alignment);
				}
			
				// Perform the auto flicking
				$flick_delay						= $object.settings.auto_flick_delay * 1000;
				$data_auto_flick					= $flicker.data('auto-flick');
				$data_auto_flick_delay				= $flicker.data('auto-flick-delay');
			
				if(($data_auto_flick_delay)) {
			
					$flick_delay					= $data_auto_flick_delay * 1000;
				}
				
				if($data_auto_flick != undefined) {

					$object.settings.auto_flick = ($data_auto_flick != false);
				}
			
				$object.auto_flick_start();
			
				// Flick the flicker
				$object.flick_flicker();
			
				// Kill the animation	
				if($object.settings.flick_animation != 'jquery-slide' &&
				   $object.settings.flick_animation != 'jquery-fade') {
					$flicker.find('ul.flicks').bind("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", function() {

						$flicker_moving 				= false;
					});
				}
			}

			// Set the flick position on load
			$object.move_flicker($flick_position);
		}
		
		// ----- Flick flicker
		$object.flick_flicker					= function() {
			
			if(Modernizr.touch){

				$flicker.on('drag', function($e) {

					if($flicker_moving == false) {
						
						if($e.orientation == 'horizontal') {
							
							$e.preventDefault();

							if($e.direction == 1) {
							
								if(--$flick_position < 0) {
				
									$flick_position	= 0;
								}
								else {
									
									$flicker_moving 	= true;
			
									// Move flicker
									$object.move_flicker($flick_position);
								}
							}
							else {
							
								if(++$flick_position == $flick_count) {
				
									$flick_position	= $flick_count - 1;
								}
								else {
									
									$flicker_moving 	= true;
			
									// Move flicker
									$object.move_flicker($flick_position);
								}
							}
						}
					}
				});
			}
		}
		
		// ----- Create arrow navigation
		$object.create_arrow_navigation			= function() {
			
			// The HTML
			$arrow_nav_html	= '<div class="arrow-navigation left"><div class="arrow"></div></div>';
			$arrow_nav_html	+= '<div class="arrow-navigation right"><div class="arrow"></div></div>';

			// Attach the HTML
			$flicker.prepend($arrow_nav_html);
			
			// Show the arrows
			$('.arrow-navigation').mouseover(function() {
				$(this).toggleClass('hover');
			});
			$('.arrow-navigation').mouseout(function() {
				$(this).toggleClass('hover');
			});

			// Check arrow constraint
			$data_arrows_constraint				= $flicker.data('arrows-constraint');
			if($data_arrows_constraint != undefined) {
				$object.settings.arrows_constraint 	= $data_arrows_constraint;
			}
			
			// Navigate using the arrows
			$flicker.find('.arrow-navigation').on('click', function()
			{	
				// Check which arrow was clicked
				if($(this).hasClass('right'))
				{	
					if(++$flick_position == $flick_count)
					{
						$flick_position	= $object.settings.arrows_constraint ? ($flick_count - 1) : 0;
					}
				}
				else
				{	
					if(--$flick_position < 0)
					{
						$flick_position	= $object.settings.arrows_constraint ? 0 : ($flick_count - 1);
					}
				}
			
				// Move flicker
				$object.move_flicker($flick_position);
			});
		}
		
		// ----- Create dot navigation
		$object.create_dot_navigation			= function($position) {
			
			$dot_nav_html	= '<div class="dot-navigation '+ $position +'"><ul>';
			while($dot_count < $flick_count) {
			
				// Increase the count
				$dot_count++;
			
				// Creat dots
				if($dot_count == 1) {
				
					$dot_nav_html	+= '<li><div class="dot active"></div></li>';
				}
				else {
				
					$dot_nav_html	+= '<li><div class="dot"></div></li>';
				}
			}
			$dot_nav_html	+= '</ul></div>';

			// Attach the HTML
			$flicker.prepend($dot_nav_html);
		
			// Navigate using dots
			$flicker.find('.dot-navigation li').on('click', function() {
			
				// Invoke the movement
				$object.move_flicker($(this).index());
			});
		}
		
		// ----- Start auto flicker
		$object.auto_flick_start				= function() {
			if($object.settings.auto_flick == true) {
				
				$object.flicker_auto				= setInterval($object.auto_flick, $flick_delay);
			}
		}
		
		// ----- Auto flick
		$object.auto_flick						= function() {
			
			// Check the position
			if(++$flick_position == $flick_count) {
				
				$flick_position				= 0;
			}
			
			// Move flicker
			$object.move_flicker($flick_position);
		}
		
		// ----- Stop auto flicker
		$object.auto_flick_stop					= function() {
			
			$object.flicker_auto				= clearInterval($object.flicker_auto);
		}
		
		// ----- Reset auto flicker
		$object.auto_flick_reset				= function() {
				
			// First stop the auto flicker
			$object.auto_flick_stop();
			
			// Then start it again
			$object.auto_flick_start();
		}
		
		// ----- Move the flicker
		$object.move_flicker					= function($new_position) {
			
			// Update flick position
			$flick_position						= $new_position;
			
			// Move based on desired animation
			if($object.settings.flick_animation == 'transform-slide') {
				
				$flicker.find('ul.flicks').attr({ style: '-webkit-transform:translate3d(-'+ $flick_position +'%, 0, 0);-o-transform:translate3d(-'+ $flick_position +'%, 0, 0);-moz-transform:translate3d(-'+ $flick_position +'%, 0, 0);transform:translate3d(-'+ $flick_position +'%, 0, 0)' });
			}
			else if($object.settings.flick_animation == 'transition-slide') {
				
				$flicker.find('ul.flicks').attr({ style: 'left:-'+ $flick_position +'00%;' });
			}
			else if($object.settings.flick_animation == 'jquery-slide') {
				
				$flicker.find('ul.flicks').animate({ 'left' : '-'+ $flick_position +'00%' }, function() {
				
					$flicker_moving 			= false;
				});
			}
            else if($object.settings.flick_animation == 'transition-fade') {
                var $pre_position = parseInt($flicker.attr("data-flick-position"), 10);
                if ($pre_position === $new_position) {
                    setTimeout(function () {
                        $flicker.addClass("fade-inited");
                    },10);
                } else {
                    $flicker.find('ul.flicks li:eq(' + $pre_position + ')').css("opacity", 0);
                    $flicker.find('ul.flicks li:eq(' + $new_position + ')').css("opacity", 1);
                }
            }
            else if($object.settings.flick_animation == 'jquery-fade') {
            	var fadeSpeed = 800;
                var $pre_position = parseInt($flicker.attr("data-flick-position"), 10);
                if ($pre_position === $new_position) {
                	// initialize
                	$flicker.find('ul.flicks li:gt(' + $pre_position + ')').css("display", "none");
                } else {
                    $flicker.find('ul.flicks li:eq(' + $pre_position + ')')
                    	.animate({opacity: 0}, fadeSpeed, function(){
                    		$(this).css("display", "none");
                    	});
                }
                $flicker.find('ul.flicks li:eq(' + $new_position + ')')
                	.css("display", "")
                	.animate({opacity: 1}, fadeSpeed);
            }

			// Flicker colour
			$crt_flick							= $flicker.find('ul.flicks li:eq('+ $flick_position +')');
			$flicker.removeClass('flicker-theme-light').removeClass('flicker-theme-dark');
			
			// Set the colour
			if($crt_flick.hasClass('flick-theme-dark')) {
				
				$flicker.addClass('flicker-theme-dark');
			}
			else if($crt_flick.hasClass('flick-theme-light')) {
				
				$flicker.addClass('flicker-theme-light');
			}
			else {
				
				$flicker.addClass('flicker-theme-' + $object.settings.theme);
			}
			
			// Update the navigation
			$flicker.find('.dot-navigation .dot.active').removeClass('active');
			$flicker.find('.dot:eq('+ $flick_position +')').addClass('active');
			$flicker.attr('data-flick-position', $flick_position);
			
			// Reset auto flicker
			$object.auto_flick_reset();
		}
	};
	
	// Call the flicker as a plugin
	$.fn.flicker = function($options) {
		
		var len = this.length;

		//  Enable multiple-slider support
		return this.each(function(index) {
			
			var me = $(this), key = 'flickerplate' + (len > 1 ? '-' + ++index : ''), instance = (new $flickerplate).init(me, $options);
			me.data(key, instance).data('key', key);
		});
	};
	
}(jQuery));
