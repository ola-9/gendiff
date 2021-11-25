import _ from 'lodash';

const createDiffStructure = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', children: createDiffStructure(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    return {
      key, type: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
    };
  });
  return result;
};

export default createDiffStructure;
