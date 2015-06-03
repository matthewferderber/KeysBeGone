'use strict';
/*jslint node: true */
var path = require('path');
var fs = require('fs');
var dir = process.cwd();
var chalk = require('chalk');
var readline = require('readline');
var stream = require('stream');
var configManager = require('./configManager');
var isKeys;
var keysReplaced = false;

function writeFile(file, data) {
  fs.writeFile(file, data, function(err) {

  });
}

function replaceKeysInFile(file) {

  fs.open(file, 'r+', function(err, fd) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        throw 'Error reading file: ' + err;
      }
      configManager.getKeys(function(err, keys) {
        var lines = data.split('\n');
        var keyLocation = null;
        isKeys = null;
        for (var i = 0; i < lines.length; i++) {
          for (var k = 0; k < keys.length; k++) {
            keyLocation = lines[i].indexOf(keys[k].value);
            if (keyLocation !== -1 && (isKeys === null || isKeys === true)) {
              isKeys = true;
              lines[i] = lines[i].replace(keys[k].value, keys[k].id);
              keysReplaced = true;
            } else {
              var idLocation = lines[i].indexOf(keys[k].id);
              if (idLocation !== -1 && (isKeys === false || isKeys === null)) {
                isKeys = false;
                lines[i] = lines[i].replace(keys[k].id, keys[k].value);
                keysReplaced = true;
              }
            }
          }
        }
        if (keysReplaced) {
          writeFile(file, lines.join('\n'));
        }
      });
    });
  });
}

function findFilesWithValue() {
  fs.readdir(dir, function(err, files) {
    for (var i = 0; i < files.length; i++) {
      replaceKeysInFile(files[i]);
      console.log('Replaced keys in: ' + files[i]);
    }
    // if (isKeys) {
    //   console.log(chalk.bold.green('Real keys in use'));
    // } else {
    //   console.log(chalk.bold.green('Secret keys hidden'));
    // }
  });
}
var replaceKeys = function() {
  findFilesWithValue();

};
exports.replaceKeys = replaceKeys;
