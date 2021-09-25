import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

const getObject = (filename) => {
  /*
Метод process.cwd() возвращает текущую рабочую директорию процесса Node.js
*/
  const currentWorkingDir = process.cwd();
  /*
  resolve() - принимает составные части пути и возвращает абсолютный путь
  полученного в результате обработки переданных сегментов пути.
  */
  let absolutePath = '';

  if (currentWorkingDir === '/Users/olga/Documents/GitHub/frontend-project-lvl2') {
    absolutePath = path.resolve(currentWorkingDir, '__fixtures__', filename);
  } else {
    absolutePath = path.resolve(currentWorkingDir, 'Documents/GitHub/frontend-project-lvl2/', '__fixtures__', filename);
  }

  const file = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(file);
};

const convertObjToStr = (obj) => {
  const strObj = Object.entries(obj)
    .reduce((acc, entry) => {
      const el = `  ${entry[0]}: ${entry[1]}`;
      acc.push(el);
      return acc;
    }, [])
    .join('\n');

  const str = `{\n${strObj}\n}`;
  console.log(str);
  return str;
};

const genDiff = (file1, file2) => {
  const obj1 = getObject(file1);
  const obj2 = getObject(file2);

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const diffObj = keys.reduce(
    (acc, key) => {
      if (!_.has(obj2, key)) {
        const updatedKey = `- ${key}`;
        acc[updatedKey] = obj1[key];
      } else if (!_.has(obj1, key)) {
        const updatedKey = `+ ${key}`;
        acc[updatedKey] = obj2[key];
      } else if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
        const updatedKey1 = `- ${key}`;
        const updatedKey2 = `+ ${key}`;
        acc[updatedKey1] = obj1[key];
        acc[updatedKey2] = obj2[key];
      } else {
        const updatedKey = `  ${key}`;
        acc[updatedKey] = obj1[key];
      }

      return acc;
    },
    {},
  );
  // const result = convertObjToStr(diffObj);
  // console.log(result);
  // return result;
  return convertObjToStr(diffObj);
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__dirname);

export default genDiff;
