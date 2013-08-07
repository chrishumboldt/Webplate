/**
 * welcome.js
 *
 * Author:        Chris Modem
 * Last Edited:   7 August 2013
 */

$(document).ready(function(){
	
// ------------------------------------------------ SOME VARIABLES

	var $window_height					= $(window).height();
	
// ------------------------------------------------ FUNCTIONS

	// Header adjustment
	function fc_header_adjustment(){
		
		// Execute
		fc_execute_header_adjustment();
		
		$(window).resize(function(){
			fc_execute_header_adjustment();
		});
	}
	
	// Header adjustment execute
	function fc_execute_header_adjustment(){
		
		// Some variables
		$window_height						= $(window).height();
		
		// Adjust header
		$('.header, .header .row.inner').height($window_height);
	}


// ------------------------------------------------ EXECUTE

	fc_header_adjustment();
	
});