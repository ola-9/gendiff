#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2, formatName) => genDiff(file1, file2, formatName.format));

program.parse(process.argv);
