'use strict';
/*jslint node: true */
var path = require('path');
var fs = require('fs');
var dir = process.cwd();

function findFilesWithValue() {
  fs.readdir(dir, function(err, files) {
    for (var i = 0; i < files.length; i++) {
      readFile(files[i]);
    }
  });
}

function readFile(file) {
  var stream = fs.createReadStream(path.join(dir, file));
  stream.on('readable', function() {
    var line;
    while (null !== (line = stream.read())) {
      readLine(line);
    }
  });
}
var num = 0;
function readLine(line) {
  num++;
  console.log(line.toString() + num);
}
var replaceKeys = function() {
  findFilesWithValue();
};
exports.replaceKeys = replaceKeys;
