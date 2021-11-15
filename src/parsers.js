import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import getFilePath from './utils.js';

const getObject = (filename) => {
  const filePath = getFilePath(filename);
  const file = fs.readFileSync(filePath, 'utf-8');
  const type = path.extname(filePath);

  if (type === '.yml' || type === '.yaml') {
    return yaml.load(file);
  }

  return JSON.parse(file);
};

export default getObject;
