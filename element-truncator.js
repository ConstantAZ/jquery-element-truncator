$.fn.extend({
    truncateToElements: function (options) {
        var $wrapper = this,
            settings = $.extend({
                child_selector: false,
                truncate_to: 6,
                animation_duration: 500,
                button_class: 'collapse_button',
                button_element: '<div/>',
                button_text_expand: 'Show all',
                button_text_collapse: 'Collapse',
                control_class: 'collapse_control',
                control_element: '<div/>',
                wrapper_collapsed_class: 'collapsed',
                csstransitions: false
            }, options),
            $children = !settings.child_selector ? $wrapper.children() : $wrapper.find(settings.child_selector);
        if (settings.truncate_to < 1 || $children.length <= settings.truncate_to) {
            return;
        }
        var getElementBottom = function ($element) {
            return $element.position().top + $element.outerHeight(true) - parseInt($element.css('marginTop'), 10);
        };
        var $last_element = $($children[settings.truncate_to - 1]);
        $wrapper.css({
            height: getElementBottom($last_element)
        }).data('collapsed', true).addClass(settings.wrapper_collapsed_class);
        var $children_hide_slice = $children.slice(settings.truncate_to);
        $children_hide_slice.hide();
        var $collapse_button = $(settings.button_element)
            .addClass(settings.button_class)
            .text(settings.button_text_expand);
        $(settings.control_element)
            .addClass(settings.control_class)
            .insertAfter(this)
            .append($collapse_button);
        if (settings.csstransitions) {
            var children_display = $children.css('display');
            var wrapperCollapse = function () {
                $children_hide_slice.css({
                    opacity: 0
                });
                $wrapper.css({
                    height: $wrapper.height()
                });
                $wrapper.css({
                    height: getElementBottom($last_element)
                });
                return;
            };
            var wrapperExpand = function () {
                $wrapper.css({
                    height: $wrapper.height()
                });
                $children_hide_slice.css({
                    display: children_display
                });
                $wrapper.css({
                    height: getElementBottom($children.last())
                });
                $children_hide_slice.css({
                    opacity: 1
                });
            };
            var afterAnimation = function (e) {
                if (e.target != this) {
                    return;
                }
                switch ($wrapper.data('collapsed')) {
                    case (true):
                        $children_hide_slice.css({
                            display: 'none'
                        });
                        $wrapper.css({
                            height: 'auto'
                        });
                        $wrapper.trigger('afterCollapse');
                        return;
                    case (false):
                        $wrapper.css({
                            height: 'auto'
                        });
                        $wrapper.trigger('afterExpand');
                        return;
                }
            };
            $wrapper.css({
                'transition': 'height ' + settings.animation_duration + 'ms'
            });
            $children_hide_slice.css({
                opacity: 0
            });
            $children.css({
                'transition': 'opacity ' + settings.animation_duration + 'ms'
            });
            $wrapper.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', afterAnimation);
        } else {
            var wrapperCollapse = function () {
                $wrapper.animate({
                    height: getElementBottom($last_element)
                }, settings.animation_duration, afterAnimation);
                $children_hide_slice.fadeOut(settings.animation_duration * 0.9);
            };
            var wrapperExpand = function () {
                $children.fadeIn(settings.animation_duration * 0.9);
                $wrapper.animate({
                    height: getElementBottom($children.last())
                }, settings.animation_duration, afterAnimation);
            };
            var afterAnimation = function () {
                switch ($wrapper.data('collapsed')) {
                    case (true):
                        $wrapper.css({
                            height: 'auto'
                        });
                        $wrapper.trigger('afterCollapse');
                        return;
                    case (false):
                        $wrapper.css({
                            height: 'auto'
                        });
                        $wrapper.trigger('afterExpand');
                        return;
                }
            };
        }
        $collapse_button.on('click', function () {
            switch ($wrapper.data('collapsed')) {
                case (true):
                    $wrapper.trigger('beforeExpand');
                    $wrapper.data('collapsed', false).removeClass(settings.wrapper_collapsed_class);
                    $(this).text(settings.button_text_collapse);
                    wrapperExpand();
                    return;
                case (false):
                    $wrapper.trigger('beforeCollapse');
                    $wrapper.data('collapsed', true).addClass(settings.wrapper_collapsed_class);
                    $(this).text(settings.button_text_expand);
                    wrapperCollapse();
                    return;
            }
        });
    }
});
