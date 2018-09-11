const path = require('path');
const fs = require('fs');
const program = require('commander');
const chalk = require('chalk');
const Archive = require('archive-tool');
const _ = require('lodash.get');
const baseDir = process.cwd();
const pkg = require(path.join(__dirname, '../package.json'));

program
  .version(pkg.version)

