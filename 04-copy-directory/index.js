const fs = require('fs');
const path = require('path');
let folder = path.join(__dirname, 'files');
let folderCopy = path.join(__dirname, 'files-copy');
fs.mkdir(folderCopy, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(folderCopy, (err, items) => {
    if (err) throw err;
    for (const item of items) {
      fs.unlink(path.join(folderCopy, item), (err) => {
        if (err) throw err;
      });
    }
  });
  if (err) throw err;
  fs.readdir(folder, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(folder, file),
        path.join(folderCopy, file),
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
});
