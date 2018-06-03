<img src ="https://travis-ci.com/mrebb/04-data-modeling-and-binary.svg?branch=master">;

## Summary of project:

Mainly this project involves reading a bitmap file, load the buffer, read offset values and required color table values from buffer, manipulate color table and create a new image file(.bmp) with new modified buffer. 


## Tests:
* read bitmap file and check for buffer properties
* check inverted colors array length same as old colors array
* check new image created with inverted colors
* check new image created with gray scale colors
* check new image created with black & white colors

## bitmap.js:
* readBuffer(): reads the main properties of buffer and makes it available for other modules and tests.
* readColorTable(): reads the main color table offset, color table length and create a new array of colors
* transformColorTable(): convert color array into different transformations by manipuating the red, green, blue color values.

## color.js:
* createImage(): takes new modified colors and output file path as input and writes the new color array to buffer and creates a new image.
* readColorTable(): reads the main color table offset, color table length and create a new array of colors
* transformColorTable(): convert color array into different transformations by manipuating the red, green, blue color values.

## CLI:
- [x] There are four transformations grayscale, invert, black-white, moreRed
- [x] example CLI instruction: node index.js bitmap.bmp grayscale.bmp grayscale