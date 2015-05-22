#!/usr/bin/env iojs

/*jslint node: true */
'use strict';

var path = require('path');
var jf = require('jsonfile');
var fs = require('fs');
var pkg = require(path.join(__dirname, 'package.json'));
var program = require('commander');
var util = require('util');
var configManager = require('./lib/configManager');
program
  .version('0.0.1');
//Add a key
program
  .command('add <key> <value>')
  .description('add a key to the config')
  .action(configManager.addKey);

//Remove a key
program
  .command('rm <key>')
  .description('Removes a key from the config')
  .action(configManager.removeKey);
program.parse(process.argv);
