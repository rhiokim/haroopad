jRumble v1.3
============

_by Jack Rugile - http://jackrugile.com_

jRumble is a [jQuery](http://jquery.com) plugin that rumbles, vibrates, shakes, and rotates any element you choose. It's great to use as a hover effect or a way to direct attention to an element.

* **Latest Version:** 1.3
* **Release Date:** December 3, 2011
* **Compressed:** 1.47kb
* **Uncompressed:** 4.84kb

### Documentation, Demos, and Discussion

Documentation, demos, and discussion can all be found at http://jackrugile.com/jrumble

### Basic Usage

```javascript
// Initialize jRumble on Selector
$('#rumble-element').jrumble();

// Start rumble on element
$('#rumble-element').trigger('startRumble');

// Stop rumble on element
$('#rumble-element').trigger('stopRumble');
```

### Options  

Option         | Default | Description                                                                               
-------------- | ------- | ------------------------------------------------------------------------------------------
**x**          | _2_     | Set the horizontal rumble range (pixels)                                                  
**y**          | _2_     | Set the vertical rumble range (pixels)                                                    
**rotation**   | _1_     | Set the rotation range (degrees)                                                          
**speed**      | _15_    | Set the speed/frequency in milliseconds between rumble movements (lower number = faster)  
**opacity**    | _false_ | Activate opacity flickering while rumbling                                                
**opacityMin** | _.5_    | When the opacity option is set to true, this controls the minimum opacity while flickering

### Known Issues

* For rumble elements that are position fixed/absolute, they should instead be wrapped in an element that is fixed/absolute
* Rotation does not work in Internet Explorer 8 and below