/**
 * flickerplate.js
 *
 * Author:        Chris Humboldt
 * Last Edited:   7 October 2013
 * Edited By:   	Chris Humboldt
 */

(function($){

	var $flickerplate						= function(){
		
		// ----- Setup
		var $object 						= this;
		var $flick_position				= 0;
		var $flicker						= false;
		var $flicker_outer_width		= false;
		var $flick_width					= false;
		var $flick_speed					= false;
		var $flick_count					= 0;
		var $dot_count						= 0;

		// Settings
		$object.settings 					= {
			block_text						: true,
			inner_width						: false,
			theme								: 'light',
			flick_animation				: 'slide',
			auto_flick						: true,
			delay								: 10,
			dot_navigation					: true,
			dot_alignment					: 'center'
		};

		// ----- Initilize
		$object.init = function($element, settings){
			
			// Check if the settings are being edited via the call
			$object.settings = $.extend($object.settings, settings);
			
			// Some variables
			$flicker								= $element;
		
			// Set some classes
			$flicker.find('ul:first').addClass('flicks');
			$flicker.find('li:first').addClass('first-flick');
			
			// Set the flick position
			$flicker.attr('data-flick-position', $flick_position);
			
			// Animation type
			var $flick_animation				= $flicker.data('flick-animation');
			if(($flick_animation) && ($flick_animation.length > 0)){
				
				if(($flick_animation == 'slide')){
					
					$object.settings.flick_animation 	= 'slide';
				}
			}
			
			// Get theme
			var $theme							= $flicker.data('theme');
			var $first_flick_theme			= $flicker.find('.first-flick').data('theme');
			if(($theme) && ($theme.length > 0)){
				
				if(($theme) && ($theme.length > 0)){
					
					$flicker.addClass('flicker-theme-' + $first_flick_theme);
				}
				else{
					
					$flicker.addClass('flicker-theme-' + $theme);
				}
			}
			else{
				
				$flicker.addClass('flicker-theme-' + $object.settings.theme);
			}
			
			// Block text
			var $block_text					= $flicker.data('block-text');
			if(($block_text) && ($block_text.length > 0)){
				
				if($block_text == 'no'){
					
					$object.settings.block_text = false;
				}
			}
		
			// Settings for each flick
			$flicker.find('li').each(function(){
			
				// Increase the count
				$flick_count++;
				
				// Wrap each li tag
				$(this).wrapInner('<div class="flick-inner"><div class="flick-content"></div></div>');
				
				// Block text overwrite
				$flick_block_text						= $(this).data('block-text');
				if(($flick_block_text) && ($flick_block_text.length > 0)){
				
					if($flick_block_text != 'no'){
			
						$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
						$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
					}
				}
				else if($object.settings.block_text == true){
					
					$(this).find('.flick-title').wrapInner('<span class="flick-block-text"></span>');
					$(this).find('.flick-sub-text').wrapInner('<span class="flick-block-text"></span>');
				}
			
				// Set any backgrounds
				var $background				= $(this).data('background');
				if(($background) && ($background.length > 0)){
				
					$(this).css('background-image', 'url(webplate/extras/images/' + $background + ')');
				} 
			});
			
			// Create navigation dots
			$data_dot_navigation				= $flicker.data('dot-navigation');
			$data_dot_alignment				= $flicker.data('dot-alignment');
			var $dot_alignment				= $object.settings.dot_alignment;
			
			if(($data_dot_alignment) && ($data_dot_alignment.length > 0)){
				
				if($data_dot_alignment == 'left'){
				
					$dot_alignment				= 'left';
				}
				else if($data_dot_alignment == 'right'){
				
					$dot_alignment				= 'right';
				}
			}
			
			if(($data_dot_navigation) && ($data_dot_navigation.length > 0)){
				
				if($data_dot_navigation != 'no'){
				
					$object.create_dot_navigation($dot_alignment);
				}
			}
			else if($object.settings.dot_navigation == true){
				
				$object.create_dot_navigation($dot_alignment);
			}
			
			// Perform the auto flicking
			$flick_delay						= $object.settings.delay * 1000;
			$data_auto_flick					= $flicker.data('auto-flick');
			$data_auto_flick_delay			= $flicker.data('auto-flick-delay');
			
			if(($data_auto_flick_delay)){
			
				if($.web_is_integer($data_auto_flick_delay) == true){
					
					$flick_delay				= $data_auto_flick_delay * 1000;
				}
			}
			
			if(($data_auto_flick) && ($data_auto_flick.length > 0)){
				
				if($data_auto_flick != 'no'){

					$object.settings.auto_flick	= true;
				}
				else{

					$object.settings.auto_flick	= false;
				}
			}
			
			$object.auto_flick_start();
		}
		
		// ----- Create dot navigation
		$object.create_dot_navigation		= function($position){
			
			$dot_nav_html	= '<div class="dot-navigation '+ $position +'"><ul>';
			while($dot_count < $flick_count){
			
				// Increase the count
				$dot_count++;
			
				// Creat dots
				if($dot_count == 1){
				
					$dot_nav_html	+= '<li><div class="dot active"></div></li>';
				}
				else{
				
					$dot_nav_html	+= '<li><div class="dot"></div></li>';
				}
			}
			$dot_nav_html	+= '</ul></div>';

			// Attach the HTML
			$flicker.prepend($dot_nav_html);
		
			// Navigate using dots
			$flicker.find('.dot-navigation li').on('click', function(){
			
				// Invoke the movement
				$object.move_flicker($(this).index());
			
				// Reset auto flicker
				$object.auto_flick_reset();
			});
		}
		
		// ----- Start auto flicker
		$object.auto_flick_start			= function(){
			
			if($object.settings.auto_flick == true){
				
				$object.flicker_auto				= setInterval($object.auto_flick, $flick_delay);
			}
		}
		
		// ----- Auto flick
		$object.auto_flick					= function(){
			
			// Check the position
			$flick_position++;
			if($flick_position == $flick_count){
				
				$flick_position				= 0;
			}
			
			// Move flicker
			$object.move_flicker($flick_position);
		}
		
		// ----- Stop auto flicker
		$object.auto_flick_stop				= function(){
			
			$object.flicker_auto				= clearInterval($object.flicker_auto);
		}
		
		// ----- Reset auto flicker
		$object.auto_flick_reset			= function(){
				
			// First stop the auto flicker
			$object.auto_flick_stop();
			
			// Then start it again
			$object.auto_flick_start();
		}
		
		// ----- Move the flicker
		$object.move_flicker					= function($new_position){
			
			// Update flick position
			$flick_position					= $new_position;
			
			// Move based on desired animation
			if($object.settings.flick_animation == 'slide'){
				
				$flicker.find('ul.flicks').attr({ style: '-webkit-transform:translate3d(-'+ $flick_position +'%, 0, 0);-o-transform:translate3d(-'+ $flick_position +'%, 0, 0);-moz-transform:translate3d(-'+ $flick_position +'%, 0, 0);transform:translate3d(-'+ $flick_position +'%, 0, 0)' });
			}
			
			// Update the theme
			$crt_flick							= $flicker.find('ul.flicks li:eq('+ $flick_position +')');
			$flick_theme						= $crt_flick.data('theme');
			$flicker.removeClass('flicker-theme-light').removeClass('flicker-theme-dark');
			if(($flick_theme) && ($flick_theme.length > 0)){
				
				$flicker.addClass('flicker-theme-' + $flick_theme);
			}
			else {
				
				$flicker.addClass('flicker-theme-' + $object.settings.theme);
			}
			
			// Update the navigation
			$flicker.find('.dot-navigation .dot.active').removeClass('active');
			$flicker.find('.dot:eq('+ $flick_position +')').addClass('active');
			$flicker.attr('data-flick-position', $flick_position);
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