/**
 * Creates object from entries.
 * @param es entries
 */
function fromEntries(es: Iterable<[string, any]>): object {
  var a = {};
  for(var [k, v] of es)
    a[k] = v;
  return a;
}
export default fromEntries;
