#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format [stylish, plain, json]', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2, formatName) => {
    const result = genDiff(file1, file2, formatName.format);
    console.log(result);
  });

program.parse(process.argv);
