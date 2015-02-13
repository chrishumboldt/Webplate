/**
 * jQuery File: 	modalplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	17 September 2014
 */


// Plugin
;(function($, window, document, undefined)
{
	// Plugin setup & settings
	var $plugin_name					= 'modalplate', $defaults =
	{
		overlay_template 				: '<div class="modalplate-overlay"></div>',
		reveal 							: 'slide-from-top',
		reveal_large					: false,
		trigger_max 					: false,
		trigger_min 					: false
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
	Plugin.prototype 						= 
	{
		init 								: function()
		{
			// Variables
			var $this 						= this;
			var $modal_reference			= '.' + this.element.className;
			var $this_modal_trigger			= $($modal_reference + '-trigger');
			var $modal_id 					= $this_modal_trigger.data('modal-open');
			var $this_modal 				= $('[data-modal-id='+ $modal_id +']');
			var $data_modal_reveal			= $this_modal.data('modal-reveal');
			var $data_modal_reveal_large	= $this_modal.data('modal-reveal-large');
			var $data_modal_trigger_max		= $this_modal.data('modal-trigger-max');
			var $data_modal_trigger_min		= $this_modal.data('modal-trigger-min');
			var $window_w 					= $(window).width();

			// Setup
			$($modal_reference).addClass('modalplate');
			$this.overlay_add();
			$this.settings.reveal			= $data_modal_reveal || $this.settings.reveal;
			$this.settings.reveal_large		= $data_modal_reveal_large || $this.settings.reveal_large;
			$this.settings.trigger_max		= $data_modal_trigger_max || $this.settings.trigger_max;
			$this.settings.trigger_min		= $data_modal_trigger_min || $this.settings.trigger_min;

			// Reveals
			fc_set_modal_reveal();
			if($this.settings.reveal_large != false)
			{
				$(window).resize(function()
				{
					fc_set_modal_reveal();
				});
			}

			// Execute
			$this_modal_trigger.on('click', function($ev)
			{
				// Check the trigger max / min
				if($this.settings.trigger_max != false)
				{
					$window_w 				= $(window).width();

					if($window_w < $this.settings.trigger_max)
					{
						$ev.preventDefault();
						$this.modal_reveal($this_modal);
					}
				}
				else if($this.settings.trigger_min != false)
				{
					$window_w 				= $(window).width();

					if($window_w >= $this.settings.trigger_min)
					{
						$ev.preventDefault();
						$this.modal_reveal($this_modal);
					}
				}
				else
				{
					$ev.preventDefault();
					$this.modal_reveal($this_modal);
				}
			});

			$('.modalplate-overlay, .modalplate .close').on('click', function($ev)
			{
				$ev.preventDefault();
				$this.modal_close($this_modal);
			});

			// Functions
			function fc_set_modal_reveal()
			{
				if($this.settings.reveal_large != false)
				{
					$window_w 				= $(window).width();

					if($window_w <= 700)
					{
						$this_modal.removeClass($this.settings.reveal_large);
						$this_modal.addClass($this.settings.reveal);
					}
					else
					{
						$this_modal.removeClass($this.settings.reveal);
						$this_modal.addClass($this.settings.reveal_large);
					}
				}
				else
				{
					$this_modal.addClass($this.settings.reveal);
				}
			};
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