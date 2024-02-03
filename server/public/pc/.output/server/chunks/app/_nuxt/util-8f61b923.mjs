const addUnit = (value, unit = "px") => {
  return !Object.is(Number(value), NaN) ? `${value}${unit}` : value;
};
function getNormalPath(path) {
  if (path.length === 0 || !path || path == "undefined") {
    return path;
  }
  const newPath = path.replace("//", "/");
  const length = newPath.length;
  if (newPath[length - 1] === "/") {
    return newPath.slice(0, length - 1);
  }
  return newPath;
}

export { addUnit as a, getNormalPath as g };
//# sourceMappingURL=util-8f61b923.mjs.map
