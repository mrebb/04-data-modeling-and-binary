'use strict';
const fs = require('fs');
const path = require('path');
__dirname = path.resolve('assets');
let filePath = __dirname + '/bitmap.bmp'; 
const COLOR_TABLE_OFFSET = 54;
class Color{
  constructor(red,green,blue,alpha){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}
Color.createImage = (newColors,newFile)=>{
  fs.readFile(filePath,(err,buffer)=>{
    if(err) throw err;
    // const Bitmap = require('./bitmap');
    // console.log(Bitmap);
    // let bitmap = new Bitmap(buffer);
    const originalBuffer = buffer;
    let numColors = originalBuffer.readInt32LE(46);
    let COLOR_TABLE_SIZE = numColors * 4;
    originalBuffer.write(newColors, COLOR_TABLE_OFFSET, COLOR_TABLE_SIZE, 'hex');
    fs.writeFile(newFile,originalBuffer,(err)=>{
      if(err) throw err;
    });
    return newColors;
  });
};

Color.hex2Int =(colorHex)=>{
  let blue = parseInt(colorHex.slice(0, 2), 16);
  let green = parseInt(colorHex.slice(2, 4), 16);
  let red = parseInt(colorHex.slice(4, 6), 16);
  let alpha = parseInt(colorHex.slice(6, 8), 16);
  return new Color(red, green, blue, alpha);
};

Color.int2Hex = (red,green,blue,alpha) => {
  return toHex(red) + toHex(green) + toHex(blue) + toHex(alpha);
};

function toHex(decimal) {
  let hex = decimal.toString(16);
  if(hex.length === 1){
    return '0' + hex;
  }
  return hex;
}

Color.invertColors = (red,green,blue,alpha)=>{
  return new Color(255-red,255-green,255-blue,alpha);
};

Color.toGrayscale = function(red,green,blue,alpha) {
  let average = Math.round((red + green + blue) / 3);
  return new Color(average, average, average, alpha);
};

Color.toBlackAndWhite = function(red,green,blue,alpha) {
  let average = Math.round((red + green + blue) / 3);
  let result = average < 128 ? 0 : 255;
  return new Color(result, result, result, alpha);
};
Color.toRed = function(red,green,blue,alpha) {
  let average = Math.round((red + green + blue) / 3);
  let result = average < 128 ? 0 : 255;
  return new Color(100+result, result, result, alpha);
};
module.exports = Color;