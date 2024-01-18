const fs = require('fs');
const path = require('node:path');
const myFile = path.join(__dirname, 'text.txt');
const read = fs.createReadStream(myFile, 'utf-8');
read.on('data', (text) => console.log(text));
