import _ from 'lodash';

const stringify = (obj, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const lines = Object.entries(currentValue)
      .map(([key, value]) => {
        if (typeof value !== 'object') {
          return `${currentIndent}${key}: ${value}`;
        }
        return `${currentIndent}${key}: {\n${iter(value, depth + 1)}\n${currentIndent}}`;
      });
    return lines.join('\n');
  };
  return iter(obj, 2);
};

const stylish = (diff, replacer = ' ', spacesCount = 4) => {
  const keys = Object.keys(diff)
    .map((groupKey) => {
      const el = diff[groupKey];
      const indent = replacer.repeat(spacesCount);
      if (el.type === 'added') {
        const result = stringify(el.value);
        const output = [`  + ${groupKey}: {`, `${result}`, `${indent}}`];
        return output.join('\n');
      }

      if (el.type === 'deleted') {
        const result = stringify(el.value);
        const output = [`  - ${groupKey}: {`, `${result}`, `${indent}}`];
        return output.join('\n');
      }

      const iter = (obj, depth) => {
        const indentSize = depth * spacesCount;
        const currentIndent = replacer.repeat(indentSize);
        const innerKeys = Object.keys(obj)
          .map((innerKey) => {
            const innerValue = obj[innerKey];
            const {
              type, value, valueBefore, valueAfter,
            } = innerValue;

            const value2 = _.isPlainObject(value) ? `{\n${currentIndent}${stringify(value)}\n${indent}${currentIndent}}` : value;
            const before2 = _.isPlainObject(valueBefore) ? `{\n${currentIndent}${stringify(valueBefore)}\n${indent}${currentIndent}}` : valueBefore;
            const after2 = _.isPlainObject(valueAfter) ? `{\n${currentIndent}${stringify(valueAfter)}\n${indent}${currentIndent}}` : valueAfter;

            if (type === 'added') {
              return `${currentIndent}  + ${innerKey}: ${value2}`;
            }
            if (type === 'deleted') {
              return `${currentIndent}  - ${innerKey}: ${value}`;
            }
            if (type === 'changed') {
              return `${currentIndent}  - ${innerKey}: ${before2}\n${currentIndent}  + ${innerKey}: ${after2}`;
            }

            if (type === 'unchanged') {
              return `${indent}${currentIndent}${innerKey}: ${value}`;
            }

            return `${indent}${currentIndent}${innerKey}: {\n${iter(innerValue, depth + 1)}\n${indent}${currentIndent}}`;
          });
        return innerKeys.join('\n');
      };

      return `${indent}${groupKey}: {\n${iter(el, 1)}\n${indent}}`;
    });
  // console.log(keys.join('\n'));
  const result = `{\n${keys.join('\n')}\n}`;
  // console.log(result);
  return result;
};

export default stylish;
