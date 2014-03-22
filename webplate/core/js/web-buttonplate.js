/**
 * jQuery File: 	buttonplate.js
 * Type: 			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	22 March 2014
 */


// Plugin
(function($){

	var $buttonplate						= function(){
		
		// ------------------------------------------------ SETUP
		var $object 						= this;
		var $btn_width						= 0;
		var $this_button					= false;
		

		// ------------------------------------------------ SETTINGS
		$object.settings 					= {};
		

		// ------------------------------------------------ INITIALIZE
		$object.init 						= function($element, settings){
			
			// Check if the settings are being edited via the call
			$object.settings 				= $.extend($object.settings, settings);
			
			// Some variables
			$this_button					= $element;
			
			// Close any drop downs
			$('html').on('click', function(){
				
				$('.button-drop-down-open').removeClass('button-drop-down-open').find('ul').hide();
			});
			
			// Set list options / Show list function
			if($this_button.find('ul').length > 0){

				$this_button.addClass('button-drop-down');
				
				$(window).resize(function(){
				
					$object.size_drop_down();
				});
				$object.show_drop_down();
			}
		}
		

		// ------------------------------------------------ FUNCTIONS
		// Show drop-down
		$object.show_drop_down				= function(){
			
			$this_button.on('click', function(){
				
				$object.size_drop_down();
				$this_button.find('ul').fadeIn('fast', function(){
					
					$this_button.addClass('button-drop-down-open');
				});
			});
		}
		
		// Size drop-down
		$object.size_drop_down				= function(){
			
			$btn_width					= $this_button.outerWidth();
			$this_button.find('ul').width($btn_width);
		}
	};
	
	// Call the plugin
	$.fn.buttonplate						= function($options){
		
		var len = this.length;

		return this.each(function(index) {
			
			var me = $(this), key = 'buttonplate' + (len > 1 ? '-' + ++index : ''), instance = (new $buttonplate).init(me, $options);
			me.data(key, instance).data('key', key);
		});
	};
	
}(jQuery));