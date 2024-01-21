const path = require('path');
const fs = require('fs');
const dirToFile = path.join(__dirname, 'secret-folder');
let fileName = [];
let fileExt = [];
let fileSize = [];
fs.readdir(dirToFile, { withFileTypes: true }, function (err, items) {
  if (err) throw err;
  for (let i of items) {
    if (i.isFile()) {
      let info = path.parse(`${dirToFile}\\${i.name}`);
      fileName.push(info.name);
      fileExt.push(info.ext.slice(1));
      fs.stat(dirToFile + '\\' + i.name, function (err, item) {
        if (err) throw err;
        fileSize.push(item.size / 1024);
      });
    }
  }
});
process.on('exit', () => {
  for (let i = 0; i < fileName.length; i++) {
    console.log(`${fileName[i]} - ${fileExt[i]} - ${fileSize[i]} kb`);
  }
});
