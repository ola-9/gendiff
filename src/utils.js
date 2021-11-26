import fs from 'fs';
import path from 'path';

const getContent = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  return fs.readFileSync(filePath, 'utf-8');
};

const getContentType = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  return path.extname(filePath).slice(1);
};

export { getContent, getContentType };
