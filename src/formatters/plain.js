import _ from 'lodash';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (diffs) => {
  const iter = (obj, keys) => {
    const result = obj
      .flatMap((item) => {
        const {
          key, type, value, valueBefore, valueAfter,
        } = item;
        const path = [...keys, key].join('.');
        if (type === 'removed') {
          return `Property '${path}' was removed`;
        }

        if (type === 'added') {
          return `Property '${path}' was added with value: ${formatValue(value)}`;
        }

        if (type === 'updated') {
          return `Property '${path}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
        }

        if (type === 'existing') {
          return iter(value, [...keys, key]);
        }

        return '';
      })
      .filter((item) => item !== '');
    return result.join('\n');
  };

  return iter(diffs, []);
};

export default plain;
