import _ from 'lodash';

const stylish = (currentEntry, replacer = ' ', spacesCount = 4) => {
  const iter = (entry, depth) => {
    const [currKey, currValue] = entry;
    const {
      type, value, before, after,
    } = currValue;

    const indentSize = depth * spacesCount;
    let currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize);
    // const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (type === 'added') {
      const str = replacer.repeat(indentSize);
      currentIndent = `${str.slice(0, -2)}+ `;
    }
    if (type === 'deleted') {
      const str = replacer.repeat(indentSize);
      currentIndent = `${str.slice(0, -2)}- `;
    }
    if (type === 'changed') {
      const str = replacer.repeat(indentSize);
      const deletedIndent = `${str.slice(0, -2)}- `;
      const addedIndent = `${str.slice(0, -2)}+ `;
      return `${deletedIndent}${currKey}: ${before}\n${addedIndent}${currKey}: ${after}`;
    }
    if (!_.isPlainObject(currValue)) {
      return `${currentIndent}${currKey}: ${currValue}`;
    }
    if (!_.isPlainObject(value)) {
      return `${currentIndent}${currKey}: ${value}`;
    }

    if (type === undefined || value.type === undefined) {
      // console.log('currKey: ', currKey);
      // console.log('currvalue: ', currValue.value);
      // проблема с деструктуризацией
      // в объектах, которые добавляются как есть нет
      // предопределенных ключей value, type и т.п.
      // console.log('type: ', type);
      // console.log('value.type: ', value.type);
      console.log('=======');
    }

    const lines = Object
      .entries(value)
      .map((currEntry) => iter(currEntry, depth + 1));

    return [
      `${currentIndent}${currKey} {`,
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(currentEntry, 1);
};

export default stylish;
