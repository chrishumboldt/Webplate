/**
 * jQuery File: 	penplate.js
 * Type:			plugin
 * Author:        	Chris Humboldt
 * Last Edited:   	6 May 2014
 */


// Plugin
(function($){

	var $penplate							= function()
	{	
		// Setup
		// ---------------------------------------------------------------------------------------
		var $object 						= this;
		var $this_penplate;
		var $window_type;
		var $window_w 						= $(window).width();
		var $controls_template 				= '';
		var $ar_controls;
		var $saved_selection;
		var $obj_data_tags 					= {b: 'text-bold', i: 'text-italic', u: 'text-underline', blockquote: 'format-blockquote', a: 'custom-link'};
		var $current_nodes 					= [];
		var $webplate_check 				= false;
		

		// Settings
		// ---------------------------------------------------------------------------------------
		$object.settings 					= 
		{
			breakpoint						: '700',
			heading_1_tag 					: 'h3',
			heading_2_tag 					: 'h4',
			controls 						: ['bold', 'italics', 'underline', 'heading_1', 'heading_2', 'quote', 'link']
		};
		

		// Initialize
		// ---------------------------------------------------------------------------------------
		$object.init 						= function($element, settings)
		{	
			// Check if the settings are being edited via the call
			$object.settings 				= $.extend($object.settings, settings);

			// Some variables
			$this_penplate					= $element;
			$this_penplate_content 			= jQuery.trim($this_penplate.html());

			// Webplate check
			$check_webplate					= $('.webplate:first');
			if(($check_webplate) && ($check_webplate.length > 0))
			{
				$webplate_check				= true;
			}

			// Setup
			$object.add_controls();
			if($this_penplate.find('p:first').length < 1)
			{
				$this_penplate.html('<p>'+ $this_penplate_content +'</p>');
			}
			$this_penplate.attr({ 'contenteditable' : 'true' });
			document.execCommand('defaultParagraphSeparator', false, 'p');
			$obj_data_tags[$object.settings.heading_1_tag] 		= 'format-' + $object.settings.heading_1_tag;
			$obj_data_tags[$object.settings.heading_2_tag] 		= 'format-' + $object.settings.heading_2_tag;

			// Window type
			$object.window_type();
			$(window).resize(function()
			{
				$object.window_type();
			});

			// Penplate functions
			$object.new_paragraph();
			$object.window_resize();
			$object.activate_controls($this_penplate);
			$object.link_control();
		}
		

		// Functions
		// ---------------------------------------------------------------------------------------
		// Add controls
		$object.add_controls					= function()
		{
			// Create the controls template
			$ar_controls 					= 
			{
				'bold' 						: '<li><a href="#" data-pen-edit="text-bold">B</a></li>',
				'italics' 					: '<li><a href="#" data-pen-edit="text-italic">I</a></li>',
				'underline'					: '<li><a href="#" data-pen-edit="text-underline">U</a></li>',
				'heading_1'					: '<li><a href="#" data-pen-edit="format-'+ $object.settings.heading_1_tag +'">H1</a></li>',
				'heading_2'					: '<li><a href="#" data-pen-edit="format-'+ $object.settings.heading_2_tag +'">H2</a></li>',
				'quote' 					: '<li><a href="#" data-pen-edit="format-blockquote" class="img-quote">Quote</a></li>',
				'link'						: '<li><a href="#" data-pen-edit="custom-link" class="img-link">Link</a></li>',
				'image' 					: '<li><a href="#" data-pen-edit="custom-image" class="img-image">Image</a></li>'
			};

			$controls_template 				+= '<div class="penplate-controls">';

				// Set the link input
				$controls_template 			+= '<div class="penplate-link">';

					$controls_template 		+= '<div class="input-container"><input type="text" value="" placeholder="Your link..." /></div>';
					$controls_template 		+= '<a href="#" data-pen-edit="custom-link-cancel" class="link-cancel">Cancel</a>';

				$controls_template 			+= '</div>';

				// Set the ul opening tag
				$controls_template 			+= '<ul>';

				// Set each control
				$.each($object.settings.controls, function($key, $value)
				{
					$controls_template 		+= $ar_controls[$value];
				});

			$controls_template += '</ul></div>';

			// Check is the controls already exists
			if($('.penplate-controls:first').length == 0)
			{
				$('body').append($controls_template);

				// Append the controls
				if($webplate_check == false)
				{
					$('body').append($controls_template);
				}
				else 
				{
					$('.webplate .webplate-content').append($controls_template);
				}

				// Class controls
				$('.penplate-controls:last').addClass('penplate-small');
				$('.penplate-controls:first').addClass('penplate-large');

				// Call edit function
				$object.edit_selection();
			}
		}

		// Window type
		$object.window_type					= function()
		{
			if($(window).width() <= $object.settings.breakpoint)
			{
				// Set the type variable
				$('html').addClass('penplate-small-view');
				$('html').removeClass('penplate-large-view');
				$window_type 				= 'small-view';

				// Reset the controls position
				$object.reset_position();
			}
			else
			{
				// Set the type variable
				$('html').removeClass('penplate-small-view');
				$('html').addClass('penplate-large-view');
				$window_type 				= 'large-view';
			}

			// Set the window width
			$window_w 						= $(window).width();
		}

		// Reset the controls position
		$object.reset_position				= function()
		{
			$('.penplate-controls.penplate-large').css({ top: '-100px', left: '0' });
		}

		// Activate controls
		$object.activate_controls			= function($this_penplate)
		{
			// Show
			$this_penplate.on('mouseup', function()
			{
				$object.check_selection();
			});
			$this_penplate.on('keyup', function()
			{
				$object.check_selection();
			});

			// Hide
			$('html').on('click', function($e)
			{
				// Some variables
				var $target 				= $($e.target);
				var $target_check 			= $target.parents('.penplate-controls').length;

				// Hide the menu under condition
				if($target_check == false)
				{
					$object.hide_controls();
				}
				$(window).resize(function()
				{
					$object.hide_controls();
				});
			});
		}

		// Restore selection
	    $object.restore_selection			= function($saved_selection)
	    {
	        if($saved_selection)
	        {
	            $selection.removeAllRanges();

	            for(i = 0, len = $saved_selection.length; i < len; i += 1)
	            {
	                $selection.addRange($saved_selection[i]);
	            }
	        }
	    }

		// Check selection
		$object.check_selection 			= function()
		{
			// Check if selection is empty
			$selection 						= window.getSelection();
			$range 							= $selection.getRangeAt(0);
			$range_start 					= $range.startOffset;
			$range_end 						= $range.endOffset;
			$is_range 						= false;
			$parent_node					= null;
            $current_nodes 					= [];

			// Get parent node
			$parent_node 					= $object.get_parent_node($range);

			// Loop through parent nodes
			while($parent_node.tagName != undefined)
			{
				// Tag name
				$tag_name 					= $parent_node.tagName.toLowerCase();

				// Add to current nodes array
				$current_nodes.push($tag_name);

				// Check for root paragraph node
				if($tag_name != 'p')
				{
					// Set the active button states
					$('.penplate-controls [data-pen-edit="'+ $obj_data_tags[$tag_name] +'"]').addClass('active');

					// Set the new parent node
					$parent_node 				= $parent_node.parentNode;

					// Break if root node is heading as well
					if($tag_name.substring(0, 1) == 'h')
					{
						break;
					}
				}
				else
				{
					break;
				}
			}

			// Save selection
			$object.save_selection();

			// Set if selection is a range
			if(($range_end - $range_start) != 0)
			{
				$is_range 					= true;
			}

			// Only show if range
			if($is_range == true)
			{
				// Show the controls
				$object.show_controls();
			}
		}

		// Save selection
		$object.save_selection 				= function()
		{	
			if($selection)
			{
		        $selection 					= window.getSelection();
		        if($selection.getRangeAt && $selection.rangeCount) 
		        {
		            var $ranges 			= [];
		            for (var i = 0, len = $selection.rangeCount; i < len; ++i) 
		            {
		                $ranges.push($selection.getRangeAt(i));
		            }
		            $saved_selection		= $ranges;
		        }
		    }
		    else if(document.selection && document.selection.createRange)
		    {
		        $saved_selection			= document.selection.createRange();
		    }
		}

		// Check range
		// From Tim Down - http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
		$object.range_check					= function($range) 
		{
		    var $start_node 				= $range.startContainer;
		    return $start_node === $range.endContainer &&
		           $start_node.hasChildNodes() &&
		           $range.endOffset === $range.startOffset + 1;
		}

		// Show controls
		$object.show_controls 				= function()
		{
			// Position control		
			$object.set_control_position();

			// Show the controls
			if($('html').hasClass('show-penplate-controls') == false)
			{	
				// Attach class to HTML
				$('html').addClass('show-penplate-controls');
			}

			$('.penplate-controls').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function()
			{
				if($('html').hasClass('show-penplate-controls') == true)
				{
					$('html').addClass('penplate-controls-open');
				}
			});
		}

		// Hide controls
		$object.hide_controls 				= function()
		{
			// Remove class on HTML 
			if($('html').hasClass('show-penplate-controls'))
			{
				if($('html').hasClass('penplate-controls-open'))
				{
					// Edit HTML classes
					$('html').removeClass('show-penplate-controls').removeClass('penplate-controls-open');

					// Remove active buttons
					$('.penplate-controls a.active').removeClass('active');

					// Hide the input
					$object.link_input_hide();

					// Reposition controls
					$('.penplate-controls.penplate-large').css({ top: '-100px' });
				}
			}
		}

		// Set controls position
		$object.set_control_position 		= function()
		{
			if($window_type == 'large-view')
			{
				// Some variables
				$window
				$control_w 						= $('.penplate-controls.penplate-large').outerWidth();
				$control_h 						= $('.penplate-controls.penplate-large').height();
	   			$selection 						= window.getSelection();
	   			$range 							= $selection.getRangeAt(0);
	   			$boundary						= $range.getBoundingClientRect();
	   			$boundary_center 				= ($boundary.left + $boundary.right) / 2;

				// Some variables
				$offset_left 					= $boundary_center - ($control_w / 2);
				if($webplate_check == false)
				{
					$offset_top					= $boundary.top + window.pageYOffset - ($control_h + 12);
				}
				else
				{
					$offset_top					= $boundary.top + $('.webplate .webplate-content').scrollTop() - ($control_h + 12);
				}

				// Contain within the page
				if($offset_left < 0)
				{
					$offset_left 				= 0;
				}
				else if(($offset_left + $control_w) > $window_w)
				{
					$offset_left 				= $window_w - $control_w;
				}

				// Set the position
				$('.penplate-controls.penplate-large').css({ left: $offset_left, top: $offset_top });
			}
        }

		// Edit current selection
		$object.edit_selection				= function()
		{
			$('.penplate-controls a').on('click', function($e)
			{
				// Prevent default link action
				$e.preventDefault();

				// Some variables
				$this 						= $(this);
				$pen_edit					= $this.data('pen-edit');
				$ex_pen_edit				= $pen_edit.split('-');
				$pen_edit_type 				= $ex_pen_edit[0];
				$pen_edit_action 			= $ex_pen_edit[1];

				// Add active state
				if($this.hasClass('active') == true)
				{
					$this.removeClass('active');
				}
				else
				{
					$this.addClass('active');
				}

				// Text actions
				if($pen_edit_type == 'text')
				{
					// Appy the action
					document.execCommand($pen_edit_action);
				}
				// Format blocks
				else if($pen_edit_type == 'format')
				{
					// Get parent tag type
					$parent_tag_type 		= $object.get_parent_tag_type();

					// Apply the format
					if($parent_tag_type != $pen_edit_action)
					{
						// Super parent
						$super_parent 	= window.getSelection().anchorNode.parentElement.parentElement.nodeName.toLowerCase();

						// Block quote check - Firefox issue with parent tag being p within blockquote
						if($pen_edit_action == 'blockquote')
						{
			                document.execCommand('outdent', false, null);

			                if($super_parent != 'blockquote')
			                {
								document.execCommand('formatBlock', false, $pen_edit_action);
							}
			            }
			            else
			            {
				            document.execCommand('formatBlock', false, $pen_edit_action);
			            }
					}
					else
					{
						document.execCommand('formatBlock', false, 'p');
					}
				}

				// Save selection
				$object.save_selection();

				// Reposition controls if need be
				setTimeout(function()
		    	{
					$object.set_control_position();
		    	},
		    	1);
			});

			$('.penplate-controls .penplate-link input').on('keyup', function($e)
			{
                if($e.keyCode === 13) 
                {
                	// Prevent default action
                    $e.preventDefault();

                    // Some variables
                    $link_input_val 	= $(this).val();

                    // Create the link on the selection
                    $object.restore_selection($saved_selection);
                    document.execCommand('createLink', false, $link_input_val);


					// Some variables
					$parent						= $(this).parents('.penplate-controls');
					if($parent.hasClass('penplate-large') == true)
					{
						$parent_type 			= 'penplate-large';
					}
					else
					{
						$parent_type 			= 'penplate-small';	
					}

					// Hide link input
					$object.link_input_hide($parent_type);
					$('.penplate-controls.'+ $parent_type +' a.img-link').addClass('active');

                    // Reset link input
                    $(this).val('');
                }
            });
		}

		// Get parent node
		$object.get_parent_node 			= function($range)
		{
			// Check range
			$check_range 					= $object.range_check($range);

			// Parent node
			if($check_range)
			{
			    // Selection encompasses a single element
			    $parent_node 				= $range.startContainer.childNodes[$range.startOffset];
			} 
			else if($range.startContainer.nodeType === 3)
			{
			    // Selection range startContainers inside a text node, so get its parent
			    $parent_node 				= $range.startContainer.parentNode;
			} 
			else 
			{
			    // Selection starts inside an element
			    $parent_node 				= $range.startContainer;
			}

			// Return
			return $parent_node;	
		}

		// Get parent tag type
		$object.get_parent_tag_type 		= function()
		{
			// Some variables
			$crt_selection 					= window.getSelection();

			// Return parent tag type
			return $crt_selection.anchorNode.parentElement.nodeName.toLowerCase();
		}

		// New paragraph
		$object.new_paragraph 				= function()
		{
			$this_penplate.on('keypress', function($e)
			{
			    if($e.keyCode == '13')
			    {
			    	setTimeout(function()
			    	{
			    		document.execCommand('formatBlock', false, 'p');
			    	},
			    	10);
			    }
			});
		}

		// Window resize
		$object.window_resize				= function()
		{
			$(window).on('resize', function()
			{
				$object.window_type();
			});
		}

		// Link control
		$object.link_control 				= function()
		{
			// Activate
			$('.penplate-controls a.img-link').on('click', function($e)
			{
				// Some variables
				$is_link 					= false;
				$parent						= $(this).parents('.penplate-controls');
				if($parent.hasClass('penplate-large') == true)
				{
					$parent_type 			= 'penplate-large';
				}
				else
				{
					$parent_type 			= 'penplate-small';	
				}

				// Check in array
				$.each($current_nodes, function($key, $val)
				{
					if($val == 'a')
					{
						$is_link 			= true;
					}
				});

				// Show link input
				if($is_link == true)
				{
                	document.execCommand('unlink', false, null);
                	$object.remove_current_node('a');
                	$object.save_selection();
                }
                else
				{
					$object.link_input_show($parent_type);				
				}
			});

			// Cancel
			$('.penplate-controls .link-cancel').on('click', function($e)
			{
				// Prevent default action
				$e.preventDefault();

				// Some variables
				$parent						= $(this).parents('.penplate-controls');
				if($parent.hasClass('penplate-large') == true)
				{
					$parent_type 			= 'penplate-large';
				}
				else
				{
					$parent_type 			= 'penplate-small';	
				}

				// Hide link input
				$object.link_input_hide($parent_type);

				// Restore selection
				$object.restore_selection($saved_selection);
			});
		}

		// Remove current node
		$object.remove_current_node 		= function($node)
		{
			// Some variables
			$node_index 					= $current_nodes.indexOf($node);

			// Splice
			if($node_index > -1)
			{
			    $current_nodes.splice($node_index, 1);
			}
		}

		// Show / hide link input
		$object.link_input_show				= function($parent_type)
		{
			$('.penplate-controls.'+ $parent_type +' ul').hide();
			$('.penplate-controls.'+ $parent_type +' .penplate-link').fadeIn('fast', function()
			{
				$('.penplate-controls.'+ $parent_type +' .penplate-link input').focus();
			});
		}
		$object.link_input_hide 			= function($parent_type)
		{
			// Edit DOM
			$('.penplate-controls.'+ $parent_type +' ul').fadeIn();
			$('.penplate-controls.'+ $parent_type +' .penplate-link').hide();
			$('.penplate-controls.'+ $parent_type +' a.img-link').removeClass('active');
		}
	};
	
	// Call the plugin
	$.fn.penplate							= function($options)
	{	
		var $len 							= this.length;

		return this.each(function(index)
		{	
			var $me 						= $(this), $key = 'penplate' + ($len > 1 ? '-' + ++index : ''), $instance = (new $penplate).init($me, $options);
			$me.data($key, $instance).data('key', $key);
		});
	};
	
}(jQuery));