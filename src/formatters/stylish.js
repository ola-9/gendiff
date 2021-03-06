import _ from 'lodash';

const typesOfIndent = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const createIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const adjustIndent = (indent, type) => `${indent.slice(0, -2)}${typesOfIndent[type]}`;

const stringify = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) {
    return `${currentValue}`;
  }
  const currentIndent = createIndent(depth);
  const lines = Object.entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${currentIndent.slice(0, -4)}}`;
};

const getLines = (diffs, depth) => {
  const indent = createIndent(depth);
  const lines = diffs
    .map((diff) => {
      const { key, type } = diff;

      switch (type) {
        case 'added':
        case 'removed':
        case 'unchanged': {
          const { value } = diff;
          return `${adjustIndent(indent, type)}${key}: ${stringify(value, depth + 1)}`;
        }

        case 'updated': {
          const { valueBefore, valueAfter } = diff;
          const lineBefore = `${adjustIndent(indent, 'removed')}${key}: ${stringify(valueBefore, depth + 1)}`;
          const lineAfter = `${adjustIndent(indent, 'added')}${key}: ${stringify(valueAfter, depth + 1)}`;
          return `${lineBefore}\n${lineAfter}`;
        }

        case 'nested': {
          const { children } = diff;
          return `${indent}${key}: {\n${getLines(children, depth + 1)}\n${indent}}`;
        }

        default: {
          throw new Error(`This ${type} is not supported.`);
        }
      }
    })
    .join('\n');
  return lines;
};

const stylish = (diffStructure) => getLines(diffStructure, 1);

export default stylish;
