import fs from 'fs';
import { expect, describe, it } from '@jest/globals';
import genDiff from '../src/index.js';
import getFilePath from '../src/utils.js';

describe('genDiffOutput', () => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');

  it('test stylish formatter', () => {
    const stylishResultPath = getFilePath('expectedResultStylish.txt');
    const expectedResultStylish = fs.readFileSync(stylishResultPath, 'utf-8');

    expect(genDiff(file1json, file2json, { format: 'stylish' })).toBe(expectedResultStylish);
    expect(genDiff(file1yml, file2yml, { format: 'stylish' })).toBe(expectedResultStylish);
  });

  it('test plain formatter', () => {
    const plainResultPath = getFilePath('expectedResultPlain.txt');
    const expectedResultPlain = fs.readFileSync(plainResultPath, 'utf-8');

    expect(genDiff(file1json, file2json, { format: 'plain' })).toBe(expectedResultPlain);
    expect(genDiff(file1yml, file2yml, { format: 'plain' })).toBe(expectedResultPlain);
  });

  it('test json formatter', () => {
    const jsonResultPath = getFilePath('expectedResultJSON.txt');
    const expectedResultJson = fs.readFileSync(jsonResultPath, 'utf-8');

    expect(genDiff(file1json, file2json, { format: 'json' })).toBe(expectedResultJson);
    expect(genDiff(file1yml, file2yml, { format: 'json' })).toBe(expectedResultJson);
  });
});
