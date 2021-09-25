import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__dirname);

test('genDiff', () => {
  const file1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  const file2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  const expectedStr = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(file1, file2)).toBe(expectedStr);
});
