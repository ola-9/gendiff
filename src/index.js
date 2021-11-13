import _ from 'lodash';
import getObject from './parsers.js';
import stylish from './stylish.js';

const createDiffStructure = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (keys1.includes(key) && !keys2.includes(key)) {
      acc[key] = { type: 'deleted', value: value1 };
    } else if (!keys1.includes(key) && keys2.includes(key)) {
      acc[key] = { type: 'added', value: value2 };
    } else if (value1 === value2 && !_.isPlainObject(value1) && !_.isPlainObject(value2)) {
      acc[key] = { type: 'unchanged', value: value1 };
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      acc[key] = createDiffStructure(value1, value2);
    } else {
      acc[key] = { type: 'changed', valueBefore: value1, valueAfter: value2 };
    }

    return acc;
  }, {});

  return result;
};

const genDiff = (file1, file2, options) => {
  const obj1 = getObject(file1);
  const obj2 = getObject(file2);

  const diffStructure = createDiffStructure(obj1, obj2);

  switch (options.format) {
    case 'format2':
      console.log('format2');
      return 'format2';
    default:
      console.log(stylish(diffStructure));
      return stylish(diffStructure);
  }
};

export default genDiff;
