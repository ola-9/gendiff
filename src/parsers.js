import yaml from 'js-yaml';
import { getContent, getContentType } from './utils.js';

const getObject = (filename) => {
  const content = getContent(filename);
  const contentType = getContentType(filename);
  switch (contentType) {
    case 'yml':
      return yaml.load(content);
    case 'yaml':
      return yaml.load(content);
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error('This content type is not supported');
  }
};

export default getObject;
