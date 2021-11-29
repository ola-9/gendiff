import fs from 'fs';
import path from 'path';

const getContent = (filename) => {
  const filePath = path.resolve(filename);
  return fs.readFileSync(filePath, 'utf-8');
};

const getContentType = (filename) => path.extname(filename).slice(1);

export { getContent, getContentType };
