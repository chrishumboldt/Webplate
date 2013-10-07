/**
 * tools.js
 *
 * Author:        Chris Humboldt
 * Last Edited:   3 October 2013
 * Edited By:   	Chris Humboldt
 */

// ----- LOCK A FORM FROM SUBMITTING ON ENTER
jQuery.web_lock_submit 				= function($element){

  $($element).live('keypress', function($e){

      if($e.keyCode == 13)
      {
          return false;
      }
  });
};

// ----- CHECK THAT SOMETHING EXISTS
jQuery.web_exists 					= function($element){

	if(($element) && ($element.length > 0)){

		return true;
	}
	else{

		return false;
	}
};

// ----- GET FILE EXTENSION
jQuery.web_get_extension 			= function($file){

  return $file.split('.').pop().toLowerCase();
};

// ----- CURRENT DB DATE
jQuery.web_crt_db_date 				= function(){

  $current_time 			    = new Date();
  $year						= $current_time.getFullYear();
  $month					    = $current_time.getMonth() + 1;
  if($month < 10){

      $month				    = '0' + $month;
  }
  $day						= $current_time.getDate();
  if($day < 10){

      $day					= '0' + $day;
  }
  return $year + '-' + $month + '-' + $day;
};

// ----- CHECK THAT SOMETHING IS IN A DATABAE DATE FORMAT (yyyy-mm-dd)
jQuery.web_check_date 				= function($date){

  if(($date.substr(4, 1) == '-') && ($date.substr(7, 1) == '-') && ($.scrap_is_integer($date.substr(0, 4)) == true) && ($.scrap_is_integer($date.substr(5, 2)) == true) && ($.scrap_is_integer($date.substr(8, 2)) == true) && ($date.length == 10)){

      return true;
  }
  else{

      return false;
  }
};

// ----- CHECK THAT A STRING IS A TIME FORMAT
jQuery.web_is_time 					= function($int){

  if($int != ''){

      var $valid_chars		= '0123456789.:';
      var $is_number			= true;
      var $char;

      for($i = 0; $i < $int.length && $is_number == true; $i++){

          $char = $int.charAt($i);

          if($valid_chars.indexOf($char) == -1){

              $is_number = false;
          }
      }
      return $is_number;
  }
  else{

      return false;
  }
};

// ----- CHECK THAT A STRING IS ONLY INTEGERS - INLCUDING FRACTION
jQuery.web_is_integer 				= function($int){

  if($int != ''){

      var $valid_chars		= '0123456789.';
      var $is_number			= true;
      var $char;

      for($i = 0; $i < $int.length && $is_number == true; $i++){

          $char = $int.charAt($i);

          if($valid_chars.indexOf($char) == -1){

              $is_number = false;
          }
      }
      return $is_number;
  }
  else{

      return false;
  }
};

// ----- CHECK THAT A STRING IS ONLY INTEGERS - NOT INLCUDING FRACTION
jQuery.web_is_full_integer 		= function($int){

  if($int != ''){

      var $valid_chars		= '0123456789';
      var $is_number			= true;
      var $char;

      for($i = 0; $i < $int.length && $is_number == true; $i++){

          $char = $int.charAt($i);

          if($valid_chars.indexOf($char) == -1){

              $is_number = false;
          }
      }
      return $is_number;
  }
  else{

      return false;
  }
};

// ----- CHECK FOR WHITE SPACE
jQuery.web_has_white_space 		= function($check){

  if($check.indexOf(' ') != -1){

      return true;
  }
  else{

      return false;
  }
};

// ----- CHECK THAT THE FILE IS AN ALLOWED TYPE
jQuery.web_allowed_doc 				= function($file, $ar_allowed_types){

  if($ar_allowed_types == null){

      $ar_allowed_types	= ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];
  }

  $file_ext				= $file.split('.').pop().toLowerCase();

  if(jQuery.inArray($file_ext, $ar_allowed_types) == -1){

      return false;
  }
  else{

      return true;
  }
};

// ----- INPUT MIRRORS
jQuery.web_input_mirror 			= function($input, $output){

  $($selector).keyup(function(){

      $ref_input	= $(this).val();
      $ref_value	= $ref_input.replace(/ /g,"_").toLowerCase();

      // Output the mirror
      $($output).text($ref_value);
  });
};

// ----- CHECK THAT A STRING IS AN EMAIL
jQuery.web_is_email 					= function($email){

  if(($email.indexOf('@') != -1) && ($email.indexOf('.') != -1)){

      return true;
  }
  else{

      return false;
  }
};

// ----- CHECK THAT A STRING IS A VALID PASSWORD
jQuery.web_is_password 				= function($password){

  if($password.length > 5){

      $num_check 		= /^[0-9]+$/;
      $letter_check	= /^[a-zA-Z-]+$/;

      $error			= false;

      if($password.match($num_check)){

          $error		= true;
      }

      if($password.match($letter_check)){

          $error		= true;
      }

      if($error == true){

          return false;
      }
      else{

          return true;
      }
  }
  else{

      return false;
  }
};

// ----- CHECK THAT THE FILE IS AN IMAGE
jQuery.web_is_image 					= function($file, $ar_allowed_types){

  if($ar_allowed_types == null){

      $ar_allowed_types	= ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];
  }

  $file_ext				= $file.split('.').pop().toLowerCase();

  if(jQuery.inArray($file_ext, $ar_allowed_types) == -1){

      return false;
  }
  else{

      return true;
  }
};

// ----- CHECK THAT INPUT IS A HEX CODE
jQuery.web_is_color 					= function($color){

  if($color.length == 7){

      if($color.substr(0, 1) != '#'){

          return false;
      }
  }
  else{

      return false;
  }
};

// ----- RANDOM STRING
jQuery.web_random_string 			= function($string_length){

  $chars 				= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  if($string_length == null){

      $string_length	= 5;
  }
  $random_string 		= '';

  for(var i = 0; i < $string_length; i++){

      $r_num 				= Math.floor(Math.random() * $chars.length);
      $random_string 	+= $chars.substring($r_num, $r_num+1);
  }

  return $random_string;
};

// ----- SHOW OVERLAY
jQuery.web_show_overlay 			= function(){

  $('.webplate-overlay').fadeIn();
};

// ----- REMOVE OVERLAY
jQuery.web_remove_overlay 			= function(){

  $('.webplate-overlay').fadeOut();
};

// ----- SHOW MODAL
jQuery.web_show_modal 				= function($modal_class){

  if($($modal_class).is(":hidden") == true){

      // Set the class
      if($modal_class == ''){

          $modal_class        = '.modal-basic';
      }

      // Some variables
      $modal_height           = $($modal_class).height();
      //$scroll_top             = $(window).scrollTop();

      // Adjust the DOM
      $('.webplate-overlay').fadeIn();
      $($modal_class).css({ top: -($modal_height + 50) }).show();
      $($modal_class).animate({ top: 0 }, 'fast');
  }
};

// ----- HIDE MODAL
jQuery.web_hide_modal 				= function(){

  $('.modal:visible .close').live('click', function(){

      // Reset
      //$(window).scrollTop(0);

      // Some variables
      $modal_height           = $('.modal:visible').height();
      //$scroll_top             = $('.content').offset();

      // Adjust the DOM
      $('.webplate-overlay').fadeOut();
      $('.modal:visible').animate({ top: -($modal_height + 50) }, 'fast', function(){

          $('.modal:visible').hide();
      });
  });
};

// ----- CONSOLE LOG
jQuery.web_log 						= function($text){

  if(window.console) {

      console.log($text);
  }
};

// ----- NAVIGATION
jQuery.web_navigation 				= function(){

	// Duplicate navigation
	$('.webplate-shifter').prepend($('.navigation').clone().addClass('webplate-navigation').removeClass('navigation'));
	$('.webplate-navigation').wrapInner('<div class="navigation-inner" />');

	// On click
	$('.navigation-trigger').on('click', function($e){

	 $e.preventDefault();

	   if($('html').hasClass('show-nav')){

	       $('html').removeClass('show-nav').addClass('hide-nav');
	   }
	   else{
	       $('html').addClass('show-nav').removeClass('hide-nav');
	   }
	});
	
	// Close nav again
	$('.webplate-content').on('click', function($e) {

		if($('html').hasClass('nav-open')){
			$('html').removeClass('show-nav').removeClass('nav-open').addClass('hide-nav');
		}
	});

	// Show on mobile
	if($('.navigation-trigger').hasClass('small-show') == false){

	   $('.navigation-trigger').addClass('small-show');
	}

	// Change active state and close menu
	$('.webplate-navigation a').on('click', function(){

	   $('.webplate-navigation a.active').removeClass('active');
	   $(this).addClass('active');
	   $('html').removeClass('show-nav').addClass('hide-nav');
	});

	if(Modernizr.touch){
		$('.webplate-content').on('drag', function(){

			if($('html').hasClass('show-nav')){
		       $('html').removeClass('show-nav').addClass('hide-nav');
			}
		});
	}
	else{
		$('.webplate-content').on('scroll', function(){

			if($('html').hasClass('show-nav')){
		       $('html').removeClass('show-nav').addClass('hide-nav');
			}
		});
	}

	// Change position type / add nav open class
	$('html.no-touch.show-nav').removeClass('show-nav').addClass('hide-nav');
	$('.webplate-shifter').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){

      if($('html').hasClass('show-nav') == true){
			
			$('html').addClass('nav-open');
      }
		else{
		
         $('html').removeClass('nav-open');
		}
	});
	
	// Prevent scroll on page open
	$(document).on('touchmove',function($e){

		if($('html').hasClass('show-nav')){
			$e.preventDefault();
		}
	});
	$('body').on('touchstart','.webplate-navigation',function($e){

		if($e.currentTarget.scrollTop === 0){

			$e.currentTarget.scrollTop = 1;
		}
		else if($e.currentTarget.scrollHeight === $e.currentTarget.scrollTop + $e.currentTarget.offsetHeight){
		
			$e.currentTarget.scrollTop -= 1;
		}
	});
	$('body').on('touchmove','.webplate-navigation',function($e){
	
		$e.stopPropagation();
	});
};

// ----- WINDOW TYPE
jQuery.web_window_type 				= function(){

  $.web_window_type_execute();
  $(window).resize(function(){

      $.web_window_type_execute();
  });
};

// ----- WINDOW TYPE EXECUTE
jQuery.web_window_type_execute 	= function(){

  // Some variables
  if($(window).width() <= 700){

      // Set the type variable
      $('html').addClass('web-small-view');
      $('html').removeClass('web-large-view');
  }
  else{

      // Set the type variable
      $('html').removeClass('web-small-view');
      $('html').addClass('web-large-view');
		if($('html').hasClass('show-nav')){
	       $('html').removeClass('show-nav').addClass('hide-nav');
		}
  }
};

// ----- FORMS EXECUTE
jQuery.web_forms 						= function(){

	// Execute forms
	$(document).ready(function(){

		// Some variables
		$form_colour			= '-blue';
		$data_form_colour		= $('body').data('forms-colour');
		$ar_form_colours		= ['red', 'green', 'blue', 'aero', 'grey', 'orange', 'yellow', 'pink', 'purple'];

		// Check that CSS is needed
		if(($data_form_colour) && ($data_form_colour.length > 0)){

			if(jQuery.inArray($data_form_colour, $ar_form_colours) > -1){

				$form_colour	= '-' + $data_form_colour;
			}	
		}

		// Set the html variable
		$('html').addClass('web-forms-colour' + $form_colour);

		// Execute iCheck
		$('input').iCheck({

			checkboxClass: 	'icheckbox_square' + $form_colour,
			radioClass: 		'iradio_square' + $form_colour,
			increaseArea: 		'20%',
			labelHover: 		true,
		});

		// Wrap all selects
		$('select').wrap('<span class="drop-down"></span>');
	});
};

// ----- LOAD PLUGINS
jQuery.web_load_plugins 			= function(js_path){
	
	// Load plugins array
	var $ar_js_plugins				= [];
	var $check_flicker				= false;
	var $check_fastclick				= false; 
	
	// Flickerplate check
	$flickerplate_check				= $('.webplate-flicker:first');
	if($.web_exists($flickerplate_check)){
		
		$ar_js_plugins.push($js_path + 'web-flickerplate.js');
		$check_flicker					= true;
	}

	// FastClick
	if(Modernizr.touch){
		
		$ar_js_plugins.push($js_path + 'min/web-touch.min.js');
		$check_fastclick				= true;
   }
	
	// Load plugins js
	yepnope({load: $ar_js_plugins, complete: function(){

		// Execute the flicker
		if($check_flicker == true){
			
			$('.webplate-flicker').flicker();
		}
			
		// Activate fastclick
		if($check_fastclick == true){
			
			FastClick.attach(document.body);
		}
	
	}});
}