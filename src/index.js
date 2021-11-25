import getObject from './parsers.js';
import { getContent, getContentType } from './utils.js';
import createDiffStructure from './diffStructure.js';
import getFormattedOutput from './formatters/formattedOutput.js';

const genDiff = (content1, content2, formatName = 'stylish') => {
  const obj1 = getObject(getContent(content1), getContentType(content1));
  const obj2 = getObject(getContent(content2), getContentType(content2));
  const diffStructure = createDiffStructure(obj1, obj2);
  return getFormattedOutput(diffStructure, formatName);
};

export default genDiff;
