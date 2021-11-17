import _ from 'lodash';

const stringify = (currentValue, depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  if (!_.isPlainObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object.entries(currentValue)
    .map(([key, value]) => {
      if (!_.isPlainObject(value)) {
        return `${currentIndent}${key}: ${value}`;
      }
      return `${currentIndent}${key}: {\n${stringify(value, depth + 1)}\n${currentIndent}}`;
    });
  return lines.join('\n');
};

const typesOfIndent = {
  added: '+ ',
  removed: '- ',
};

const createLine = (indent, depth, type, key, value) => {
  const currentIndent = type ? `${indent.slice(0, -2)}${typesOfIndent[type]}` : indent;
  if (_.isPlainObject(value)) {
    return [`${currentIndent}${key}: {`, `${stringify(value, depth)}\n${indent}}`].join('\n');
  }
  return [`${currentIndent}${key}: ${value}`].join('\n');
};

const stylish = (diffs, depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  const currIndent = replacer.repeat(indentSize);
  const lines = diffs
    .map((diff) => {
      const { key, type, value } = diff;

      if (type === 'added') {
        return createLine(currIndent, depth + 1, type, key, value);
      }

      if (type === 'removed') {
        return createLine(currIndent, depth + 1, type, key, value);
      }

      if (type === 'updated') {
        const { valueBefore, valueAfter } = diff;
        return `${createLine(currIndent, depth + 1, 'removed', key, valueBefore)}\n${createLine(currIndent, depth + 1, 'added', key, valueAfter)}`;
      }

      if (type === 'existing') {
        return `${currIndent}${key}: {\n${stylish(value, depth + 1)}\n${currIndent}}`;
      }

      return `${currIndent}${key}: ${value}`;
    })
    .join('\n');
  return lines;
};

export default stylish;
