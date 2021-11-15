const json = (diff) => {
  const keys = Object.keys(diff);
  const result = keys.map((key) => `"${key}":${JSON.stringify(diff[key])}`);
  // console.log(`{${result.join(',')}}`);
  return `{${result.join(',')}}`;
};

export default json;
