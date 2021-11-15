import _ from 'lodash';

const iter = (obj, keys) => {
  const changes = Object.keys(obj)
    .flatMap((innerKey) => {
      const innerValue = obj[innerKey];
      const {
        type, value, valueBefore, valueAfter,
      } = innerValue;

      const path = [...keys, innerKey].join('.');

      if (type) {
        return {
          path, type, value, valueBefore, valueAfter,
        };
      }

      return iter(innerValue, [...keys, innerKey]);
    });
  return changes;
};

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (diff) => {
  const lines = Object.keys(diff)
    .flatMap((groupKey) => {
      const el = diff[groupKey];

      if (el.type === 'added') {
        return `Property '${groupKey}' was added with value: ${formatValue(el.value)}`;
      }

      if (el.type === 'deleted') {
        return `Property '${groupKey}' was removed`;
      }

      return iter(el, [groupKey])
        .map((changeGroup) => {
          const {
            path, type, value, valueBefore, valueAfter,
          } = changeGroup;

          if (type === 'added') {
            return `Property '${path}' was added with value: ${formatValue(value)}`;
          }
          if (type === 'deleted') {
            return `Property '${path}' was removed`;
          }
          if (type === 'changed') {
            return `Property '${path}' was updated. From ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`;
          }
          return '';
        })
        .filter((item) => item !== '');
    });

  // console.log(lines.join('\n'));
  return lines.join('\n');
};

export default plain;
