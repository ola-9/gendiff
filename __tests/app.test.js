import { test, expect } from '@jest/globals';
import { getSquare } from '../src/index.js';

test('my function', () => {
  expect(getSquare(3)).toBe(9);
});
