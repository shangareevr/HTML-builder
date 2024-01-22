const fs = require('fs');
const path = require('path');
let stylesFolder = path.join(__dirname, 'styles');
let bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  let resFile = fs.createWriteStream(bundleFile);
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const read = fs.createReadStream(
        path.join(stylesFolder, file.name),
        'utf-8',
      );
      let data = '';
      read.on('data', (e) => (data += e));
      read.on('end', () => {
        resFile.write(data);
      });
    }
  }
});
