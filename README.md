jquery-element-truncator
========================

Simple jQuery plugin to truncate element 'lists' and then expand\collapse them with animation. Supports CSS3 transitions, emits custom events.

Example: http://jsfiddle.net/ConstantA/LA9Zr/

Init options:

+ `child_selector` - String. jQuery selector string to get elements to truncate. Default: `false` (uses `.children()`);
+ `truncate_to` - Integer. Number of elements to truncate to. Default: `6`;
+ `animation_duration` - Integer, ms. Animation speed in ms. Default: `500`;
+ `button_class` - String. Control button class. Default: `'collapse_button'`;
+ `button_element` - HTML tag. Control button tag. Default: `'<div/>'`;
+ `button_text_expand` - String. This text will be shown on button when plugin is collapsed. Default: `'Show all'`;
+ `button_text_collapse` - String. This text will be shown on button when plugin is expanded. Default: `'Collapse'`;
+ `control_class` - String. Control button wrapper class. Default: `'collapse_control'`;
+ `control_element` - HTML tag. Control button wrapper tag. Default: `'<div/>'`;
+ `wrapper_collapsed_class` - String. Wrapper class when collapsed; Default: `'collapsed'`;
+ `csstransitions` - Boolean. Use css transitions or not. Default: `false`;

Events:

+ `beforeExpand` - triggered when plugin is collapsed and control button is pressed, before expand animation start.
+ `afterExpand` - triggered when expand animation is finished.
+ `beforeCollapse` - triggered when plugin is expanded and control button is pressed, before collapse animation start.
+ `afterCollapse` - triggered when collapse animation is finished.
  
Example usage:

```javascript
  $(function () {
    $('.num_trim').truncateToElements({
        truncate_to: 5,
        csstransitions: true
    });
    $('.num_trim').on('beforeExpand', function () {
        console.log('Triggered beforeExpand event');
    });
    $('.num_trim').on('afterExpand', function () {
        console.log('Triggered afterExpand event');
    });
    $('.num_trim').on('beforeCollapse', function () {
        console.log('Triggered beforeCollapse event');
    });
    $('.num_trim').on('afterCollapse', function () {
        console.log('Triggered afterCollapse event');
    });
  });
```
