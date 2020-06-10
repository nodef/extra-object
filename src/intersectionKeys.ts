function intersectionKeys(...xs: object[]): Set<string> {
  var a = new Set<string>();
  if(xs.length===0) return a;
  var x = xs[0], ys = xs.slice(1);
  x: for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    for(var y in ys)
      if(!y.hasOwnProperty(k)) continue x;
    a.add(k);
  }
  return a;
}
export default intersectionKeys;
