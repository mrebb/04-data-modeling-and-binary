'use strict';
const Color = require('./lib/color');
const Bitmap = require('./lib/bitmap');
const fs = require('fs');
let bitmap;
class App{
  constructor(){
    
  }
  static transform(inputFile,outputFile,command){
    fs.readFile(inputFile,(err,buffer)=>{
      if(err) throw err;
      bitmap = new Bitmap(buffer);
      if(command === 'grayscale'){
        Color.createImage(bitmap.grayScaleColorsHex,outputFile);
      }
      if(command === 'invert'){
        Color.createImage(bitmap.invertedColorsHex,outputFile); 
      }
      if(command === 'blackwhite'){
        Color.createImage(bitmap.blackWhiteColorsHex,outputFile); 
      }
      if(command === 'morered'){
        Color.createImage(bitmap.moreRedColorHex,outputFile); 
      }
    });
  }
}

module.exports = App;