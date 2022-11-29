export function addUnit(value: string | number, unit = 'px') {
  return !Object.is(Number(value), NaN) ? `${value}${unit}` : value
}
