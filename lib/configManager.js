'use strict';
/*jslint node: true */
var jf = require('jsonfile');
var path = require('path');
var chalk = require('chalk');
function getKeysPath() {
  return path.join(__dirname, '../keys.json');
}

function createNewKey(key, value) {
  return {
    key: key,
    value: value
  };
}

function errHandler(err) {
  if (err !== null) {
    console.error(chalk.bold.red(err));
  }
}

function readFile(file, cb) {
  jf.readFile(file, cb);
}

function writeFile(file) {
  jf.writeFile(getKeysPath(), file, errHandler);
}

var addKey = function(key, value) {
  try {
    readFile(getKeysPath(), function(err, file) {
      // if (err) {
      //   throw err;
      // }
      if(file === null){
        file = [];
      }
      file.push(createNewKey(key, value));
      writeFile(file);
      console.log(chalk.blue('Key added'));
    });
  } catch (ex) {
    errHandler(ex);
  }
};

var removeKey = function(key) {
  try {
    readFile(getKeysPath(), function(err, file) {
      if (err) {
        throw err;
      }
      var keysLength = file.length;
      for (var i = 0; i < keysLength; i++) {
        if (file[i].key.toLowerCase() === key.toLowerCase()) {
          file.splice(i);
          break;
        }
      }
      if (keysLength !== file.length) {

        writeFile(file);
      }
    });
  } catch (ex) {
    errHandler(ex);
  }
};

exports.addKey = addKey;
exports.removeKey = removeKey;
