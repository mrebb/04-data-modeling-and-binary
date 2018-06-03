'use strict';
const Bitmap = require('../src/lib/bitmap');
//require('./../index');
const Color = require('../src/lib/color');
const fs = require('fs');
const path = require('path');
let dirname = path.resolve('assets');
let bitmap;
let filePath = dirname + '/bitmap.bmp'; 

describe('Bitmap and color module tests',()=>{
  beforeEach(done=>{
    fs.readFile(filePath,(err,buffer)=>{
      if(err) throw err;
      bitmap = new Bitmap(buffer);
      done();
    });
  });
  it('test to read bitmap file and check for buffer properties',()=>{
    expect(bitmap).toHaveProperty('type','BM');
    expect(bitmap).toHaveProperty('height',100);
    expect(bitmap).toHaveProperty('width',100);
    expect(bitmap).toHaveProperty('colorTableLength',1078);
  });
  it('test to check inverted colors array length same as old colors array',()=>{
    const actual = (bitmap.newColorsInt).length;
    const expected = (bitmap.oldColors).length;
    expect(actual).toBe(expected);
  });
  it('test to check new image created with inverted colors',()=>{
    const actual = Color.invertColors(50,60,70,80);
    let newFile = dirname + '/inverted.bmp';
    Color.createImage(bitmap.invertedColorsHex,newFile); 
    expect(actual.red).toBe(205);
    expect(actual.green).toBe(195);
    expect(actual.blue).toBe(185);
    expect(actual.alpha).toBe(80);
  });
  it('test to check new image created with grayscale colors',()=>{
    const actual = Color.toGrayscale(10,20,30,40);
    let newFile = dirname + '/grayScale.bmp';
    Color.createImage(bitmap.grayScaleColorsHex,newFile); 
    expect(actual.red).toBe(20);
    expect(actual.green).toBe(20);
    expect(actual.blue).toBe(20);
    expect(actual.alpha).toBe(40);
  });
  it('test to check new image created with black & white colors',()=>{
    const actual = Color.toBlackAndWhite(50,60,70,80);
    let newFile = dirname + '/blackWhite.bmp';
    Color.createImage(bitmap.blackWhiteColorsHex,newFile); 
    expect(actual.red).toBe(0);
    expect(actual.green).toBe(0);
    expect(actual.blue).toBe(0);
    expect(actual.alpha).toBe(80);
  });
  it('test to check new image created with red as a dominant color',()=>{
    const actual = Color.toRed(140,150,70,80);
    let newFile = dirname + '/moreRed.bmp';
    Color.createImage(bitmap.moreRedColorHex,newFile); 
    expect(actual.red).toBe(100);
    expect(actual.green).toBe(0);
    expect(actual.blue).toBe(0);
    expect(actual.alpha).toBe(80);
  });
});