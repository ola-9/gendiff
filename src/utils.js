import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const getFilePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.resolve(__dirname, '..', filename);
};

const getContent = (filename) => {
  const filePath = getFilePath(filename);
  return fs.readFileSync(filePath, 'utf-8');
};

const getContentType = (filename) => {
  const filePath = getFilePath(filename);
  return path.extname(filePath).slice(1);
};

export { getFilePath, getContent, getContentType };
