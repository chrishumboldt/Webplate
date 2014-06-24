/**
 * jQuery File:     web-tools.js
 * Type:            tools
 * Author:          Chris Humboldt
 * Last Edited:     20 June 2014
 */


// Basic checks
// ---------------------------------------------------------------------------------------
jQuery.web_exists                   = function($element)
{
    return (($element) && ($element.length > 0));
};

jQuery.web_has_white_space          = function($check)
{
    return /\s/.test($check);
};

jQuery.web_is_color                 = function($color)
{
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
};

jQuery.web_is_date                  = function($date)
{
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};
// -- Depreciated -- Will soon be removed
jQuery.web_check_date               = function($date)
{
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
};
// -- Depreciated --

jQuery.web_is_email                 = function($email)
{
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($email);
};

jQuery.web_is_ext                   = function($file, $ar_allowed_types)
{
    var $allowed_types              = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

    var $file_ext                   = $file.split('.').pop().toLowerCase();

    return (jQuery.inArray($file_ext, $allowed_types) != -1);
};
// -- Depreciated -- Will soon be removed
jQuery.web_check_ext                = function($file, $ar_allowed_types)
{
    var $allowed_types              = $ar_allowed_types || ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'];

    var $file_ext                   = $file.split('.').pop().toLowerCase();

    return (jQuery.inArray($file_ext, $allowed_types) != -1);
};
// -- Depreciated --

jQuery.web_is_full_integer          = function($int)
{
    return /^[0-9]+$/.test($int);
};

jQuery.web_is_image                 = function($file, $ar_allowed_types)
{
    var $allowed_types              = $ar_allowed_types || ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'];

    var $file_ext                   = $file.split('.').pop().toLowerCase();

    return (jQuery.inArray($file_ext, $allowed_types) != -1);
};

jQuery.web_is_integer               = function($int)
{
    return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
};

jQuery.web_is_password              = function($password)
{
    return /^[A-Za-z0-9]{6,}$/.test($password);
};


// Dates
// ---------------------------------------------------------------------------------------
jQuery.web_crt_db_date              = function()
{
    var $now                        = new Date();
    return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
};


// Development
// ---------------------------------------------------------------------------------------
jQuery.web_log                      = function($text)
{
    if(window.console)
    {
        console.log($text);
    }
};


// DOM
// ---------------------------------------------------------------------------------------
jQuery.web_square                   = function($selector)
{
    $($selector).each(function()
    {
        // Width
        var $square_dim             = Math.floor($(this).width());

        // Set the dimensions
        $(this).height($square_dim);
    });
};

jQuery.web_wallpaper                = function($selector)
{
    $($selector).each(function()
    {
        // Image
        var $this_wallpaper         = $(this);
        var $wallpaper_image        = $this_wallpaper.data('wallpaper');

        // Set the bacgkround image
        if($wallpaper_image != undefined)
        {
            $this_wallpaper.addClass('wallpaper');
            $this_wallpaper.css(
            {
                'background-image': 'url(' + $wallpaper_image + ')'
            });
        }
    });
};


// Forms
// ---------------------------------------------------------------------------------------
jQuery.web_input_mirror             = function($input, $output)
{
    $($selector).keyup(function()
    {
        var $ref_input                  = $(this).val();
        var $ref_value                  = $ref_input.replace(/ /g,"_").toLowerCase();

        // Output the mirror
        $($output).text($ref_value);
    });
};

jQuery.web_lock_submit              = function($element)
{
    $($element).live('keypress', function($e)
    {
        if($e.keyCode == 13)
        {     
            return false;
        }
    });
};


// Strings
// ---------------------------------------------------------------------------------------
jQuery.web_get_ext                  = function($file)
{
    return $file.split('.').pop().toLowerCase();
};

jQuery.web_random_string            = function($string_length)
{
    var $chars                      = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    var $len                        = $string_length || 5;
    var $random_string              = '';

    for(var i = 0; i < $len; i++)
    {
        $r_num                      = Math.floor(Math.random() * $chars.length);
        $random_string              += $chars[$r_num];
    }

    return $random_string;
};


// URL
// ---------------------------------------------------------------------------------------
jQuery.web_get_url                  = function()
{
    var $window_location            = window.location;
    var $full_path                  = $window_location.href;
    var $ar_path                    = $window_location.href.split('/');
    var $hash_split                 = $window_location.href.split('#');
    var $protocol                   = $ar_path[0];
    var $host                       = $ar_path[2];
    var $base_url                   = $protocol + '//' + $host;
    var $hash_url                   = $window_location.hash.substring(1);
    var $site_path                  = $hash_split[0];
    var $ar_return                  = [];
    
    // Set the return array
    $ar_return['hash']              = $hash_url;
    $ar_return['host']              = $host;
    $ar_return['base_url']          = $base_url;
    $ar_return['site_path']         = $site_path;
    $ar_return['full_path']         = $full_path;
    
    // Return
    return $ar_return;
}


// Webplate
// ---------------------------------------------------------------------------------------
jQuery.web_hash_link                = function()
{
    // Based on: http://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*=#]:not([href=#])').click(function()
    {
        if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
        {
            var $target             = $(this.hash);
            $target                 = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
            var $selector           = $target.selector;
            var $scroll_top;

            if($target.length)
            {
                $scroll_top         = Math.ceil($($selector).offset().top);
                $(window).scrollTop($scroll_top);
                window.location     = $selector;

                return false;
            }
        }
    });
};

jQuery.web_hash_link_setup          = function()
{
    setTimeout(function()
    {
        var $crt_url                = $.web_get_url();
        var $crt_hash               = $crt_url['hash'];
        var $scroll_top;

        if($crt_hash.length)
        {
            $scroll_top             = Math.ceil($('#' + $crt_hash).offset().top);
            $(window).scrollTop($scroll_top);
        }
    }, 
    10);
};

jQuery.web_load_plugins             = function($css_path, $js_path)
{
    // Load plugins array
    var $ar_css_plugins             = [];
    var $ar_js_plugins              = [];
    var $check_flicker              = false;
    var $check_fastclick            = false; 
    var $check_penplate             = false; 

    // Flickerplate check
    var $flickerplate_check         = $('.flickerplate:first');
    if($.web_exists($flickerplate_check))
    {
        $ar_css_plugins.push($css_path + 'flickerplate.css');
        $ar_js_plugins.push($js_path + 'min/web-flickerplate.min.js');
        $check_flicker              = true;
    }

    // Penplate check
    var $penplate_check             = $('.penplate:first');
    if($.web_exists($penplate_check))
    {
        $ar_css_plugins.push($css_path + 'penplate.css');
        $ar_js_plugins.push($js_path + 'min/web-penplate.min.js');
        $check_penplate             = true;
    }

    // FastClick
    if(Modernizr.touch)
    {
        $ar_js_plugins.push($js_path + 'min/web-touch.min.js');
        $check_fastclick            = true;
    }

    // Load plugins CSS
    yepnope({ load: $ar_css_plugins });

    // Load plugins js
    yepnope({load: $ar_js_plugins, complete: function()
    {
        // Execute the flicker
        if($check_flicker == true)
        {
            if(Modernizr.touch)
            {
                $('.flickerplate').flicker({ flick_animation: 'transform-slide' });
            }
            else
            {
                $('.flickerplate').flicker();
            }
        }

        // Activate Penpalte
        if($check_penplate == true)
        {
            $('.penplate').penplate();
        }

        // Activate fastclick
        if($check_fastclick == true)
        {
            FastClick.attach(document.body);
        }

    }});
}

jQuery.web_nav_hide                 = function()
{
    $('.webplate-navigation').velocity(
    { 
        left                    : 0
    }, 
    {
        duration                : 200,
        easing                  : 'ease-out',
        complete                : function()
        {
            $('html').removeClass('web-nav-shown').addClass('web-nav-hidden');
        }
    });
    
    $.web_overlay_hide();
};

jQuery.web_nav_show                 = function()
{
    // Variables
    var $navigation_width           = $('.webplate-navigation').width();

    $('.webplate-navigation').velocity(
    { 
        left                    : $navigation_width
    }, 
    {
        duration                : 200,
        easing                  : 'ease-out',
        complete                : function()
        {
            $('html').addClass('web-nav-shown').removeClass('web-nav-hidden');
        }
    });

    $.web_overlay_show();
};

jQuery.web_navigation               = function()
{
    // Duplicate navigation
    $('body').append($('.navigation').clone().addClass('webplate-navigation').removeClass('navigation'));
    $('.webplate-navigation').wrapInner('<div class="navigation-inner" />');

    // On click
    $('.navigation-trigger').on('click', function($ev)
    {
        $ev.preventDefault();

        if($('html').hasClass('web-nav-shown'))
        {
            $.web_nav_hide();
        }
        else
        {
            $.web_nav_show();
        }
    });
    
    // Close nav again
    $('body').on('click', function($e)
    {
        if($('html').hasClass('web-nav-shown'))
        {
            $.web_nav_hide();
        }
    });

    // Show on mobile
    if($('.navigation-trigger').hasClass('small-show') == false)
    {
       $('.navigation-trigger').addClass('small-show');
    }

    // Change active state and close menu
    $('.webplate-navigation a').on('click', function()
    {
        $('.webplate-navigation a.active').removeClass('active');
        $(this).addClass('active');
        $.web_nav_hide();
    });

    // Prevent scroll on page open
    $(window).on('touchmove',function($e)
    {
        if($('html').hasClass('nav-shown'))
        {
            $e.preventDefault();
        }
    });
    $(window).on('touchstart', '.webplate-navigation',function($e)
    {
        if($e.currentTarget.scrollTop === 0)
        {
            $e.currentTarget.scrollTop = 1;
        }
        else if($e.currentTarget.scrollHeight === $e.currentTarget.scrollTop + $e.currentTarget.offsetHeight)
        {
            $e.currentTarget.scrollTop -= 1;
        }
    });
    $(window).on('touchmove','.webplate-navigation',function($e)
    {
        $e.stopPropagation();
    });
};

jQuery.web_overlay_hide             = function()
{
    $('.webplate-overlay').velocity(
    {
        opacity         : 0
    }, 
    { 
        display         : 'none',
        duration        : 200
    });
};

jQuery.web_overlay_show             = function()
{
    $('.webplate-overlay').velocity(
    {
        opacity         : 0.4
    }, 
    { 
        display         : 'block',
        duration        : 200
    });
};

jQuery.web_scroll                   = function()
{
    // Some variables
    var $last_scroll                = 0;

    // On scroll or drag event
    if(Modernizr.touch)
    {
        $(window).on('drag', function($e)
        {
            if($e.orientation == 'vertical')
            {
                if($e.direction == -1)
                {
                    if($('html').hasClass('scroll-down') == false)
                    {
                        $('html').addClass('scroll-down');
                    }
                }
                else
                {
                    if($('html').hasClass('scroll-down') == true)
                    {
                        $('html').removeClass('scroll-down');
                    }
                }
            }
        });
    }
    else
    {
        $(window).scroll(function($e)
        {
            // Sets the current scroll position
            var $scroll_top         = $(this).scrollTop();

            // Determine direction of scroll
            if($scroll_top > $last_scroll)
            {
                if($('html').hasClass('web-scroll-down') == false)
                {
                    $('html').addClass('web-scroll-down');
                }
            } 
            else 
            {
                if($('html').hasClass('web-scroll-down') == true)
                {
                    $('html').removeClass('web-scroll-down');
                }
            }

            // Updates scroll position
            $last_scroll            = $scroll_top;
        });
    }
}

jQuery.web_window_type              = function()
{
    $.web_window_type_execute();
    $(window).resize(function()
    {
        $.web_window_type_execute();
    });
};

jQuery.web_window_type_execute      = function()
{
    // Some variables
    if($(window).width() <= 700)
    {
        // Set the type variable
        $('html').addClass('web-small-view');
        $('html').removeClass('web-large-view');
    }
    else
    {
        // Set the type variable
        $('html').removeClass('web-small-view');
        $('html').addClass('web-large-view');
        if($('html').hasClass('web-show-nav'))
        {
            $.web_hide_nav();
        }
    }
};
