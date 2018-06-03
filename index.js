'use strict';
const app = require('./src/app.js');
const path = require('path');
const fs = require('fs');
let dirname = path.resolve('assets');
let outputFile = dirname + `/${process.argv[3]}`; 
let inputFile = dirname + `/${process.argv[2]}`; 
let command = process.argv[4];
let files = fs.readdirSync(dirname);
if(process.argv[2].slice(-4)!=='.bmp' || process.argv[3].slice(-4)!=='.bmp'){
  console.log('input and output files should be of .bmp type');
}
if(process.argv[2].slice(-4) ==='.bmp' && process.argv[3].slice(-4)==='.bmp'){
  for(let i = 0; i<files.length; i++){
    if (files[i] === process.argv[2]){
      var counter = i+1;
      switch(command){
      case 'grayscale':
        app.transform(inputFile,outputFile,command); 
        console.log(`${outputFile} created successfully`);
        break;
      case 'invert':
        app.transform(inputFile,outputFile,command); 
        console.log(`${outputFile} created successfully`);
        break;
      case 'blackwhite':
        app.transform(inputFile,outputFile,command); 
        console.log(`${outputFile} created successfully`);
        break;
      case 'morered':
        app.transform(inputFile,outputFile,command); 
        console.log(`${outputFile} created successfully`);
        break;
      }
    }
  }
  if(counter === undefined){console.log('Input File doesnot exist');}
}
