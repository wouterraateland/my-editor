const getKey = (key, splitOn = ".") => (o) =>
  key.split(splitOn).reduce((v, k) => (v ? v[k] : undefined), o);

const _setKey = (parts, value, o) =>
  parts.length === 0
    ? value
    : {
        ...o,
        [parts[0]]: _setKey(parts.slice(1), value, o[parts[0]] || {}),
      };

const setKey = (key, value, splitOn = ".") => (o) =>
  _setKey(key.split(splitOn), value, o);

const arrayLikeToArray = (o) => {
  if (typeof o !== "object" || !o) {
    return o;
  }
  const keys = Object.keys(o);
  return keys.some(isNaN)
    ? keys.reduce(
        (acc, key) => ({ ...acc, [key]: arrayLikeToArray(o[key]) }),
        {}
      )
    : keys.reduce((acc, key) => {
        const res = acc.slice();
        res[Number(key)] = arrayLikeToArray(o[Number(key)]);
        return res;
      }, []);
};

export { getKey, setKey, arrayLikeToArray };
