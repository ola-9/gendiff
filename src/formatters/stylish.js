import _ from 'lodash';

const typesOfIndent = {
  added: '+ ',
  removed: '- ',
};

const createIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const stringify = (currentKey, currentValue, depth, type) => {
  const currentIndent = createIndent(depth);
  const adjustedIndent = type ? `${currentIndent.slice(0, -2)}${typesOfIndent[type]}` : currentIndent;
  if (!_.isPlainObject(currentValue)) {
    return `${adjustedIndent}${currentKey}: ${currentValue}`;
  }
  const lines = Object.entries(currentValue)
    .map(([key, value]) => {
      if (!_.isPlainObject(value)) {
        return `${createIndent(1)}${currentIndent}${key}: ${value}`;
      }
      return `${stringify(key, value, depth + 1)}`;
    });
  return [`${adjustedIndent}${currentKey}: {`, `${lines.join('\n')}`, `${currentIndent}}`].join('\n');
};

const stylish = (diffStructure) => {
  const iter = (diffs, depth) => {
    const indent = createIndent(depth);
    const lines = diffs
      .map((diff) => {
        const { key, type } = diff;
        switch (type) {
          case 'added': {
            const { value } = diff;
            return stringify(key, value, depth, type);
          }
          case 'removed': {
            const { value } = diff;
            return stringify(key, value, depth, type);
          }
          case 'updated': {
            const { valueBefore, valueAfter } = diff;
            const lineBefore = stringify(key, valueBefore, depth, 'removed');
            const lineAfter = stringify(key, valueAfter, depth, 'added');
            return `${lineBefore}\n${lineAfter}`;
          }
          case 'nested': {
            const { children } = diff;
            return `${indent}${key}: {\n${iter(children, depth + 1)}\n${indent}}`;
          }
          case 'unchanged': {
            const { value } = diff;
            return `${indent}${key}: ${value}`;
          }
          default: {
            throw new Error('This type is not supported.');
          }
        }
      })
      .join('\n');
    return lines;
  };
  return iter(diffStructure, 1);
};

export default stylish;
