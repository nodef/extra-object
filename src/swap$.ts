function swap$(x: object, k: string, l: string): object {
  var t = x[k]; x[k] = x[l]; x[l] = t;
  return x;
}
export default swap$;
