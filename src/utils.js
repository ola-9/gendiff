import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const getFilePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.resolve(__dirname, '..', '__fixtures__', filename);
};

export default getFilePath;
