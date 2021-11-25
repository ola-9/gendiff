import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const getFormattedOutput = (diffStructure, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diffStructure);
    case 'json':
      return json(diffStructure);
    case 'stylish':
      return `{\n${stylish(diffStructure)}\n}`;
    default:
      throw new Error(`The ${formatName} format is not supported`);
  }
};

export default getFormattedOutput;
