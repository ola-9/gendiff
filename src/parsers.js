import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import yaml from 'js-yaml';

const getObject = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.resolve(__dirname, '..', '__fixtures__', filename);
  const file = fs.readFileSync(filePath, 'utf-8');
  const type = path.extname(filePath);

  if (type === '.yml' || type === '.yaml') {
    return yaml.load(file);
  }

  return JSON.parse(file);
};

export default getObject;
