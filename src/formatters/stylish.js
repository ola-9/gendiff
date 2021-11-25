import _ from 'lodash';

const typesOfIndent = {
  added: '+ ',
  removed: '- ',
};

const createIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const adjustIndent = (indent, type) => `${indent.slice(0, -2)}${typesOfIndent[type]}`;

const stringify = (value, depth) => {
  const indent = createIndent(depth);
  const lines = Object.entries(value)
    .map(([innerKey, innerValue]) => {
      if (!_.isPlainObject(innerValue)) {
        return `${indent}${innerKey}: ${innerValue}`;
      }
      return [`${indent}${innerKey}: {\n${stringify(innerValue, depth + 1)}\n${indent}}`].join('\n');
    });

  return lines.join('\n');
};

const getValue = (value, depth, indent) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }

  return `{\n${stringify(value, depth + 1)}\n${indent}}`;
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
            return `${adjustIndent(indent, type)}${key}: ${getValue(value, depth, indent)}`;
          }
          case 'removed': {
            const { value } = diff;
            return `${adjustIndent(indent, type)}${key}: ${getValue(value, depth, indent)}`;
          }
          case 'updated': {
            const { valueBefore, valueAfter } = diff;
            const lineBefore = `${adjustIndent(indent, 'removed')}${key}: ${getValue(valueBefore, depth, indent)}`;
            const lineAfter = `${adjustIndent(indent, 'added')}${key}: ${getValue(valueAfter, depth, indent)}`;
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
            throw new Error(`This ${type} is not supported.`);
          }
        }
      })
      .join('\n');
    return lines;
  };
  return iter(diffStructure, 1);
};

export default stylish;
