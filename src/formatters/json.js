const json = (diffs) => {
  const result = diffs.map((diff) => JSON.stringify(diff));
  return `[${result.join(',')}]`;
};

export default json;
