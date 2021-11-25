import _ from 'lodash';

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
  return result;
};

export default createDiffStructure;
