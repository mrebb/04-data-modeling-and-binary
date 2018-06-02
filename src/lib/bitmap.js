'use strict';
const FILE_SIZE_OFFSET = 2;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const NUM_COLORS_OFFSET = 46;
const COLOR_TABLE_OFFSET = 54;
const BYTES_PER_PIXEL_OFFSET = 28;
const Color = require('./color');

function Bitmap(buffer){
  this.buffer = buffer;
  readBuffer.call(this);
  readColorTable.call(this);
  transformColorTable.call(this);
}
function readBuffer(){
  this.type = this.buffer.toString('utf-8', 0, 2);
  this.fileSize = this.buffer.readInt32LE(FILE_SIZE_OFFSET);
  this.bytesPerPixel = this.buffer.readInt16LE(BYTES_PER_PIXEL_OFFSET);
  this.height = this.buffer.readInt32LE(HEIGHT_OFFSET);
  this.width = this.buffer.readInt32LE(WIDTH_OFFSET);
  this.pixelArrayOffset = this.buffer.readInt32LE(10);
}
function readColorTable(){
  this.numColors = this.buffer.readInt32LE(NUM_COLORS_OFFSET);
  let COLOR_TABLE_SIZE = this.numColors * 4;
  this.colorTable = this.buffer.slice(COLOR_TABLE_OFFSET,COLOR_TABLE_SIZE);
  this.colors = [];
  this.colorTableLength = COLOR_TABLE_OFFSET + COLOR_TABLE_SIZE;
  for(let i=COLOR_TABLE_OFFSET;i<this.colorTableLength; i+=4){
    let colorHex = this.buffer.toString('hex',i,i+4);
    this.colors.push(Color.hex2Int(colorHex));
  }
  this.oldColors = this.colors;
}
/*****Color transformations supposed to go as part of color module. Need to work on refactoring.*******/
function transformColorTable(){
  //invert all colors in colorTable
  this.newColorsInt=[];
  for (let i=0; i<this.oldColors.length;i++){
    this.newColorsInt[i] = Color.invertColors(this.oldColors[i].red,this.oldColors[i].green,this.oldColors[i].blue,this.oldColors[i].alpha);
  }
  this.invertedColorsHex = this.newColorsInt.map(c=>Color.int2Hex(c.red,c.green,c.blue,c.alpha)).join('');
  //change all colors to grayscale
  this.grayScaleColors = [];
  for (let i=0; i<this.oldColors.length;i++){
    this.grayScaleColors[i] = Color.toGrayscale(this.oldColors[i].red,this.oldColors[i].green,this.oldColors[i].blue,this.oldColors[i].alpha);
  }
  this.grayScaleColorsHex = this.grayScaleColors.map(c=>Color.int2Hex(c.red,c.green,c.blue,c.alpha)).join('');
  //change all colors to black & white
  this.blackWhiteColors = [];
  for (let i=0; i<this.oldColors.length;i++){
    this.blackWhiteColors[i] = Color.toBlackAndWhite(this.oldColors[i].red,this.oldColors[i].green,this.oldColors[i].blue,this.oldColors[i].alpha);
  }
  this.blackWhiteColorsHex = this.blackWhiteColors.map(c=>Color.int2Hex(c.red,c.green,c.blue,c.alpha)).join('');
  //change colors to reflect more red
  this.moreRedColor = [];
  for (let i=0; i<this.oldColors.length;i++){
    this.moreRedColor[i] = Color.toRed(this.oldColors[i].red,this.oldColors[i].green,this.oldColors[i].blue,this.oldColors[i].alpha);
  }
  this.moreRedColorHex = this.moreRedColor.map(c=>Color.int2Hex(c.red,c.green,c.blue,c.alpha)).join('');
}
module.exports = Bitmap;