import _ from 'lodash';
import getObject from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import { getContent, getContentType } from './utils.js';

const createDiffStructure = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.map((key) => {
    if (!keys2.includes(key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!keys1.includes(key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: createDiffStructure(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key, type: 'updated', valueBefore: value1, valueAfter: value2,
    };
  });
  // console.dir(result, { depth: null });
  return result;
};

const getFormattedOutput = (diffStructure, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diffStructure);
    case 'json':
      return json(diffStructure);
    default:
      return `{\n${stylish(diffStructure, 1)}\n}`;
  }
};

const genDiff = (content1, content2, formatName = 'stylish') => {
  const obj1 = getObject(getContent(content1), getContentType(content1));
  const obj2 = getObject(getContent(content2), getContentType(content2));

  const diffStructure = createDiffStructure(obj1, obj2);

  return getFormattedOutput(diffStructure, formatName);
};

export default genDiff;
