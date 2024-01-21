const fs = require('fs');
const { stdout } = process;
const path = require('path');
const readline = require('node:readline');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const createFile = path.join(__dirname, 'text.txt');
const outputFile = fs.createWriteStream(createFile);
const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
stdout.write(
  '> Hello, enter your text. To complete your entry, enter exit or press Ctrl+C\n',
);
read.on('SIGINT', () => {
  console.log('> Entry completed');
  read.close();
});
read.on('line', (input) => {
  emitter.emit('closeApp', input);
  outputFile.write(input + '\n');
});
emitter.on('closeApp', (exit) => {
  if (exit.toLowerCase() === 'exit') {
    console.log('> Entry completed');
    process.exit();
  }
});
