import fs from 'fs';
import { expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

// const getFilePath = (filename) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   return path.resolve(__dirname, '..', '__fixtures__', filename);
// };
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectedResultStylish = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', 'expectedResultStylish.txt'), 'utf-8');
const expectedResultPlain = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', 'expectedResultPlain.txt'), 'utf-8');
const expectedResultJson = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', 'expectedResultJSON.txt'), 'utf-8');

test.each([
  { format: 'stylish', expected: expectedResultStylish },
  { format: 'plain', expected: expectedResultPlain },
  { format: 'json', expected: expectedResultJson },
])('test $format formatter', ({ format, expected }) => {
  const file1json = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  const file2json = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  const file1yml = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2yml = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');
  expect(genDiff(file1json, file2json, format)).toEqual(expected);
  expect(genDiff(file1yml, file2yml, format)).toEqual(expected);
});
