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
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
              key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff(file1json, file2json)).toBe(expectedStr);
  expect(genDiff(file1yml, file2yml)).toBe(expectedStr);
  expect(genDiff(file1json, file2yml)).toBe(expectedStr);
  expect(genDiff(file1yml, file2json)).toBe(expectedStr);
});
