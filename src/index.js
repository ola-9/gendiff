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
    if (!keys2.includes(key)) {
      return [...acc, { key, type: 'removed', value: value1 }];
    }
    if (!keys1.includes(key)) {
      return [...acc, { key, type: 'added', value: value2 }];
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const obj = createDiffStructure(value1, value2);
      return [...acc, { key, type: 'existing', value: obj }];
    }
    if (value1 === value2) {
      return [...acc, { key, type: 'unchanged', value: value1 }];
    }
    return [...acc, {
      key, type: 'updated', valueBefore: value1, valueAfter: value2,
    }];
  }, []);
  // console.dir(result, { depth: null });
  return result;
};

const genDiff = (content1, content2, formatName = 'stylish') => {
  const obj1 = getObject(content1);
  const obj2 = getObject(content2);

  const diffStructure = createDiffStructure(obj1, obj2);

  switch (formatName) {
    case 'plain':
      return plain(diffStructure);
    case 'json':
      return json(diffStructure);
    default:
      return `{\n${stylish(diffStructure, 1)}\n}`;
  }
};

export default genDiff;
