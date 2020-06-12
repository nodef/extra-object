/**
 * Creates object from lists.
 * @param ls lists, i.e. [keys, values]
 */
function fromLists(ls: [Iterable<string>, Iterable<any>]): object {
  var [ks, vs] = ls, a = {};
  var vi = vs[Symbol.iterator]();
  for(var k of ks)
    a[k] = vi.next().value;
  return a;
}
export default fromLists;
