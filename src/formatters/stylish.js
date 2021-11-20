import _ from 'lodash';

const typesOfIndent = {
  added: '+ ',
  removed: '- ',
};

const createIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const stringify = (currentValue, depth) => {
  const currentIndent = createIndent(depth);
  const lines = Object.entries(currentValue)
    .map(([key, value]) => {
      if (!_.isPlainObject(value)) {
        return `${currentIndent}${key}: ${value}`;
      }
      return `${currentIndent}${key}: {\n${stringify(value, depth + 1)}\n${currentIndent}}`;
    });
  return lines.join('\n');
};

const stylish = (diffs, depth) => {
  const indent = createIndent(depth);
  const lines = diffs
    .map((diff) => {
      const { key, type } = diff;

      switch (type) {
        case 'added': {
          const { value } = diff;
          const adjustedIndent = `${indent.slice(0, -2)}${typesOfIndent[type]}`;
          if (_.isPlainObject(value)) {
            return [`${adjustedIndent}${key}: {`, `${stringify(value, depth + 1)}\n${indent}}`].join('\n');
          }
          return [`${adjustedIndent}${key}: ${value}`].join('\n');
        }

        case 'removed': {
          const { value } = diff;
          const adjustedIndent = `${indent.slice(0, -2)}${typesOfIndent[type]}`;
          if (_.isPlainObject(value)) {
            return [`${adjustedIndent}${key}: {`, `${stringify(value, depth + 1)}\n${indent}}`].join('\n');
          }
          return [`${adjustedIndent}${key}: ${value}`].join('\n');
        }

        case 'updated': {
          const { valueBefore, valueAfter } = diff;

          const adjustedIndentBefore = `${indent.slice(0, -2)}${typesOfIndent.removed}`;
          const lineBefore = (_.isPlainObject(valueBefore))
            ? [`${adjustedIndentBefore}${key}: {`, `${stringify(valueBefore, depth + 1)}\n${indent}}`].join('\n')
            : [`${adjustedIndentBefore}${key}: ${valueBefore}`].join('\n');

          const adjustedIndentAfter = `${indent.slice(0, -2)}${typesOfIndent.added}`;
          const lineAfter = (_.isPlainObject(valueAfter))
            ? [`${adjustedIndentAfter}${key}: {`, `${stringify(valueAfter, depth + 1)}\n${indent}}`].join('\n')
            : [`${adjustedIndentAfter}${key}: ${valueAfter}`].join('\n');

          return `${lineBefore}\n${lineAfter}`;
        }

        case 'nested': {
          const { children } = diff;
          return `${indent}${key}: {\n${stylish(children, depth + 1)}\n${indent}}`;
        }

        default: {
          const { value } = diff;
          return `${indent}${key}: ${value}`;
        }
      }
    })
    .join('\n');
  return lines;
};

export default stylish;
