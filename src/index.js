import _ from 'lodash';
import getObject from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const createDiffStructure = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (keys1.includes(key) && !keys2.includes(key)) {
      return { ...acc, [key]: { type: 'deleted', value: value1 } };
    }
    if (!keys1.includes(key) && keys2.includes(key)) {
      return { ...acc, [key]: { type: 'added', value: value2 } };
    }
    if (value1 === value2 && !_.isPlainObject(value1) && !_.isPlainObject(value2)) {
      return { ...acc, [key]: { type: 'unchanged', value: value1 } };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { ...acc, [key]: createDiffStructure(value1, value2) };
    }
    return { ...acc, [key]: { type: 'changed', valueBefore: value1, valueAfter: value2 } };
  }, {});

  return result;
};

const genDiff = (file1, file2, formatName = 'stylish') => {
  const obj1 = getObject(file1);
  const obj2 = getObject(file2);

  const diffStructure = createDiffStructure(obj1, obj2);

  switch (formatName) {
    case 'plain':
      console.log(plain(diffStructure));
      return plain(diffStructure);
    case 'json':
      console.log(json(diffStructure));
      return json(diffStructure);
    default:
      console.log(stylish(diffStructure));
      return stylish(diffStructure);
  }
};

export default genDiff;
