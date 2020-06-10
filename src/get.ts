const INVALID_KEYS = ['__proto__', 'prototype', 'constructor'];

function get(x: object, p: string[]): any {
  for(var k of p) {
    if(INVALID_KEYS.includes(k)) return;
    if(!(k in x)) return;
    x = x[k];
  }
  return x;
}
export default get;
