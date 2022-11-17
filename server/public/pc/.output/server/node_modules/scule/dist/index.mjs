const NUNBER_CHAR_RE = /[0-9]/;
function isUppercase(char = "") {
  if (NUNBER_CHAR_RE.test(char)) {
    return null;
  }
  return char.toUpperCase() === char;
}
const STR_SPLITTERS = ["-", "_", "/", "."];
function splitByCase(str, splitters = STR_SPLITTERS) {
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previusUpper = null;
  let previousSplitter = null;
  for (const char of str.split("")) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previusUpper = null;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previusUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previusUpper = isUpper;
        continue;
      }
      if (previusUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1];
        parts.push(buff.substr(0, buff.length - 1));
        buff = lastChar + char;
        previusUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previusUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.substring(1);
}
function lowerFirst(str) {
  if (!str) {
    return "";
  }
  return str[0].toLowerCase() + str.substring(1);
}
function pascalCase(str = "") {
  return (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(p)).join("");
}
function camelCase(str = "") {
  return lowerFirst(pascalCase(str));
}
function kebabCase(str = "", joiner = "-") {
  return (Array.isArray(str) ? str : splitByCase(str)).map((p = "") => p.toLowerCase()).join(joiner);
}
function snakeCase(str = "") {
  return kebabCase(str, "_");
}

export { camelCase, isUppercase, kebabCase, lowerFirst, pascalCase, snakeCase, splitByCase, upperFirst };
