#!/usr/bin/env iojs

/*jslint node: true */
'use strict';

var program = require('commander');
var configManager = require('./lib/configManager');
var keyReplacer = require('./lib/keyReplacer');
program
  .version('0.0.1');
//Add a key
program
  .command('add <key> <value>')
  .description('add a key to the config')
  .action(configManager.addKey);

program
  .command('replace')
  .description('Replaces the keys in the current working directory')
  .action(keyReplacer.replaceKeys);

//Remove a key
program
  .command('rm <key>')
  .description('Removes a key from the config')
  .action(configManager.removeKey);
program.parse(process.argv);

//If no arguments are specified, replace keys
if (!program.args.length) {
  keyReplacer.replaceKeys();
}
