/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools
// Variables

// Defaults
// Defaults
var $formplateDefault = {
    selector: '.formplate',
    colour: 'blue',
    style: 'line'
};

function formplate($userOptions) {
    // Variables
    var $self = this;
    $self.options = {
        selector: ($userOptions && $userOptions.selector) ? $userOptions.selector : $formplateDefault.selector,
        colour: ($userOptions && $userOptions.colour) ? $userOptions.colour : $formplateDefault.colour,
        style: ($userOptions && $userOptions.style) ? $userOptions.style : $formplateDefault.style
    }

    var $formplateEls = document.querySelectorAll($self.options.selector);

    if (!web.isTouch() && !web.hasClass(web.element.html, 'fp-no-touch')) {
        web.classAdd(web.element.html, 'fp-no-touch');
    }

    // Functions
    var checkToggle = function($element) {
        $element.onclick = function() {
            if (web.hasClass($element.parentNode, '_checked')) {
                $element.checked = false;
                web.classRemove($element.parentNode, '_checked');
            } else {
                $element.checked = true;
                web.classAdd($element.parentNode, '_checked');
            }
        };
    };
    var inputFocus = function($thisFormEl) {
        var $inputs = $thisFormEl.querySelectorAll('input');
        for (var $i = 0, $len = $inputs.length; $i < $len; $i++) {
            var $thisInput = $inputs[$i];
            $thisInput.onfocus = function() {
                var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
                web.classAdd($parent, '_focused');
            };
            $thisInput.onblur = function() {
                var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
                web.classRemove($parent, '_focused');
            };
        }
    };
    var radioToggle = function($element) {
        $element.onclick = function() {
            var $inputRadioGroup = document.getElementsByName($element.getAttribute('name'));
            for (var $i = 0, $len = $inputRadioGroup.length; $i < $len; $i++) {
                $inputRadioGroup[$i].checked = false;
                web.classRemove($inputRadioGroup[$i].parentNode, '_checked');
            }
            $element.checked = true;
            web.classAdd($element.parentNode, '_checked');
        };
    };
    var textareaFocus = function($textarea) {
        $textarea.onfocus = function() {
            web.classAdd($textarea.parentNode, '_focused');
        };
        $textarea.onblur = function() {
            web.classRemove($textarea.parentNode, '_focused');
        };
    };

    // Loop over all elements and apply
    for (var $i = 0, $len = $formplateEls.length; $i < $len; $i++) {
        var $thisFormEl = $formplateEls[$i];
        var $classes = ['_c-' + $self.options.colour, '_s-' + $self.options.style];

        // Set the input classes
        if ($thisFormEl.querySelector('input')) {
            var $input = $thisFormEl.querySelector('input');
            var $inputType = $input.getAttribute('type');

            if ($inputType === 'checkbox' || $inputType === 'radio') {
                // Removed _checked if need be
                if ($input.checked === true) {
                    $classes.push('_checked');
                } else {
                    if (web.hasClass($thisFormEl, '_checked')) {
                        web.classRemove($thisFormEl, '_checked');
                    }
                }
                // Checkbox type
                if (web.hasClass($input, 'toggler')) {
                    $classes.push('fp-tog');
                } else {
                    $classes.push('fp-check');
                    if ($inputType === 'radio') {
                        $classes.push('_t-radio');
                    }
                }
                web.classAdd($thisFormEl, $classes);
                // Add events
                if ($inputType === 'checkbox') {
                    checkToggle($input);
                } else if ($inputType === 'radio') {
                    radioToggle($input);
                }
            } else if ($inputType === 'password') {
                $classes.push('fp-inp', '_t-password');
                web.classAdd($thisFormEl, $classes);
                inputFocus($thisFormEl);
            } else {
                $classes.push('fp-inp');
                web.classAdd($thisFormEl, $classes);
                inputFocus($thisFormEl);
            }
        } else if ($thisFormEl.querySelector('textarea')) {
            var $textarea = $thisFormEl.querySelector('textarea');
            $classes.push('fp-text');
            web.classAdd($thisFormEl, $classes);
            textareaFocus($textarea);
        } else if ($thisFormEl.querySelector('select')) {
            var $select = $thisFormEl.querySelector('select');
            if ($select != null) {
                $classes.push('fp-sel');
                web.classAdd($thisFormEl, $classes);
            }
        }
    }
};