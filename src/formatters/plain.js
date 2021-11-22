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
        const { key, type } = item;
        const path = [...keys, key].join('.');

        switch (type) {
          case 'removed':
            return `Property '${path}' was removed`;
          case 'added': {
            const { value } = item;
            return `Property '${path}' was added with value: ${formatValue(value)}`;
          }
          case 'updated': {
            const { valueBefore, valueAfter } = item;
            return `Property '${path}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
          }
          case 'nested': {
            const { children } = item;
            return iter(children, [...keys, key]);
          }
          case 'unchanged': {
            return '';
          }
          default:
            throw new Error('This format is not supported.');
        }
      })
      .filter((item) => item !== '');
    return result.join('\n');
  };

  return iter(diffs, []);
};

export default plain;
