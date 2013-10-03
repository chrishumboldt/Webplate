/**
 * flicker.js
 *
 * Author:        Chris Humboldt
 * Last Edited:   3 October 2013
 * Edited By:   	Chris Humboldt
 */

(function($){

	var $flicker 					= function(){
		
		var $object 				= this;

		//  Set some options
		$object.settings 			= {
			block_text				: true,
			inner_width				: false,
			theme						: 'light',
			movement_type			: 'slide'
		};

		// Initilize
		$object.init = function($element, settings){
			
			// Check if the settings are being edited via the call
			$object.settings = $.extend($object.settings, settings);
			
			// Some variables
			var $flicker						= $element;
			var $flick_count					= 0;
			var $dot_count						= 0;
			var $flick_position				= 1;
		
			// Set some classes
			$flicker.find('ul:first').addClass('flicks');
			$flicker.find('li:first').addClass('first-flick');
			
			// Animation type
			var $flick_animation				= $flicker.data('flick-animation');
			if(($flick_animation) && ($flick_animation.length > 0)){
				
				if(($flick_animation == 'slide')){
					
					$object.settings.block_text = false;
				}
			}
			
			// Get theme
			var $theme				= $flicker.data('theme');
			if(($theme) && ($theme.length > 0)){
				
				$flicker.addClass('flicker-theme-' + $theme);
			}
			else{
				
				$flicker.addClass('flicker-theme-' + $object.settings.theme);
			}
			
			// Block text test
			var $block_text							= $flicker.data('block-text');
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
		
			// Set the dimensions
			var $flicker_outer_width		= 100 * $flick_count;
			var $flick_width					= 100 / $flick_count;
		
			$flicker.find('ul').css({ width: $flicker_outer_width + '%' });
			$flicker.find('li').css({ width: $flick_width + '%' });
			
			// Create navigation dots
			$dot_nav_html	= '<div class="dot-navigation"><ul>';
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
				
				// Get the index
				alert($(this).index());
			});
		}

	};
	
	$.fn.flicker = function($options) {
		
		var len = this.length;

		//  Enable multiple-slider support
		return this.each(function(index) {
			
			//  Cache a copy of $(this), so it
			var me = $(this), key = 'flicker' + (len > 1 ? '-' + ++index : ''), instance = (new $flicker).init(me, $options);

			//  Invoke an Unslider instance
			me.data(key, instance).data('key', key);
		});
	};
	
}(jQuery));