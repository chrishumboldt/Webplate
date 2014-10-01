/**
 * jQuery File: 	buttonplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	1 October 2014
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $plugin_name					= 'buttonplate', $defaults =
	{
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
			var $button 				= $($this.element);


			// Execute
			// ---------------------------------------------------------------------------------------
			fc_button_setup();


			// Functions
			// ---------------------------------------------------------------------------------------
			// Button drop size
			function fc_button_setup()
			{
				if($button.find('ul').length > 0)
				{
					$button.addClass('button-drop-down');
				}
			};
		}
	};


	// Global calls
	// ---------------------------------------------------------------------------------------
	// On click show
	$(document).on('click', '.button-drop-down', function()
	{
		var $button 					= $(this);
		var $button_w					= $button.outerWidth();

		// Show drop down
		$button.find('ul').width($button_w).fadeIn('fast', function()
		{	
			$button.addClass('button-drop-down-open');
		});
	});

	// Close drop-downs
	$(document).on('click', function(){
		
		$('.button-drop-down-open').removeClass('button-drop-down-open').find('ul').hide();
	});

	// On resize
	$(window).resize(function()
	{
		$('.button-drop-down-open').removeClass('button-drop-down-open').find('ul').hide();
	});


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