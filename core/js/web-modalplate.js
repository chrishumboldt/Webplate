/**
 * jQuery File: 	modalplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	4 July 2014
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $plugin_name					= 'modalplate', $defaults =
	{
		overlay_template 				: '<div class="modalplate-overlay"></div>',
		reveal 							: 'slide-from-top'
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
			var $this 					= this;
			var $this_modal_trigger		= $(this.element);
			var $modal_id 				= $this_modal_trigger.data('modal-open');
			var $this_modal 			= $('[data-modal-id='+ $modal_id +']');

			// Setup
			$this.overlay_add();
			$this_modal.addClass($this.settings.reveal);

			// Execute
			$this_modal_trigger.on('click', function($ev)
			{
				$ev.preventDefault();
				$this.modal_reveal($this_modal);
			});

			$('.modalplate-overlay, .modalplate .close').on('click', function($ev)
			{
				$ev.preventDefault();
				$this.modal_close($this_modal);
			});
		},

		// Public functions
		// ---------------------------------------------------------------------------------------
		// Close the modal
		modal_close 					: function($this_modal)
		{
			$this_modal.removeClass('reveal');
			$('html').removeClass('modalplate-reveal');
		},
		// Reveal the modal
		modal_reveal					: function($this_modal)
		{
			$this_modal.addClass('reveal');
			$('html').addClass('modalplate-reveal');
		},
		// Add an overlay
		overlay_add 					: function()
		{
			if($('.modalplate-overlay').length == false)
			{
				$('body').append(this.settings.overlay_template);
			}
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