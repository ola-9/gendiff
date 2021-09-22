import { AsyncLocalStorage } from 'async_hooks';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

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
    absolutePath = path.resolve(currentWorkingDir, 'src/data/', filename);
  } else {
    absolutePath = path.resolve(currentWorkingDir, 'Documents/GitHub/frontend-project-lvl2/', 'src/data/', filename);

  };
  
  const file = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(file);
};

const convertObjToStr = (obj) => {
  const keys = Object.keys(obj);
  console.log('{');

  for (const key of keys) {
    const formattedKey = key.replace("'", '');
    const value = obj[key];
    console.log(`  ${formattedKey}: ${value}`);
  }

  console.log('}');
};

const getDiff = (file1, file2) => {
  const obj1 = getObject(file1);
  const obj2 = getObject(file2);

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const diffObj = {};

  for (const key of keys) {
    if (!_.has(obj2, key)) {
      const updatedKey = `- ${key}`;
      diffObj[updatedKey] = obj1[key];
    } else if (!_.has(obj1, key)) {
      const updatedKey = `+ ${key}`;
      diffObj[updatedKey] = obj2[key];
    } else if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
      const updatedKey1 = `- ${key}`;
      const updatedKey2 = `+ ${key}`
      diffObj[updatedKey1] = obj1[key];
      diffObj[updatedKey2] = obj2[key];
    } else {
      const updatedKey = `  ${key}`;
      diffObj[updatedKey] = obj1[key];
    }
  }

  convertObjToStr(diffObj);
};

export default getDiff;
