import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__dirname);

test('genDiff', () => {
  const file1json = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  const file2json = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  const file1yml = path.resolve(__dirname, '..', '__fixtures__', 'file1.yml');
  const file2yml = path.resolve(__dirname, '..', '__fixtures__', 'file2.yml');
  const expectedStr = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(file1json, file2json)).toBe(expectedStr);
  expect(genDiff(file1yml, file2yml)).toBe(expectedStr);
  expect(genDiff(file1json, file2yml)).toBe(expectedStr);
  expect(genDiff(file1yml, file2json)).toBe(expectedStr);
});
