import yaml from 'js-yaml';

const getObject = (content, contentType) => {
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
