function* subobjectsWith(x: object, ks: string[], n: number): IterableIterator<object> {
  var X = ks.length;
  if(n>=X) { if(n===X) yield x; return; }
  if(n===0 || X===0) { yield {}; return; }
  var ls = ks.slice(0, -1);
  yield* subobjectsWith(x, ls, n);
  for(var s of subobjectsWith(x, ls, n)) {
    var a = {}; a[ks[X-1]] = x[ks[X-1]];
    yield Object.assign(s, a);
  }
}

function* subobjects(x: object, n: number=-1): IterableIterator<object> {
  yield* subobjectsWith(x, Object.keys(x), n);
}
export default subobjects;
