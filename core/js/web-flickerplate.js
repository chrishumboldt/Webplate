/**
 * jQuery File: 	flickerplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	28 September 2014
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $plugin_name					= 'flickerplate', $defaults =
	{
		arrows							: true,
		arrows_constraint				: false,
		auto_flick						: true,
		auto_flick_delay				: 10,
		block_text						: true,
		dot_alignment					: 'center',
		dot_navigation					: true,
		flick_animation					: 'transition-slide',
		flick_position 					: 1,
		theme							: 'light'
	};
	
	// The actual plugin constructor
	function Plugin($element, $options) 
	{
		this.element 					= $element;
		this.settings 					= $.extend({}, $defaults, $options);
		this._defaults 					= $defaults;
		this._name 						= $plugin_name;

		// Initilize plugin
		this.init();
	}
	
	// Plugin
	// ---------------------------------------------------------------------------------------
	Plugin.prototype 					= 
	{
		init 							: function()
		{
			// Variables
			// ---------------------------------------------------------------------------------------
			var $this 					= this;
			var $settings 				= $this.settings;
			var $flicker 				= $($this.element);

			var $auto_flick;
			var $dot_count				= 0;
			var $fade_speed 			= 800;
			var $flick_count 			= 0;
			var $flicker_moving			= false;

			var $last_pos_x_left 		= 0;
			var $last_pos_x_percent		= 0;
			var $pan_css				= 'translate3d(0, 0, 0)';
			var $pan_threshold 			= 100;


			// Change settings
			// ---------------------------------------------------------------------------------------
			if($flicker.data('arrows') != undefined)
			{
				$settings.arrows 				= $flicker.data('arrows');
			}
			if($flicker.data('arrows-constraint') != undefined)
			{
				$settings.arrows_constraint		= $flicker.data('arrows-constraint');
			}
			if($flicker.data('auto-flick-delay') != undefined)
			{
				$settings.auto_flick_delay		= $flicker.data('auto-flick-delay') * 1000;
			}
			else
			{
				$settings.auto_flick_delay 		= $settings.auto_flick_delay * 1000
			}
			if($flicker.data('block-text') != undefined)
			{
				$settings.block_text 			= $flicker.data('block-text');
			}
			$settings.dot_alignment				= $flicker.data('dot-alignment') || $settings.dot_alignment;
			if($flicker.data('dot-navigation') != undefined)
			{
				$settings.dot_navigation 		= $flicker.data('dot-navigation');
			}
			$settings.fade_speed 				= $fade_speed;
			$settings.flick_animation			= $flicker.data('flick-animation') || $settings.flick_animation;
			$settings.flick_position			= $flicker.data('flick-position') || $settings.flick_position;
			$settings.theme						= $flicker.find('li:eq(0)').data('theme') || $flicker.data('theme') || $settings.theme;


			// Execute
			// ---------------------------------------------------------------------------------------
			fc_basic_setup();

			fc_attach_arrows();
			fc_attach_dot_navigation();
			fc_auto_flick_start();
			fc_hammer_flick();


			// Functions
			// ---------------------------------------------------------------------------------------
			// Basic setup
			function fc_basic_setup()
			{
				// Add classes
				$flicker.addClass('flickerplate');
				$flicker.find('ul:first').addClass('flicks');

				// Animation type
				$flicker.addClass('animate-' + $settings.flick_animation);

				// Theme
				$flicker.addClass('flicker-theme-' + $settings.theme);

				// Set the flick position
				$flicker.attr('data-flick-position', $settings.flick_position);
				fc_move_flicker();

				// Each flick
				$flicker.find('ul.flicks > li').each(function()
				{
					// Increase count
					$flick_count++;

					// Wrap each li
					$(this).wrapInner('<div class="flick-inner"><div class="flick-content"></div></div>');

					// Block text
					$flick_block_text				= $(this).data('block-text');
					if($flick_block_text != undefined)
					{
						if($flick_block_text == true)
						{
							$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
							$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
						}
					}
					else if($settings.block_text == true)
					{
						$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
						$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
					}
			
					// Set any backgrounds
					$background						= $(this).data('background');
					if($background != undefined)
					{
						$(this).css('background-image', 'url(' + $background + ')');
					} 
				});

				// Kill the animation	
				if($settings.flick_animation != 'scroller-slide' && $settings.flick_animation != 'jquery-slide' && $settings.flick_animation != 'jquery-fade')
				{
					$flicker.find('ul.flicks').bind("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", function()
					{
						$flicker_moving 		= false;
					});
				}
			};

			// Attach arrows
			function fc_attach_arrows()
			{
				if(($settings.flick_animation != 'scroller-slide') && ($settings.arrows == true))
				{
					// The HTML
					$arrow_nav_html				= '<div class="arrow-navigation left"></div>';
					$arrow_nav_html				+= '<div class="arrow-navigation right"></div>';

					// Attach the HTML
					$flicker.prepend($arrow_nav_html);

					// Actions
					$flicker.find('.arrow-navigation').on('click', function()
					{
						// Check which arrow was clicked
						if($(this).hasClass('right'))
						{	
							if(++$settings.flick_position > $flick_count)
							{
								$settings.flick_position	= $settings.arrows_constraint ? ($flick_count) : 1;
							}
						}
						else
						{	
							if(--$settings.flick_position < 1)
							{
								$settings.flick_position	= $settings.arrows_constraint ? 1 : ($flick_count);
							}
						}
					
						// Move flicker
						fc_move_flicker();
						fc_auto_flick_reset();
					});
				}
			};

			// Attach dot navigation
			function fc_attach_dot_navigation()
			{
				if(($settings.flick_animation != 'scroller-slide') && ($settings.dot_navigation == true))
				{
					// The HTML
					$dot_nav_html				= '<div class="dot-navigation '+ $settings.dot_alignment +'"><ul>';
					while($dot_count < $flick_count) 
					{
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

					// Actions
					$flicker.find('.dot-navigation li').on('click', function()
					{
						$settings.flick_position 	= $(this).index() + 1;

						// Invoke the movement
						fc_move_flicker();
						fc_auto_flick_reset();
					});
				}
			};

			// Auto flick
			function fc_auto_flick_start()
			{
				if($settings.auto_flick == true)
				{
					$auto_flick			= setInterval(fc_auto_flick, $settings.auto_flick_delay);
				}
			};
			function fc_auto_flick()
			{
				// Check the position
				if(++$settings.flick_position > $flick_count) {
					
					$settings.flick_position		= 1;
				}
				
				// Move flicker
				fc_move_flicker();
			};
			function fc_auto_flick_stop()
			{
				if($settings.auto_flick == true)
				{
					$auto_flick			= clearInterval($auto_flick);
				}
			};
			function fc_auto_flick_reset()
			{
				fc_auto_flick_stop();
				fc_auto_flick_start();
			};

			// Hammer flick
			function fc_hammer_flick()
			{
				// Check the animation types
				if($settings.flick_animation == 'transform-slide' 
				|| $settings.flick_animation == 'transition-slide'
				|| $settings.flick_animation == 'jquery-slide')
				{
					// Interaction
					$flicker.find('ul.flicks').hammer()
					.on('panleft panright', function($ev){ fc_interaction_pan($ev) })
					.on('panend', function($ev){ fc_interaction_panend($ev) });
				}
				else if($settings.flick_animation == 'transition-fade'
				|| $settings.flick_animation == 'jquery-fade')
				{
					$flicker.find('ul.flicks').hammer()
					.on('swipeleft swiperight', function($ev){ fc_interaction_swipe($ev) });
				}
			};
			function fc_interaction_pan($ev)
			{
				// Stop auto flick
				fc_auto_flick_stop();

				// Variables
				$flicker_width 		= $flicker.width();

				// Calculate drag
				switch($settings.flick_animation)
				{
					// Transform slide
					case 'transform-slide':

						// Calculate the drag
						if(Modernizr.touch)
						{
							$pos_x 			= (Math.round(($ev.gesture.deltaX / $flicker_width) * 1000) / 1000) + $last_pos_x_percent;
						}
						else
						{
							$pos_x 			= (Math.round(($ev.gesture.deltaX / $flicker_width) * 10) / 10) + $last_pos_x_percent;
						}

						// Check contraints
						if($settings.flick_position == 1 && $pos_x > 0)
						{
							$pos_x 			= 0;
						}
						else if(($settings.flick_position == $flick_count) && ($pos_x < -($flick_count - 1)))
						{
							$pos_x 			= -($flick_count - 1);
						}

						// Apply CSS
						$pan_css			= 'translate3d('+ $pos_x +'%, 0, 0)';
						$flicker.find('ul.flicks').css(
						{
							wekitTransform 	: $pan_css,
							transform 		: $pan_css
						});

						break;

					// Transition slide
					case 'transition-slide':
					case 'jquery-slide':

						// Calculate the drag
						$pos_x 				= Math.round(($ev.gesture.deltaX / $flicker_width) * 100) + $last_pos_x_left;

						// Check contraints
						if($settings.flick_position == 1 && $pos_x > 0)
						{
							$pos_x 			= 0;
						}
						else if(($settings.flick_position == $flick_count) && ($pos_x < -(($flick_count - 1) * 100)))
						{
							$pos_x 			= -(($flick_count - 1) * 100);
						}

						// Apply CSS
						$flicker.find('ul.flicks').attr({ style: 'left:'+ $pos_x +'%;' });

						break;
				}
			};
			function fc_interaction_panend($ev)
			{
				$end_pos_x 			= $ev.gesture.deltaX;

				// Checks
				if($end_pos_x < -$pan_threshold)
				{
					if($settings.flick_position < $flick_count)
					{
						$settings.flick_position++;
					}
				}
				else if($end_pos_x > $pan_threshold)
				{
					if($settings.flick_position > 1)
					{
						$settings.flick_position--;
					}
				}

				// Move the flicker
				setTimeout(function(){ fc_move_flicker(); }, 10);

				// Start auto flick
				fc_auto_flick_start();
			};
			function fc_interaction_swipe($ev)
			{
				if($ev.type == 'swipeleft')
				{
					if(++$settings.flick_position > $flick_count)
					{
						$settings.flick_position	= $settings.arrows_constraint ? ($flick_count) : 1;
					}
				}
				else if($ev.type == 'swiperight')
				{
					if(--$settings.flick_position < 1)
					{
						$settings.flick_position	= $settings.arrows_constraint ? 1 : ($flick_count);
					}
				}

				fc_move_flicker();
				fc_auto_flick_reset();
			};

			// Move flicker
			function fc_move_flicker()
			{
				// Set the position
				$position 							= $settings.flick_position - 1;

				// Moved based on animation type
				switch($settings.flick_animation)
				{
					// Transform slide
					case 'transform-slide':

						$flicker.find('ul.flicks').attr({ style: '-webkit-transform:translate3d(-'+ $position +'%, 0, 0);-o-transform:translate3d(-'+ $position +'%, 0, 0);-moz-transform:translate3d(-'+ $position +'%, 0, 0);transform:translate3d(-'+ $position +'%, 0, 0)' });
						$last_pos_x_percent 		= -($position);

						break;

					// Transition slide
					case 'transition-slide':

						$flicker.find('ul.flicks').attr({ style: 'left:-'+ $position +'00%;' });
						$last_pos_x_left 			= -($position + '00');

						break;

					// jQuery slide
					case 'jquery-slide':

						$flicker.find('ul.flicks').animate({ 'left' : '-'+ $position +'00%' }, function()
						{
							$flicker_moving 			= false;
						});
						$last_pos_x_left 			= -($position + '00');

						break;

					// Transition fade
					case 'transition-fade':

						$pre_position 						= parseInt($flicker.attr("data-flick-position")) - 1;

						if($pre_position === $position)
						{
							$flicker.find('ul.flicks li:eq(' + $pre_position + ')').css('opacity', 0);
							$flicker.find('ul.flicks li:eq(' + $position + ')').css('opacity', 1);

							setTimeout(function()
							{
								$flicker.addClass('fade-inited');
							},
							10);
						}
						else 
						{
							$flicker.find('ul.flicks li:eq(' + $pre_position + ')').css('opacity', 0);
							$flicker.find('ul.flicks li:eq(' + $position + ')').css('opacity', 1);
						}

						break;

					// jQuery fade
					case 'jquery-fade':

						$pre_position 						= parseInt($flicker.attr("data-flick-position")) - 1;

						if($pre_position === $position)
						{
							$flicker.find('ul.flicks li:gt(' + $pre_position + ')').css("display", "none");
						} 
						else 
						{
							$flicker.find('ul.flicks li:eq(' + $pre_position + ')').animate(
							{
								opacity: 0
							},
							$settings.fade_speed, function()
							{
								$(this).css("display", "none");
							});
						}
						$flicker.find('ul.flicks li:eq(' + $position + ')').css("display", "").animate(
						{
							opacity: 1
						},
						$settings.fade_speed);

						break;

					// Fallback
					default:

						$flicker.find('ul.flicks').attr({ style: '-webkit-transform:translate3d(-'+ $position +'%, 0, 0);-o-transform:translate3d(-'+ $position +'%, 0, 0);-moz-transform:translate3d(-'+ $position +'%, 0, 0);transform:translate3d(-'+ $position +'%, 0, 0)' });
				}

				// Change the theme
				$flick_theme 				= $flicker.find('ul.flicks li:eq('+ $position +')').data('theme');
				if($flick_theme != undefined)
				{
					$flicker
					.removeClass('flicker-theme-light')
					.removeClass('flicker-theme-dark')
					.addClass('flicker-theme-' + $flick_theme);
				}
				else
				{
					$flicker
					.removeClass('flicker-theme-light')
					.removeClass('flicker-theme-dark')
					.addClass('flicker-theme-' + $settings.theme);
				}

				// Update navigation
				$flicker.find('.dot-navigation .dot.active').removeClass('active');
				$flicker.find('.dot:eq('+ $position +')').addClass('active');
				$flicker.attr('data-flick-position', $settings.flick_position);
			};
		}
	};


	// Plugin wrapper
	// ---------------------------------------------------------------------------------------
	$.fn[$plugin_name] 					= function($options)
	{
		var $plugin;

		this.each(function()
		{
			$plugin 					= $.data(this, 'plugin_' + $plugin_name);

			if(!$plugin)
			{
				$plugin 				= new Plugin(this, $options);
				$.data(this, 'plugin_' + $plugin_name, $plugin);
			}
		});

		return $plugin;
	};
})(jQuery, window, document);