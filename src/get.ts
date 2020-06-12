const BAD_KEYS = ['__proto__', 'prototype', 'constructor'];

/**
 * Gets value at key.
 * @param x an object
 * @param k key
 */
function get(x: object, k: string): any {
  return x[k];
}
export default get;
