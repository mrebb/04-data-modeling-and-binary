Summary of project:
============
Mainly this project involves reading a bitmap file, load the buffer, read offset values and required color table values from buffer, manipulate color table and create a new image file(.bmp) with new modified buffer. 


Tests:
======
1) read bitmap file and check for buffer properties
2) check inverted colors array length same as old colors array
3) check new image created with inverted colors
4) check new image created with gray scale colors
5) check new image created with black & white colors

Bitmap.js:
readBuffer(): reads the main properties of buffer and makes it available for other modules and tests.
readColorTable(): reads the main color table offset, color