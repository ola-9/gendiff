import fs from 'fs';
import { expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFilePath } from '../src/utils.js';

const expectedResultStylish = fs.readFileSync(getFilePath('expectedResultStylish.txt'), 'utf-8');
const expectedResultPlain = fs.readFileSync(getFilePath('expectedResultPlain.txt'), 'utf-8');
const expectedResultJson = fs.readFileSync(getFilePath('expectedResultJSON.txt'), 'utf-8');

test.each([
  { format: 'stylish', expected: expectedResultStylish },
  { format: 'plain', expected: expectedResultPlain },
  { format: 'json', expected: expectedResultJson },
])('test $format formatter', ({ format, expected }) => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');
  expect(genDiff(file1json, file2json, format)).toEqual(expected);
  expect(genDiff(file1yml, file2yml, format)).toEqual(expected);
});
