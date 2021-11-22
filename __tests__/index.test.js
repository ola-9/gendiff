import fs from 'fs';
import { expect, describe, it } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFilePath } from '../src/utils.js';

const getExptectedResult = (filename) => {
  const stylishResultPath = getFilePath(filename);
  return fs.readFileSync(stylishResultPath, 'utf-8');
};

describe('genDiffOutput', () => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');

  it('test stylish formatter', () => {
    const expectedResultStylish = getExptectedResult('expectedResultStylish.txt');

    expect(genDiff(file1json, file2json, 'stylish')).toBe(expectedResultStylish);
    expect(genDiff(file1yml, file2yml, 'stylish')).toBe(expectedResultStylish);
  });

  it('test plain formatter', () => {
    const expectedResultPlain = getExptectedResult('expectedResultPlain.txt');

    expect(genDiff(file1json, file2json, 'plain')).toBe(expectedResultPlain);
    expect(genDiff(file1yml, file2yml, 'plain')).toBe(expectedResultPlain);
  });

  it('test json formatter', () => {
    const expectedResultJson = getExptectedResult('expectedResultJSON.txt');

    expect(genDiff(file1json, file2json, 'json')).toBe(expectedResultJson);
    expect(genDiff(file1yml, file2yml, 'json')).toBe(expectedResultJson);
  });
});
